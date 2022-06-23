<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogTugas"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary" style="box-shadow: none !important">
          <v-btn icon dark @click="dialogTugas = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title
            >Detail Tugas
            <span v-if="namaMatakuliah != ''">
              &nbsp; : {{ namaMatakuliah }}
            </span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div style="padding: 20px">
          <v-row>
            <v-col cols="12" sm="12" md="8">
              <v-card outlined>
                <v-card-title>
                  <h2>{{ tugasDetail.title }}</h2>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <h4>Deskripsi :</h4>
                  <p
                    style="text-align: justify; color: #848484; font-size: 12pt"
                  >
                    {{ tugasDetail.description }}
                  </p>
                  <br />

                  <h4>Batas Waktu :</h4>
                  <p
                    style="text-align: justify; color: #848484; font-size: 11pt"
                  >
                    {{ tugasDetail.deadline_indonesia }}
                  </p>
                  <br />
                  <h4>Mengumpulkan :</h4>
                  <p
                    style="text-align: justify; color: #848484; font-size: 11pt"
                  >
                    {{
                      tugasDetail.submission_time_indonesia == null
                        ? '-'
                        : tugasDetail.submission_time_indonesia
                    }}
                  </p>
                  <br />
                  <h4>Lampiran :</h4>
                  <br />
                  <v-row>
                    <v-col
                      v-for="(t, index) in tugasDetail.file"
                      :key="index"
                      cols="12"
                      md="6"
                    >
                      <CardFile
                        :nama-file="t.path"
                        :path="t.path"
                        icon="mdi-download"
                        @aksiicon="downloadFileTugas"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-card style="border-radius: 10px">
                <v-card-title>
                  Tugas Anda
                  <v-spacer></v-spacer>
                  <span
                    v-if="tugasDetail.status_pengumpulan == 1"
                    class="subtitle-1 green--text"
                  >
                    <small> Mengumpulkan </small>
                  </span>
                  <span
                    v-else-if="tugasDetail.status_pengumpulan == 2"
                    class="subtitle-1 orange--text text--darken-1"
                  >
                    <small>Mengumpulkan Terlambat </small>
                  </span>
                  <span
                    v-else-if="tugasDetail.status_pengumpulan == 0"
                    class="subtitle-1 error--text"
                  >
                    <small> Belum mengumpulkan </small>
                  </span>
                </v-card-title>
                <v-card-text v-if="tugasDetail.status_pengumpulan == 0">
                  <br />
                  <p>Anda belum mengerjakan tugas !</p>
                </v-card-text>
                <v-card-text
                  v-else-if="
                    tugasDetail.status_pengumpulan == 1 ||
                    tugasDetail.status_pengumpulan == 2
                  "
                >
                  <small>Catatan : </small>
                  <br />
                  <p>
                    {{
                      tugasDetail.student_note != null &&
                      tugasDetail.student_note != ''
                        ? tugasDetail.student_note
                        : '-'
                    }}
                  </p>
                  <small>Lampiran : </small>
                  <CardFile
                    v-if="
                      tugasDetail.submission_file != null &&
                      tugasDetail.submission_file != ''
                    "
                    :nama-file="tugasDetail.submission_file"
                    :path="tugasDetail.submission_file"
                    icon="mdi-download"
                    @aksiicon="downloadFileTugas"
                  />
                  <div
                    v-if="
                      tugasDetail.correction_date != null &&
                      tugasDetail.correction_date != ''
                    "
                  >
                    <br />
                    <v-divider></v-divider>
                    <br />
                    <small>Catatan Dosen : </small>
                    <br />
                    <p>
                      {{
                        tugasDetail.lecturer_note != null &&
                        tugasDetail.lecturer_note != ''
                          ? tugasDetail.lecturer_note
                          : '-'
                      }}
                    </p>
                    <small>Tanggal Koreksi : </small>
                    <br />
                    <p>
                      {{
                        tugasDetail.correction_date != null &&
                        tugasDetail.correction_date != ''
                          ? tugasDetail.correction_date_indonesia
                          : '-'
                      }}
                    </p>
                    <small>Nilai : </small>
                    <br />
                    <p>
                      {{
                        tugasDetail.grade != null && tugasDetail.grade != ''
                          ? tugasDetail.grade
                          : '-'
                      }}
                    </p>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    v-if="tugasDetail.status_pengumpulan == 0"
                    block
                    color="primary"
                    @click="submitTugas"
                  >
                    Submit Tugas
                  </v-btn>
                  <v-btn
                    v-else
                    block
                    color="orange"
                    :disabled="tugasDetail.grade != null"
                    style="color: white"
                    @click="editTugas"
                  >
                    Edit Tugas
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
    <DialogSubmitTugas
      :mode="modeFormSubmitTugas"
      :dialog="dialogUpSubmitTugas"
      :item-data="tugasDetail"
      :id-tugas="idTugas"
      @tutup="dialogUpSubmitTugas = false"
      @refresh="refreshJawaban"
    ></DialogSubmitTugas>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
import CardFile from '@/components/card/card-file.vue'
import DialogSubmitTugas from '@/components/kuliah/tugas/dialog-submit-tugas.vue'
import teks from '~/mixins/teks'
import file from '~/mixins/file'
const moment = require('moment')
moment.locale('id')
export default {
  components: {
    CardFile,
    DialogSubmitTugas,
  },
  mixins: [teks, file],
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    tugas: {
      type: Object,
      required: true,
    },
    namaMatakuliah: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialogTugas: false,

      modeFormSubmitTugas: 'tambah',
      dialogUpSubmitTugas: false,
      tugasDetail: {},
      idTugas: 0,
      loading: true,
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
      this.dialogTugas = v
    },
    dialogTugas(v) {
      if (v == false) {
        this.$emit('tutup', v)
      }
    },
    tugas(v) {
      this.idTugas = v.id
      this.tugasDetail = v
    },
  },
  mounted() {},
  methods: {
    downloadFileTugas(v) {
      this.downloadFileEthol(v.path)
    },
    submitTugas() {
      this.modeFormSubmitTugas = 'tambah'
      this.dialogUpSubmitTugas = true
    },
    editTugas() {
      this.modeFormSubmitTugas = 'edit'
      this.dialogUpSubmitTugas = true
    },
    refreshJawaban() {
      this.loading = true
      this.$axios
        .get('/tugas/jawaban-mahasiswa-by-id', {
          params: {
            id_tugas: this.idTugas,
          },
        })
        .then((res) => {
          this.loading = false
          if (res.data.success == true) {
            this.tugasDetail.submission_file = res.data.submission_file
            this.tugasDetail.submission_time = res.data.submission_time
            this.tugasDetail.submission_time_indonesia =
              res.data.submission_time_indonesia
            this.tugasDetail.student_note = res.data.student_note
            this.tugasDetail.nomor_tugas_file_mahasiswa =
              res.data.nomor_tugas_file_mahasiswa
            this.tugasDetail.nomor_tugas_mahasiswa =
              res.data.nomor_tugas_mahasiswa

            const deadlineTime = moment(res.data.deadline)
            const assignmentTime = moment(res.data.submission_time)
            const cekSelisih = deadlineTime.diff(assignmentTime, 'minutes')
            if (cekSelisih < 0) {
              this.tugasDetail.status_pengumpulan = 2 // mengumpulkan terlambat
            } else {
              this.tugasDetail.status_pengumpulan = 1 // mengumpulkan
            }
            this.$forceUpdate()
            this.$emit('updatejawaban')
          }
        })
    },
  },
}
</script>
<style scoped></style>
