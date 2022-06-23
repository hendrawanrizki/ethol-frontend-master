<template>
  <v-container>
    <DaftarMateri />
  </v-container>
</template>
<script>
import DaftarMateri from '@/components/beranda/daftar-materi.vue'
export default {
  components: {
    DaftarMateri,
  },
  middleware: ['auth', 'mahasiswa'],
}
</script>
