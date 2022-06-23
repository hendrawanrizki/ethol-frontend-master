<template>
  <v-container>
    <v-card outlined>
      <v-card-title>
        Rekap Nilai UTS
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
      <v-card-subtitle>
        {{ kuliah.matakuliah ? kuliah.matakuliah.nama : '' }}
        -
        {{ kuliah.kelas }} Kelas {{ kuliah.pararel }}
      </v-card-subtitle>
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
              width: '15%',
            },
            {
              text: 'Nama',
              value: 'nama',
              sortable: true,
              class: 'ethol-th-table',
              width: '25%',
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
              width: '10%',
            },
            {
              text: 'Opsi',
              value: 'opsi',
              sortable: true,
              class: 'ethol-th-table',
              align: 'center',
            },
          ]"
          :items="listDataPekerjaanMahasiswa"
          :items-per-page="10"
          class="elevation-1"
          :loading="loading"
          :search="search"
          loading-text="Loading... Tunggu Sebentar"
        >
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
import XLSX from 'xlsx'
import { mapState } from 'vuex'
import teks from '~/mixins/teks'
import file from '~/mixins/file'
import validasi from '~/mixins/validasi'
export default {
  components: {
    DialogSubmitNilaiUjian,
  },
  mixins: [teks, file, validasi],
  layout: 'kuliah',
  middleware: ['auth', 'dosen'],
  transition: 'slide-bottom',
  data() {
    return {
      listDataPekerjaanMahasiswa: [],
      loading: false,
      search: '',
      loadingZip: false,
      nomorUjian: 0,
      nomor_ujian_mahasiswa: 0,
      modeFormSubmitNilai: '',
      dialogSubmitNilai: false,
      jawabanDetail: {},
    }
  },
  computed: {
    ...mapState({
      kuliah: (state) => state.modules.kuliah.kuliahDosen,
      user: (state) => state.user,
    }),
  },
  mounted() {
    this.detailUjian()
  },
  methods: {
    async detailUjian() {
      this.loading = true
      await this.$axios
        .get('/ujian/detail-ujian', {
          params: {
            jenis: 1,
            kuliah: this.kuliah.nomor,
            jenisSchema: this.kuliah.jenisSchema,
          },
        })
        .then(async (res) => {
          if (res.data.length != 0) {
            const dataUjianDetail = res.data
            this.nomorUjian = dataUjianDetail.nomor
            await this.getHasilPekerjaanMhs()
          }
        })
        .finally(() => (this.loading = false))
    },
    downloadTugasMahasiswa(v) {
      this.downloadFileEthol(v.url_jawaban)
    },
    getHasilPekerjaanMhs() {
      this.loading = true
      const nomorUjian = this.nomorUjian
      this.$axios
        .get('/ujian/hasil-ujian', {
          params: {
            nomor: nomorUjian,
          },
        })
        .then((res) => {
          this.loading = false
          this.listDataPekerjaanMahasiswa = res.data
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
      await this.downloadZip(urlFile, 'UTS_' + this.kuliah.matakuliah.nama)
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
          'Nilai',
          'Tanggal Koreksi',
        ],
      ]

      for (
        let index = 0;
        index < this.listDataPekerjaanMahasiswa.length;
        index++
      ) {
        const ldpm = this.listDataPekerjaanMahasiswa[index]
        daftarExport.push([
          index + 1,
          ldpm.nrp,
          ldpm.nama,
          ldpm.tgl_upload,
          this.getNamaFile(ldpm.url_jawaban),
          ldpm.nilai,
          ldpm.tgl_dinilai,
        ])
      }
      const ws = XLSX.utils.aoa_to_sheet(daftarExport)

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, '')
      XLSX.writeFile(wb, 'UTS_' + `${this.kuliah.matakuliah.nama}.xlsx`)
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
