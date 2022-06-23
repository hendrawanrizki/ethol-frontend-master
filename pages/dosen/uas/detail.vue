<template>
  <v-container>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      rounded
      color="blue accent-2"
    ></v-progress-linear>
    <v-alert
      v-show="
        soalDitemukan == true && alertSelesai == false && alertBerjalan == false
      "
      outlined
      type="info"
      text
    >
      Ujian untuk matakuliah ini belum dimulai
    </v-alert>
    <v-alert v-show="soalDitemukan == false" outlined type="info" text>
      Soal ujian tidak ditemukan untuk matakuliah ini !
    </v-alert>
    <v-alert v-show="alertBerjalan" outlined type="info" text>
      Sesi ujian untuk matakuliah ini sedang berjalan, Mohon untuk membuka
      presensi ujian bila Bapak/Ibu belum membuka presensi ujian.
    </v-alert>
    <v-alert v-show="alertSelesai" outlined type="info" text>
      Sesi ujian untuk matakuliah ini telah berakhir !
    </v-alert>
    <CardHeaderDetailUjian
      ref="ref_card_header_detail_ujian"
      @statusujian="infoUjian"
    />
    <br />
    <v-card outlined>
      <v-card-title>
        Daftar Pengumpulan Ujian
        <v-spacer></v-spacer>

        <v-btn
          small
          outlined
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
          outlined
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
        <v-text-field
          v-model="search"
          outlined
          label="Cari . . "
          placeholder="Silakan ketikkan keyword pencarian . . ."
          prepend-inner-icon="mdi-magnify"
        >
        </v-text-field>
        <v-data-table
          :headers="[
            {
              text: 'NRP',
              value: 'nrp',
              sortable: true,
              class: 'ethol-th-table',
              width: '10%',
            },
            {
              text: 'Nama',
              value: 'mahasiswanya',
              sortable: true,
              class: 'ethol-th-table',
              width: '33%',
            },
            {
              text: 'Waktu Pengumpulan',
              value: 'tgl_upload_indonesia',
              sortable: true,
              class: 'ethol-th-table',
              width: '20%',
            },
            {
              text: 'Nilai',
              value: 'nilai',
              align: 'right',
              sortable: true,
              class: 'ethol-th-table',
              width: '7%',
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
              value: 'nama',
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
            <span v-if="item.status_ujian == '2'">
              {{ item.nama }} &nbsp;
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
            <span v-else-if="item.status_ujian == '1'">
              {{ item.nama }}
            </span>
          </template>
          <template #[`item.opsi`]="{ item }">
            <v-btn
              small
              color="primary"
              class="text-none"
              outlined
              @click="downloadTugasMahasiswa(item)"
            >
              <v-icon small>mdi-cloud-download</v-icon> &nbsp;
              <span>Download</span>
            </v-btn>

            <v-btn
              v-if="item.nilai == 0 || item.nilai == null"
              color="success"
              small
              class="text-none"
              outlined
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
              outlined
              @click="editNilai(item)"
            >
              <v-icon small>mdi-check-circle-outline</v-icon> &nbsp;
              <span>Edit Nilai</span>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <DialogSubmitNilaiUjian
      :mode="modeFormSubmitNilai"
      :dialog="dialogSubmitNilai"
      :item-data="jawabanDetail"
      :nomor-ujian-mahasiswa="nomor_ujian_mahasiswa"
      @tutup="dialogSubmitNilai = false"
      @refresh="getHasilPekerjaanMhs"
    ></DialogSubmitNilaiUjian>
  </v-container>
</template>
<script>
import DialogSubmitNilaiUjian from '@/components/ujian/dialog-submit-nilai-ujian.vue'
import CardHeaderDetailUjian from '@/components/ujian/card-header-detail-ujian.vue'
import { mapState } from 'vuex'
import XLSX from 'xlsx'
import teks from '~/mixins/teks'
import file from '~/mixins/file'
import validasi from '~/mixins/validasi'
const moment = require('moment')
moment.locale('id')
export default {
  components: {
    CardHeaderDetailUjian,
    DialogSubmitNilaiUjian,
  },
  mixins: [teks, file, validasi],
  middleware: ['auth', 'dosen'],
  data() {
    return {
      listDataPekerjaanMahasiswa: [],
      loading: false,
      search: '',
      loadingZip: false,

      nomor_ujian_mahasiswa: 0,
      modeFormSubmitNilai: '',
      dialogSubmitNilai: false,
      jawabanDetail: {},

      alertSelesai: false,
      alertBerjalan: false,
      soalDitemukan: false,
    }
  },
  computed: {
    ...mapState({
      ujian: (state) => state.modules.ujian.ujianDosen,
    }),
  },
  mounted() {
    this.$refs.ref_card_header_detail_ujian.assignDataUjian(this.ujian)
    this.getHasilPekerjaanMhs()
  },
  methods: {
    infoUjian(v) {
      if (v.urlSoal == null || v.urlSoal == '') {
        this.soalDitemukan = false
        this.alertBerjalan = false
        this.alertSelesai = false
      } else if (v.running == true && (v.urlSoal != null || v.urlSoal != '')) {
        this.alertBerjalan = true
        this.alertSelesai = false
        this.soalDitemukan = true
      } else if (v.isDone == true && (v.urlSoal != null || v.urlSoal != '')) {
        this.alertBerjalan = false
        this.alertSelesai = true
        this.soalDitemukan = true
      } else {
        this.alertBerjalan = false
        this.alertSelesai = false
        this.soalDitemukan = true
      }
    },
    downloadTugasMahasiswa(v) {
      this.downloadFileEthol(v.url_jawaban)
    },
    getHasilPekerjaanMhs() {
      this.loading = true
      const nomorUjian = this.ujian.ujian.nomor
      this.$axios
        .get('/ujian/hasil-ujian', {
          params: {
            nomor: nomorUjian,
          },
        })
        .then((res) => {
          this.loading = false

          this.listDataPekerjaanMahasiswa = []
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index]
            const deadlineTime = moment(this.ujian.ujian.selesai)
            const assignmentTime = moment(element.tgl_upload)
            const cekSelisih = deadlineTime.diff(assignmentTime, 'minutes')
            element.status_ujian = ''
            if (cekSelisih < 0) {
              element.status_ujian = '2'
            } else {
              element.status_ujian = '1'
            }
            this.listDataPekerjaanMahasiswa.push(element)
          }
        })
        .finally(() => (this.loading = false))
    },
    async fnDownloadZip() {
      const urlFile = []
      for (
        let index = 0;
        index < this.listDataPekerjaanMahasiswa.length;
        index++
      ) {
        const element = this.listDataPekerjaanMahasiswa[index]
        urlFile.push(element.url_jawaban)
      }
      this.loadingZip = true
      await this.downloadZip(urlFile, 'UAS_' + this.ujian.matakuliah.nama)
      this.loadingZip = false
    },
    fnDownloadExcel() {
      const daftarExport = [
        [
          'NO',
          'NRP',
          'Nama',
          'Tgl Pengumpulan',
          'File',
          'Status',
          'Tanggal Koreksi',
          'Nilai',
        ],
      ]

      for (
        let index = 0;
        index < this.listDataPekerjaanMahasiswa.length;
        index++
      ) {
        const ldpm = this.listDataPekerjaanMahasiswa[index]
        let statusUjian = '-'
        if (ldpm.status_ujian == '2') {
          statusUjian = 'Terlambat'
        } else {
          statusUjian = 'Tepat Waktu'
        }
        daftarExport.push([
          index + 1,
          ldpm.nrp,
          ldpm.nama,
          ldpm.tgl_upload,
          this.getNamaFile(ldpm.url_jawaban),
          ldpm.nilai,
          ldpm.tgl_dinilai,
          statusUjian,
        ])
      }
      const ws = XLSX.utils.aoa_to_sheet(daftarExport)

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, '')
      XLSX.writeFile(wb, 'UAS_' + `${this.ujian.matakuliah.nama}.xlsx`)
    },
    beriNilai(item) {
      this.nomor_ujian_mahasiswa = item.nomor
      this.modeFormSubmitNilai = 'beri'
      this.dialogSubmitNilai = true
      this.jawabanDetail = item
    },
    editNilai(item) {
      this.nomor_ujian_mahasiswa = item.nomor
      this.modeFormSubmitNilai = 'edit'
      this.dialogSubmitNilai = true
      this.jawabanDetail = item
    },
  },
}
</script>
