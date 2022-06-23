<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card flat>
      <v-card-title> Tabel Matakuliah MIS </v-card-title>
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
                  text: 'Kode',
                  value: 'kode',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Mata Kuliah',
                  value: 'matakuliah',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Matkul Singkat',
                  value: 'matakuliah_singkatan',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Jam',
                  value: 'jam',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'SKS',
                  value: 'sks',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Skema',
                  value: 'nama_jenis_schema',
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
              <template #[`item.nomor`]="{ item }">
                {{ item.nomor + 1 }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
          to: '/admin/beranda',
        },
        {
          text: 'MIS',
          disabled: false,
          exact: true,
          to: '/admin/master/mis',
        },
        {
          text: 'Matakuliah',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      loading: false,
      search: '',
      listData: [],
      programDipilih: null,
      jurusanDipilih: null,
      tahun: null,
      semester: null,
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
    ambilData() {
      if (
        this.programDipilih != null &&
        this.jurusanDipilih != null &&
        this.tahun != null &&
        this.semester != null
      ) {
        this.loading = true
        this.$axios
          .get('/mis/matakuliah', {
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
  },
}
</script>
