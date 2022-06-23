<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="matakuliahDipilih"
          :items="matakuliah"
          item-text="ket_text"
          item-value="nomor"
          label="Kuliah"
          outlined
          :disabled="loading"
          @change="ambilData"
        ></v-select>
      </v-col>
      <v-col cols="12" md="1">
        <v-progress-circular
          v-show="loading"
          style="margin-top: 10px"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="listData != 0">
      <v-col v-for="(ld, index) in listData" :key="index" cols="12" md="6">
        <CardTugas
          :tugas="ld"
          @detail="detail"
          @edit="edit"
          @hapus="bukaDialogHapus"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-show="loading == false" cols="12">
        <span class="subtitle-1" style="margin-top: -10px; margin-left: 2px">
          Tugas tidak ditemukan !
        </span>
      </v-col>
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
</template>
<script>
import { mapState } from 'vuex'
import CardTugas from '@/components/kuliah/tugas/card-tugas.vue'
import DialogHapus from '@/components/utils/dialog-delete.vue'
import DialogFormTugas from '@/components/kuliah/tugas/dialog-form-tugas.vue'
import DialogDetailTugas from '~/components/kuliah/tugas/dialog-detail-tugas-dosen.vue'
export default {
  components: {
    CardTugas,
    DialogDetailTugas,
    DialogFormTugas,
    DialogHapus,
  },
  middleware: ['auth', 'dosen'],
  data() {
    return {
      matakuliah: [],
      matakuliahDipilih: '',
      listData: [],
      loading: false,
      tugas: {},
      dialogForm: false,
      dialogDetailTugas: false,
      modeForm: 'tambah',
      dialogHapus: false,
      loadingDialogHapus: false,
    }
  },
  computed: {
    ...mapState({
      matakuliahDosen: (state) => state.modules.matakuliah.matakuliahDosen,
      user: (state) => state.user,
    }),
  },
  mounted() {
    if (this.matakuliahDosen.length != 0) {
      this.matakuliahDosen.forEach((element) => {
        element.ket_text =
          element.matakuliah.nama +
          ' (' +
          element.kelas +
          ' ' +
          element.pararel +
          ')'
      })
      this.matakuliah = this.matakuliahDosen
      this.matakuliahDipilih = this.matakuliahDosen[0].nomor
      this.ambilData()
    }
  },
  methods: {
    ambilData() {
      this.loading = true
      let jenisSchema = 0
      for (let index = 0; index < this.matakuliah.length; index++) {
        const element = this.matakuliah[index]
        if (this.matakuliahDipilih == element.nomor) {
          jenisSchema = element.jenisSchema
        }
      }
      this.$axios
        .get('/tugas', {
          params: {
            kuliah: this.matakuliahDipilih,
            jenisSchema,
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
