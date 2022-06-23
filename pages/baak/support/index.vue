<template>
  <v-container>
    <SupportComponent />
  </v-container>
</template>
<script>
import SupportComponent from '@/components/support/support-baak.vue'
export default {
  components: {
    SupportComponent,
  },
  middleware: ['auth', 'baak'],
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
