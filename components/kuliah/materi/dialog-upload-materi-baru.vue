<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="600" persistent>
      <v-card>
        <v-card-title>
          <span v-show="mode == 'tambah'">Upload Materi Baru</span>
          <span v-show="mode == 'edit'">Edit Materi</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="bukaDialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <br />
        <v-card-text>
          <v-form ref="form_materi">
            <v-text-field
              v-model="judul"
              :rules="[(v) => !!v || 'Judul harus diisi']"
              placeholder="Judul"
              solo
              outlined
              flat
            />
            <v-file-input
              v-model="file"
              :rules="[
                (v) => !!v || 'File harus diisi',
                (v) => (v && v.size < 4000000) || 'Ukuran file maksimal 4Mb',
              ]"
              solo
              outlined
              flat
              placeholder="File materi"
              prepend-inner-icon="mdi-attachment mdi-rotate-90"
              prepend-icon=""
            />
            <v-select
              v-model="kuliahDipilih"
              :items="listKuliah"
              :rules="[(v) => v.length != 0 || 'Kelas harus dipilih']"
              item-text="matakuliah.nama"
              item-value="matakuliah.nomor"
              solo
              outlined
              flat
              placeholder="Pilih kelas"
              hint="Pilih lebih dari 1 kelas untuk melakukan upload sekaligus"
              persistent-hint
              multiple
              class="mb-2"
            />
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn
            :text="loading == false"
            :color="mode == 'tambah' ? 'primary' : 'warning'"
            :loading="loading"
            :disabled="loading"
            @click="mode == 'tambah' ? tambah() : edit()"
          >
            {{ mode == 'tambah' ? 'Upload Materi' : 'Perbarui Materi' }}
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
    mode: {
      type: String,
      required: true,
      default: 'tambah',
    },
    itemData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      bukaDialog: false,
      loading: false,
      judul: '',
      file: null,
      kuliahDipilih: [],
      listKuliah: [],
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
    itemData(v) {
      this.nama = v.nama
      this.url = v.url
      this.nomor = v.nomor
    },
  },
  mounted() {
    this.listKuliah = this.matakuliahDosen

    this.listKuliah.forEach((element) => {
      if (element.matakuliah.nomor == this.kuliahDosen.matakuliah.nomor) {
        this.kuliahDipilih.push(element.matakuliah.nomor)
      }
    })
  },
  methods: {
    bersihkanForm() {
      this.judul = ''
      this.file = null
      this.kuliahDipilih = []
      this.loading = false
    },
    tambah() {
      if (this.$refs.form_materi.validate()) {
        const formData = new FormData()
        formData.append('judul', this.judul)
        formData.append('tahun', this.tahunAjaranAktifOnly)
        formData.append('semester', this.semesterAktif)
        this.kuliahDipilih.forEach((element) => {
          formData.append('idKuliah[]', parseInt(element))
        })
        formData.append('nomorDosen', this.user.nomor)
        formData.append('file', this.file)
        this.loading = true
        this.$axios.post('/materi', formData).then((res) => {
          if (res.data.sukses) {
            this.loading = false
            this.$emit('refresh')
            this.bersihkanForm()
            this.bukaDialog = false
          }
        })
      }
    },
    edit() {},
  },
}
</script>
