<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card flat>
      <v-card-title> Tabel Pegawai MIS </v-card-title>
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
          <v-col cols="12">
            <v-data-table
              :headers="[
                {
                  text: 'ID',
                  value: 'nomor',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'NIP',
                  value: 'nip',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Nama',
                  value: 'nama_gelar',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Jenis Kelamin',
                  value: 'sex',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'email',
                  value: 'email',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Golongan',
                  value: 'golakhir',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Pangkat',
                  value: 'pangkat',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Status Karyawan',
                  value: 'status_karyawan2',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'filter nama karyawan',
                  value: 'nama',
                  align: ' d-none',
                },
              ]"
              :items="listData"
              :items-per-page="10"
              class="elevation-1"
              :loading="loading"
              :search="search"
              loading-text="Loading... Tunggu Sebentar"
            >
              <template #[`item.nama_gelar`]="{ item }">
                {{
                  hapusStringNull(item.gelar_dpn) +
                  ' ' +
                  item.nama +
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
          text: 'Pegawai',
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
      this.$axios.get('/mis/pegawai').then((res) => {
        this.loading = false
        this.listData = res.data
      })
    },
    hapusStringNull(val) {
      if (val) {
        if (val != null) {
          return val
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
  },
}
</script>
