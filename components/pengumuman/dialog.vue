<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="600" persistent>
      <v-card>
        <v-card-title>
          <span v-show="mode == 'tambah'">Buat Pengumuman Baru</span>
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
              placeholder="Judul Pengumuman . . ."
            />
            <v-textarea
              v-model="isi"
              :rules="[(v) => !!v || 'Isi Pengumuman harus diisi']"
              outlined
              rows="2"
              placeholder="Isi Pengumuman . . ."
              label="Isi Pengumuman"
            />
            <v-file-input
              v-if="mode == 'tambah'"
              v-model="file"
              :rules="[
                (v) => !!v || 'File harus diisi',
                (v) => (v && v.size < 10000000) || 'Ukuran file maksimal 10Mb',
              ]"
              solo
              outlined
              flat
              placeholder="File Pengumuman"
              prepend-inner-icon="mdi-attachment mdi-rotate-90"
              prepend-icon=""
            />
            <div v-else-if="mode == 'edit' && fileDiedit == false">
              <CardFile
                :nama-file="itemData.file_download"
                :path="itemData.file_download"
                icon="mdi-download"
                @aksiicon="downloadFilePengumuman"
              />
              <br />
              <v-btn
                v-if="mode == 'edit' && fileDiedit == false"
                small
                class="text--none"
                outlined
                @click="fileDiedit = true"
              >
                <span>Ubah File</span>
              </v-btn>
            </div>
            <div v-else-if="mode == 'edit' && fileDiedit == true">
              <v-file-input
                v-model="file"
                :rules="[
                  (v) => !!v || 'File harus diisi',
                  (v) =>
                    (v && v.size < 10000000) || 'Ukuran file maksimal 10Mb',
                ]"
                solo
                outlined
                flat
                placeholder="File Pengumuman"
                prepend-inner-icon="mdi-attachment mdi-rotate-90"
                prepend-icon=""
              >
                <template slot="append">
                  <span id="btn-batal" @click="fileDiedit = false">Batal</span>
                </template>
              </v-file-input>
            </div>
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
import CardFile from '@/components/card/card-file.vue'
import file from '~/mixins/file'
export default {
  components: {
    CardFile,
  },
  mixins: [file],
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
      isi: '',
      file: null,
      nomor: null,
      fileDiedit: false,
    }
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
      this.isi = v.isi
      this.file = v.file_download
      this.nomor = v.nomor
    },
  },
  methods: {
    downloadFilePengumuman(v) {
      this.downloadFileEthol(v.path)
    },
    bersihkanForm() {
      this.nama = ''
      this.isi = ''
      this.file = ''
      this.fileDiedit = false
    },
    tambah() {
      if (this.$refs.form_pengumuman.validate()) {
        const formData = new FormData()
        this.loading = true
        formData.append('judul', this.judul)
        formData.append('isi', this.isi)
        formData.append('file', this.file)
        this.loading = true
        this.$axios.post('/pengumuman/baak', formData).then((res) => {
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
        const formData = new FormData()
        this.loading = true
        formData.append('judul', this.judul)
        formData.append('isi', this.isi)
        formData.append('file', this.file)
        formData.append('nomor', this.nomor)
        this.loading = true
        this.$axios.put('/pengumuman/baak', formData).then((res) => {
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
