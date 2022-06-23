<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-alert v-if="detailTugas.mode == 'admin-baak'" color="#98d1ff">
          Terdapat <b>{{ detailTugas.jumlah }}</b> tugas dalam bulan
          {{ bulan }} {{ detailTugas.tahun }}
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
          <v-col cols="12" md="6" offset-md="6">
            <h3 class="text-right" style="margin-top: 20px">
              Jumlah Mahasiswa : {{ jumlahMahasiswa }}
            </h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-data-table
              :headers="[
                {
                  text: 'Judul',
                  value: 'judul',
                  sortable: true,
                  width: '40%',
                  class: 'ethol-th-table',
                },
                {
                  text: 'Tanggal Dibuat',
                  value: 'tgl_dibuat_indonesia',
                  sortable: true,
                  width: '30%',
                  class: 'ethol-th-table',
                },
                {
                  text: 'Jumlah Mahasiswa Mengumpulkan',
                  value: 'jumlah',
                  sortable: true,
                  class: 'ethol-th-table',
                  align: 'right',
                },
              ]"
              :items="listData"
              :items-per-page="10"
              class="elevation-1"
              :loading="loading"
              :search="search"
              loading-text="Loading... Tunggu Sebentar"
            >
            </v-data-table>
          </v-col>
        </v-row>
        <br />
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import local from '~/service/local'
import waktu from '~/mixins/waktu'
export default {
  mixins: [waktu],
  data() {
    return {
      detailTugas: {
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
      jumlahMahasiswa: 0,
      listData: [],
      search: '',
    }
  },
  computed: {
    bulan() {
      if (this.detailTugas.bulan == '') {
        return '-'
      } else {
        return this.bulanIndonesia[parseInt(this.detailTugas.bulan) - 1].text
      }
    },
  },
  mounted() {
    this.detailTugas = local.getTugas()
    this.getJumlahMahasiswaPerKuliah()
    this.getDataTugas()
  },
  methods: {
    getJumlahMahasiswaPerKuliah() {
      this.loading = true
      this.$axios
        .get('/presensi/jumlah-mahasiswa-per-kuliah', {
          params: {
            kuliah: this.detailTugas.kuliah,
            jenis_schema: this.detailTugas.jenis_schema,
          },
        })
        .then((res) => {
          this.loading = false
          this.jumlahMahasiswa = res.data.jumlah
        })
    },
    getDataTugas() {
      this.loading = true
      this.$axios
        .get('/tugas/detail-tugas/baak', {
          params: {
            kuliah: this.detailTugas.kuliah,
            jenisSchema: this.detailTugas.jenis_schema,
            tahun: this.detailTugas.tahun,
            bulan: this.detailTugas.bulan,
          },
        })
        .then((res) => {
          this.loading = false
          this.listData = res.data
        })
    },
  },
}
</script>
