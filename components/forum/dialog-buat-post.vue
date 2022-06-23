<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="550"
        persistent
      >
        <v-card>
          <v-card-title>
            Buat Postingan
            <v-spacer></v-spacer>
            <v-btn icon @click="tutupDialog"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <br />
          <v-card-text>
            <Editor @updatecontent="updatecontent" />
            <br />
            <v-switch
              v-model="isUploadFile"
              inset
              label="Upload File ?"
            ></v-switch>
            <br />
            <v-col
              v-show="isUploadFile"
              cols="12"
              style="background-color: rgb(221, 221, 221); border-radius: 5px"
            >
              <v-btn
                color="green"
                small
                class="text-none"
                dark
                @click="tambahLampiran"
              >
                <v-icon small>mdi-plus-circle</v-icon>&nbsp;
                <span>Tambah Lampiran</span>
              </v-btn>
              <br />
              <br />
              <div v-for="(l, index) in lampiran" :key="index">
                <v-row>
                  <v-col cols="12" md="10">
                    <v-file-input
                      :key="index"
                      v-model="l.file"
                      label="File"
                      hide-details
                      prepend-icon=""
                      prepend-inner-icon="mdi-attachment mdi-rotate-90"
                      outlined
                      accept=".pdf, .png, .jpeg, .jpg"
                      @change="fileToBase64(index, l.file)"
                    />
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn
                      icon
                      color="red"
                      style="margin-top: 5px"
                      @click="hapusLampiran(index)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
              <v-row v-show="lampiran.length != 0">
                <v-col cols="12">
                  <small> File yang diizinkan .pdf, .png, .jpeg, .jpg </small>
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              color="primary"
              :loading="loadingSave"
              :disabled="loadingSave"
              block
              @click="kirim"
            >
              Kirim
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Editor from '@/components/wysiwyg/editor.vue'
import teks from '~/mixins/teks'
import file from '~/mixins/file'
export default {
  components: {
    Editor,
  },
  mixins: [teks, file],
  data() {
    return {
      dialog: false,
      isUploadFile: false,
      loadingSave: false,
      narasi: '',
      filenya: null,
      lampiran: [],
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      auth: (state) => state.auth,
      kuliahDosen: (state) => state.modules.kuliah.kuliahDosen,
      kuliahMahasiswa: (state) => state.modules.kuliah.kuliahMahasiswa,
    }),
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  methods: {
    updatecontent(v) {
      this.narasi = v
    },
    tutupDialog() {
      this.dialog = false
      this.narasi = ''
    },
    kirim() {
      const self = this
      let checkLampiranvalid = true
      for (let index = 0; index < this.lampiran.length; index++) {
        const element = this.lampiran[index]
        if (element.file == null) {
          checkLampiranvalid = false
        }
      }
      if (checkLampiranvalid == true) {
        // const self = this
        this.loadingSave = true

        let kuliah = null
        let jenisSchema = null
        if (this.mahasiswa) {
          kuliah = this.kuliahMahasiswa.nomor
          jenisSchema = this.kuliahMahasiswa.jenisSchema
        } else if (this.dosen) {
          kuliah = this.kuliahDosen.nomor
          jenisSchema = this.kuliahDosen.jenisSchema
        }

        this.$axios
          .$post('/forum', {
            narasi: this.narasi,
            lampiran: this.lampiran,
            kuliah,
            jenisSchema,
            tipeAkses: this.auth.hakAktif,
          })
          .finally(() => (this.loadingSave = false))
          .then((response) => {
            if (response.sukses == true) {
              this.dialog = false
              this.lampiran = []
              this.narasi = ''
              self.$emit('berhasilsimpan')
            }
          })
          .catch((err) => {
            if (err.response.status == 413 || err.response.status == '413') {
              alert('Lampiran File Terlalu Besar')
            } else {
              alert('Gagal menyimpan data !')
            }
          })
      } else {
        alert('Harap isi semua lampiran yang telah Anda tambahkan !')
      }
    },
    async fileToBase64(i, file) {
      if (file) {
        const base64 = await this.toBase64(file)
        const ext = file.name.split('.')
        this.lampiran[i].file_base_64 = base64
        this.lampiran[i].extensi_file = ext[ext.length - 1]
        this.lampiran[i].original_name = ext[0]
      }
    },
    tambahLampiran() {
      this.lampiran.push({
        file: null,
        file_base_64: null,
        extensi_file: null,
        original_name: null,
      })
    },
    hapusLampiran(i) {
      this.lampiran.splice(i, 1)
    },
  },
}
</script>
