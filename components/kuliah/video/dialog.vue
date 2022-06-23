<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="600" persistent>
      <v-card>
        <v-card-title>
          <span v-show="mode == 'tambah'">Tambah Video Baru</span>
          <span v-show="mode == 'edit'">Edit</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="bukaDialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <br />
        <v-card-text>
          <v-form ref="form_video">
            <v-text-field
              v-model="judul"
              :rules="[(v) => !!v || 'Judul harus diisi']"
              outlined
              label="Judul"
            />
            <v-text-field
              v-model="url"
              :rules="[(v) => !!v || 'Url harus diisi']"
              outlined
              label="Url"
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
      url: '',
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
      this.url = v.url
      this.nomor = v.nomor
    },
  },
  methods: {
    bersihkanForm() {
      this.judul = ''
      this.url = ''
    },
    tambah() {
      if (this.$refs.form_video.validate()) {
        this.loading = true
        this.$axios
          .post('/video', {
            judul: this.judul,
            url: this.url,
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
            namaMk: this.kuliah.matakuliah.nama,
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
      if (this.$refs.form_video.validate()) {
        this.loading = true
        this.$axios
          .put('/video', {
            judul: this.judul,
            url: this.url,
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
