<template>
  <v-container>
    <v-card>
      <v-card-title>Rekap Presensi</v-card-title>
      <v-card-subtitle
        >Tahun Ajaran {{ tahunAjaranAktif }} Semester
        {{ semesterAktif }}</v-card-subtitle
      >
      <v-divider></v-divider>
      <br />
      <v-card-text>
        <v-row>
          <v-col cols="4" style="padding-bottom: 0px">
            <v-text-field v-model="search" placeholder="Cari . . ." outlined />
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="[
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
              <template #[`item.opsi`]="{ item }">
                <v-btn color="primary" small @click="detailPresensi(item)">
                  Detail
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import waktu from '~/mixins/waktu'
import local from '~/service/local'
export default {
  mixins: [waktu],
  middleware: ['auth', 'dosen'],
  transition: 'slide-bottom',
  data() {
    return {
      listData: [],
      loading: false,
      search: '',
    }
  },
  created() {
    this.ambilData()
  },
  methods: {
    ambilData() {
      this.loading = true
      this.$axios
        .get('/presensi/dosen', {
          params: {
            tahun: this.$store.getters.tahun,
            semester: this.$store.getters.semester,
            dosen: this.$store.state.user.nomor,
          },
        })
        .then((res) => {
          this.loading = false
          this.listData = res.data
        })
    },
    detailPresensi(v) {
      const filterPresensi = {
        tahunAjaran: this.$store.getters.tahun_ajaran,
        semester: this.semesterAktif,
        nomor_dosen: this.$store.state.user.nomor,
        mode: 'dosen',
      }
      const ls = Object.assign(v, filterPresensi)
      local.setPresensi(ls)
      this.$router.push('/dosen/rekap-presensi/detail')
    },
  },
}
</script>
