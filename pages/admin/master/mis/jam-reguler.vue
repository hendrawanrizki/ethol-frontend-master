<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card flat>
      <v-card-title> Tabel Jam Reguler MIS </v-card-title>
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
                  text: 'Hari',
                  value: 'nama_hari',
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
                  text: 'Kode',
                  value: 'kode',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Khusus',
                  value: 'khusus',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Sore',
                  value: 'sore',
                  sortable: true,
                  align: 'center',
                  class: 'ethol-th-table',
                },
                {
                  text: 'Program',
                  value: 'nama_program',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Ket Program',
                  value: 'keterangan_nama_program',
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
              <template #[`item.sore`]="{ item }">
                <center>
                  <v-icon v-if="item.sore == 1">mdi-check</v-icon>
                </center>
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

export default {
  components: {
    Breadcrumb,
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
          text: 'Jam Reguler',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      loading: true,
      search: '',
      listData: [],
      urut: 0,
    }
  },
  created() {
    this.ambilData()
  },
  methods: {
    ambilData() {
      this.loading = true
      this.$axios.get('/mis/jam-reg').then((res) => {
        this.loading = false
        this.listData = res.data
      })
    },
  },
}
</script>
