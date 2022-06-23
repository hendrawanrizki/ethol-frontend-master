<template>
  <div>
    <HeaderNotifikasi @loaddata="loadMateri" />
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      rounded
      color="indigo darken-1"
    ></v-progress-linear>
    <div style="padding: 15px">
      <v-row>
        <v-col v-for="(ld, index) in dataMateri" :key="index" cols="12" md="4">
          <CardMateri :materi="ld" @lihat="lihatMateri" />
        </v-col>
      </v-row>
      <v-row v-if="dataMateri.length == 0 && loading == false">
        <v-col cols="12">
          <h4 style="font-weight: 400">Materi tidak ditemukan !</h4></v-col
        >
      </v-row>
      <DialogLihatMateri
        :dialog="dialogLihatMateri"
        :materi="materi"
        :show-matkul="false"
        @tutup="dialogLihatMateri = false"
      />
    </div>
  </div>
</template>
<script>
import HeaderNotifikasi from '@/components/notifikasi/header-notifikasi.vue'
import CardMateri from '~/components/kuliah/materi/card-materi.vue'
import DialogLihatMateri from '~/components/kuliah/materi/dialog-lihat-materi.vue'
export default {
  components: {
    HeaderNotifikasi,
    CardMateri,
    DialogLihatMateri,
  },
  data() {
    return {
      loading: false,
      materiId: '',
      dataMateri: [],

      materi: {},
      dialogLihatMateri: false,
    }
  },
  methods: {
    loadMateri(v = '') {
      if (v != '') {
        this.materiId = v
      }
      this.loading = true
      this.$axios
        .get('/materi/by-nomor', {
          params: {
            nomorMateri: this.materiId,
          },
        })
        .then((res) => {
          this.loading = false
          this.dataMateri = res.data
        })
    },
    lihatMateri(materi) {
      this.materi = materi
      this.dialogLihatMateri = true
    },
  },
}
</script>
