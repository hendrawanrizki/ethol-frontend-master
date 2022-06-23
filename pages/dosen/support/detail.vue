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
  middleware: ['auth', 'dosen'],
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
