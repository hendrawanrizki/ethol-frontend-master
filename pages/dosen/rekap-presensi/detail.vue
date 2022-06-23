<template>
  <v-container>
    <DetailPresensiHeader />
    <br />
    <DetailPresensi />
  </v-container>
</template>
<script>
import DetailPresensi from '@/components/presensi/detail-presensi.vue'
import DetailPresensiHeader from '~/components/presensi/detail-presensi-header-dosen.vue'
export default {
  components: {
    DetailPresensiHeader,
    DetailPresensi,
  },
  middleware: ['auth', 'dosen'],
  transition: 'slide-bottom',
  data() {
    return {}
  },
}
</script>
