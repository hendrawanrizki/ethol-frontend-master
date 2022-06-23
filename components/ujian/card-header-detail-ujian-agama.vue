<template>
  <div>
    <v-card outlined>
      <v-card-title v-if="jenisUjian == 1">
        &nbsp;&nbsp;UTS Online
      </v-card-title>
      <v-card-title v-else-if="jenisUjian == 2">
        &nbsp;&nbsp;UAS Online
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <table class="noborder" width="100%">
              <tr>
                <th width="10%">Matakuliah</th>
                <td width="2%">:</td>
                <td>
                  {{ namaMatKul }}
                </td>
              </tr>
              <tr v-if="mahasiswa">
                <th>Dosen</th>
                <td>:</td>
                <td>
                  <span>
                    {{
                      hapusStringNull(gelar_dpn) +
                      ' ' +
                      hapusStringNull(nama_dosen) +
                      ' ' +
                      hapusStringNull(gelar_blk)
                    }}
                  </span>
                </td>
              </tr>
            </table>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <table class="noborder">
              <tr>
                <th width="20%">Waktu Ujian</th>
                <td>:</td>
                <td>
                  {{ mulaiIndonesia }} -
                  {{ selesaiIndonesia }}
                </td>
              </tr>
            </table>
          </v-col>
        </v-row>
        <v-card-actions> </v-card-actions>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="mahasiswa"
          style="margin-left: 8px"
          small
          color="light-blue darken-4"
          class="text-none"
          :disabled="isDownloadSoalDisabled && urlSoalUjian == null"
          :dark="!isDownloadSoalDisabled && urlSoalUjian != null"
          @click="downloadSoalUjian"
        >
          <v-icon small>mdi-cloud-download</v-icon>
          <span> &nbsp; Download Soal</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import file from '~/mixins/file'
import waktu from '~/mixins/waktu'
import teks from '~/mixins/teks'
export default {
  mixins: [file, waktu, teks],
  middleware: ['auth', 'dosen'],
  data() {
    return {
      nomorUjian: 0,
      nomorKuliah: 0,
      jenisSchema: 0,
      jenisUjian: null,
      namaMatKul: '',
      kodeKelas: '',
      pararel: '',
      mulaiIndonesia: '',
      selesaiIndonesia: '',
      selesai: '',
      mulai: '',
      bbbURL: '',
      roomConference: '',
      namaUser: '',
      gelar_dpn: '',
      nama_dosen: '',
      gelar_blk: '',

      dialogBatas: false,

      isDownloadSoalDisabled: true,
      urlSoalUjian: null,
    }
  },
  computed: {
    ...mapGetters(['dosen', 'mahasiswa']),
    ...mapState(['user']),
  },
  watch: {
    async nomorUjian(v) {
      await this.checkDownloadSoalMahasiswa()
    },
  },
  methods: {
    assignDataUjian(ujian) {
      this.nomorUjian = ujian.ujian.nomor
      this.jenisUjian = ujian.jenis_ujian
      this.namaMatKul = ujian.matakuliah.nama
      this.kodeKelas = ujian.kode_kelas
      this.pararel = ujian.pararel
      this.mulaiIndonesia = ujian.ujian.mulai_indonesia
      this.selesaiIndonesia = ujian.ujian.selesai_indonesia
      this.selesai = ujian.ujian.selesai
      this.mulai = ujian.ujian.mulai
      this.bbbURL = ujian.server.url
      this.roomConference = ujian.ruang.nama
      this.namaUser = this.user.nama
      this.gelar_dpn = ujian.dosen.gelar_dpn
      this.nama_dosen = ujian.dosen.nama
      this.gelar_blk = ujian.dosen.gelar_blk
      this.nomorKuliah = ujian.nomor
      this.jenisSchema = ujian.jenis_schema
    },
    async checkDownloadSoalMahasiswa() {
      this.loading = true
      await this.$axios
        .post('/ujian/cek-soal-agama', {
          nomor: this.nomorUjian,
        })
        .then((res) => {
          if (res.data.running == true) {
            if (res.data.urlSoal == null || res.data.urlSoal == '') {
              this.isDownloadSoalDisabled = true
              this.urlSoalUjian = null
            } else {
              this.isDownloadSoalDisabled = false
              this.urlSoalUjian = res.data.urlSoal
            }
          } else {
            this.isDownloadSoalDisabled = true
            this.urlSoalUjian = null
          }
          this.$emit('statusujian', {
            running: res.data.running,
            isDone: res.data.isDone,
            urlSoal: res.data.urlSoal,
          })
        })
        .finally(() => (this.loading = false))
    },
    downloadSoalUjian() {
      this.downloadFileEthol(this.urlSoalUjian)
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
