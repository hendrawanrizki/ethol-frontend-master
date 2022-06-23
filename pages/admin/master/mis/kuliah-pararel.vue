<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card flat>
      <v-card-title> Tabel Kuliah Pararel MIS </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="2" lg="3" xl="2">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Cari . . ."
              outlined
            />
          </v-col>
          <v-col cols="12" md="2">
            <FilterTahun :tahun="tahun" @ubah="ubahTahun" />
          </v-col>
          <v-col cols="12" md="2">
            <FilterSemester :semester="semester" @ubah="ubahSemester" />
          </v-col>
          <v-col cols="12" md="2"> <FilterHari @ubah="ubahHari" /> </v-col>
          <v-col cols="12" md="2">
            <FilterJenisSchema @ubah="ubahJenisSchema" />
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
                  text: 'Minggu Ke',
                  value: 'minggu',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'NIP Dosen',
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
                  text: 'Matakuliah',
                  value: 'matakuliah',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Ruang',
                  value: 'ruang',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Ket Ruang',
                  value: 'keterangan_ruang',
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
              <template #[`item.dosennya`]="{ item }">
                {{
                  hapusStringNull(item.gelar_dpn) +
                  ' ' +
                  hapusStringNull(item.nama_dosen) +
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
import FilterTahun from '~/components/filter/tahun-ajaran.vue'
import FilterSemester from '~/components/filter/semester.vue'
import FilterHari from '~/components/filter/mis/hari.vue'
import FilterJenisSchema from '~/components/filter/mis/jenis-schema.vue'
import teks from '~/mixins/teks'
export default {
  components: {
    Breadcrumb,
    FilterTahun,
    FilterSemester,
    FilterHari,
    FilterJenisSchema,
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
          text: 'Kuliah Semester',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      loading: true,
      search: '',
      listData: [],
      semester: null,
      tahun: null,
      hari: null,
      jenis_schema: null,
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
  mounted() {
    this.ambilData()
  },
  methods: {
    ambilData() {
      if (
        this.semester != null &&
        this.tahun != null &&
        this.hari != null &&
        this.jenis_schema != null
      ) {
        this.loading = true
        this.$axios
          .get('/mis/kuliah-pararel', {
            params: {
              semester: this.semester,
              tahun: this.tahun,
              hari: this.hari,
              jenis_schema: this.jenis_schema,
            },
          })
          .then((res) => {
            this.loading = false
            this.listData = res.data
          })
      }
    },
    ubahHari(v) {
      this.hari = v
      this.ambilData()
    },
    ubahJenisSchema(v) {
      this.jenis_schema = v
      this.ambilData()
    },
    ubahTahun(v) {
      this.tahun = v
    },
    ubahSemester(v) {
      this.semester = v
    },
  },
}
</script>
