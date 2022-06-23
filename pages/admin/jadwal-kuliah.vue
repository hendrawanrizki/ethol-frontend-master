<template>
  <v-container>
    <jadwal-kuliah></jadwal-kuliah>
  </v-container>
</template>
<script>
import JadwalKuliah from '@/components/jadwal-kuliah/jadwal-kuliah.vue'
export default {
  components: {
    'jadwal-kuliah': JadwalKuliah,
  },
}
</script>
