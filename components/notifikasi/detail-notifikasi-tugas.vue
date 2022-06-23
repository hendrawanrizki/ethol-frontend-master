<template>
  <div>
    <HeaderNotifikasi @loaddata="loadTugas" />
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      rounded
      color="indigo darken-1"
    ></v-progress-linear>
    <div style="padding: 15px">
      <v-row>
        <v-col v-for="(ld, index) in dataTugas" :key="index" cols="12" md="6">
          <CardTugas :tugas="ld" @detail="detail" />
        </v-col>
        <v-col v-if="dataTugas.length == 0" cols="12" md="12">
          Data tugas tidak ditemukan !
        </v-col>
      </v-row>
    </div>
    <DialogDetailTugasMahasiswa
      :dialog="dialogDetailTugasMhs"
      :tugas="tugasMhs"
      @tutup="dialogDetailTugasMhs = false"
      @updatejawaban="loadTugas"
    />
    <DialogDetailTugasDosen
      :dialog="dialogDetailTugasDsn"
      :tugas="tugasDsn"
      @tutup="dialogDetailTugasDsn = false"
    />
  </div>
</template>
<script>
import HeaderNotifikasi from '@/components/notifikasi/header-notifikasi.vue'
import CardTugas from '@/components/kuliah/tugas/card-tugas.vue'
import DialogDetailTugasMahasiswa from '@/components/kuliah/tugas/dialog-detail-tugas-mahasiswa.vue'
import { mapGetters } from 'vuex'
import DialogDetailTugasDosen from '~/components/kuliah/tugas/dialog-detail-tugas-dosen.vue'
const moment = require('moment')
moment.locale('id')
export default {
  components: {
    HeaderNotifikasi,
    CardTugas,
    DialogDetailTugasMahasiswa,
    DialogDetailTugasDosen,
  },
  data() {
    return {
      loading: false,

      tugasId: null,
      dataTugas: [],
      tugasMhs: {},
      tugasDsn: {},
      dialogDetailTugasMhs: false,
      dialogDetailTugasDsn: false,
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  methods: {
    loadTugas(v = '') {
      if (v != '') {
        this.tugasId = v
      }
      this.loading = true
      this.$axios
        .get('/tugas/by-nomor', {
          params: {
            nomorTugas: this.tugasId,
          },
        })
        .then((res) => {
          this.loading = false
          if (this.mahasiswa) {
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
          }
          this.dataTugas = res.data
        })
    },
    detail(v) {
      if (this.mahasiswa) {
        this.dialogDetailTugasMhs = true
        this.tugasMhs = v
      } else if (this.dosen) {
        this.dialogDetailTugasDsn = true
        this.tugasDsn = v
      }
    },
  },
}
</script>
<style lang="css" scoped>
.noborder,
.noborder tr,
.noborder th,
.noborder td {
  border: none !important;
  text-align: left;
  padding: 5px;
}
.kategori-notifikasi {
  color: #f97737;
  font-weight: bold;
}
</style>
