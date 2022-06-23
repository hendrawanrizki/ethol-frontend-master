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
          <v-btn class="primary text-none" @click="tambah">
            <v-icon small>mdi-plus-circle</v-icon> &nbsp; Buat Pengumuman
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(ld, index) in listData" :key="index" cols="12" md="12">
          <CardPengumuman
            :pengumuman="ld"
            @hapus="bukaDialogHapus"
            @edit="edit"
          />
        </v-col>
      </v-row>
      <v-row v-if="listData.length == 0 && loading == false">
        <v-col cols="12">
          <h4 style="font-weight: 400">
            Belum ada pengumumuman yang dibuat !
          </h4></v-col
        >
      </v-row>
      <DialogDelete
        :dialog="dialogHapus"
        :loading="loadingDialogHapus"
        @close="sembunyikanDialogHapus"
        @delete="hapusData"
      ></DialogDelete>
      <DialogBuatPengumuman
        :mode="modeForm"
        :dialog="dialogForm"
        :item-data="pengumuman"
        @tutup="tutupDialogForm"
        @refresh="ambilData"
      ></DialogBuatPengumuman>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import DialogDelete from '@/components/utils/dialog-delete.vue'
import CardPengumuman from '~/components/kuliah/pengumuman/card-pengumuman.vue'
import DialogBuatPengumuman from '~/components/kuliah/pengumuman/dialog.vue'
export default {
  components: {
    CardPengumuman,
    DialogDelete,
    DialogBuatPengumuman,
  },
  layout: 'kuliah',
  middleware: ['auth', 'dosen'],
  transition: 'slide-bottom',
  data() {
    return {
      listData: [],
      loading: true,
      pengumuman: {},
      dialogHapus: false,
      loadingDialogHapus: false,

      dialogForm: false,
      modeForm: 'tambah',

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
        .get('/pengumuman', {
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
    bukaDialogHapus(item) {
      this.pengumuman = item
      this.dialogHapus = true
    },
    sembunyikanDialogHapus() {
      this.dialogHapus = false
    },
    hapusData() {
      this.loadingDialogHapus = true
      this.$axios.delete(`/pengumuman/${this.pengumuman.nomor}`).then((res) => {
        if (res.data.sukses) {
          this.dialogHapus = false
          this.loadingDialogHapus = false
          this.ambilData()
          this.sembunyikanDialogHapus()
        }
      })
    },
    tambah() {
      this.modeForm = 'tambah'
      this.dialogForm = true
    },
    edit(v) {
      this.pengumuman = v
      this.modeForm = 'edit'
      this.dialogForm = true
    },
    tutupDialogForm() {
      this.pengumuman = {}
      this.dialogForm = false
    },
  },
}
</script>
<style scoped>
.ethol-title-kuliah {
  margin-top: 10px !important;
}
</style>
