<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-alert v-if="detailPresensi.mode == 'admin-baak'" color="#98d1ff">
          Terdapat <b>{{ detailPresensi.jumlah }}</b> kali presensi dalam bulan
          {{ bulan }} {{ detailPresensi.tahun }}, silakan pilih tanggal untuk
          melihat daftar kehadiran mahasiswa
        </v-alert>
        <v-alert v-else-if="detailPresensi.mode == 'dosen'" color="#98d1ff">
          Terdapat <b>{{ detailPresensi.jumlah }}</b> kali presensi pada tahun
          ajaran {{ detailPresensi.tahunAjaran }} semester
          {{ detailPresensi.semester }}, silakan pilih tanggal untuk melihat
          daftar kehadiran mahasiswa
        </v-alert>
      </v-col>
    </v-row>
    <v-progress-linear
      v-show="loading"
      indeterminate
      color="primary"
    ></v-progress-linear>
    <v-card>
      <v-card-text>
        <br />
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="tanggalPresensi"
              :items="listTanggalPresensi"
              item-text="waktu_indonesia"
              item-value="key"
              outlined
              label="Tanggal Presensi"
              :rules="[(v) => !!v || 'Tanggal Presensi wajib dipilih']"
              @change="getAbsensiMahasiswa"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="text-right" style="margin-top: 20px">
              Jumlah Mahasiswa : {{ jumlahMahasiswa }}
            </h3>
          </v-col>
        </v-row>
        <br />
        <v-row>
          <v-col cols="12" md="6">
            <v-card outlined>
              <v-card-title>Hadir </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-text-field
                  v-model="searchMahasiswaHadir"
                  label="Cari"
                  outlined
                >
                </v-text-field>
                <v-data-table
                  :headers="[
                    {
                      text: 'Pukul',
                      value: 'pukul',
                      sortable: true,
                      width: '15%',
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'NRP',
                      value: 'nrp',
                      width: '15%',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'Nama',
                      value: 'nama',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'Jenis Kelamin',
                      value: 'jenis_kelamin',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                  ]"
                  :items="listDataMahasiswaHadir"
                  :items-per-page="10"
                  class="elevation-1"
                  :loading="loadingHadir"
                  :search="searchMahasiswaHadir"
                  loading-text="Loading... Tunggu Sebentar"
                ></v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card v-if="dosen" outlined>
              <v-card-title>Tidak Hadir </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-text-field
                  v-model="searchMahasiswaTidakHadir"
                  label="Cari"
                  outlined
                >
                </v-text-field>
                <v-data-table
                  :headers="[
                    {
                      text: 'NRP',
                      value: 'nrp',
                      width: '15%',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'Nama',
                      value: 'nama',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'Jenis Kelamin',
                      value: 'jenis_kelamin',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                  ]"
                  :items="listDataMahasiswaTidakHadir"
                  :items-per-page="10"
                  class="elevation-1"
                  :loading="loadingTidakHadir"
                  :search="searchMahasiswaTidakHadir"
                  loading-text="Loading... Tunggu Sebentar"
                >
                </v-data-table>
              </v-card-text>
            </v-card>
            <v-card v-if="baak || admin" outlined>
              <v-card-title>Tidak Hadir </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-text-field
                  v-model="searchMahasiswaTidakHadir"
                  label="Cari"
                  outlined
                >
                </v-text-field>
                <v-data-table
                  :headers="[
                    {
                      text: 'NRP',
                      value: 'nrp',
                      width: '15%',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'Nama',
                      value: 'nama',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'Jenis Kelamin',
                      value: 'jenis_kelamin',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'Opsi',
                      value: 'opsinya',
                      sortable: true,
                      class: 'ethol-th-table',
                      align: 'center',
                    },
                  ]"
                  :items="listDataMahasiswaTidakHadir"
                  :items-per-page="10"
                  class="elevation-1"
                  :loading="loadingTidakHadir"
                  :search="searchMahasiswaTidakHadir"
                  loading-text="Loading... Tunggu Sebentar"
                >
                  <template #[`item.opsinya`]="{ item }">
                    <div>
                      <v-btn
                        small
                        dark
                        color="orange"
                        class="text-none"
                        @click="fn_clickInputPresensi(item)"
                        ><span>Input Presensi</span></v-btn
                      >
                    </div>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <DialogInputPresensi
      :dialog="dialogPresensi"
      :mahasiswa="mahasiswaItem"
      :data-presensi="dataPresensiItem"
      @tutup="tutupDialogInputPresensi"
      @refresh="getAbsensiMahasiswa"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DialogInputPresensi from '@/components/presensi/dialog-input-presensi.vue'
