<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogMateri"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialogMateri = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Preview Materi</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="box-card-materi">
          <div class="left-thing-materi">
            <v-list-item v-show="showMatkul" two-line style="padding-left: 4px">
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon left>mdi-chevron-right</v-icon>
                  Matakuliah
                </v-list-item-title>
                <v-list-item-subtitle
                  style="padding-left: 35px; padding-top: 5px"
                >
                  {{ namaMatkul }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-show="showMatkul"></v-divider>
            <v-list-item two-line style="padding-left: 4px">
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon left>mdi-chevron-right</v-icon>
                  Materi
                </v-list-item-title>
                <v-list-item-subtitle
                  style="padding-left: 35px; padding-top: 5px"
                >
                  {{ materi.title }}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  style="padding-left: 35px; padding-top: 5px"
                >
                  <small>diupload pada {{ materi.created_indonesia }}</small>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
          <div class="right-thing-materi">
            <v-card outlined style="min-height: 100vh">
              <v-toolbar style="box-shadow: none !important">
                <v-toolbar-title style="font-size: 17px">
                  {{ getNamaFile(materi.path) }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  class="primary"
                  @click="downloadFileEthol(materi.path)"
                >
                  <v-icon small left>mdi-download</v-icon> Download</v-btn
                >
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <img
                  v-if="mode == 'gambar'"
                  :src="url_file"
                  style="width: 100%; height: auto"
                />
                <iframe
                  v-else-if="mode == 'dokumen'"
                  :src="url_file"
                  style="width: 100%; height: 720px; border: none"
                ></iframe>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
import teks from '~/mixins/teks'
import file from '~/mixins/file'
export default {
  mixins: [teks, file],
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    materi: {
      type: Object,
      required: true,
    },
    showMatkul: {
      type: Boolean,
      required: false,
      default: () => {
        return true
      },
    },
    namaMatkulProp: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      dialogMateri: false,
      namaMatkul: '',
      mode: '',
      url_file: '',
    }
  },
  computed: {
    ...mapState({
      kuliahDosen: (state) => state.modules.kuliah.kuliahDosen,
      kuliahMahasiswa: (state) => state.modules.kuliah.kuliahMahasiswa,
      user: (state) => state.user,
      auth: (state) => state.auth,
    }),
  },
  watch: {
    dialog(v) {
      this.dialogMateri = v
    },
    dialogMateri(v) {
      if (v == false) {
        this.$emit('tutup', v)
      }
    },
    materi(v) {
      this.olahFile(v)
    },
    namaMatkulProp(v) {
      if (v != '') {
        this.namaMatkul = v
      }
    },
  },
  mounted() {
    if (this.auth.hakAktif == 'dosen') {
      if (
        Object.keys(this.kuliahDosen).length === 0 &&
        this.kuliahDosen.constructor === Object
      ) {
        console.log('empty')
      } else {
        this.namaMatkul = this.kuliahDosen.matakuliah.nama
      }
    } else if (this.auth.hakAktif == 'mahasiswa') {
      if (
        Object.keys(this.kuliahMahasiswa).length === 0 &&
        this.kuliahMahasiswa.constructor === Object
      ) {
        console.log('empty')
      } else {
        this.namaMatkul = this.kuliahMahasiswa.matakuliah.nama
      }
    }
  },
  methods: {
    olahFile(v) {
      const extensiFile = this.getExtensiFile(v.path)
      this.extensi_file = extensiFile
      if (
        extensiFile == 'jpg' ||
        extensiFile == 'jpeg' ||
        extensiFile == 'png' ||
        extensiFile == 'gif' ||
        extensiFile == 'webp'
      ) {
        this.mode = 'gambar'
        this.url_file = v.path
      } else if (extensiFile == 'pdf') {
        this.mode = 'dokumen'
        this.url_file = v.path
      } else if (
        extensiFile == 'docx' ||
        extensiFile == 'doc' ||
        extensiFile == 'xlsx' ||
        extensiFile == 'xls' ||
        extensiFile == 'ppt' ||
        extensiFile == 'pptx'
      ) {
        this.mode = 'dokumen'
        this.url_file = `https://docs.google.com/gview?url=${v.path}&embedded=true`
      }
    },
  },
}
</script>
<style scoped>
@media not all and (max-width: 40em) {
  .box-card-materi {
    -webkit-align-items: stretch;
    align-items: stretch;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-box-flex: 1;
    box-flex: 1;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    width: 100%;
    padding-right: 10px;
  }
}

@media not all and (max-width: 40em) {
  .left-thing-materi {
    border-right: 0.0625rem solid #e0e0e0;
    -webkit-box-flex: 1;
    box-flex: 1;
    -webkit-flex-grow: 0.7;
    flex-grow: 0.7;
    width: 30%;
  }
}

@media not all and (max-width: 40em) {
  .right-thing-materi {
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    padding: 1.5rem 0;
    padding-left: 10px;
    width: 70%;
    margin-top: -16px;
    padding-bottom: 9px;
  }
}
.featured-image {
  width: 160px;
  height: 210px;
}
.card-image {
  padding: 4px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  height: 700px;
  overflow-y: scroll;
}
.btn-desc:hover {
  background-color: #e4effa !important;
}
.btn-lamp:hover {
  background-color: #e4effa !important;
  padding-top: 10px;
}
</style>
