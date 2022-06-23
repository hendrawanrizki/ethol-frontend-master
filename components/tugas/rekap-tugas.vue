<template>
  <v-card outlined>
    <v-card-title> Data Rekap Tugas </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="3" lg="3" xl="2">
          <v-text-field v-model="search" placeholder="Cari . . ." outlined />
        </v-col>
        <v-col cols="12" sm="6" md="2" lg="2" xl="2">
          <FilterTahun :tahun="tahun" @ubah="ubahTahun" />
        </v-col>
        <v-col cols="12" sm="6" md="2" lg="2" xl="2">
          <FilterBulan :bulan="bulan" @ubah="ubahBulan" />
        </v-col>
        <v-col cols="12" sm="6" md="2" lg="2" xl="2">
          <FilterProgram @ubah="ubahProgram" />
        </v-col>
        <v-col cols="12" sm="6" md="3" lg="3" xl="2">
          <FilterJurusan @ubah="ubahJurusan" />
        </v-col>
        <v-col cols="12" style="padding-top: 0px">
          <v-btn
            color="primary"
            :disabled="listData.length == 0"
            @click="exportExcel"
          >
            <v-icon small>mdi-file-excel</v-icon> &nbsp;Export Excel
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :headers="[
              {
                text: 'NIP',
                value: 'nip_dosen',
                sortable: true,
                class: 'ethol-th-table',
              },
              {
                text: 'Dosen',
                value: 'dosennya',
                sortable: true,
                class: 'ethol-th-table',
              },
              {
                text: 'filter nama dosen',
                value: 'nama_dosen',
                align: ' d-none',
              },
              {
                text: 'Matakuliah',
                value: 'matakuliah',
                sortable: true,
                class: 'ethol-th-table',
              },
              {
                text: 'Kelas',
                value: 'kelas',
                sortable: true,
                class: 'ethol-th-table',
              },
              {
                text: 'Jumlah',
                value: 'jumlah',
                sortable: true,
                align: 'right',
                class: 'ethol-th-table',
              },
              {
                text: 'Opsi',
                value: 'opsi',
                class: 'ethol-th-table',
                align: 'center',
              },
            ]"
            :items="listData"
            :items-per-page="10"
            class="elevation-1"
            :loading="loading"
            :search="search"
            loading-text="Loading... Tunggu Sebentar"
          >
            <template #[`item.dosennya`]="{ item }">
              {{
                hapusStringNull(item.gelar_dpn) +
                ' ' +
                hapusStringNull(item.nama_dosen) +
                ' ' +
                hapusStringNull(item.gelar_blk)
              }}
            </template>
            <template #[`item.opsi`]="{ item }">
              <v-btn color="primary" small @click="detailTugas(item)">
                Detail
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import XLSX from 'xlsx'
import FilterProgram from '~/components/filter/program.vue'
import FilterJurusan from '~/components/filter/jurusan.vue'
import FilterTahun from '~/components/filter/tahun.vue'
import FilterBulan from '~/components/filter/bulan-indonesia.vue'
import waktu from '~/mixins/waktu'
import teks from '~/mixins/teks'
export default {
  components: {
    FilterTahun,
    FilterProgram,
    FilterJurusan,
    FilterBulan,
  },
  mixins: [teks, waktu],
  props: {
    urlAkses: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      tahun: null,
      bulan: null,
      program: null,
      jurusan: null,
      loading: true,
      listData: [],
      search: '',
    }
  },
  computed: {
    bulanIndo() {
      if (this.bulan == '') {
        return '-'
      } else {
        return this.bulanIndonesia[parseInt(this.bulan) - 1].text
      }
    },
  },
  created() {
    this.ambilData()
  },
  methods: {
    ubahTahun(v) {
      this.tahun = v
      this.ambilData()
    },
    ubahBulan(v) {
      this.bulan = v
      this.ambilData()
    },
    ubahProgram(v) {
      this.program = v
      this.ambilData()
    },
    ubahJurusan(v) {
      this.jurusan = v
      this.ambilData()
    },
    ambilData() {
      this.loading = true
      if (
        this.program != null &&
        this.jurusan != null &&
        this.tahun != null &&
        this.bulan != null
      ) {
        const urlApi = '/tugas/rekap-tugas/' + this.urlAkses
        this.$axios
          .get(urlApi, {
            params: {
              tahun: this.tahun,
              bulan: this.bulan,
              jurusan: this.jurusan,
              program: this.program,
            },
          })
          .then((res) => {
            this.loading = false
            this.listData = res.data
          })
      }
    },
    detailTugas(v) {
      const filterTugas = {
        tahun: this.tahun,
        bulan: this.bulan,
        program: this.program,
        jurusan: this.jurusan,
        mode: 'admin-baak',
      }
      this.$emit('detail', Object.assign(v, filterTugas))
    },
    exportExcel() {
      const daftarExport = [
        ['NO', 'NIP', 'Dosen', 'Matakuliah', 'Kelas', 'Jumlah'],
      ]

      for (let index = 0; index < this.listData.length; index++) {
        const dataPresensi = this.listData[index]
        daftarExport.push([
          index + 1,
          dataPresensi.nip_dosen,
          this.hapusStringNull(dataPresensi.gelar_dpn) +
            ' ' +
            this.hapusStringNull(dataPresensi.nama_dosen) +
            ' ' +
            this.hapusStringNull(dataPresensi.gelar_blk),
          dataPresensi.matakuliah,
          dataPresensi.kelas,
          dataPresensi.jumlah,
        ])
      }
      const ws = XLSX.utils.aoa_to_sheet(daftarExport)

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, '')
      XLSX.writeFile(wb, `Rekap-Tugas-${this.bulanIndo}-${this.tahun}.xlsx`)
    },
  },
}
</script>
