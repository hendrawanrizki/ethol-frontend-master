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
        <CardUjianMahasiswa
          :jenis-ujian="jenisUjian"
          :ujian="du"
          :index="index"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardUjianMahasiswa from '@/components/ujian/card-ujian-mahasiswa.vue'
import waktu from '~/mixins/waktu'
export default {
  components: {
    CardUjianMahasiswa,
  },
  mixins: [waktu],
  middleware: ['auth', 'mahasiswa'],
  data() {
    return {
      jenisUjian: '2',
      dataUjian: [],
      loading: false,
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
