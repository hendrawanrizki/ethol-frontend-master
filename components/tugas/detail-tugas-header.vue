<template>
  <v-card outlined>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <table class="noborder">
            <tr>
              <th>NIP</th>
              <td>: {{ detailTugas.nip_dosen }}</td>
            </tr>
            <tr>
              <th>Nama Dosen</th>
              <td>
                :
                {{
                  hapusStringNull(detailTugas.gelar_dpn) +
                  ' ' +
                  hapusStringNull(detailTugas.nama_dosen) +
                  ' ' +
                  hapusStringNull(detailTugas.gelar_blk)
                }}
              </td>
            </tr>
            <tr>
              <th>Matakuliah</th>
              <td>: {{ detailTugas.matakuliah }}</td>
            </tr>
            <tr>
              <th>Kelas</th>
              <td>: {{ detailTugas.kelas }}</td>
            </tr>
          </table>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <table class="noborder">
            <tr>
              <th>Program</th>
              <td>: {{ program }}</td>
            </tr>
            <tr>
              <th>Jurusan</th>
              <td>: {{ jurusan }}</td>
            </tr>
            <tr>
              <th>Bulan</th>
              <td>: {{ bulan }}</td>
            </tr>
            <tr>
              <th>Tahun / Bulan</th>
              <td>
                :
                {{ detailTugas.tahun }}
              </td>
            </tr>
          </table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import teks from '~/mixins/teks'
import local from '~/service/local'
import waktu from '~/mixins/waktu'
export default {
  mixins: [waktu, teks],
  data() {
    return {
      detailTugas: {
        bulan: '',
        gelar_blk: '',
        gelar_dpn: '',
        jenis_schema: '',
        jumlah: '',
        kelas: '',
        kuliah: '',
        matakuliah: '',
        nama_dosen: '',
        nip_dosen: '',
        tahun: '',
        nomor_dosen: '',
      },
      program: '-',
      jurusan: '-',
      loading: true,
    }
  },
  computed: {
    bulan() {
      if (this.detailTugas.bulan == '') {
        return '-'
      } else {
        return this.bulanIndonesia[parseInt(this.detailTugas.bulan) - 1].text
      }
    },
  },
  watch: {
    detailTugas: {
      handler() {
        this.getProgram()
        this.getJurusan()
      },
      deep: true,
    },
  },
  mounted() {
    this.detailTugas = local.getTugas()
  },
  methods: {
    getProgram() {
      this.loading = true
      this.$axios
        .get('/program/detail', {
          params: {
            nomor: this.detailTugas.program,
          },
        })
        .then((res) => {
          this.loading = false
          this.program = res.data[0].program
        })
    },
    getJurusan() {
      this.loading = true
      this.$axios
        .get('/jurusan/detail', {
          params: {
            nomor: this.detailTugas.jurusan,
          },
        })
        .then((res) => {
          this.loading = false
          this.jurusan = res.data[0].jurusan
        })
    },
  },
}
</script>
<style lang="css" scoped>
.noborder,
.noborder tr,
.noborder th,
.noborder td {
  border: none !important;
  text-align: left;
  padding: 5px;
}
</style>
