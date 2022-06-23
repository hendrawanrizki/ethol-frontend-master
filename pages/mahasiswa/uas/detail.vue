<template>
  <v-container>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      rounded
      color="blue accent-2"
    ></v-progress-linear>
    <v-alert v-show="alertBerjalan && soalDitemukan" outlined type="info" text>
      Sesi ujian untuk matakuliah ini sedang berjalan.
      <br />
      Perlu Diperhatikan :
      <ol>
        <li>Anda dapat mengunduh soal ujian sekarang</li>
        <li>
          Tombol presensi & conference akan menyala setelah Dosen melakukan
          presensi.
        </li>
      </ol>
    </v-alert>
    <v-alert
      v-show="alertBerjalan && soalDitemukan == false"
      outlined
      type="info"
      text
    >
      Soal ujian tidak ditemukan untuk matakuliah ini !
    </v-alert>
    <v-alert v-show="alertSelesai" outlined type="info" text>
      Sesi ujian untuk matakuliah ini telah berakhir !
    </v-alert>
    <v-alert
      v-show="
        alertBerjalan == false &&
        soalDitemukan == false &&
        alertSelesai == false
      "
      outlined
      type="info"
      text
    >
      Ujian untuk matakuliah ini belum dimulai
    </v-alert>
    <CardHeaderDetailUjian
      ref="ref_card_header_detail_ujian"
      @statusujian="infoUjian"
    />
    <br />
    <CardBodyDetailUjianMhs ref="ref_card_body_detail_ujian_mhs" />
  </v-container>
</template>
<script>
import CardHeaderDetailUjian from '@/components/ujian/card-header-detail-ujian.vue'
import CardBodyDetailUjianMhs from '@/components/ujian/card-body-detail-ujian-mhs.vue'
import { mapState } from 'vuex'
const moment = require('moment')
moment.locale('id')
export default {
  components: {
    CardHeaderDetailUjian,
    CardBodyDetailUjianMhs,
  },
  middleware: ['auth', 'mahasiswa'],
  data() {
    return {
      loading: false,
      alertSelesai: false,
      alertBerjalan: false,
      soalDitemukan: false,
    }
  },
  computed: {
    ...mapState({
      ujian: (state) => state.modules.ujian.ujianMahasiswa,
    }),
  },
  mounted() {
    this.$refs.ref_card_header_detail_ujian.assignDataUjian(this.ujian)
    this.$refs.ref_card_body_detail_ujian_mhs.assignDataUjian(this.ujian)
  },
  methods: {
    infoUjian(v) {
      if (v.running == true) {
        if (v.urlSoal != null && v.urlSoal != '') {
          this.alertBerjalan = true
          this.alertSelesai = false
          this.soalDitemukan = true
        } else {
          this.alertBerjalan = true
          this.alertSelesai = false
          this.soalDitemukan = false
        }
      } else if (v.isDone == true && (v.urlSoal != null || v.urlSoal != '')) {
        this.alertBerjalan = false
        this.alertSelesai = true
        this.soalDitemukan = true
      }
      this.$refs.ref_card_body_detail_ujian_mhs.assignStatus(v)
    },
  },
}
</script>
