<template>
  <div>
    <DetailNotifikasi />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import DetailNotifikasi from '@/components/notifikasi/detail-notifikasi-video.vue'
import waktu from '~/mixins/waktu'
export default {
  components: {
    DetailNotifikasi,
  },
  mixins: [waktu],
  middleware: ['auth', 'mahasiswa'],
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
      const nomorMhs = this.user.nomor

      if (urlId.includes(nomorMhs.toString()) == false) {
        // redirect true
        this.$router.push('/')
      }
    },
  },
}
</script>
