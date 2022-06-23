<template>
  <v-container>
    <v-card outlined>
      <v-card-title style="background-color: #ededed"> Video </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <table class="noborder" width="100%">
          <tr>
            <th width="10%">Judul</th>
            <td width="1%">:</td>
            <td>{{ videoKuliah.judul }}</td>
          </tr>
          <tr>
            <th>URL</th>
            <td>:</td>
            <td>{{ videoKuliah.url }}</td>
          </tr>
          <tr>
            <th>Thumbnail</th>
            <td>:</td>
            <td>
              <v-img
                height="200"
                width="300"
                :src="
                  videoKuliah.url.includes('drive.google')
                    ? thumbDrivedanId(videoKuliah.url)
                    : thumbYoutubedanId(videoKuliah.url)
                "
              />
            </td>
          </tr>
        </table>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          small
          class="text-none"
          @click="dialogLihatMateri = true"
        >
          <span>Buka Video</span>
        </v-btn>
      </v-card-actions>
    </v-card>
    <DialogLihatVideo
      :dialog="dialogLihatVideo"
      :video-kuliah="videoKuliah"
      :show-matkul="false"
      @tutup="dialogLihatVideo = false"
    />
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import DialogLihatVideo from '@/components/kuliah/video/dialog-lihat-video.vue'
export default {
  components: {
    DialogLihatVideo,
  },
  middleware: ['auth'],
  data() {
    return {
      dialogLihatVideo: false,
      videoKuliah: {
        url: '',
      },
      youtubeId: '',
      driveId: '',
    }
  },
  head() {
    return {
      title: `Akses Video `,
      meta: [
        {
          hid: `${process.env.BRAND_SINGKATAN} Video `,
          name: `${process.env.BRAND_SINGKATAN} Video `,
          content: `Akses cepat ke Video ${process.env.BRAND_SINGKATAN} PENS `,
        },
        {
          property: 'og:title',
          content: `${process.env.BRAND_SINGKATAN} Video `,
        },
        {
          property: 'og:description',
          content: `Akses cepat ke Video ${process.env.BRAND_SINGKATAN} PENS `,
        },
      ],
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  mounted() {
    const { preview } = this.$route.query
    const nomorVideo = window.atob(preview)
    this.$axios
      .get(`/video/by-nomor/`, {
        params: {
          nomorVideo,
        },
      })
      .then((res) => {
        this.videoKuliah = res.data[0]
        this.dialogLihatVideo = true
      })
  },
  methods: {
    thumbYoutubedanId(url) {
      const videoId = this.getYoutubeId(url)
      this.videoKuliah.youtubeId = videoId
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    },
    thumbDrivedanId(url) {
      const videoId = this.getGoogleDriveId(url)
      this.videoKuliah.driveId = videoId
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
  },
}
</script>
<style lang="css" scoped>
.noborder,
.noborder tr,
.noborder th,
.noborder td {
  border: none !important;
  text-align: left;
  padding: 5px;
}
</style>
