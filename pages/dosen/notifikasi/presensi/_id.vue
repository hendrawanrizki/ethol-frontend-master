<template>
  <div>
    <DetailNotifikasi />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import DetailNotifikasi from '@/components/notifikasi/detail-notifikasi-presensi.vue'
import waktu from '~/mixins/waktu'
export default {
  components: {
    DetailNotifikasi,
  },
  mixins: [waktu],
  middleware: ['auth', 'dosen'],
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  created() {
    this.checkPath()
  },
  methods: {
    checkPath() {
      const urlId = this.$route.params.id
      const nomorDosen = this.user.nomor

      if (urlId.includes(nomorDosen.toString()) == false) {
        // redirect true
        this.$router.push('/')
      }
    },
  },
}
</script>
