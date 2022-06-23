<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card flat>
      <v-card-title> Tabel Mahasiswa MIS </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" xl="2">
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
          <v-col cols="12" sm="6" md="4" lg="3" xl="2">
            <FilterJurusan @ubah="ubahJurusan" />
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3" xl="2">
            <Angkatan @ubah="ubahAngkatan" />
          </v-col>

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
                  text: 'Kelas',
                  value: 'kode_kelas',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Jurusan',
                  value: 'jurusan',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Program',
                  value: 'nama_program',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Angkatan',
                  value: 'angkatan',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Tahun Lulus',
                  value: 'tahun_lulus',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Status',
                  value: 'status',
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
import Angkatan from '~/components/filter/mis/angkatan.vue'

export default {
  components: {
    Breadcrumb,
    FilterProgram,
    FilterJurusan,
    Angkatan,
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
          text: 'Mahasiswa',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      loading: true,
      search: '',
      listData: [],
      program: null,
      jurusan: null,
      angkatan: null,
    }
  },
  mounted() {
    this.ambilData()
  },
  methods: {
    ambilData() {
      if (
        this.program != null &&
        this.jurusan != null &&
        this.angkatan != null
      ) {
        this.loading = true
        this.$axios
          .get('/mis/mahasiswa', {
            params: {
              program: this.program,
              jurusan: this.jurusan,
              angkatan: this.angkatan,
            },
          })
          .then((res) => {
            this.loading = false
            this.listData = res.data
          })
      }
    },

    ubahProgram(v) {
      this.program = v
      this.ambilData()
    },
    ubahJurusan(v) {
      this.jurusan = v
      this.ambilData()
    },
    ubahAngkatan(v) {
      this.angkatan = v
      this.ambilData()
    },
  },
}
</script>
