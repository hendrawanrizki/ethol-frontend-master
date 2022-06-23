<template>
  <v-container>
    <Materi />
  </v-container>
</template>
<script>
import Materi from '@/components/beranda/materi.vue'
export default {
  components: {
    Materi,
  },
  middleware: ['auth', 'mahasiswa'],
}
</script>
