<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card flat>
      <v-card-title> Tabel Soal Agama MIS </v-card-title>
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
            <v-select
              v-model="kategoriDipilih"
              :items="[
                {
                  text: 'UTS',
                  value: 1,
                },
                {
                  text: 'UAS',
                  value: 2,
                },
              ]"
              outlined
              label="Kategori"
              @change="ambilData"
            ></v-select>
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
                  text: 'Matakuliah',
                  value: 'agama',
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
                  text: 'Extensi File',
                  value: 'file_extension',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Nomor MIS',
                  value: 'nomor',
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
import FilterTahun from '~/components/filter/tahun-ajaran.vue'
import FilterSemester from '~/components/filter/semester.vue'
export default {
  components: {
    Breadcrumb,
    FilterTahun,
    FilterSemester,
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
          text: 'Soal Agama',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      loading: true,
      search: '',
      listData: [],
      kategoriDipilih: 1,
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
    ubahTahun(v) {
      this.tahun = v
    },
    ubahSemester(v) {
      this.semester = v
    },
    ambilData() {
      if (
        this.kategoriDipilih != null &&
        this.tahun != null &&
        this.semester != null
      ) {
        this.loading = true
        this.$axios
          .get('/mis/soal-agama', {
            params: {
              jenis: this.kategoriDipilih,
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
