<template>
  <v-container>
    <Praktikum />
  </v-container>
</template>
<script>
import Praktikum from '@/components/beranda/praktikum.vue'

export default {
  components: {
    Praktikum,
  },
  middleware: ['auth', 'dosen'],
}
</script>
