<template>
  <v-container>
    <SupportComponent />
  </v-container>
</template>
<script>
import SupportComponent from '@/components/support/support.vue'
export default {
  components: {
    SupportComponent,
  },
  middleware: ['auth', 'mahasiswa'],
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
