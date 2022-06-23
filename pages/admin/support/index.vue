<template>
  <v-container>
    <SupportComponent />
  </v-container>
</template>
<script>
import SupportComponent from '@/components/support/support-admin.vue'
export default {
  components: {
    SupportComponent,
  },
  middleware: ['auth', 'admin'],
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
