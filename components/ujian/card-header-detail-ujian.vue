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
              <tr v-if="dosen">
                <th>Kelas</th>
                <td width="2%">:</td>
                <td>
                  <div v-if="dataKuliahGabungan.length != 0">
                    <ul>
                      <li
                        v-for="(dkg, index) in dataKuliahGabungan"
                        :key="index"
                      >
                        {{ dkg.kelas + ' Kelas ' + dkg.pararel }}
                      </li>
                    </ul>
                  </div>
                  <div v-else>
                    {{ kodeKelas + ' Kelas ' + pararel }}
                  </div>
                </td>
              </tr>
              <tr v-if="mahasiswa">
                <th>Kelas</th>
                <td width="2%">:</td>
                <td>
                  {{ kodeKelas + ' Kelas ' + pararel }}
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
              <tr>
                <th>Terkumpul</th>
                <td>:</td>
                <td>{{ jmlTerkumpul + ' / ' + jmlMhs }}</td>
              </tr>
              <tr v-if="listDataPresensi.length != 0">
                <th>Presensi Terakhir</th>
                <td>:</td>
                <td>{{ listDataPresensi[0].waktu_indonesia }}</td>
              </tr>
              <tr
                v-if="
                  dosen == true &&
                  listDataPresensi.length != 0 &&
                  listDataPresensi[0].open == true
                "
              >
                <th>Opsi Presensi</th>
                <td>:</td>
                <td>
                  <div>
                    <v-btn
                      small
                      class="text-none warning"
                      @click="tampilkanDialogTutupPresensi(listDataPresensi[0])"
                    >
                      Tutup
                    </v-btn>
                    <v-btn
                      small
                      class="text-none error"
                      @click="
                        tampilkanDialogBatalkanPresensi(listDataPresensi[0])
                      "
                    >
                      Batalkan
                    </v-btn>
                  </div>
                </td>
              </tr>
            </table>
          </v-col>
        </v-row>
        <v-card-actions> </v-card-actions>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="dosen"
          color="yellow darken-4"
          class="text-none"
          dark
          small
          @click="fnUbahBataPengumpulan()"
        >
          <v-icon small>mdi-calendar</v-icon>
          <span> &nbsp; Ubah Batas Pengumpulan</span>
        </v-btn>
        <v-btn
          v-if="dosen"
          style="margin-left: 8px"
          small
          color="light-blue darken-4"
          class="text-none"
          :dark="urlSoalUjian != null"
          :disabled="urlSoalUjian == null"
          @click="downloadSoalUjian"
        >
          <v-icon small>mdi-cloud-download</v-icon>
          <span> &nbsp; Download Soal</span>
        </v-btn>
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
        <v-spacer></v-spacer>
        <v-btn
          v-if="dosen"
          small
          color="primary"
          :disabled="presensiAktif"
          :loading="loadingBukaPresensi"
          @click="bukaPresensi()"
        >
          Buka Presensi
        </v-btn>
        <v-btn
          v-else-if="mahasiswa"
          small
          color="primary"
          :disabled="!presensiAktif || sudahPresensi"
          @click="simpanPresensiMhs()"
        >
          Presensi
        </v-btn>
        &nbsp;
        <form :action="bbbURL" method="POST">
          <input type="hidden" name="meeting" :value="roomConference" />
          <input type="hidden" name="name" :value="namaUser" />
          <input type="hidden" name="role" :value="dosen ? 1 : 2" />
          <v-btn
            v-if="dosen"
            small
            color="teal darken-1"
            class="text-none"
            :dark="presensiAktif"
            :disabled="!presensiAktif"
            type="submit"
          >
            <span>Masuk Ruang Ujian &nbsp; </span>
            <v-icon small>mdi-login</v-icon>
          </v-btn>
          <v-btn
            v-else-if="mahasiswa"
            small
            color="teal darken-1"
            class="text-none"
            :dark="presensiAktif && sudahPresensi"
            :disabled="!presensiAktif || !sudahPresensi"
            type="submit"
          >
            <span>Masuk Ruang Ujian &nbsp; </span>
            <v-icon small>mdi-login</v-icon>
          </v-btn>
        </form>
      </v-card-actions>
    </v-card>
    <DialogBatasPengumpulanDosen
      :dialog="dialogBatas"
      :nomor-ujian="nomorUjian"
      :selesai="selesai"
      @tutup="dialogBatas = false"
      @refresh="refreshUjian"
    />
    <DialogKonfirmasi
      judul="Tutup Presensi"
      pesan="menutup presensi ini"
      :dialog="dialogKonfirmasiTutupPresensi"
      :loading="loadingDialogTutupPresensi"
      @close="dialogKonfirmasiTutupPresensi = false"
      @aksi="tutupPresensi"
    />
    <DialogKonfirmasi
      judul="Batalkan Presensi"
      pesan="membatalkan presensi ini"
      :dialog="dialogKonfirmasiBatalkanPresensi"
      :loading="loadingDialogBatalkanPresensi"
      @close="dialogKonfirmasiBatalkanPresensi = false"
      @aksi="batalkanPresensi"
    />
  </div>
