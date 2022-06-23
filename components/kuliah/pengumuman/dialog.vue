<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="600" persistent>
      <v-card>
        <v-card-title>
          <span v-show="mode == 'tambah'">Buat Pengumuman</span>
          <span v-show="mode == 'edit'">Edit Pengumuman</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="bukaDialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <br />
        <v-card-text>
          <v-form ref="form_pengumuman">
            <v-text-field
              v-model="judul"
              :rules="[(v) => !!v || 'Judul harus diisi']"
              outlined
              label="Judul"
            />
            <v-textarea
              v-model="isi_pengumuman"
              :rules="[(v) => !!v || 'Ket Pengumuman harus diisi']"
              outlined
              label="Detail isi pengumuman"
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
            {{ mode == 'tambah' ? 'Simpan' : 'Perbarui' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
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
      isi_pengumuman: '',
      nomor: null,
    }
  },
  computed: {
    ...mapState({
      kuliah: (state) => state.modules.kuliah.kuliahDosen,
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
      this.judul = v.judul
      this.isi_pengumuman = v.isi_pengumuman
      this.nomor = v.nomor
    },
  },
  methods: {
    bersihkanForm() {
      this.judul = ''
      this.isi_pengumuman = ''
    },
    tambah() {
      if (this.$refs.form_pengumuman.validate()) {
        this.loading = true
        this.$axios
          .post('/pengumuman', {
            judul: this.judul,
            isi_pengumuman: this.isi_pengumuman,
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
          })
          .then((res) => {
            if (res.data.sukses) {
              this.loading = false
              this.bukaDialog = false
              this.bersihkanForm()
              this.$emit('refresh')
            }
          })
      }
    },
    edit() {
      if (this.$refs.form_pengumuman.validate()) {
        this.loading = true
        this.$axios
          .put('/pengumuman', {
            judul: this.judul,
            isi_pengumuman: this.isi_pengumuman,
            nomor: this.nomor,
          })
          .then((res) => {
            if (res.data.sukses) {
              this.loading = false
              this.bukaDialog = false
              this.bersihkanForm()
              this.$emit('refresh')
            }
          })
      }
    },
  },
}
</script>
