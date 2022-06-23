<template>
  <v-container>
    <v-row>
      <v-col v-if="pengumumanTerbaru.length != 0" cols="12">
        <v-alert
          icon="mdi-information"
          outlined
          color="teal darken-2"
          prominent
          dismissible
        >
          <h3>{{ pengumumanTerbaru[0].judul }}</h3>
          <span class="subtitle-1">{{
            pengumumanTerbaru[0].isi_pengumuman
          }}</span>
        </v-alert>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined height="100%">
          <v-card-title>
            <h3 class="ethol-title-kuliah">
              {{ kuliah.matakuliah ? kuliah.matakuliah.nama : '' }}
            </h3>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12" sm="12">
                <table class="table-noborder">
                  <tr>
                    <th>NIP</th>
                    <td>: {{ kuliah.nip_dosen }}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th>Nama Dosen</th>
                    <td>
                      :
                      {{
                        hapusStringNull(kuliah.gelar_dpn) +
                        ' ' +
                        hapusStringNull(kuliah.dosen) +
                        ' ' +
                        hapusStringNull(kuliah.gelar_blk)
                      }}
                    </td>
                    <td></td>
                  </tr>
                  <tr
                    v-if="
                      Object.prototype.hasOwnProperty.call(kuliah, 'jadwal') &&
                      kuliah.jadwal.length != 0
                    "
                  >
                    <th>Jadwal</th>
                    <td>
                      <div style="padding-top: 10px; padding-bottom: 10px">
                        <span class="subtitle-1">
                          &nbsp;
                          <v-icon small>mdi-calendar</v-icon> &nbsp;
                          {{
                            kuliah.jadwal[0].hari +
                            ' (' +
                            kuliah.jadwal[0].jam_awal +
                            ' - ' +
                            kuliah.jadwal[0].jam_akhir +
                            ')'
                          }}
                        </span>
                        <br />
                        <span class="subtitle-1">
                          &nbsp;
                          <v-icon small>mdi-video</v-icon> &nbsp;
                          {{ kuliah.jadwal[0].ruang }}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div
                        v-if="kuliah.jadwal.length == 2"
                        style="padding-top: 10px; padding-bottom: 10px"
                      >
                        <span class="subtitle-1">
                          &nbsp;
                          <v-icon small>mdi-calendar</v-icon> &nbsp;
                          {{
                            kuliah.jadwal[1].hari +
                            ' (' +
                            kuliah.jadwal[1].jam_awal +
                            ' - ' +
                            kuliah.jadwal[1].jam_akhir +
                            ')'
                          }}
                        </span>
                        <br />
                        <span class="subtitle-1">
                          &nbsp;
                          <v-icon small>mdi-video</v-icon> &nbsp;
                          {{ kuliah.jadwal[1].ruang }}
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Presensi Dosen terakhir</th>
                    <td>
                      :
                      {{
                        presensiTerakhir ? presensiTerakhir.tanggal_format : ''
                      }}
                    </td>
                  </tr>
                </table>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="7">
                <v-btn
                  small
                  color="primary"
                  block
                  :disabled="
                    !presensiAktif || sudahPresensi || loadingSimpanPresensi
                  "
                  :loading="loadingSimpanPresensi"
                  @click="simpanPresensi()"
                >
                  Presensi
                </v-btn>
                <br />
                <v-btn
                  small
                  color="error"
                  block
                  text
                  @click="dialogAturanPresensi = true"
                  >Aturan Presensi</v-btn
                >
              </v-col>
              <v-col cols="12" md="5">
                <form style="width: 100%" :action="bbbUrl" method="POST">
                  <input type="hidden" name="meeting" :value="roomConference" />
                  <input type="hidden" name="name" :value="user.nama" />
                  <input type="hidden" name="role" :value="2" />
                  <v-btn
                    small
                    color="info"
                    class="text-none"
                    type="submit"
                    block
                    :disabled="!meetAktif || !bbbUrl || !sudahPresensi"
                  >
                    <v-icon>mdi-video</v-icon> &nbsp; Conference ETHOL &nbsp;
                  </v-btn>
                </form>
                <br />
                <v-btn
                  small
                  color="info"
                  outlined
                  class="text-none"
                  block
                  :disabled="!meetAktif || !sudahPresensi"
                  @click="joinAlternative"
                >
                  <v-icon>mdi-video</v-icon> &nbsp; Conference Lainnya
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined height="100%">
          <v-card-title>
            <h5>History Presensi</h5>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="[
                {
                  text: 'ID',
                  value: 'nomor',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Tanggal',
                  value: 'waktu_indonesia',
                  sortable: true,
                  class: 'ethol-th-table',
                },
              ]"
              :items="listDataPresensi"
              :items-per-page="5"
              class="elevation-1"
              :loading="loadingPresensi"
              :search="searchPresensi"
              loading-text="Loading... Tunggu Sebentar"
            >
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>Peserta Kuliah</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="searchPesertaKuliah"
                  style="margin-top: 15px"
                  prepend-inner-icon="mdi-magnify"
                  placeholder="Cari . . ."
                  outlined
                />
              </v-col>
              <v-col cols="12" md="3" offset-md="3">
                <div>
                  <table class="table-noborder">
                    <tr>
                      <th>Laki - Laki</th>
                      <td>: {{ jmlLaki }}</td>
                    </tr>
                    <tr>
                      <th>Perempuan</th>
                      <td>: {{ jmlPerempuan }}</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>: {{ listDataPesertaKuliah.length }}</td>
                    </tr>
                  </table>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="[
                    {
                      text: 'NRP',
                      value: 'nrp',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'Nama',
                      value: 'name',
                      sortable: true,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'Jenis Kelamin',
                      value: 'jk',
                      sortable: false,
                      class: 'ethol-th-table',
                    },
                  ]"
                  :items="listDataPesertaKuliah"
                  :items-per-page="10"
                  class="elevation-1"
                  :loading="loadingPesertaKuliah"
                  :search="searchPesertaKuliah"
                  loading-text="Loading... Tunggu Sebentar"
                >
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <DialogAturanPresensi
      :dialog="dialogAturanPresensi"
      @tutup="dialogAturanPresensi = false"
    />
  </v-container>
