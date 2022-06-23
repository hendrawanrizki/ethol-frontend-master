<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogVideo"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="tutupDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Preview Materi</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="box-card-materi">
          <div class="left-thing-materi">
            <v-list-item v-if="showMatkul" two-line style="padding-left: 4px">
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
            <v-divider></v-divider>
            <v-list-item two-line style="padding-left: 4px">
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon left>mdi-chevron-right</v-icon>
                  Video
                </v-list-item-title>
                <v-list-item-subtitle
                  style="padding-left: 35px; padding-top: 5px"
                >
                  {{ judul }}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  style="padding-left: 35px; padding-top: 5px"
                >
                  <small
                    >url : <a :href="url" target="_blank">{{ url }}</a></small
                  >
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
          <div class="right-thing-materi">
            <v-card outlined style="min-height: 100vh">
              <v-toolbar style="box-shadow: none !important">
                <v-toolbar-title style="font-size: 17px">
                  {{ judul }}
                </v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <youtube
                  v-if="url.includes('youtube')"
                  ref="youtube"
                  :video-id="youtubeId"
                  width="100%"
                  height="600"
                />
                <video
                  v-else-if="url.includes('drive.google')"
                  width="100%"
                  height="600"
                  controls
                >
                  <source :src="driveUrl" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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
    videoKuliah: {
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
  },
  data() {
    return {
      dialogVideo: false,
      namaMatkul: '',
      judul: '',
      url: '',
      youtubeId: '',
      driveId: '',
      driveUrl: '',
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
      this.dialogVideo = v
      this.$forceUpdate()
    },
    dialogVideo(v) {
      if (v == false) {
        this.$emit('tutup', v)
      }
    },
    videoKuliah(v) {
      this.olahFile(v)
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
    tutupDialog() {
      this.judul = ''
      this.url = ''
      this.youtubeId = ''
      this.driveId = ''
      this.driveUrl = ''
      this.dialogVideo = false
    },
    olahFile(v) {
      this.$nextTick(() => {
        this.judul = v.judul
        this.url = v.url
        this.youtubeId = v.youtubeId
        this.driveId = v.driveId

        if (this.url.includes('drive.google')) {
          this.driveUrl =
            'https://drive.google.com/uc?export=download&id=' + this.driveId
        }
        this.$forceUpdate()
      })
    },
  },
}
</script>
<style scoped>
.video-player-wrapper {
  width: 80vw;
  height: 80vh;
}
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
