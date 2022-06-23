<template>
  <div>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      rounded
      color="blue accent-2"
    ></v-progress-linear>
    <v-container>
      <v-row class="row-title-kuliah">
        <v-col cols="11">
          <h2 class="ethol-title-kuliah">
            {{ kuliah.matakuliah ? kuliah.matakuliah.nama : '' }}
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(ld, index) in listData" :key="index" cols="4">
          <CardKuliah :video-kuliah="ld" @putar="putar" />
        </v-col>
      </v-row>
      <v-row v-if="listData.length == 0 && loading == false">
        <v-col cols="12">
          <h4 style="font-weight: 400">
            Belum ada video yang diupload !
          </h4></v-col
        >
      </v-row>
      <DialogLihatVideo
        :dialog="dialogLihatVideo"
        :video-kuliah="videoKuliah"
        @tutup="dialogLihatVideo = false"
      />
    </v-container>
  </div>
</template>
<script>
import CardKuliah from '@/components/kuliah/video/card-video.vue'
import DialogLihatVideo from '@/components/kuliah/video/dialog-lihat-video.vue'
import { mapState } from 'vuex'
import teks from '~/mixins/teks'
export default {
  components: {
    CardKuliah,
    DialogLihatVideo,
  },
  mixins: [teks],
  layout: 'kuliah',
  middleware: ['auth', 'mahasiswa'],
  transition: 'slide-bottom',
  data() {
    return {
      listData: [],
      loading: true,
      videoKuliah: {},
      dialogLihatVideo: false,
    }
  },
  computed: {
    ...mapState({
      kuliah: (state) => state.modules.kuliah.kuliahMahasiswa,
      user: (state) => state.user,
    }),
  },
  mounted() {
    this.ambilData()
  },
  methods: {
    ambilData() {
      this.loading = true
      this.$axios
        .get('/video', {
          params: {
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
          },
        })
        .then((res) => {
          this.loading = false
          this.listData = res.data
        })
    },
    putar(v) {
      this.videoKuliah = v
      this.dialogLihatVideo = true
    },
    dialogLihatMateri() {
      this.dialogLihatVideo = false
      this.videoKuliah = {}
    },
  },
}
</script>
<style scoped>
.ethol-title-kuliah {
  margin-top: 10px !important;
}
</style>
