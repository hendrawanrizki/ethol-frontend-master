<template>
  <v-container>
    <DetailSupport />
  </v-container>
</template>
<script>
import DetailSupport from '@/components/support/detailSupport.vue'
export default {
  components: {
    DetailSupport,
  },
  middleware: ['auth', 'mahasiswa'],
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
