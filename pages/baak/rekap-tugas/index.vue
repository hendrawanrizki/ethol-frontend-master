<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <RekapTugas :url-akses="urlAkses" @detail="detail"></RekapTugas>
  </v-container>
</template>
<script>
import Breadcrumb from '@/components/backend/breadcrumb.vue'
import RekapTugas from '@/components/tugas/rekap-tugas.vue'
import local from '~/service/local'

export default {
  components: {
    Breadcrumb,
    RekapTugas,
  },

  middleware: ['auth', 'baak'],
  data() {
    return {
      judulLaman: 'Rekap Tugas',
      breadcrumbItem: [
        {
          text: 'Beranda',
          disabled: false,
          exact: true,
          to: '/baak/beranda',
        },
        {
          text: 'Rekap Tugas',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      urlAkses: 'baak',
    }
  },
  methods: {
    detail(item) {
      local.setTugas(item)
      this.$router.push('/' + this.urlAkses + '/rekap-tugas/detail')
    },
  },
}
</script>
