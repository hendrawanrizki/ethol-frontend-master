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
        <v-col cols="12">
          <h2 class="ethol-title-kuliah">
            {{ kuliah.matakuliah ? kuliah.matakuliah.nama : '' }}
            -
            {{ kuliah.kelas }} Kelas {{ kuliah.pararel }}
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(ld, index) in listData" :key="index" cols="12" md="4">
          <CardMateri :materi="ld" @lihat="lihatMateri" />
        </v-col>
      </v-row>
      <v-row v-if="listData.length == 0 && loading == false">
        <v-col cols="12">
          <h4 style="font-weight: 400">
            Belum ada materi yang diupload !
          </h4></v-col
        >
      </v-row>
      <DialogLihatMateri
        :dialog="dialogLihatMateri"
        :materi="materi"
        @tutup="dialogLihatMateri = false"
      />
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CardMateri from '~/components/kuliah/materi/card-materi.vue'
import DialogLihatMateri from '~/components/kuliah/materi/dialog-lihat-materi.vue'
export default {
  components: {
    CardMateri,
    DialogLihatMateri,
  },
  layout: 'kuliah',
  middleware: ['auth', 'mahasiswa'],
  transition: 'slide-bottom',
  data() {
    return {
      listData: [],
      loading: true,
      dialogLihatMateri: false,
      materi: {},
      dialogHapus: false,
      loadingDialogHapus: false,

      dialogUpBaru: false,
      modeFormUpBaru: 'tambah',
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
        .get('/materi', {
          params: {
            matakuliah: this.kuliah.matakuliah.nomor,
            dosen: this.kuliah.nomor_dosen,
          },
        })
        .then((res) => {
          this.loading = false
          this.listData = res.data
        })
    },
    lihatMateri(materi) {
      this.materi = materi
      this.dialogLihatMateri = true
    },
  },
}
</script>
<style scoped>
.ethol-title-kuliah {
  margin-top: 10px !important;
}
</style>
