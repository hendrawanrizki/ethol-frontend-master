<template>
  <v-container>
    <v-row>
      <v-col sm="3" md="2" lg="2" xl="2">
        <FilterTahunAjaran @ubah="ubahTahunAjaran" />
      </v-col>
      <v-col sm="3" md="2" lg="2" xl="2">
        <FilterSemester @ubah="ubahSemester" />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(mk, index) in matakuliah" :key="index" cols="12" md="4">
        <CardKuliahMahasiswa :matkul="mk" :index="index" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import CardKuliahMahasiswa from '@/components/kuliah/card-kuliah-mahasiwa.vue'
import FilterTahunAjaran from '~/components/filter/tahun-ajaran.vue'
import FilterSemester from '~/components/filter/semester.vue'
export default {
  components: {
    FilterTahunAjaran,
    FilterSemester,
    CardKuliahMahasiswa,
  },
  middleware: ['auth', 'mahasiswa'],
  transition: 'slide-bottom',
  data() {
    return {
      tahun: null,
      semester: null,
      matakuliah: [],
      jadwalKuliah: [],
    }
  },
  computed: {
    ...mapState({
      matakuliahMahasiswa: (state) =>
        state.modules.matakuliah.matakuliahMahasiswa,
      user: (state) => state.user,
    }),
  },
  watch: {
    tahun() {
      this.ambilData()
    },
    semester() {
      this.ambilData()
    },
  },
  mounted() {
    if (this.matakuliahMahasiswa.length == 0) {
      this.ambilData()
    } else {
      this.matakuliah = this.matakuliahMahasiswa
    }
  },
  methods: {
    ubahTahunAjaran(v) {
      this.tahun = v
    },
    ubahSemester(v) {
      this.semester = v
    },
    ambilData() {
      if (this.tahun != null && this.semester != null) {
        this.$axios('/kuliah', {
          params: {
            tahun: this.tahun,
            semester: this.semester,
          },
        }).then((res) => {
          const matakuliah = res.data
          const kuliahs = []
          matakuliah.forEach((element) => {
            kuliahs.push({
              nomor: element.nomor,
              jenisSchema: element.jenisSchema,
            })
          })
          this.ambilHariKuliahIn(matakuliah, kuliahs)
        })
      }
    },
    ambilHariKuliahIn(matakuliah, kuliahs) {
      this.$axios
        .$post('/kuliah/hari-kuliah-in', {
          kuliahs,
          tahun: this.tahun,
          semester: this.semester,
        })
        .then((res) => {
          this.jadwalKuliah = res
          matakuliah.forEach((mk) => {
            mk.jadwal = []
            this.jadwalKuliah.forEach((jk) => {
              if (mk.nomor == jk.kuliah) {
                mk.jadwal.push(jk)
              }
            })
          })
          this.matakuliah = matakuliah
        })
    },
  },
}
</script>
