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
        <v-col cols="12" sm="12" md="12">
          <v-btn class="primary text-none" @click="tambah">
            <v-icon small>mdi-plus-circle</v-icon>
            &nbsp; Tambah Video
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(ld, index) in listData" :key="index" cols="4">
          <CardKuliah
            :video-kuliah="ld"
            @putar="putar"
            @edit="edit"
            @hapus="hapus"
          />
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
      <DialogFormVideo
        :mode="modeForm"
        :dialog="dialogForm"
        :item-data="itemData"
        @tutup="tutupDialog"
        @refresh="ambilData"
      />
      <DialogDelete
        :dialog="dialogHapus"
        :loading="loadingDialogHapus"
        @close="sembunyikanDialogHapus"
        @delete="hapusData"
      ></DialogDelete>
    </v-container>
  </div>
</template>
<script>
import CardKuliah from '@/components/kuliah/video/card-video.vue'
import DialogLihatVideo from '@/components/kuliah/video/dialog-lihat-video.vue'
import DialogFormVideo from '@/components/kuliah/video/dialog.vue'
import DialogDelete from '@/components/utils/dialog-delete.vue'
import { mapState } from 'vuex'
import teks from '~/mixins/teks'
export default {
  components: {
    CardKuliah,
    DialogLihatVideo,
    DialogFormVideo,
    DialogDelete,
  },
  mixins: [teks],
  layout: 'kuliah',
  middleware: ['auth', 'dosen'],
  transition: 'slide-bottom',
  data() {
    return {
      listData: [],
      loading: true,
      videoKuliah: {},
      dialogLihatVideo: false,

      modeForm: 'tambah',
      dialogForm: false,
      itemData: {
        nomor: null,
        judul: '',
        url: '',
      },
      dialogHapus: false,
      loadingDialogHapus: false,
    }
  },
  computed: {
    ...mapState({
      kuliah: (state) => state.modules.kuliah.kuliahDosen,
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
    tambah() {
      this.modeForm = 'tambah'
      this.dialogForm = true
    },
    edit(v) {
      this.videoKuliah = v
      this.itemData = v
      this.modeForm = 'edit'
      this.dialogForm = true
    },
    hapus(v) {
      this.videoKuliah = v
      this.itemData = v
      this.dialogHapus = true
    },
    dialogLihatMateri() {
      this.dialogLihatVideo = false
      this.videoKuliah = {}
    },

    tutupDialog() {
      this.dialogForm = false
    },
    sembunyikanDialogHapus() {
      this.dialogHapus = false
      this.bersihkanItemData()
    },
    bersihkanItemData() {
      this.itemData = {
        nomor: null,
        judul: '',
        url: '',
      }
    },
    hapusData() {
      this.loadingDialogHapus = true
      this.$axios.delete(`/video/${this.itemData.nomor}`).then((res) => {
        if (res.data.sukses) {
          this.dialogHapus = false
          this.loadingDialogHapus = false
          this.ambilData()
          this.sembunyikanDialogHapus()
        }
      })
    },
  },
}
</script>
<style scoped>
.ethol-title-kuliah {
  margin-top: 10px !important;
}
</style>
