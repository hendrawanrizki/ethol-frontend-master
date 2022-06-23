<template>
  <v-container>
    <CardSelamatDatang />
    <v-spacer></v-spacer>
    <v-row>
      <v-col cols="12" md="6">
        <h3 style="margin-left: 2px">
          Kuliah Semester {{ semesterGanjilGenap }} Tahun Ajaran
          {{ tahunAjaranAktifOnly }}
        </h3>
      </v-col>
      <v-col cols="12" md="6">
        <span class="caption-right">
          <i>Item dapat digeser ke kanan atau ke kiri</i>
        </span>
      </v-col>
    </v-row>
    <SlideKuliah
      v-if="matakuliah.length != 0"
      :matakuliah="matakuliah"
      style="margin-top: 10px"
    />
    <SlideLoadingKuliah v-else style="margin-top: 10px" />
    <v-row>
      <v-col cols="12" md="3">
        <h3 style="margin-left: 2px">Menu</h3>
      </v-col>
      <v-col cols="12" md="9">
        <span class="caption-right">
          <i></i>
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(em, index) in menuEthol"
                :key="index"
                cols="4"
                sm="3"
                md="2"
                lg="2"
                xl="2"
                @click="pilihMenu(em)"
              >
                <EtholMenu :menu="em" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="12">
            <h3>Tugas Terbaru</h3>
          </v-col>
          <v-col
            cols="12"
            md="12"
            style="
              background-color: white;
              border-radius: 10px !important;
              width: 95%;
            "
          >
            <div
              v-for="(t, index) in tugas"
              :key="index"
              style="margin-top: 15px"
            >
              <CardTugas :tugas="t" @detail="detailTugas" />
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="5" offset-md="1">
        <v-row>
          <v-col cols="12" md="12">
            <h3>Pengumuman</h3>
          </v-col>
          <v-col
            cols="12"
            md="12"
            style="background-color: white; border-radius: 10px !important"
          >
            <div v-for="(p, index) in pengumuman" :key="index">
              <CardSemuaPengumuman :pengumuman="p" />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <DialogDetailTugas
      :dialog="dialogDetailTugas"
      :tugas="tugasDetail"
      :nama-matakuliah="namaMatkulTugas"
      @tutup="dialogDetailTugas = false"
      @updatejawaban="ambilTugas"
    />
    <DialogKelasVirtual
      :dialog-kuliah="dialogKelasVir"
      @tutup="dialogKelasVir = false"
    />
    <DialogPilihUjian
      :dialog-ujian="dialogUjian"
      @tutup="dialogUjian = false"
    />
    <DialogSurveiPenilaian
      :dialog="dialogSurvei"
      @tutup="dialogSurvei = false"
    />
  </v-container>
