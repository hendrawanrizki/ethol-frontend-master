<template>
  <v-container>
    <v-card v-if="dataTugas.length != 0" outlined>
      <v-card-title style="background-color: #ededed"> Tugas </v-card-title>
      <v-card-subtitle style="background-color: #ededed">
        Matakuliah : {{ dataTugas[0].matakuliah }}
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <table class="noborder" width="100%">
          <tr>
            <th width="10%">Judul</th>
            <td width="1%">:</td>
            <td>{{ dataTugas[0].title }}</td>
          </tr>
          <tr>
            <th width="10%">Keterangan</th>
            <td width="1%">:</td>
            <td>{{ dataTugas[0].description }}</td>
          </tr>
          <tr>
            <th>Deadline</th>
            <td>:</td>
            <td>{{ dataTugas[0].deadline_indonesia }}</td>
          </tr>
        </table>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" small class="text-none" @click="bukaTugas()">
          <span>Buka Tugas</span>
        </v-btn>
      </v-card-actions>
    </v-card>
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
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import DialogDetailTugasMahasiswa from '@/components/kuliah/tugas/dialog-detail-tugas-mahasiswa.vue'
import DialogDetailTugasDosen from '~/components/kuliah/tugas/dialog-detail-tugas-dosen.vue'
const moment = require('moment')
moment.locale('id')
export default {
  components: { DialogDetailTugasMahasiswa, DialogDetailTugasDosen },
  middleware: ['auth'],
  data() {
    return {
      dialogDetailTugasMhs: false,
      tugasMhs: {},
      dialogDetailTugasDsn: false,
      tugasDsn: {},
      dataTugas: [],
    }
  },
  head() {
    return {
      title: `Akses Materi `,
      meta: [
        {
          hid: `${process.env.BRAND_SINGKATAN} Materi `,
          name: `${process.env.BRAND_SINGKATAN} Materi `,
          content: `Akses cepat ke Materi ${process.env.BRAND_SINGKATAN} PENS `,
        },
        {
          property: 'og:title',
          content: `${process.env.BRAND_SINGKATAN} Materi `,
        },
        {
          property: 'og:description',
          content: `Akses cepat ke Materi ${process.env.BRAND_SINGKATAN} PENS `,
        },
      ],
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      ...mapGetters(['dosen', 'mahasiswa']),
    }),
  },
  mounted() {
    const { preview } = this.$route.query
    const nomorTugas = window.atob(preview)
    this.$axios
      .get('/tugas/by-nomor', {
        params: {
          nomorTugas,
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
        if (this.mahasiswa) {
          this.tugasMhs = this.dataTugas[0]
          this.dialogDetailTugasMhs = true
        } else if (this.dosen) {
          this.tugasDsn = this.dataTugas[0]
          this.dialogDetailTugasDsn = true
        }
      })
  },
  methods: {
    loadTugas() {},
    bukaTugas() {
      if (this.mahasiswa) {
        this.dialogDetailTugasMhs = true
      } else if (this.dosen) {
        this.dialogDetailTugasDsn = true
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
</style>
