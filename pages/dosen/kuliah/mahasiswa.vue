<template>
  <v-container>
    <v-row class="row-title-kuliah">
      <v-col cols="11">
        <h2 class="ethol-title-kuliah">
          {{ kuliah.matakuliah ? kuliah.matakuliah.nama : '' }}
          -
          {{ kuliah.kelas }} Kelas {{ kuliah.pararel }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <table class="table-noborder">
          <tr>
            <th>Laki - Laki</th>
            <td>: {{ jmlLaki }}</td>
          </tr>
          <tr>
            <th>Perempuan</th>
            <td>: {{ jmlPerempuan }}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>: {{ listData.length }}</td>
          </tr>
        </table>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(ld, index) in listData" :key="index" cols="12" md="3">
        <CardInfoMahasiswa :mahasiswa="ld" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardInfoMahasiswa from '@/components/kuliah/card-info-mahasiswa.vue'
import { mapState } from 'vuex'
export default {
  components: {
    CardInfoMahasiswa,
  },
  layout: 'kuliah',
  middleware: ['auth', 'dosen'],
  transition: 'slide-bottom',
  data() {
    return {
      listData: [],
      loading: false,
      jmlLaki: 0,
      jmlPerempuan: 0,
    }
  },
  computed: {
    ...mapState({
      kuliah: (state) => state.modules.kuliah.kuliahDosen,
      user: (state) => state.user,
    }),
  },
  created() {
    this.ambilData()
  },
  methods: {
    ambilData() {
      this.loading = true
      this.$axios
        .get('/kuliah/peserta-kuliah', {
          params: {
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
          },
        })
        .then((res) => {
          this.loading = false
          this.listData = res.data
          this.listData.forEach((element) => {
            if (element.jk.substr(0, 1) == 'L') {
              this.jmlLaki++
            } else if (element.jk.substr(0, 1) == 'P') {
              this.jmlPerempuan++
            }
          })
        })
    },
  },
}
</script>
<style scoped>
.ethol-title-kuliah {
  margin-top: 10px !important;
}
</style>
