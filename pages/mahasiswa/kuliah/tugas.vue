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
        <v-col v-for="(ld, index) in listData" :key="index" cols="12" md="6">
          <CardTugas :tugas="ld" @detail="detail" />
        </v-col>
      </v-row>
      <v-row v-if="listData.length == 0 && loading == false">
        <v-col cols="12">
          <h4 style="font-weight: 400">
            Belum ada tugas yang dibuat oleh dosen !
          </h4></v-col
        >
      </v-row>
      <DialogDetailTugas
        :dialog="dialogDetailTugas"
        :tugas="tugas"
        @tutup="dialogDetailTugas = false"
        @updatejawaban="ambilData"
      />
    </v-container>
  </div>
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
  layout: 'kuliah',
  middleware: ['auth', 'mahasiswa'],
  transition: 'slide-bottom',
  data() {
    return {
      listData: [],
      loading: true,
      tugas: {},
      dialogDetailTugas: false,
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
        .get('/tugas', {
          params: {
            kuliah: this.kuliah.nomor,
            jenisSchema: this.kuliah.jenisSchema,
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
