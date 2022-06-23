<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <DetailPresensiHeader />
    <br />
    <DetailPresensi />
  </v-container>
</template>
<script>
import DetailPresensiHeader from '@/components/presensi/detail-presensi-header.vue'
import DetailPresensi from '@/components/presensi/detail-presensi.vue'
import Breadcrumb from '@/components/backend/breadcrumb.vue'
export default {
  components: {
    Breadcrumb,
    DetailPresensiHeader,
    DetailPresensi,
  },
  data() {
    return {
      judulLaman: 'Detail Rekap Presensi',
      breadcrumbItem: [
        {
          text: 'Beranda',
          disabled: false,
          exact: true,
          to: '/baak/beranda',
        },
        {
          text: 'Rekap Presensi',
          disabled: false,
          exact: true,
          to: '/baak/rekap-presensi',
        },
        {
          text: 'Detail',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
    }
  },
}
</script>