</template>
<script>
import DialogAturanPresensi from '@/components/kuliah/dialog-rule-presensi-kuliah.vue'
import { mapState } from 'vuex'
import teks from '~/mixins/teks'
export default {
  components: {
    DialogAturanPresensi,
  },
  mixins: [teks],
  layout: 'kuliah',
  middleware: ['auth', 'mahasiswa'],
  transition: 'slide-bottom',
  data() {
    return {
      listDataPresensi: [],
      loadingPresensi: false,
      searchPresensi: '',
      dialogAturanPresensi: false,
      presensiAktif: false,
      meetAktif: false,
      bbbUrl: null,
      roomConference: null,
      presensiTerakhir: null,
      sudahPresensi: false,
      conferenceLainnya: {},
      pengumumanTerbaru: [],

      loadingPesertaKuliah: false,
      listDataPesertaKuliah: [],
      searchPesertaKuliah: '',
      jmlLaki: 0,
      jmlPerempuan: 0,

      loadingSimpanPresensi: false,
    }
  },
  computed: {
    ...mapState({
      kuliah: (state) => state.modules.kuliah.kuliahMahasiswa,
      user: (state) => state.user,
    }),
  },
  watch: {
    sudahPresensi(v) {
      if (v == true) {
        this.meetAktif = true
        this.kuliah.jadwal.forEach((item) => {
          if (item.nomor_hari === new Date().getDay()) {
            this.ambilDetailRoom(item.nomor_ruang)
            this.roomConference = item.ruang
          }
        })
      }
    },
  },
  async mounted() {
    await this.ambilPresensiKuliahTerakhir()
    this.ambilDataConferenceLainnya()
    this.ambilPengumumanTerbau()
    this.ambilDataPesertaKuliah()
    this.$socket.onmessage = (payload) => {
      const message = JSON.parse(payload.data)
      if (Object.prototype.hasOwnProperty.call(message, 'presensi')) {
        if (
          message.kuliah == this.kuliah.nomor &&
          message.jenis_schema == this.kuliah.jenisSchema
        ) {
          if (message.status == 1) {
            console.log('presensiAktif')
            this.presensiAktif = true
            this.$forceUpdate()
          }
          this.ambilPresensiKuliahTerakhir()
        }
      } else {
        console.log('presensiTidakAktif')
        this.presensiAktif = false
      }
    }
  },
  methods: {
    ambilDataPresensi() {
      this.loadingPresensi = true
      this.$axios
        .get('/presensi/riwayat', {
          params: {
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
            nomor: this.user.nomor,
          },
        })
        .then((res) => {
          // console.log('res', res)
          this.loadingPresensi = false
          this.listDataPresensi = res.data
          if (this.presensiTerakhir && this.listDataPresensi.length) {
            // jika presensi terakhirnya dosen sama dengan presensi terakhirnya mahasiswa
            if (this.presensiTerakhir.key === this.listDataPresensi[0].key) {
              this.sudahPresensi = true
            }
          }
        })
    },
    ambilDetailRoom(v) {
      this.$axios
        .get('/room-conference/detail', {
          params: {
            nomor: v,
          },
        })
        .then((res) => {
          if (res.data.length) {
            this.bbbUrl = res.data[0].server.url
          }
        })
    },
    async ambilPresensiKuliahTerakhir() {
      await this.$axios
        .get('/presensi/terakhir-kuliah', {
          params: {
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
          },
        })
        .then((res) => {
          if (res.data.ditemukan == true) {
            this.presensiAktif = res.data.open
            this.presensiTerakhir = res.data
            this.ambilDataPresensi()
          }
        })
    },
    simpanPresensi() {
      this.loadingSimpanPresensi = true
      this.$axios
        .post('/presensi/mahasiswa', {
          kuliah: this.kuliah.nomor,
          mahasiswa: this.user.nomor,
          jenis_schema: this.kuliah.jenisSchema,
          kuliah_asal: this.kuliah.kuliah_asal,
          key: this.presensiTerakhir.key,
        })
        .finally(() => (this.loadingSimpanPresensi = false))
        .then((res) => {
          if (res.data.sukses) {
            this.ambilDataPresensi()
            this.sudahPresensi = true
          }
        })
    },
    ambilDataConferenceLainnya() {
      this.$axios
        .get('/conference-lainnya', {
          params: {
            dosen: this.kuliah.nomor_dosen,
          },
        })
        .then((res) => {
          this.conferenceLainnya = res.data
        })
    },
    joinAlternative() {
      if (
        this.conferenceLainnya.nomor != null &&
        this.conferenceLainnya.nomor != ''
      ) {
        setTimeout(() => {
          window.open(this.conferenceLainnya.url, '_blank')
        }, 1500)
      } else {
        alert('Anda belum mengkonfigurasi link conference')
      }
    },
    ambilPengumumanTerbau() {
      this.loading = true
      this.$axios
        .get('/pengumuman/terbaru', {
          params: {
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
          },
        })
        .then((res) => {
          this.loading = false
          this.pengumumanTerbaru = res.data
        })
    },
    ambilDataPesertaKuliah() {
      this.loadingPesertaKuliah = true
      this.$axios
        .get('/kuliah/peserta-kuliah', {
          params: {
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
          },
        })
        .then((res) => {
          this.loadingPesertaKuliah = false
          this.listDataPesertaKuliah = res.data
          this.listDataPesertaKuliah.forEach((element) => {
            if (element.jk.substr(0, 1) == 'L') {
              this.jmlLaki++
            } else if (element.jk.substr(0, 1) == 'P') {
              this.jmlPerempuan++
            }
          })
        })
    },
  },
}
</script>
<style scoped>
.ethol-title-kuliah {
  margin-top: 10px !important;
}
.avatar-matkul {
  color: white;
  font-weight: bold;
  border-radius: 6px !important;
}
</style>
