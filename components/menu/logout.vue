<template>
  <v-list-item color="primary" @click="logout()">
    <v-list-item-action>
      <v-icon size="24">mdi-logout-variant mdi-rotate-180</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title
        class="subtitle-2 font-weight-regular"
        v-text="'Keluar'"
      />
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import Cookie from 'js-cookie'
export default {
  methods: {
    logout() {
      Cookie.remove('token')
      Cookie.remove('hakAktif')
      this.$store.dispatch('hapusToken')
      this.$store.dispatch('hapusUser')
      this.$store.dispatch('modules/matakuliah/hapus_matkul_dosen')
      this.$store.dispatch('modules/matakuliah/hapus_matkul_mahasiswa')
      this.$store.dispatch('modules/kuliah/hapus_kuliah_mahasiswa')
      this.$store.dispatch('modules/kuliah/hapus_kuliah_dosen')
      this.$store.dispatch('modules/jadwal/hapus_jadwal_mahasiswa')
      this.$store.dispatch('modules/jadwal/hapus_jadwal_dosen')
      this.$store.dispatch('modules/ruangUmum/hapus_ruang_umum')
      if (process.browser) {
        localStorage.clear()
      }
      window.open('https://ethol.pens.ac.id/cas/logout.php', '_self')
    },
  },
}
</script>
