<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card flat>
      <v-card-title> Tabel Mahasiswa Semester MIS </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="2" lg="2" xl="2">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Cari . . ."
              outlined
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3" xl="2">
            <FilterProgram @ubah="ubahProgram" />
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="3" xl="2">
            <FilterJurusan @ubah="ubahJurusan" />
          </v-col>
          <v-col cols="12" md="2">
            <FilterTahun :tahun="tahun" @ubah="ubahTahun" />
          </v-col>
          <v-col cols="12" md="2">
            <FilterSemester :semester="semester" @ubah="ubahSemester" />
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="[
                {
                  text: 'Kode Kelas',
                  value: 'kode_kelas',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Matakuliah',
                  value: 'matakuliah',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Jenis Skema',
                  value: 'nama_jenis_schema',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Jumlah Mahasiswa',
                  value: 'jml_mhs',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Opsi',
                  value: 'opsi',
                  sortable: true,
                  class: 'ethol-th-table',
                },
              ]"
              :items="listData"
              :items-per-page="10"
              class="elevation-1"
              :loading="loading"
              :search="search"
              loading-text="Loading... Tunggu Sebentar"
            >
              <template #[`item.opsi`]="{ item }">
                <v-btn color="primary" small @click="detailMahasiswa(item)">
                  Detail
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" width="700" persistent>
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          Detail Mahasiswa
          <v-spacer> </v-spacer>
          <v-icon @click="tutupDialog">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-col cols="12">
                <v-data-table
                  :headers="[
                    {
                      text: 'NRP',
                      value: 'nrp',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'Nama Mahasiswa',
                      value: 'nama_mahasiswa',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                  ]"
                  :items="listDataMahasiswa"
                  :items-per-page="10"
                  class="elevation-1"
                  :loading="loadingMahasiswa"
                  :search="searchMahasiswa"
                  loading-text="Loading... Tunggu Sebentar"
                >
                </v-data-table>
              </v-col>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="tutupDialog"> Tutup </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import Breadcrumb from '@/components/backend/breadcrumb.vue'
import FilterProgram from '~/components/filter/mis/program.vue'
import FilterJurusan from '~/components/filter/mis/jurusan.vue'
import FilterTahun from '~/components/filter/tahun-ajaran.vue'
import FilterSemester from '~/components/filter/semester.vue'
export default {
  components: {
    Breadcrumb,
    FilterTahun,
    FilterSemester,
    FilterProgram,
    FilterJurusan,
  },
  middleware: ['auth', 'admin'],
  data() {
    return {
      judulLaman: '',
      breadcrumbItem: [
        {
          text: 'Beranda',
          disabled: false,
          exact: true,
          to: '/admin',
        },
        {
          text: 'MIS',
          disabled: false,
          exact: true,
          to: '/admin/master/mis',
        },
        {
          text: 'Mahasiswa Semester',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      loading: true,
      search: '',
      listData: [],
      programDipilih: null,
      jurusanDipilih: null,
      tahun: null,
      semester: null,
      dialog: false,
      listDataMahasiswa: [],
      loadingMahasiswa: false,
      searchMahasiswa: '',
    }
  },
  watch: {
    tahun(v) {
      this.ambilData()
    },
    semester(v) {
      this.ambilData()
    },
  },
  created() {
    this.ambilData()
  },
  methods: {
    ubahProgram(v) {
      this.programDipilih = v
      this.ambilData()
    },
    ubahJurusan(v) {
      this.jurusanDipilih = v
      this.ambilData()
    },
    ubahTahun(v) {
      this.tahun = v
    },
    ubahSemester(v) {
      this.semester = v
    },
    tutupDialog() {
      this.dialog = false
      this.listDataMahasiswa = []
    },
    ambilData() {
      this.loading = true
      if (
        this.programDipilih != null &&
        this.jurusanDipilih != null &&
        this.tahun != null &&
        this.semester != null
      ) {
        this.$axios
          .get('/mis/mahasiswa-semester', {
            params: {
              program: this.programDipilih,
              jurusan: this.jurusanDipilih,
              tahun: this.tahun,
              semester: this.semester,
            },
          })
          .then((res) => {
            this.loading = false
            this.listData = res.data
          })
      }
    },
    detailMahasiswa(item) {
      this.loadingMahasiswa = true
      this.dialog = true
      this.$axios
        .get('/mis/detail-mahasiswa-semester', {
          params: {
            kuliah: item.nomor,
            jenis_schema: item.jenis_schema,
          },
        })
        .then((res) => {
          this.loadingMahasiswa = false
          this.listDataMahasiswa = res.data
        })
    },
  },
}
</script>
