<template>
  <div>
    <HeaderNotifikasi @loaddata="loadKuliah" />
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      rounded
      color="indigo darken-1"
    ></v-progress-linear>
    <div style="padding: 15px">
      <v-row>
        <v-col v-for="(mk, index) in matakuliah" :key="index" cols="12" md="4">
          <CardKuliahMahasiswa v-if="mahasiswa" :matkul="mk" :index="index" />
          <CardKuliahDosen v-else-if="dosen" :matkul="mk" :index="index" />
        </v-col>
      </v-row>
      <v-row v-if="matakuliah.length == 0 && loading == false">
        <v-col cols="12">
          <h4 style="font-weight: 400">Kuliah tidak ditemukan !</h4></v-col
        >
      </v-row>
    </div>
  </div>
</template>
<script>
import HeaderNotifikasi from '@/components/notifikasi/header-notifikasi.vue'
import CardKuliahMahasiswa from '@/components/kuliah/card-kuliah-mahasiwa.vue'
import CardKuliahDosen from '@/components/kuliah/card-kuliah-dosen.vue'
import { mapGetters } from 'vuex'
import waktu from '~/mixins/waktu'
export default {
  components: {
    HeaderNotifikasi,
    CardKuliahMahasiswa,
    CardKuliahDosen,
  },
  mixins: [waktu],
  data() {
    return {
      loading: false,
      kuliahJenisSchema: '',
      tempKuliahMhs: [],
      matakuliah: [],
      jadwalKuliah: [],

      materi: {},
      dialogLihatMateri: false,
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  methods: {
    loadKuliah(v = '') {
      if (v != '') {
        this.kuliahJenisSchema = v
      }
      const kj = this.kuliahJenisSchema.split('-')
      const kuliah = kj[0]
      const jenisSchema = kj[1]
      this.loading = true
      this.$axios
        .get('/kuliah/by-kuliah-js', {
          params: {
            kuliah,
            jenisSchema,
          },
        })
        .then((res) => {
          this.loading = false
          const matakuliah = res.data
          const kuliahs = []
          matakuliah.forEach((element) => {
            kuliahs.push({
              nomor: element.nomor,
              jenisSchema: element.jenisSchema,
            })
          })
          this.tempKuliahMhs = kuliahs
          this.ambilHariKuliahIn(matakuliah)
        })
    },
    ambilHariKuliahIn(matakuliah) {
      this.$axios
        .$post('/kuliah/hari-kuliah-in', {
          kuliahs: this.tempKuliahMhs,
          tahun: this.tahunAjaranAktifOnly,
          semester: this.semesterAktif,
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
