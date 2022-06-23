<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="matakuliahDipilih"
          :items="matakuliah"
          item-text="matakuliah.nama"
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
        <CardTugas :tugas="ld" @detail="detail" />
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
      @updatejawaban="ambilData"
    />
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import CardTugas from '@/components/kuliah/tugas/card-tugas.vue'
import DialogDetailTugas from '@/components/kuliah/tugas/dialog-detail-tugas-mahasiswa.vue'
const moment = require('moment')
moment.locale('id')
export default {
  components: {
    CardTugas,
    DialogDetailTugas,
  },
  middleware: ['auth', 'mahasiswa'],
  data() {
    return {
      matakuliah: [],
      matakuliahDipilih: '',
      listData: [],
      loading: false,
      tugas: {},
      dialogDetailTugas: false,
    }
  },
  computed: {
    ...mapState({
      matakuliahMahasiswa: (state) =>
        state.modules.matakuliah.matakuliahMahasiswa,
      user: (state) => state.user,
    }),
  },
  created() {
    if (this.matakuliahMahasiswa.length != 0) {
      this.matakuliah = this.matakuliahMahasiswa
      this.matakuliahDipilih = this.matakuliahMahasiswa[0].nomor
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
          for (let index = 0; index < res.data.length; index++) {
            const tugas = res.data[index]
            tugas.status_pengumpulan = 0
            if (tugas.submission_time == null) {
              tugas.status_pengumpulan = 0 // belum mengumpulkan
            } else {
              const deadlineTime = moment(tugas.deadline)
              const assignmentTime = moment(tugas.submission_time)
              const cekSelisih = deadlineTime.diff(assignmentTime, 'minutes')
              if (cekSelisih < 0) {
                tugas.status_pengumpulan = 2 // mengumpulkan terlambat
              } else {
                tugas.status_pengumpulan = 1 // mengumpulkan
              }
            }
          }
          this.listData = res.data
        })
    },
    detail(v) {
      this.tugas = v
      this.dialogDetailTugas = true
    },
  },
}
</script>
