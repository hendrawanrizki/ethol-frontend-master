<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2">
        <FilterProgram @ubah="ubahProgram" />
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="3" xl="2">
        <FilterJurusan @ubah="ubahJurusan" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, i) in materi"
        :key="i"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
      >
        <v-card outlined @click="toDetail(item)">
          <v-card-text>
            {{ item[0].matakuliah }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import FilterProgram from '~/components/filter/program.vue'
import FilterJurusan from '~/components/filter/jurusan.vue'
export default {
  components: {
    FilterProgram,
    FilterJurusan,
  },
  data() {
    return {
      programDipilih: null,
      jurusanDipilih: null,
      materi: [],
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  methods: {
    ubahProgram(v) {
      this.programDipilih = v
      this.ambilData()
    },
    ubahJurusan(v) {
      this.jurusanDipilih = v
      this.ambilData()
    },
    ambilData() {
      this.loading = true
      if (this.programDipilih != null && this.jurusanDipilih != null) {
        this.$axios
          .get('/materi/daftar', {
            params: {
              program: this.programDipilih,
              jurusan: this.jurusanDipilih,
            },
          })
          .then((res) => {
            this.loading = false
            this.materi = this.grouping(res.data, 'matakuliah')
          })
      }
    },
    grouping(v, key) {
      return v.reduce(function (r, a, i) {
        if (!i || r[r.length - 1][0][key] !== a[key]) {
          return r.concat([[a]])
        }
        r[r.length - 1].push(a)
        return r
      }, [])
    },
    toDetail(item) {
      localStorage.setItem('materi', JSON.stringify(item))
      if (this.dosen == true) {
        this.$router.push('/dosen/materi-perkuliahan/daftar-materi')
      } else if (this.mahasiswa == true) {
        this.$router.push('/mahasiswa/materi-perkuliahan/daftar-materi')
      }
    },
  },
}
</script>
