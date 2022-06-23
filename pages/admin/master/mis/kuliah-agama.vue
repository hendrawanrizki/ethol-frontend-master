<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card flat>
      <v-card-title> Tabel Kuliah Agama MIS </v-card-title>
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
          <v-col cols="12">
            <v-data-table
              :headers="[
                {
                  text: 'Agama',
                  value: 'agama',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Jenis Skema',
                  value: 'jenis_schema',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Tahun',
                  value: 'tahun',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Semester',
                  value: 'semester',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'NIP Dosen',
                  value: 'nip',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Nama Dosen',
                  value: 'nama_dosen',
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
              <template #[`item.nama_dosen`]="{ item }">
                {{
                  hapusStringNull(item.gelar_dpn) +
                  ' ' +
                  hapusStringNull(item.nama) +
                  ' ' +
                  hapusStringNull(item.gelar_blk)
                }}
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
import teks from '~/mixins/teks'
export default {
  components: {
    Breadcrumb,
  },
  mixins: [teks],
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
          text: 'Kuliah Agama',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      loading: true,
      search: '',
      listData: [],
    }
  },
  created() {
    this.ambilData()
  },
  methods: {
    ambilData() {
      this.loading = true
      this.$axios
        .get('/mis/kuliah-agama', {
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
    },
  },
}
</script>
