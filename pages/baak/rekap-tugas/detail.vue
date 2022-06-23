<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <DetailTugasHeader />
    <br />
    <DetailTugas />
  </v-container>
</template>
<script>
import DetailTugas from '@/components/tugas/detail-tugas.vue'
import Breadcrumb from '@/components/backend/breadcrumb.vue'
import DetailTugasHeader from '~/components/tugas/detail-tugas-header.vue'
export default {
  components: {
    Breadcrumb,
    DetailTugasHeader,
    DetailTugas,
  },
  data() {
    return {
      judulLaman: 'Detail Rekap Tugas',
      breadcrumbItem: [
        {
          text: 'Beranda',
          disabled: false,
          exact: true,
          to: '/baak/beranda',
        },
        {
          text: 'Rekap Tugas',
          disabled: false,
          exact: true,
          to: '/baak/rekap-tugas',
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