</template>
<script>
import DialogBatasPengumpulanDosen from '@/components/ujian/dialog-batas-pengumpulan-dosen.vue'
import { mapGetters, mapState } from 'vuex'
import DialogKonfirmasi from '~/components/utils/dialog-konfirmasi.vue'
import file from '~/mixins/file'
import waktu from '~/mixins/waktu'
import teks from '~/mixins/teks'
export default {
  components: {
    DialogBatasPengumpulanDosen,
    DialogKonfirmasi,
  },
  mixins: [file, waktu, teks],
  middleware: ['auth', 'dosen'],
  data() {
    return {
      nomorUjian: 0,
      nomorKuliah: 0,
      kuliahAsal: 0,
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
      isKuliahGabungan: false,
      dataKuliahGabungan: [],

      dialogBatas: false,

      isDownloadSoalDisabled: true,
      urlSoalUjian: null,
      jmlMhs: 0,
      jmlTerkumpul: 0,

      // presensi
      presensiAktif: true,

      // presensi dosen
      loadingBukaPresensi: false,
      loadingPresensi: false,
      listDataPresensi: [],

      presensiAksi: null,
      dialogKonfirmasiTutupPresensi: false,
      loadingDialogTutupPresensi: false,
      dialogKonfirmasiBatalkanPresensi: false,
      loadingDialogBatalkanPresensi: false,

      // presensi mahasiswa
      sudahPresensi: false,
      presensiKuliahTerakhir: null,
    }
  },
  computed: {
    ...mapGetters(['dosen', 'mahasiswa']),
    ...mapState(['user']),
  },
  watch: {
    async nomorUjian(v) {
      await this.detailUjian()
      if (this.mahasiswa) {
        await this.checkDownloadSoalMahasiswa()
      } else if (this.dosen) {
        await this.checkDownloadSoalDosen()
      }
    },
  },
  mounted() {
    this.$socket.onmessage = (payload) => {
      const message = JSON.parse(payload.data)
      if (Object.prototype.hasOwnProperty.call(message, 'presensi')) {
        if (
          message.kuliah == this.nomorKuliah &&
          message.jenis_schema == this.jenisSchema
        ) {
          if (message.status == 1) {
            console.log('presensiAktif')
            this.presensiAktif = true
            this.$forceUpdate()
          }
          this.ambilPresensiKuliahTerakhir()
        }
      } else {
        console.log('presensiTidakAktif')
        this.presensiAktif = false
      }
    }
  },
  methods: {
    batalkanPresensi() {
      this.loadingDialogBatalakanPresensi = true
      this.$axios
        .put('/presensi/batalkan', {
          kuliah: this.nomorKuliah,
          jenis_schema: this.jenisSchema,
          key: this.presensiAksi.key,
        })
        .then((res) => {
          this.loadingDialogBatalakanPresensi = false
          this.presensiAktif = false
          this.dialogKonfirmasiBatalkanPresensi = false
          this.ambilDataPresensi()
          this.$socket.sendObj({
            presensi: true,
            // buka presensi status 1, 2 tutup, 3 batalkan
            status: 3,
            kuliah: this.nomorKuliah,
            jenis_schema: this.jenisSchema,
            key: 'key',
          })
        })
    },
    tutupPresensi() {
      this.loadingDialogTutupPresensi = true
      this.$axios
        .put('/presensi/tutup', {
          nomor: this.presensiAksi.nomor,
        })
        .then((res) => {
          this.loadingDialogTutupPresensi = false
          this.presensiAktif = false
          this.dialogKonfirmasiTutupPresensi = false
          this.ambilDataPresensi()
          this.$socket.sendObj({
            presensi: true,
            // buka presensi status 1, 2 tutup, 3 batalkan
            status: 2,
            kuliah: this.nomorKuliah,
            jenis_schema: this.jenisSchema,
            key: 'key',
          })
        })
    },
    tampilkanDialogTutupPresensi(item) {
      this.presensiAksi = item
      this.dialogKonfirmasiTutupPresensi = true
    },
    tampilkanDialogBatalkanPresensi(item) {
      this.presensiAksi = item
      this.dialogKonfirmasiBatalkanPresensi = true
    },
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
      this.kuliahAsal = ujian.kuliah_asal
      this.jenisSchema = ujian.jenis_schema
      this.isKuliahGabungan = ujian.isKuliahGabungan
      this.dataKuliahGabungan = ujian.dataKuliahGabungan
    },
    async detailUjian() {
      this.loading = true
      await this.$axios
        .get('/ujian/detail-ujian', {
          params: {
            jenis: this.jenisUjian,
            kuliah: this.nomorKuliah,
            jenisSchema: this.jenisSchema,
          },
        })
        .then(async (res) => {
          if (res.data.length != 0) {
            const dataUjianDetail = res.data
            this.gelar_dpn = dataUjianDetail.gelar_dpn
            this.nama_dosen = dataUjianDetail.dosen
            this.gelar_blk = dataUjianDetail.gelar_blk
            this.bbbURL = dataUjianDetail.server
            this.roomConference = dataUjianDetail.room
            this.jmlMhs = dataUjianDetail.total_mahasiswa
            this.jmlTerkumpul = dataUjianDetail.total_jawaban
            this.mulaiIndonesia = dataUjianDetail.mulai_indonesia
            this.selesaiIndonesia = dataUjianDetail.selesai_indonesia
            this.mulai = dataUjianDetail.mulai
            this.selesai = dataUjianDetail.selesai

            // presensi
            if (this.dosen) {
              await this.cekTgl()
            } else if (this.mahasiswa) {
              await this.ambilPresensiKuliahTerakhirMhs()
            }
            // end presensi
          }
        })
        .finally(() => (this.loading = false))
    },
    fnUbahBataPengumpulan() {
      this.dialogBatas = true
    },
    refreshUjian() {
      this.loading = true
      this.$axios
        .get('/ujian/daftar-ujian-single', {
          params: {
            tahun: this.tahunAjaranAktifOnly,
            semester: this.semesterAktif,
            jenis: this.jenisUjian,
            nomorUjian: this.nomorUjian,
          },
        })
        .then((res) => {
          if (res.data.length != 0) {
            this.$store.dispatch(
              'modules/ujian/simpan_ujian_dosen',
              res.data[0]
            )
            this.selesaiIndonesia = res.data[0].ujian.selesai_indonesia
            this.$forceUpdate()
          }
        })
        .finally(() => (this.loading = false))
    },
    async checkDownloadSoalMahasiswa() {
      this.loading = true
      await this.$axios
        .post('/ujian/cek-soal', {
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
    async checkDownloadSoalDosen() {
      this.loading = true
      await this.$axios
        .post('/ujian/cek-soal-dosen', {
          nomor: this.nomorUjian,
        })
        .then((res) => {
          this.urlSoalUjian = res.data.urlSoal
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

    // presensi
    cekPresensiAktif() {
      this.$axios
        .get('/presensi/aktif-kuliah', {
          params: {
            kuliah: this.nomorKuliah,
            jenis_schema: this.jenisSchema,
          },
        })
        .then((res) => {
          this.presensiAktif = false
          if (res.data.length) {
            if (
              res.data[0].kuliah === this.nomorKuliah &&
              res.data[0].jenisSchema === this.jenisSchema
            ) {
              if (res.data[0].open == 1) {
                this.presensiAktif = true
              }
            }
          }
          this.ambilDataPresensi()
          this.$forceUpdate()
        })
    },
    async cekTgl() {
      const tglSekarang = await this.$axios.get('/hari/today').then((res) => {
        return res.data.tanggal_sekarang_yyyymmdd
      })
      let tglUjian = ''
      if (this.mulai != null && this.mulai != '') {
        tglUjian = this.mulai.substring(0, 10)
      }
      if (tglUjian == tglSekarang) {
        this.cekPresensiAktif()
      } else {
        // presensi hari ini tidak aktif / disable
        this.presensiAktif = true
      }
    },
    bukaPresensi() {
      let prependKey = ''
      if (this.jenisUjian == 1) {
        prependKey = 'UTS'
      } else if (this.jenisUjian == 2) {
        prependKey = 'UAS'
      }
      this.loadingBukaPresensi = true
      const key = prependKey + '-' + this.randomString(6)
      this.$axios
        .post('/presensi/buka', {
          kuliah: this.nomorKuliah,
          dosen: this.user.nomor,
          jenis_schema: this.jenisSchema,
          key,
        })
        .then((res) => {
          this.loadingBukaPresensi = false
          if (res.data.sukses) {
            this.presensiAktif = true
            this.ambilDataPresensi()
            this.$socket.sendObj({
              presensi: true,
              // buka presensi status 1, 2 tutup, 3 batalkan
              status: 1,
              kuliah: this.nomorKuliah,
              jenis_schema: this.jenisSchema,
              key: 'key',
            })
          }
        })
    },
    randomString(length) {
      let result = ''
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
    },
    ambilDataPresensi() {
      this.loadingPresensi = true
      this.$axios
        .get('/presensi/riwayat', {
          params: {
            kuliah: this.nomorKuliah,
            jenis_schema: this.jenisSchema,
            nomor: this.user.nomor,
          },
        })
        .then((res) => {
          this.loadingPresensi = false
          this.listDataPresensi = res.data
        })
    },
    async ambilPresensiKuliahTerakhirMhs() {
      await this.$axios
        .get('/presensi/terakhir-kuliah', {
          params: {
            kuliah: this.nomorKuliah,
            jenis_schema: this.jenisSchema,
          },
        })
        .then((res) => {
          if (res.data.ditemukan == true) {
            this.presensiAktif = res.data.open
            this.presensiKuliahTerakhir = res.data
            this.ambilDataPresensiMhs()
          }
        })
    },
    ambilDataPresensiMhs() {
      this.loadingPresensi = true
      this.$axios
        .get('/presensi/riwayat', {
          params: {
            kuliah: this.nomorKuliah,
            jenis_schema: this.jenisSchema,
            nomor: this.user.nomor,
          },
        })
        .then((res) => {
          // console.log('res', res)
          this.loadingPresensi = false
          const listDataPresensi = res.data
          if (this.presensiKuliahTerakhir && listDataPresensi.length) {
            // jika presensi terakhirnya dosen sama dengan presensi terakhirnya mahasiswa
            if (this.presensiKuliahTerakhir.key === listDataPresensi[0].key) {
              this.listDataPresensi = res.data
              this.sudahPresensi = true
            }
          }
        })
    },
    simpanPresensiMhs() {
      this.$axios
        .post('/presensi/mahasiswa', {
          kuliah: this.nomorKuliah,
          mahasiswa: this.user.nomor,
          jenis_schema: this.jenisSchema,
          kuliah_asal: this.kuliahAsal,
          key: this.presensiKuliahTerakhir.key,
        })
        .then((res) => {
          if (res.data.sukses) {
            this.ambilDataPresensiMhs()
            this.sudahPresensi = true
          }
        })
    },
    // end presensi
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
