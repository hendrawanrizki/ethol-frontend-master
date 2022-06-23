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
          <v-toolbar-title>Detail Tugas</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div style="padding: 15px">
          <v-card outlined>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6" sm="12">
                  <table class="noborder" width="100%">
                    <tr>
                      <th>Judul</th>
                      <td width="2%">:</td>
                      <td>{{ tugasDetail.title }}</td>
                    </tr>
                    <tr>
                      <th>Deskripsi</th>
                      <td width="2%">:</td>
                      <td>{{ tugasDetail.description }}</td>
                    </tr>
                  </table>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <table class="noborder">
                    <tr>
                      <th>Batas Waktu</th>
                      <td>:</td>
                      <td>{{ tugasDetail.deadline_indonesia }}</td>
                    </tr>
                    <tr>
                      <th>Lampiran</th>
                      <td>:</td>
                      <td>
                        <v-row>
                          <v-col
                            v-for="(t, index) in tugasDetail.file"
                            :key="index"
                            cols="12"
                          >
                            <CardFile
                              :nama-file="t.path"
                              :path="t.path"
                              icon="mdi-download"
                              @aksiicon="downloadFileTugasDosen"
                            />
                          </v-col>
                        </v-row>
                      </td>
                    </tr>
                  </table>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <br />
          <v-card outlined>
            <v-card-title>
              Daftar Pengumpulan Tugas
              <v-spacer></v-spacer>

              <v-btn
                small
                color="indigo"
                class="text-none"
                style="color: white"
                :disabled="listDataPekerjaanMahasiswa.length == 0 || loadingZip"
                :loading="loadingZip"
                @click="fnDownloadZip()"
              >
                <v-icon left size="18">mdi-zip-box</v-icon>
                Download Semua File
              </v-btn>
              &nbsp;
              <v-btn
                small
                color="success"
                class="text-none"
                :disabled="listDataPekerjaanMahasiswa.length == 0"
                @click="fnDownloadExcel()"
              >
                <v-icon left size="18">mdi-file-excel-box</v-icon>
                Download Rekap Excel
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-data-table
                :headers="[
                  {
                    text: 'NRP',
                    value: 'student_nrp',
                    sortable: true,
                    class: 'ethol-th-table',
                    width: '15%',
                  },
                  {
                    text: 'Nama Mahasiswa',
                    value: 'mahasiswanya',
                    sortable: true,
                    class: 'ethol-th-table',
                    width: '35%',
                  },
                  {
                    text: 'Waktu Pengumpulan',
                    value: 'created_indonesia',
                    sortable: true,
                    class: 'ethol-th-table',
                    width: '20%',
                  },
                  {
                    text: 'Nilai',
                    value: 'grade',
                    align: 'right',
                    sortable: true,
                    class: 'ethol-th-table',
                    width: '10%',
                  },
                  {
                    text: 'Opsi',
                    value: 'opsi',
                    sortable: true,
                    class: 'ethol-th-table',
                    align: 'center',
                  },
                  {
                    text: 'filter nama mahasiswa',
                    value: 'student_name',
                    align: ' d-none',
                  },
                ]"
                :items="listDataPekerjaanMahasiswa"
                :items-per-page="10"
                class="elevation-1"
                :loading="loading"
                :search="search"
                loading-text="Loading... Tunggu Sebentar"
              >
                <template #[`item.mahasiswanya`]="{ item }">
                  <span v-if="item.status_tugas == '2'">
                    {{ item.student_name }} &nbsp;
                    <v-chip
                      style="float: right"
                      small
                      color="pink"
                      label
                      text-color="white"
                    >
                      Terlambat
                    </v-chip>
                  </span>
                  <span v-else-if="item.status_tugas == '1'">
                    {{ item.student_name }}
                  </span>
                </template>
                <template #[`item.opsi`]="{ item }">
                  <v-btn
                    small
                    color="primary"
                    class="text-none"
                    @click="downloadTugasMahasiswa(item)"
                  >
                    <v-icon small>mdi-cloud-download</v-icon> &nbsp;
                    <span>Download</span>
                  </v-btn>

                  <v-btn
                    v-if="item.grade == 0 || item.grade == null"
                    color="success"
                    small
                    class="text-none"
                    @click="beriNilai(item)"
                  >
                    <v-icon small>mdi-check-circle-outline</v-icon> &nbsp;
                    <span>Beri Nilai</span>
                  </v-btn>
                  <v-btn
                    v-else
                    color="orange"
                    small
                    class="text-none"
                    style="color: white"
                    @click="editNilai(item)"
                  >
                    <v-icon small>mdi-check-circle-outline</v-icon> &nbsp;
                    <span>Edit Nilai</span>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </div>
      </v-card>
    </v-dialog>
    <DialogSubmitNilai
      :mode="modeFormSubmitNilai"
      :dialog="dialogSubmitNilai"
      :item-data="jawabanDetail"
      :tugas-detail="tugasDetail"
      :nomor-tugas-mahasiswa="nomor_tugas_mahasiswa"
      @tutup="dialogSubmitNilai = false"
      @refresh="getPekerjaanMahasiswa"
    ></DialogSubmitNilai>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
