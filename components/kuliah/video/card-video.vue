<template>
  <v-card outlined>
    <v-img
      height="200"
      :src="
        videoKuliah.url.includes('drive.google')
          ? thumbDrivedanId(videoKuliah.url)
          : thumbYoutubedanId(videoKuliah.url)
      "
    />
    <v-card-text>
      <span class="subtitle-2">{{ videoKuliah.judul }}</span>
      <br />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer />
      <v-btn small dark text class="text-none blue" @click="putar(videoKuliah)">
        <v-icon left size="18">mdi-play</v-icon>
        Putar
      </v-btn>
      <v-btn
        v-if="dosen"
        small
        color="grey"
        outlined
        @click="copyLink(videoKuliah)"
      >
        <v-icon left size="18"> mdi-content-copy </v-icon>
      </v-btn>
      <v-btn
        v-if="dosen"
        small
        color="warning"
        outlined
        @click="edit(videoKuliah)"
      >
        <v-icon left size="18"> mdi-pencil </v-icon>
      </v-btn>
      <v-btn
        v-if="dosen"
        small
        color="error"
        outlined
        @click="hapus(videoKuliah)"
      >
        <v-icon left size="18"> mdi-delete </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import teks from '~/mixins/teks'
export default {
  mixins: [teks],
  props: {
    videoKuliah: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      youtubeId: '',
      driveId: '',
    }
  },
  computed: {
    ...mapGetters(['dosen']),
  },
  methods: {
    lihatVideo(video) {
      this.$emit('lihat', video)
    },
    hapusVideo(video) {
      this.$emit('hapus', video)
    },
    async copyLink(v) {
      try {
        const urlnya =
          process.env.SHARE_URL +
          '/video?preview=' +
          window.btoa(v.nomor.toString())
        await this.$copyText(urlnya)
        alert('Link berhasil disalin !')
      } catch (e) {
        console.error(e)
      }
    },
    thumbYoutubedanId(url) {
      const videoId = this.getYoutubeId(url)
      this.youtubeId = videoId
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    },
    thumbDrivedanId(url) {
      const videoId = this.getGoogleDriveId(url)
      this.driveId = videoId
      return `/drive.png`
    },
    getYoutubeId(url) {
      let ID = ''
      url = url
        .replace(/(>|<)/gi, '')
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      if (url[2] !== undefined) {
        // eslint-disable-next-line no-useless-escape
        ID = url[2].split(/[^0-9a-z_\-]/i)
        ID = ID[0]
      } else {
        ID = url
      }
      return ID
    },
    getGoogleDriveId(url) {
      let id = ''
      const parts = url.split(
        // eslint-disable-next-line no-useless-escape
        /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
      )
      if (url.includes('?id=')) {
        id = parts[6].split('=')[1].replace('&usp', '')
        return id
      } else {
        id = parts[5].split('/')
        // Using sort to get the id as it is the longest element.
        const sortArr = id.sort(function (a, b) {
          return b.length - a.length
        })
        id = sortArr[0]
        return id
      }
    },
    putar(v) {
      v.youtubeId = this.youtubeId
      v.driveId = this.driveId
      this.$emit('putar', v)
    },
    edit(v) {
      this.$emit('edit', v)
    },
    hapus(v) {
      this.$emit('hapus', v)
    },
  },
}
</script>
