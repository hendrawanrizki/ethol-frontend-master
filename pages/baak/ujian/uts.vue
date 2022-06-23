<template>
  <v-container>
    <Jadwal :mode="modeJadwal" />
  </v-container>
</template>

<script>
import Jadwal from '@/components/ujian/list-jadwal.vue'
export default {
  components: {
    Jadwal,
  },
  middleware: ['auth', 'baak'],
  data() {
    return {
      modeJadwal: 'uts',
    }
  },
}
</script>
