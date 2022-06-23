<template>
  <div>
    <v-card>
      <v-toolbar
        dark
        color="rgb(11, 102, 139)"
        height="50"
        style="border-radius: 0px !important"
      >
        <v-toolbar-title>
          <span v-show="jumlahNotifikasi != 0"> ({{ jumlahNotifikasi }}) </span>
          Pemberitahuan
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="tutupDrawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-divider></v-divider>
    </v-card>
    <div style="padding: 10px !important">
      <v-row>
        <v-col cols="12" md="12" style="padding-bottom: 0px">
          <v-select v-model="notifDipilih" filled :items="filterNotif">
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(aetl, index) in arrEmptyThumbnailLoading"
          v-show="loadingNotifikasi == true"
          :key="index"
          style="border-bottom: 0.5px solid #dddddd"
          cols="12"
        >
          <ContentLoader height="100">
            <rect x="0" y="0" rx="3" ry="3" width="130" height="15" />
            <rect x="0" y="30" rx="3" ry="3" width="500" height="15" />
            <rect x="0" y="55" rx="3" ry="3" width="300" height="15" />
            <rect x="0" y="85" rx="3" ry="3" width="130" height="10" />
          </ContentLoader>
        </v-col>
      </v-row>
      <v-row v-show="loadingNotifikasi == false">
        <v-col
          v-for="(dn, index) in dataNotifikasi"
          :key="index"
          style="border-bottom: 0.5px solid #dddddd"
          cols="12"
          class="hover-notifikasi"
          :class="dn.status == '1' ? 'belumbaca-notifikasi' : ''"
          @click="tujuan(dn.idNotifikasi, dn.status, dn.urlWeb)"
        >
          <CardNotifikasi :notif="dn" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import CardNotifikasi from '@/components/notifikasi/card-notifikasi.vue'
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    CardNotifikasi,
    ContentLoader,
  },
  data() {
    return {
      filterNotif: ['Semua', 'Materi', 'Presensi', 'Tugas', 'Video'],
      notifDipilih: 'Tugas',
      dataNotifikasi: [],
      jumlahNotifikasi: 0,
      loadingNotifikasi: false,
      arrEmptyThumbnailLoading: ['', '', '', '', '', ''],
    }
  },
  computed: {
    ...mapGetters(['dosen', 'mahasiswa']),
    ...mapState(['user']),
  },
  watch: {
    notifDipilih(v) {
      this.getNotifikasi()
    },
  },
  created() {
    this.getJumlahNotifikasi()
    this.getNotifikasi()
  },
  methods: {
    tutupDrawer() {
      this.$emit('close')
    },
    getJumlahNotifikasi() {
      const self = this
      let url
      if (this.dosen) {
        url = '/notifikasi/dosen-belum-baca'
      } else if (this.mahasiswa) {
        url = '/notifikasi/mahasiswa-belum-baca'
      }
      this.$axios.$get(url).then((res) => {
        this.jumlahNotifikasi = res.jumlah
        self.$emit('jumlah', res.jumlah)
      })
    },
    getNotifikasi() {
      this.dataNotifikasi = []
      this.loadingNotifikasi = true
      let url
      if (this.dosen) {
        url = '/notifikasi/dosen'
      } else if (this.mahasiswa) {
        url = '/notifikasi/mahasiswa'
      }
      this.$axios
        .$get(url, {
          params: {
            filterNotif: this.notifDipilih.toUpperCase(),
          },
        })
        .then((res) => {
          this.dataNotifikasi = res
        })
        .finally(() => (this.loadingNotifikasi = false))
    },
    async tujuan(idNotif, status, urlWeb) {
      if (status == '1') {
        const self = this
        if (this.mahasiswa) {
          await this.$axios
            .put('/notifikasi/mahasiswa-baca-notif', {
              idNotifikasi: idNotif,
            })
            .then((response) => {
              this.jumlahNotifikasi = this.jumlahNotifikasi - 1
              self.$emit('jumlah', this.jumlahNotifikasi)
              self.$emit('fungsidrawer', false)
              this.getNotifikasi()
            })
        } else if (this.dosen) {
          await this.$axios
            .put('/notifikasi/dosen-baca-notif', {
              idNotifikasi: idNotif,
            })
            .then((response) => {
              this.jumlahNotifikasi = this.jumlahNotifikasi - 1
              self.$emit('jumlah', this.jumlahNotifikasi)
              self.$emit('fungsidrawer', false)
              this.getNotifikasi()
            })
        }
      }
      this.$emit('fungsidrawer', false)
      let url
      if (this.dosen) {
        url = '/dosen'
      } else if (this.mahasiswa) {
        url = '/mahasiswa'
      }
      this.$router.push(url + urlWeb)
    },
  },
}
</script>
<style scoped>
.hover-notifikasi:hover {
  cursor: pointer;
  background-color: rgb(248, 248, 248) !important;
}
.belumbaca-notifikasi {
  background-color: aliceblue;
}
</style>