import local from '~/service/local'
import waktu from '~/mixins/waktu'
export default {
  components: {
    DialogInputPresensi,
  },
  mixins: [waktu],
  data() {
    return {
      detailPresensi: {
        bulan: '',
        gelar_blk: '',
        gelar_dpn: '',
        jenis_schema: '',
        jumlah: '',
        kelas: '',
        kuliah: '',
        matakuliah: '',
        nama_dosen: '',
        nip_dosen: '',
        tahun: '',
        nomor_dosen: '',
        mode: '',
        tahunAjaran: null,
        semester: null,
      },
      loading: true,
      listTanggalPresensi: [],
      tanggalPresensi: null,
      jumlahMahasiswa: 0,
      listDataMahasiswaHadir: [],
      loadingHadir: false,
      searchMahasiswaHadir: '',
      searchMahasiswaTidakHadir: '',
      listDataMahasiswaTidakHadir: [],
      loadingTidakHadir: false,

      dialogPresensi: false,
      mahasiswaItem: {},
      dataPresensiItem: {},
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen']),
    bulan() {
      if (this.detailPresensi.bulan == '') {
        return '-'
      } else {
        return this.bulanIndonesia[parseInt(this.detailPresensi.bulan) - 1].text
      }
    },
  },
  mounted() {
    this.detailPresensi = local.getPresensi()
    if (this.detailPresensi.mode == 'admin-baak') {
      this.getTanggalPresensiDosenPerBulan()
    } else if (this.detailPresensi.mode == 'dosen') {
      this.getTanggalPresensiDosenPerSemester()
    }

    this.getJumlahMahasiswaPerKuliah()
  },
  methods: {
    fn_clickInputPresensi(item) {
      let tanggalAbsen = null
      let tanggalAbsenIndonesia = null

      for (let index = 0; index < this.listTanggalPresensi.length; index++) {
        const element = this.listTanggalPresensi[index]
        if (element.key == this.tanggalPresensi) {
          tanggalAbsen = element.waktu.substring(0, 10)
          tanggalAbsenIndonesia = element.waktu_indonesia
        }
      }

      let dataPresensiItem = {}
      dataPresensiItem = {
        dosen: this.detailPresensi.nama_dosen,
        kuliah: this.detailPresensi.kuliah,
        jenisSchema: this.detailPresensi.jenis_schema,
        matakuliah: this.detailPresensi.matakuliah,
        tanggalAbsen,
        tanggalAbsenIndonesia,
        keyPresensi: this.tanggalPresensi,
      }
      this.dataPresensiItem = dataPresensiItem

      this.mahasiswaItem = item

      this.dialogPresensi = true
    },
    tutupDialogInputPresensi() {
      this.dialogPresensi = false
      this.dataPresensiItem = {}
      this.mahasiswaItem = {}
    },
    getTanggalPresensiDosenPerBulan() {
      this.loading = true
      this.$axios
        .get('/presensi/get-tanggal-presensi-dosen-per-bulan', {
          params: {
            tahun: this.detailPresensi.tahun,
            bulan: this.detailPresensi.bulan,
            dosen: this.detailPresensi.nomor_dosen,
            kuliah: this.detailPresensi.kuliah,
          },
        })
        .then((res) => {
          this.loading = false
          this.listTanggalPresensi = res.data
          this.tanggalPresensi = res.data[0].key
          this.getAbsensiMahasiswa()
        })
    },
    getTanggalPresensiDosenPerSemester() {
      this.loading = true
      this.$axios
        .get('/presensi/get-tanggal-presensi-dosen-per-semester', {
          params: {
            dosen: this.detailPresensi.nomor_dosen,
            kuliah: this.detailPresensi.kuliah,
            tahun: this.detailPresensi.tahunAjaran,
            semester: this.detailPresensi.semester,
          },
        })
        .then((res) => {
          this.loading = false
          this.listTanggalPresensi = res.data
          this.tanggalPresensi = res.data[0].key
          this.getAbsensiMahasiswa()
        })
    },
    getAbsensiMahasiswa() {
      this.getMahasiswaHadir()
      this.getMahasiswaTidakHadir()
    },
    getJumlahMahasiswaPerKuliah() {
      this.loading = true
      this.$axios
        .get('/presensi/jumlah-mahasiswa-per-kuliah', {
          params: {
            kuliah: this.detailPresensi.kuliah,
            jenis_schema: this.detailPresensi.jenis_schema,
          },
        })
        .then((res) => {
          this.loading = false
          this.jumlahMahasiswa = res.data.jumlah
        })
    },
    getMahasiswaHadir() {
      this.loadingHadir = true
      this.listDataMahasiswaHadir = []
      this.$axios
        .get('/presensi/daftar-mahasiswa-hadir-kuliah', {
          params: {
            key: this.tanggalPresensi,
          },
        })
        .then((res) => {
          this.loadingHadir = false
          this.listDataMahasiswaHadir = res.data
        })
    },
    getMahasiswaTidakHadir() {
      this.loadingTidakHadir = true
      this.listDataMahasiswaTidakHadir = []
      this.$axios
        .get('/presensi/daftar-mahasiswa-tidak-hadir-kuliah', {
          params: {
            key: this.tanggalPresensi,
            kuliah: this.detailPresensi.kuliah,
            jenis_schema: this.detailPresensi.jenis_schema,
          },
        })
        .then((res) => {
          this.loadingTidakHadir = false
          this.listDataMahasiswaTidakHadir = res.data
        })
    },
  },
}
</script>
