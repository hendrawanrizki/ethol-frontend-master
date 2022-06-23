<template>
  <v-container>
    <CardSelamatDatang />
    <v-spacer></v-spacer>
    <v-row>
      <v-col cols="12" md="3">
        <h3 style="margin-left: 2px">Matakuliah</h3>
      </v-col>
      <v-col cols="12" md="9">
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
import EtholMenu from '@/components/beranda/ethol-menu.vue'
import { mapState } from 'vuex'
import DialogSurveiPenilaian from '@/components/survei/dialog-survei-penilaian.vue'
import DialogPilihUjian from '@/components/ujian/dialog-pilih-ujian.vue'
import DialogKelasVirtual from '~/components/beranda/dialog-kelas-virtual.vue'
import SlideKuliah from '~/components/kuliah/slide-kuliah.vue'
import SlideLoadingKuliah from '~/components/kuliah/slide-loading-kuliah.vue'
import waktu from '~/mixins/waktu'
export default {
  components: {
    CardSelamatDatang,
    SlideKuliah,
    EtholMenu,
    DialogKelasVirtual,
    SlideLoadingKuliah,
    DialogSurveiPenilaian,
    DialogPilihUjian,
  },
  mixins: [waktu],
  middleware: ['auth', 'dosen'],
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

      dialogKelasVir: false,

      dialogSurvei: false,
      dialogUjian: false,
      userAgent: null,
      idToken: null,
    }
  },
  computed: {
    ...mapState({
      matakuliahDosen: (state) => state.modules.matakuliah.matakuliahDosen,
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
    // if (this.matakuliahDosen.length == 0) {
    //   this.ambilDataMatKul()
    // } else {
    //   this.matakuliah = this.matakuliahDosen
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
        .post('/fcm/token-dosen', {
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
        this.ambilHariKuliahIn(matakuliah, kuliahs)
      })
    },
    ambilHariKuliahIn(matakuliah, kuliahs) {
      this.$axios
        .$post('/kuliah/hari-kuliah-in', {
          kuliahs,
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
            'modules/matakuliah/simpan_matkul_dosen',
            matakuliah
          )
        })
    },
    pilihMenu(v) {
      if (v.kode == 'kelas-virtual') {
        this.dialogKelasVir = true
      } else if (v.kode == 'matkul-perkuliahan') {
        this.$router.push('/dosen/materi-perkuliahan')
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
        this.$router.push('/dosen/praktikum')
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
