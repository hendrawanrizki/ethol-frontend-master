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
            <v-icon small>mdi-plus-circle</v-icon>
            &nbsp; Buat Tugas
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(ld, index) in listData" :key="index" cols="12" md="6">
          <CardTugas
            :tugas="ld"
            @detail="detail"
            @edit="edit"
            @hapus="bukaDialogHapus"
          />
        </v-col>
      </v-row>
      <v-row v-if="listData.length == 0 && loading == false">
        <v-col cols="12">
          <h4 style="font-weight: 400">Belum ada tugas yang dibuat !</h4></v-col
        >
      </v-row>
      <DialogDetailTugas
        :dialog="dialogDetailTugas"
        :tugas="tugas"
        @tutup="dialogDetailTugas = false"
      />
      <DialogFormTugas
        :dialog="dialogForm"
        :tugas="tugas"
        :mode="modeForm"
        @refresh="ambilData"
        @tutup="dialogForm = false"
      />
      <DialogHapus
        :dialog="dialogHapus"
        :loading="loadingDialogHapus"
        @close="sembunyikanDialogHapus"
        @delete="hapusData"
      />
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CardTugas from '@/components/kuliah/tugas/card-tugas.vue'
import DialogFormTugas from '@/components/kuliah/tugas/dialog-form-tugas.vue'
import DialogHapus from '@/components/utils/dialog-delete.vue'
import DialogDetailTugas from '~/components/kuliah/tugas/dialog-detail-tugas-dosen.vue'
export default {
  components: {
    CardTugas,
    DialogDetailTugas,
    DialogFormTugas,
    DialogHapus,
  },
  layout: 'kuliah',
  middleware: ['auth', 'dosen'],
  transition: 'slide-bottom',
  data() {
    return {
      listData: [],
      loading: false,
      tugas: {},
      dialogDetailTugas: false,
      dialogForm: false,
      modeForm: 'tambah',
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
        .get('/tugas', {
          params: {
            kuliah: this.kuliah.nomor,
            jenisSchema: this.kuliah.jenisSchema,
          },
        })
        .then((res) => {
          this.loading = false
          this.listData = res.data
        })
    },
    detail(v) {
      this.tugas = v
      this.dialogDetailTugas = true
    },
    tambah() {
      this.tugas = {}
      this.modeForm = 'tambah'
      this.dialogForm = true
    },
    edit(v) {
      this.tugas = v
      this.modeForm = 'edit'
      this.dialogForm = true
    },
    bukaDialogHapus(item) {
      this.tugas = item
      this.dialogHapus = true
    },
    sembunyikanDialogHapus() {
      this.dialogHapus = false
      this.tugas = {}
    },
    hapusData() {
      this.loadingDialogHapus = true
      this.$axios.delete(`/tugas/${this.tugas.id}`).then((res) => {
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
