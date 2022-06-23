<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="500" persistent>
      <v-card>
        <v-card-title>
          <span>Upload Materi Sebelumnya</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="bukaDialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <br />
          <v-row>
            <v-col
              v-for="item in listData"
              :key="item.id"
              cols="12"
              sm="6"
              md="6"
              lg="6"
              xl="6"
            >
              <v-card
                flat
                outlined
                :class="
                  item.selected
                    ? 'card-materi-sebelumnya selected'
                    : 'card-materi-sebelumnya'
                "
                @click="item.selected ? unselect(item.id) : select(item.id)"
              >
                <v-card-text>{{ item.title }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            :text="loading == false"
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="tambah()"
          >
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import waktu from '~/mixins/waktu'
export default {
  mixins: [waktu],
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false,
    },
    materiExist: {
      type: Array,
      required: true,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      bukaDialog: false,
      loading: false,
      listData: [],
      materiDipilih: [],
    }
  },
  computed: {
    ...mapState({
      matakuliahDosen: (state) => state.modules.matakuliah.matakuliahDosen,
      kuliahDosen: (state) => state.modules.kuliah.kuliahDosen,
      user: (state) => state.user,
    }),
  },
  watch: {
    bukaDialog(v) {
      if (!v) {
        this.bersihkanForm()
        this.$emit('tutup')
      }
    },
    dialog(v) {
      this.bukaDialog = v
    },
  },
  mounted() {
    this.ambilDataMatkulSejenis()
  },
  methods: {
    bersihkanForm() {
      this.listData = []
      this.materiDipilih = []
      this.ambilDataMatkulSejenis()
    },
    tambah() {
      this.listData.forEach(async (element) => {
        if (element.selected == true) {
          this.loading = true
          await this.$axios
            .post('/materi/matkul-sejenis', {
              judul: element.title,
              idMatakuliah: this.kuliahDosen.matakuliah.nomor,
              nomorDosen: element.dosen,
              pathFile: element.path,
              tahun: this.tahunAjaranAktifOnly,
              semester: this.semesterAktif,
            })
            .then((res) => {
              if (res.sukses) {
                this.loading = false
              }
            })
        }
      })
      this.loading = false
      this.bersihkanForm()
      this.bukaDialog = false
      this.$emit('tutup')
      this.$emit('refresh')
    },
    ambilDataMatkulSejenis() {
      this.loading = true
      this.$axios
        .get('/materi/matkul-sejenis', {
          params: {
            matakuliah: this.kuliahDosen.matakuliah.nomor,
            dosen: this.user.nomor,
          },
        })
        .then((res) => {
          this.loading = false
          this.listData = res.data.filter(
            (o) => !this.materiExist.some((i) => i.id === o.id)
          )
        })
    },
    select(id) {
      for (let index = 0; index < this.listData.length; index++) {
        const element = this.listData[index]
        if (element.id == id) {
          this.listData[index].selected = true
          this.materiDipilih.push(element.id)
        }
      }
    },
    unselect(id) {
      for (let index = 0; index < this.listData.length; index++) {
        const element = this.listData[index]
        if (element.id == id) {
          this.listData[index].selected = false
          this.materiDipilih.splice(index, 1)
        }
      }
    },
  },
}
</script>
<style scoped>
.card-materi-sebelumnya:hover {
  background-color: #e1ffce;
  color: white;
  border: 1px solid white;
  font-weight: bold;
}
.card-materi-sebelumnya.selected {
  background-color: #e1ffce;
  color: white;
  border: 1px solid white;
  font-weight: bold;
  border: 2px solid black;
}
</style>