import XLSX from 'xlsx'
import CardFile from '@/components/card/card-file.vue'
import DialogSubmitNilai from '@/components/kuliah/tugas/dialog-submit-nilai.vue'
import teks from '~/mixins/teks'
import file from '~/mixins/file'
import validasi from '~/mixins/validasi'
const moment = require('moment')
moment.locale('id')
export default {
  components: {
    CardFile,
    DialogSubmitNilai,
  },
  mixins: [teks, file, validasi],
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    tugas: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialogTugas: false,
      tugasDetail: {},
      idTugas: 0,
      loading: true,
      search: '',
      listDataPekerjaanMahasiswa: [],
      modeFormSubmitNilai: '',
      dialogSubmitNilai: false,
      jawabanDetail: {},
      nomor_tugas_mahasiswa: 0,
      loadingZip: false,
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
        this.listDataPekerjaanMahasiswa = []
      } else {
        this.getPekerjaanMahasiswa()
      }
    },
    materi(v) {
      this.olahFile(v)
    },
    tugas(v) {
      this.idTugas = v.id
      this.tugasDetail = v
      this.getPekerjaanMahasiswa()
    },
  },
  methods: {
    getPekerjaanMahasiswa() {
      this.loading = true
      this.$axios
        .get('/tugas/pekerjaan-mahasiswa', {
          params: {
            id_tugas: this.idTugas,
          },
        })
        .then((res) => {
          this.loading = false
          this.listDataPekerjaanMahasiswa = []
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index]
            const deadlineTime = moment(this.tugas.deadline)
            const assignmentTime = moment(element.created)
            const cekSelisih = deadlineTime.diff(assignmentTime, 'minutes')
            element.status_tugas = ''
            element.class_td = ''
            if (cekSelisih < 0) {
              element.status_tugas = '2'
            } else {
              element.status_tugas = '1'
            }
            this.listDataPekerjaanMahasiswa.push(element)
          }
        })
    },
    downloadTugasMahasiswa(v) {
      this.downloadFileEthol(v.file)
    },
    downloadFileTugasDosen(v) {
      this.downloadFileEthol(v.path)
    },
    beriNilai(item) {
      this.nomor_tugas_mahasiswa = item.id
      this.modeFormSubmitNilai = 'beri'
      this.dialogSubmitNilai = true
      this.jawabanDetail = item
    },
    editNilai(item) {
      this.nomor_tugas_mahasiswa = item.id
      this.modeFormSubmitNilai = 'edit'
      this.dialogSubmitNilai = true
      this.jawabanDetail = item
    },
    async fnDownloadZip() {
      const urlFile = []
      for (
        let index = 0;
        index < this.listDataPekerjaanMahasiswa.length;
        index++
      ) {
        const element = this.listDataPekerjaanMahasiswa[index]
        urlFile.push(element.file)
      }
      this.loadingZip = true
      await this.downloadZip(urlFile, 'ETHOL_' + this.tugasDetail.title)
      this.loadingZip = false
    },
    fnDownloadExcel() {
      const daftarExport = [
        [
          'NO',
          'NRP',
          'Nama',
          'Tgl Pengumpulan',
          'Catatan Mahasiswa',
          'File',
          'Status',
          'Nilai',
          'Catatan Dosen',
          'Tanggal Koreksi',
        ],
      ]

      for (
        let index = 0;
        index < this.listDataPekerjaanMahasiswa.length;
        index++
      ) {
        const ldpm = this.listDataPekerjaanMahasiswa[index]
        let statusTugas = ''
        if (ldpm.status_tugas == '2') {
          statusTugas = 'Terlambat'
        } else if (ldpm.status_tugas == '1') {
          statusTugas = 'Tepat Waktu'
        } else {
          statusTugas = '-'
        }
        daftarExport.push([
          index + 1,
          ldpm.student_nrp,
          ldpm.student_name,
          ldpm.created,
          ldpm.student_note,
          this.getNamaFile(ldpm.file),
          statusTugas,
          ldpm.grade,
          ldpm.lecturer_note,
          ldpm.correction_date,
        ])
      }
      const ws = XLSX.utils.aoa_to_sheet(daftarExport)

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, '')
      XLSX.writeFile(wb, 'ETHOL_' + `${this.tugasDetail.title}.xlsx`)
    },
  },
}
</script>
<style lang="css" scoped>
.noborder,
.noborder tr,
.noborder th,
.noborder td {
  border: none !important;
  text-align: left;
  padding: 5px;
}
</style>
