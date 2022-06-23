<template>
  <v-card outlined>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <table class="noborder">
            <tr>
              <th>NIP</th>
              <td>: {{ detailPresensi.nip_dosen }}</td>
            </tr>
            <tr>
              <th>Nama Dosen</th>
              <td>
                :
                {{
                  hapusStringNull(detailPresensi.gelar_dpn) +
                  ' ' +
                  hapusStringNull(detailPresensi.nama_dosen) +
                  ' ' +
                  hapusStringNull(detailPresensi.gelar_blk)
                }}
              </td>
            </tr>
            <tr>
              <th>Matakuliah</th>
              <td>: {{ detailPresensi.matakuliah }}</td>
            </tr>
            <tr>
              <th>Kelas</th>
              <td>: {{ detailPresensi.kelas }}</td>
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
                {{ detailPresensi.tahun }}
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
      detailPresensi: {
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
      if (this.detailPresensi.bulan == '') {
        return '-'
      } else {
        return this.bulanIndonesia[parseInt(this.detailPresensi.bulan) - 1].text
      }
    },
  },
  watch: {
    detailPresensi: {
      handler() {
        this.getProgram()
        this.getJurusan()
      },
      deep: true,
    },
  },
  mounted() {
    this.detailPresensi = local.getPresensi()
  },
  methods: {
    getProgram() {
      this.loading = true
      this.$axios
        .get('/program/detail', {
          params: {
            nomor: this.detailPresensi.program,
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
            nomor: this.detailPresensi.jurusan,
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
