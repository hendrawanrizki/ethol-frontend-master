<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card flat>
      <v-card-title> Tabel Jurusan MIS </v-card-title>
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
                  text: 'Ruang',
                  value: 'ruang',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Keterangan',
                  value: 'keterangan',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Ruang Kuliah',
                  value: 'ruang_kuliah_check',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Kepala',
                  value: 'kepalanya',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Asisten',
                  value: 'asistennya',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Teknisi',
                  value: 'teknisinya',
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
              <template #[`item.ruang_kuliah_check`]="{ item }">
                <v-icon v-if="item.is_ruang_kuliah">mdi-check</v-icon>
              </template>
              <template #[`item.kepalanya`]="{ item }">
                {{
                  hapusStringNull(item.gelar_dpn_kepala) +
                  ' ' +
                  hapusStringNull(item.nama_kepala) +
                  ' ' +
                  hapusStringNull(item.gelar_blk_kepala)
                }}
              </template>
              <template #[`item.asistennya`]="{ item }">
                {{
                  hapusStringNull(item.gelar_dpn_asisten) +
                  ' ' +
                  hapusStringNull(item.nama_asisten) +
                  ' ' +
                  hapusStringNull(item.gelar_blk_asisten)
                }}
              </template>
              <template #[`item.teknisinya`]="{ item }">
                {{
                  hapusStringNull(item.gelar_dpn_teknisi) +
                  ' ' +
                  hapusStringNull(item.nama_teknisi) +
                  ' ' +
                  hapusStringNull(item.gelar_blk_teknisi)
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
          text: 'Ruang Kuliah',
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
      this.$axios.get('/mis/ruang-kuliah').then((res) => {
        this.loading = false
        this.listData = res.data
      })
    },
  },
}
</script>
