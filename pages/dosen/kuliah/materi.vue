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
        <v-col cols="12" sm="12" md="12">
          <v-menu offset-y>
            <template #activator="{ on }">
              <v-btn class="primary text-none" v-on="on">
                Upload Materi
                <v-icon class="ml-3">mdi-folder-upload</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="uploadMateriBaru()">
                <v-list-item-title>Baru</v-list-item-title>
              </v-list-item>
              <v-list-item @click="uploadMateriSebelumnya()">
                <v-list-item-title>Materi Sebelumnya</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(ld, index) in listData" :key="index" cols="12" md="4">
          <CardMateri
            :materi="ld"
            @lihat="lihatMateri"
            @hapus="bukaDialogHapus"
          />
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
      <DialogDelete
        :dialog="dialogHapus"
        :loading="loadingDialogHapus"
        @close="sembunyikanDialogHapus"
        @delete="hapusData"
      ></DialogDelete>
      <DialogUploadMateriBaru
        :mode="modeFormUpBaru"
        :dialog="dialogUpBaru"
        :item-data="materi"
        @tutup="tutupDialogUpBaru"
        @refresh="ambilData"
      ></DialogUploadMateriBaru>
      <DialogUploadMateriSebelumnya
        :dialog="dialogUpSebelumnya"
        :materi-exist="listData"
        @tutup="tutupDialogUpSebelumnya"
        @refresh="ambilData"
      ></DialogUploadMateriSebelumnya>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import DialogDelete from '@/components/utils/dialog-delete.vue'
import CardMateri from '~/components/kuliah/materi/card-materi.vue'
import DialogLihatMateri from '~/components/kuliah/materi/dialog-lihat-materi.vue'
import DialogUploadMateriBaru from '~/components/kuliah/materi/dialog-upload-materi-baru.vue'
import DialogUploadMateriSebelumnya from '~/components/kuliah/materi/dialog-upload-materi-sebelumnya.vue'
export default {
  components: {
    CardMateri,
    DialogLihatMateri,
    DialogDelete,
    DialogUploadMateriBaru,
    DialogUploadMateriSebelumnya,
  },
  layout: 'kuliah',
  middleware: ['auth', 'dosen'],
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

      dialogUpSebelumnya: false,
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
        .get('/materi', {
          params: {
            matakuliah: this.kuliah.matakuliah.nomor,
            dosen: this.user.nomor,
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
    bukaDialogHapus(item) {
      this.materi = item
      this.dialogHapus = true
    },
    sembunyikanDialogHapus() {
      this.dialogHapus = false
    },
    hapusData() {
      this.loadingDialogHapus = true
      this.$axios.delete(`/materi/${this.materi.id}`).then((res) => {
        if (res.data.sukses) {
          this.dialogHapus = false
          this.loadingDialogHapus = false
          this.ambilData()
          this.sembunyikanDialogHapus()
        }
      })
    },
    uploadMateriBaru() {
      this.dialogUpBaru = true
    },
    tutupDialogUpBaru() {
      this.dialogUpBaru = false
    },
    uploadMateriSebelumnya() {
      this.dialogUpSebelumnya = true
    },
    tutupDialogUpSebelumnya() {
      this.dialogUpSebelumnya = false
    },
  },
}
</script>
<style scoped>
.ethol-title-kuliah {
  margin-top: 10px !important;
}
</style>
