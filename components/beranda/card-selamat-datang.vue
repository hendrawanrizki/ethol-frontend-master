<template>
  <v-alert
    v-show="false"
    icon="mdi-school"
    prominent
    dismissible
    color="amber accent-2"
  >
    <span>
      <strong> Pemberitahuan menjelang waktu UAS</strong>
    </span>
    <div id="alert-welcome">
      <span v-if="dosen">
        Dimohon Bapak/Ibu Dosen sudah memastikan status soal ujian telah
        tervalidasi di Online MIS agar soal dapat didownload oleh mahasiswa
        melalui ETHOL.
      </span>
      <span v-else-if="mahasiswa"
        >UAS akan dilaksanakan mulai tanggal 13 Desember 2021 s/d 17 Desember
        2021, menu UAS dapat diakses dengan cara memilih ujian online &raquo;
        UAS pada sidebar & menu dibawah.
      </span>
    </div>
  </v-alert>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState(['user']),
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
}
</script>
<style scoped>
@media all and (max-width: 480px) {
  #alert-welcome {
    display: none !important;
  }
}
</style>
