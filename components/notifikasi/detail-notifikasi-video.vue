<template>
  <div>
    <HeaderNotifikasi @loaddata="loadVideo" />
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      rounded
      color="indigo darken-1"
    ></v-progress-linear>
    <div style="padding: 15px">
      <v-row>
        <v-col v-for="(ld, index) in dataVideo" :key="index" cols="12" md="4">
          <CardKuliah :video-kuliah="ld" @putar="putar" />
        </v-col>
      </v-row>
      <v-row v-if="dataVideo.length == 0 && loading == false">
        <v-col cols="12">
          <h4 style="font-weight: 400">Video tidak ditemukan !</h4></v-col
        >
      </v-row>
    </div>
    <DialogLihatVideo
      :dialog="dialogLihatVideo"
      :video-kuliah="videoKuliah"
      :show-matkul="false"
      @tutup="dialogLihatVideo = false"
    />
  </div>
</template>
<script>
import HeaderNotifikasi from '@/components/notifikasi/header-notifikasi.vue'
import CardKuliah from '@/components/kuliah/video/card-video.vue'
import DialogLihatVideo from '@/components/kuliah/video/dialog-lihat-video.vue'
export default {
  components: {
    HeaderNotifikasi,
    CardKuliah,
    DialogLihatVideo,
  },
  data() {
    return {
      loading: false,
      videoId: '',
      dataVideo: [],

      videoKuliah: {},
      dialogLihatVideo: false,
    }
  },
  methods: {
    loadVideo(v = '') {
      if (v != '') {
        this.videoId = v
      }
      this.loading = true
      this.$axios
        .get('/video/by-nomor', {
          params: {
            nomorVideo: this.videoId,
          },
        })
        .then((res) => {
          this.loading = false
          this.dataVideo = res.data
        })
    },
    putar(v) {
      this.videoKuliah = v
      this.dialogLihatVideo = true
    },
  },
}
</script>