</template>
<script>
import CardSelamatDatang from '@/components/beranda/card-selamat-datang.vue'
import CardSemuaPengumuman from '@/components/kuliah/pengumuman/card-semua-pengumuman.vue'
import CardTugas from '@/components/kuliah/tugas/card-tugas.vue'
import EtholMenu from '@/components/beranda/ethol-menu.vue'
import { mapState } from 'vuex'
import DialogDetailTugas from '@/components/kuliah/tugas/dialog-detail-tugas-mahasiswa.vue'
import DialogPilihUjian from '@/components/ujian/dialog-pilih-ujian.vue'
import DialogSurveiPenilaian from '@/components/survei/dialog-survei-penilaian.vue'
import DialogKelasVirtual from '~/components/beranda/dialog-kelas-virtual.vue'
import SlideKuliah from '~/components/kuliah/slide-kuliah.vue'
import SlideLoadingKuliah from '~/components/kuliah/slide-loading-kuliah.vue'
import waktu from '~/mixins/waktu'
const moment = require('moment')
moment.locale('id')
export default {
  components: {
    CardSelamatDatang,
    SlideKuliah,
    SlideLoadingKuliah,
    EtholMenu,
    CardSemuaPengumuman,
    CardTugas,
    DialogDetailTugas,
    DialogKelasVirtual,
    DialogSurveiPenilaian,
    DialogPilihUjian,
  },
  mixins: [waktu],
  middleware: ['auth', 'mahasiswa'],
  transition: 'slide-bottom',
  data() {
    return {
      menuEthol: [
        {
          kode: 'kelas-virtual',
          judul: 'Kelas Virtual',
          gambar: '/services/e-class.png',
          disabled: false,
        },
        {
          kode: 'matkul-perkuliahan',
          judul: 'Materi Perkuliahan',
          gambar: '/services/e-materi.png',
          disabled: false,
        },
        {
          kode: 'lab-virtual',
          judul: 'Lab Virtual',
          gambar: '/services/virtual-lab.png',
          disabled: false,
        },
        {
          kode: 'praktikum',
          judul: 'Praktikum',
          gambar: '/services/praktikum.png',
          disabled: false,
        },
        {
          kode: 'administrasi',
          judul: 'Administrasi',
          gambar: '/services/e-administration.png',
          disabled: false,
        },
        {
          kode: 'perpustakaan',
          judul: 'Perpustakaan',
          gambar: '/services/e-library.png',
          disabled: false,
        },
        {
          kode: 'ujian',
          judul: 'Ujian Online',
          gambar: '/services/ujian.png',
          disabled: false,
        },
        {
          kode: 'video-pembelajaran',
          judul: 'Video Pembelajaran',
          gambar: '/services/e-video-grey.png',
          disabled: true,
        },
        {
          kode: 'etfl',
          judul: 'ETFL',
          gambar: '/services/etfl-grey.png',
          disabled: true,
        },
      ],
      matakuliah: [],
      jadwalKuliah: [],
      pengumuman: [],
      tugas: [],

      dialogDetailTugas: false,
      tugasDetail: {},
      tempKuliahMhs: [],
      namaMatkulTugas: '',

      dialogKelasVir: false,

      dialogSurvei: false,
      dialogUjian: false,

      userAgent: null,
      idToken: null,
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
    idToken(v) {
      this.updateUserAgent(v)
    },
  },
  created() {
    // -- karena ambil data dari datbase disimpan di store makafungsi dibawah diganti ke mounted
    // this.ambilDataMatKul()
    this.startGetTokeFcm()
    // -- cek survei penilaian
    // this.cekSurveiPenilaian()

    // -- jika ingin data kuliah disimpan di vuex persitance
    // if (this.matakuliahMahasiswa.length == 0) {
    //   this.ambilDataMatKul()
    // } else {
    //   const kuliahs = []
    //   this.matakuliah = this.matakuliahMahasiswa
    //   this.matakuliah.forEach((element) => {
    //     kuliahs.push({
    //       nomor: element.nomor,
    //       jenisSchema: element.jenisSchema,
    //     })
    //   })
    //   this.tempKuliahMhs = kuliahs
    // }
  },
  mounted() {
    this.ambilDataMatKul()
  },
  methods: {
    async startGetTokeFcm() {
      await this.startTokenRefreshListener()
      await this.getIdToken()
    },
    startTokenRefreshListener() {
      try {
        this.$fire.messaging.onTokenRefresh(async () => {
          try {
            this.idToken = await this.$fire.messaging.getToken()
            // console.log('REFRESH_TOKEN ', this.idToken)
          } catch (e) {
            console.error('Error : ', e)
          }
        })
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    async getIdToken() {
      try {
        this.idToken = await this.$fire.messaging.getToken()
        // console.log('TOKEN: ' + this.idToken)
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    updateUserAgent(tokennya) {
      const deviceType = this.$ua.deviceType()
      const os = this.$ua.os()
      const osVersion = this.$ua.osVersion()
      const browser = this.$ua.browser()
      const browserVersion = this.$ua.browserVersion()
      const browserVendor = this.$ua.browserVendor()
      this.userAgent =
        deviceType +
        '-' +
        os +
        '-' +
        osVersion +
        '-' +
        browser +
        '-' +
        browserVersion +
        '-' +
        browserVendor

      this.$axios
        .post('/fcm/token-mahasiswa', {
          nomor: this.user.nomor,
          fcmToken: tokennya,
          ua: this.userAgent,
          deviceType,
          vendor: browserVendor,
        })
        .then((res) => {
          // console.log('res', res)
        })
    },

    cekSurveiPenilaian() {
      this.$axios.$get('/survei-penilaian').then((res) => {
        if (res.sudah_survei == false) {
          this.dialogSurvei = true
        }
      })
    },
    ambilDataMatKul() {
      this.$axios('/kuliah', {
        params: {
          tahun: this.tahunAjaranAktifOnly,
          semester: this.semesterAktif,
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
        this.tempKuliahMhs = kuliahs
        this.ambilHariKuliahIn(matakuliah)
        this.ambilPengumuman()
        this.ambilTugas()
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
          this.$store.dispatch(
            'modules/matakuliah/simpan_matkul_mahasiswa',
            matakuliah
          )
        })
    },
    ambilPengumuman() {
      this.$axios
        .$post('/pengumuman/semua-pengumuman', {
          kuliahs: this.tempKuliahMhs,
        })
        .then((res) => {
          this.pengumuman = res
        })
    },
    ambilTugas() {
      this.$axios
        .$post('/tugas/tugas-terakhir-mahasiswa', {
          kuliahs: this.tempKuliahMhs,
        })
        .then((res) => {
          // this.tugas = res
          for (let index = 0; index < res.length; index++) {
            const tugas = res[index]
            tugas.status_pengumpulan = 0
            if (tugas.submission_time == null) {
              tugas.status_pengumpulan = 0 // belum mengumpulkan
            } else {
              const deadlineTime = moment(tugas.deadline)
              const assignmentTime = moment(tugas.submission_time)
              const cekSelisih = deadlineTime.diff(assignmentTime, 'minutes')
              if (cekSelisih < 0) {
                tugas.status_pengumpulan = 2 // mengumpulkan terlambat
              } else {
                tugas.status_pengumpulan = 1 // mengumpulkan
              }
            }
          }
          this.tugas = res
        })
    },
    detailTugas(v) {
      this.tugasDetail = v
      this.matakuliahMahasiswa.forEach((element) => {
        if (element.nomor == v.course) {
          this.namaMatkulTugas = element.matakuliah.nama
        }
      })
      this.dialogDetailTugas = true
    },
    pilihMenu(v) {
      if (v.kode == 'kelas-virtual') {
        this.dialogKelasVir = true
      } else if (v.kode == 'matkul-perkuliahan') {
        this.$router.push('/mahasiswa/materi-perkuliahan')
      } else if (v.kode == 'video-pembelajaran') {
        // window.location.href = 'https://ethol.pens.ac.id/vidio/'
      } else if (v.kode == 'administrasi') {
        const win = window.open(
          'https://online.mis.pens.ac.id/index.php?Login=1',
          '_blank'
        )
        win.focus()
      } else if (v.kode == 'perpustakaan') {
        const win = window.open('http://ebook.pens.ac.id', '_blank')
        win.focus()
      } else if (v.kode == 'praktikum') {
        this.$router.push('/mahasiswa/praktikum')
      } else if (v.kode == 'lab-virtual') {
        const win = window.open('https://vlab.ethol.pens.ac.id/', '_blank')
        win.focus()
      } else if (v.kode == 'ujian') {
        this.dialogUjian = true
      }
    },
  },
}
</script>
<style scoped>
.caption-right {
  font-weight: 400;
  float: right;
  font-size: 10pt;
}
@media all and (max-width: 480px) {
  .caption-right {
    float: left;
    margin-top: -15px;
  }
}
</style>
