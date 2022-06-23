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
            Edit Postingan
            <v-spacer></v-spacer>
            <v-btn icon @click="tutupDialog"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <br />
          <v-card-text>
            <Editor ref="ref_editor_custom" @updatecontent="updatecontent" />
            <br />
            <v-switch v-model="isEditFile" inset label="Edit File ?"></v-switch>
            <br />
            <v-row v-if="isEditFile != true">
              <v-col
                v-for="(dl, index) in lampiranExist"
                :key="index"
                cols="12"
                md="12"
                sm="12"
              >
                <CardFile
                  :nama-file="dl.pathFile"
                  :path="dl.pathFile"
                  icon="mdi-download"
                  :hover="false"
                  @aksiicon="downloadFile"
                />
              </v-col>
            </v-row>

            <v-col
              v-show="isEditFile"
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
              <div v-for="(l, index) in lampiranEdit" :key="index">
                <v-row v-if="l.mode == 'DB' && l.status == '1'">
                  <v-col cols="12" md="9">
                    <v-text-field
                      v-show="l.is_edit == false"
                      v-model="l.original_name_mode_db"
                      :disabled="true"
                      prepend-inner-icon="mdi-attachment mdi-rotate-90"
                      outlined
                    >
                    </v-text-field>
                    <v-file-input
                      v-show="l.is_edit"
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
                  <v-col cols="12" md="3">
                    <v-btn
                      v-show="l.is_edit == false"
                      icon
                      color="orange"
                      style="margin-top: 5px"
                      @click="editLampiran(index)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      v-show="l.is_edit == false"
                      icon
                      color="red"
                      style="margin-top: 5px"
                      @click="hapusLampiran(index)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn
                      v-show="l.is_edit"
                      small
                      dark
                      color="black"
                      style="margin-top: 5px"
                      @click="batalEditLampiran(index)"
                    >
                      <v-icon left>mdi-close-circle</v-icon> Batal
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row v-if="l.mode == 'FORM'">
                  <v-col cols="12" md="9">
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
                  <v-col cols="12" md="3">
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
      isEditFile: false,
      loadingSave: false,
      narasi: '',
      filenya: null,
      lampiran: [],
      forum: null,
      lampiranExist: [],
      lampiranEdit: [],
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

        this.$axios
          .$put('/forum', {
            narasi: this.narasi,
            lampiran: this.lampiranEdit,
            idForum: this.forum.id,
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
        this.lampiranEdit[i].file_base_64 = base64
        this.lampiranEdit[i].extensi_file = ext[ext.length - 1]
        this.lampiranEdit[i].original_name = ext[0]
      }
    },
    tambahLampiran() {
      this.lampiranEdit.push({
        file: null,
        file_base_64: null,
        extensi_file: null,
        original_name: null,
        original_name_mode_db: null,
        is_baru: true,
        is_edit: false,
        status: '1',
        mode: 'FORM',
      })
    },
    hapusLampiran(i) {
      if (this.lampiranEdit[i].mode == 'DB') {
        this.lampiranEdit[i].status = '0'
      } else if (this.lampiranEdit[i].mode == 'FORM') {
        this.lampiranEdit.splice(i, 1)
      }
      this.$forceUpdate()
    },
    editLampiran(i) {
      this.lampiranEdit[i].is_edit = true
      this.$forceUpdate()
    },
    batalEditLampiran(i) {
      this.lampiranEdit[i].is_edit = false
      this.$forceUpdate()
    },

    assignDialog(datanya) {
      this.dialog = true
      this.forum = datanya
      this.lampiranExist = datanya.lampiran
      this.lampiranEdit = []
      for (let index = 0; index < this.lampiranExist.length; index++) {
        const element = this.lampiranExist[index]
        element.is_baru = false
        element.is_edit = false
        element.status = '1'
        element.mode = 'DB'
        element.file = null
        element.file_base_64 = null
        element.extensi_file = null
        element.original_name = null
        element.original_name_mode_db = this.getNamaFile(element.pathFile)
        this.lampiranEdit.push(element)
      }
      const self = this
      setTimeout(() => {
        self.$refs.ref_editor_custom.assignContent(this.forum.narasi)
      }, 1000)
    },
    downloadFile(v) {
      this.downloadFileEthol(v.path)
    },
  },
}
</script>
