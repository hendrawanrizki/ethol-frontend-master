<template>
  <v-container>
    <BuatSupport />
  </v-container>
</template>
<script>
import BuatSupport from '@/components/support/buatSupport.vue'
export default {
  components: {
    BuatSupport,
  },
  middleware: ['auth', 'mahasiswa'],
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
