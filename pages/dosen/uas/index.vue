<template>
  <v-container>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      rounded
      color="blue accent-2"
    ></v-progress-linear>
    <v-row>
      <v-col cols="12" class="title"> UAS Online </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(du, index) in dataUjian"
        :key="index"
        cols="12"
        md="6"
        sm="12"
      >
        <CardUjianDosen :jenis-ujian="jenisUjian" :ujian="du" :index="index" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardUjianDosen from '@/components/ujian/card-ujian-dosen.vue'
import waktu from '~/mixins/waktu'
export default {
  components: {
    CardUjianDosen,
  },
  mixins: [waktu],
  middleware: ['auth', 'dosen'],
  data() {
    return {
      dataUjian: [],
      loading: false,
      jenisUjian: '2', // uas
    }
  },
  created() {
    this.ambilDataUjian()
  },
  methods: {
    ambilDataUjian() {
      this.loading = true
      this.$axios
        .get('/ujian/daftar-ujian', {
          params: {
            tahun: this.tahunAjaranAktifOnly,
            semester: this.semesterAktif,
            jenis: this.jenisUjian,
          },
        })
        .then((res) => {
          this.dataUjian = res.data
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>
