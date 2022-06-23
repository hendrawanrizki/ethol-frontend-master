<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <RekapPresensi
      :url-akses="urlAkses"
      @detail="detailPresensi"
    ></RekapPresensi>
  </v-container>
</template>
<script>
import Breadcrumb from '@/components/backend/breadcrumb.vue'
import RekapPresensi from '@/components/presensi/rekap-presensi.vue'
import local from '~/service/local'

export default {
  components: {
    Breadcrumb,
    RekapPresensi,
  },

  middleware: ['auth', 'baak'],
  data() {
    return {
      judulLaman: 'Rekap Presensi',
      breadcrumbItem: [
        {
          text: 'Beranda',
          disabled: false,
          exact: true,
          to: '/baak/beranda',
        },
        {
          text: 'Rekap Presensi',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      urlAkses: 'baak',
    }
  },
  methods: {
    detailPresensi(item) {
      local.setPresensi(item)
      this.$router.push('/' + this.urlAkses + '/rekap-presensi/detail')
    },
  },
}
</script>
