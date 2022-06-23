<template>
  <v-container>
    <v-row class="row-title-kuliah">
      <v-col cols="12">
        <v-alert v-if="presensiKuliahLainAktif" dense text type="info">
          Presensi anda masih terbuka di perkuliahan sebelumnya, harap menutup
          presensi di kuliah sebelumnya terlebih dahulu untuk membuka presensi
          yang baru
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card outlined height="100%">
          <v-card-title>
            <h3 class="ethol-title-kuliah">
              {{ kuliah.matakuliah ? kuliah.matakuliah.nama : '' }}
            </h3>
            &nbsp;
            <v-chip
              v-if="kuliah.isKuliahGabungan == true"
              label
              color="red"
              style="color: white"
              small
              >Kelas Gabungan<v-icon x-small right> mdi-star </v-icon>
            </v-chip>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12" sm="12">
                <br />
                <div v-if="kuliah.isKuliahGabungan == true" outlined>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-card
                        v-for="(kd, index_kd) in kuliah.dataKuliahGabungan"
                        :key="index_kd"
                        style="margin-top: 8px"
                        outlined
                      >
                        <table class="table-noborder">
                          <tr>
                            <th>Kelas</th>
                            <td>: {{ kd.kelas }} Kelas {{ kd.pararel }}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <th>Jadwal</th>
                            <td>
                              <div
                                style="padding-top: 10px; padding-bottom: 10px"
                              >
                                <span class="subtitle-1">
                                  &nbsp;
                                  <v-icon small>mdi-calendar</v-icon> &nbsp;
                                  {{
                                    kd.nama_hari_1 +
                                    ' (' +
                                    kd.jam_1_awal +
                                    ' - ' +
                                    kd.jam_1_akhir +
                                    ')'
                                  }}
                                </span>
                                <br />
                                <span class="subtitle-1">
                                  &nbsp;
                                  <v-icon small>mdi-video</v-icon> &nbsp;
                                  {{ kd.nama_ruang_1 }}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div
                                v-if="kd.hari_2 != null && kd.hari_2 != ''"
                                style="padding-top: 10px; padding-bottom: 10px"
                              >
                                <span class="subtitle-1">
                                  &nbsp;
                                  <v-icon small>mdi-calendar</v-icon> &nbsp;
                                  {{
                                    kd.nama_hari_2 +
                                    ' (' +
                                    kd.jam_2_awal +
                                    ' - ' +
                                    kd.jam_2_akhir +
                                    ')'
                                  }}
                                </span>
                                <br />
                                <span class="subtitle-1">
                                  &nbsp;
                                  <v-icon small>mdi-video</v-icon> &nbsp;
                                  {{ kd.nama_ruang_2 }}
                                </span>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
                <table v-else class="table-noborder">
                  <tr>
                    <th>Kelas</th>
                    <td>: {{ kuliah.kelas }} Kelas {{ kuliah.pararel }}</td>
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
                  :disabled="presensiAktif"
                  :loading="loadingBukaPresensi"
                  @click="bukaPresensi()"
                >
                  Buka Presensi
                </v-btn>
                <br />
                <v-btn
                  small
                  color="error"
                  block
                  text
                  @click="dialogAturanPresensi = true"
                >
                  Aturan Presensi
                </v-btn>
              </v-col>
              <v-col cols="12" md="5">
                <form style="width: 100%" :action="bbbUrl" method="POST">
                  <input type="hidden" name="meeting" :value="roomConference" />
                  <input type="hidden" name="name" :value="user.nama" />
                  <input type="hidden" name="role" :value="1" />
                  <v-btn
                    small
                    color="info"
                    class="text-none"
                    block
                    type="submit"
                    :disabled="presensiKuliahLainAktif || !bbbUrl"
                  >
                    Conference ETHOL
                  </v-btn>
                </form>
                <br />
                <v-btn
                  small
                  color="info"
                  outlined
                  class="text-none"
                  :disabled="presensiKuliahLainAktif"
                  @click="joinAlternative"
                  >Conference Lainnya
                </v-btn>
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="orange"
                      v-bind="attrs"
                      small
                      v-on="on"
                      @click="fnDialogConferenceLainnya"
                      ><v-icon small>mdi-link-variant</v-icon></v-btn
                    >
                  </template>
                  <span>Edit link conference lainnya</span>
                </v-tooltip>
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
                {
                  text: 'Total',
                  value: 'total',
                  sortable: true,
                  align: 'center',
                  class: 'ethol-th-table',
                },
                {
                  text: 'Aksi',
                  align: 'center',
                  sortable: false,
                  value: 'action',
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
              <template #[`item.action`]="{ item }">
                <div v-if="item.open">
                  <v-btn
                    small
                    class="text-none warning"
                    @click="tampilkanDialogTutupPresensi(item)"
                  >
                    Tutup
                  </v-btn>
                  <v-btn
                    small
                    class="text-none error"
                    @click="tampilkanDialogBatalkanPresensi(item)"
                  >
                    Batalkan
                  </v-btn>
                </div>
              </template>
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
                    {
                      text: 'Tgl Lahir  ',
                      value: 'tgllahir',
                      sortable: false,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'HP',
                      value: 'hp',
                      sortable: false,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'Kelas',
                      value: 'kelasnya',
                      sortable: false,
                      class: 'ethol-th-table',
                    },
                    {
                      text: 'filter kelas',
                      value: 'kode',
                      align: ' d-none',
                    },
                  ]"
                  :items="listDataPesertaKuliah"
                  :items-per-page="10"
                  class="elevation-1"
                  :loading="loadingPesertaKuliah"
                  :search="searchPesertaKuliah"
                  loading-text="Loading... Tunggu Sebentar"
                >
                  <template #[`item.kelasnya`]="{ item }">
                    {{ item.kode + ' ' + item.pararel }}
                  </template>
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
    <DialogKonfirmasi
      judul="Tutup Presensi"
      pesan="menutup presensi ini"
      :dialog="dialogKonfirmasiTutupPresensi"
      :loading="loadingDialogTutupPresensi"
      @close="dialogKonfirmasiTutupPresensi = false"
      @aksi="tutupPresensi"
    />
    <DialogKonfirmasi
      judul="Batalkan Presensi"
      pesan="membatalkan presensi ini"
      :dialog="dialogKonfirmasiBatalkanPresensi"
      :loading="loadingDialogBatalkanPresensi"
      @close="dialogKonfirmasiBatalkanPresensi = false"
      @aksi="batalkanPresensi"
    />
    <DialogFormConferenceLainnya
      :mode="modeFormConferenceLainnya"
      :dialog="dialogFormConferenceLainnya"
      :item-data="conferenceLainnya"
      @tutup="tutupDialogConferenceLainnya"
      @refresh="ambilDataConferenceLainnya"
    />
  </v-container>
</template>
<script>
import DialogAturanPresensi from '@/components/kuliah/dialog-rule-presensi-kuliah.vue'
import DialogFormConferenceLainnya from '@/components/kuliah/dialog-form-conference-lainnya.vue'
import { mapState } from 'vuex'
import DialogKonfirmasi from '~/components/utils/dialog-konfirmasi.vue'
import teks from '~/mixins/teks'
export default {
  components: {
    DialogAturanPresensi,
    DialogKonfirmasi,
    DialogFormConferenceLainnya,
  },
  mixins: [teks],
  layout: 'kuliah',
  middleware: ['auth', 'dosen'],
  transition: 'slide-bottom',
  data() {
    return {
      listDataPresensi: [],
      loadingPresensi: false,
      searchPresensi: '',
      dialogAturanPresensi: false,
      presensiAktif: false,
      presensiKuliahLainAktif: false,
      presensiAksi: null,
      dialogKonfirmasiTutupPresensi: false,
      loadingDialogTutupPresensi: false,
      dialogKonfirmasiBatalkanPresensi: false,
      loadingDialogBatalkanPresensi: false,
      loadingBukaPresensi: false,
      bbbUrl: null,
      roomConference: null,

      conferenceLainnya: {},
      modeFormConferenceLainnya: '',
      dialogFormConferenceLainnya: false,

      listDataPesertaKuliah: [],
      loadingPesertaKuliah: false,
      jmlLaki: 0,
      jmlPerempuan: 0,
      searchPesertaKuliah: '',
    }
  },
  computed: {
    ...mapState({
      kuliah: (state) => state.modules.kuliah.kuliahDosen,
      user: (state) => state.user,
    }),
  },
  mounted() {
    this.ambilDataPresensi()
    this.cekPresensiAktif()
    this.cekPresensiAktifDosen()
    this.ambilDataConferenceLainnya()
    this.ambilDataPesertaKuliah()
  },
  methods: {
    randomString(length) {
      let result = ''
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
    },
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
          this.loadingPresensi = false
          this.listDataPresensi = res.data
          this.cekPresensiAktifSesuaiKuliah()
        })
    },
    cekPresensiAktif() {
      this.$axios
        .get('/presensi/aktif-kuliah', {
          params: {
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
          },
        })
        .then((res) => {
          if (res.data.length) {
            if (
              res.data[0].kuliah === this.kuliah.nomor &&
              res.data[0].jenisSchema === this.kuliah.jenisSchema
            ) {
              this.presensiAktif = true
            }
          }
        })
    },
    cekPresensiAktifDosen() {
      this.$axios
        .get('/presensi/aktif-dosen', {
          params: {
            dosen: this.user.nomor,
          },
        })
        .then((res) => {
          if (res.data.aktif) {
            this.presensiAktif = true
            this.cekPresensiAktifSesuaiKuliah()
          }
        })
    },
    cekPresensiAktifSesuaiKuliah() {
      if (this.listDataPresensi.length) {
        if (!this.listDataPresensi[0].open && this.presensiAktif) {
          this.presensiKuliahLainAktif = true
        }
      }

      if (!this.presensiKuliahLainAktif) {
        this.kuliah.jadwal.forEach((item) => {
          if (item.nomor_hari === new Date().getDay()) {
            this.ambilDetailRoom(item.nomor_ruang)
            this.roomConference = item.ruang
          }
        })
      }
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
    bukaPresensi() {
      this.loadingBukaPresensi = true
      const key = this.randomString(10)
      this.$axios
        .post('/presensi/buka', {
          kuliah: this.kuliah.nomor,
          namaMk: this.kuliah.matakuliah.nama,
          dosen: this.user.nomor,
          jenis_schema: this.kuliah.jenisSchema,
          key,
        })
        .then((res) => {
          this.loadingBukaPresensi = false
          if (res.data.sukses) {
            this.presensiAktif = true
            this.ambilDataPresensi()
            this.$socket.sendObj({
              presensi: true,
              // buka presensi status 1, 2 tutup, 3 batalkan
              status: 1,
              kuliah: this.kuliah.nomor,
              jenis_schema: this.kuliah.jenisSchema,
              key: 'key',
            })
          }
        })
    },
    tampilkanDialogTutupPresensi(item) {
      this.presensiAksi = item
      this.dialogKonfirmasiTutupPresensi = true
    },
    tutupPresensi() {
      this.loadingDialogTutupPresensi = true
      this.$axios
        .put('/presensi/tutup', {
          nomor: this.presensiAksi.nomor,
        })
        .then((res) => {
          this.loadingDialogTutupPresensi = false
          this.presensiAktif = false
          this.dialogKonfirmasiTutupPresensi = false
          this.ambilDataPresensi()
          this.$socket.sendObj({
            presensi: true,
            // buka presensi status 1, 2 tutup, 3 batalkan
            status: 2,
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
            key: 'key',
          })
        })
    },
    tampilkanDialogBatalkanPresensi(item) {
      this.presensiAksi = item
      this.dialogKonfirmasiBatalkanPresensi = true
    },
    batalkanPresensi() {
      this.loadingDialogBatalakanPresensi = true
      this.$axios
        .put('/presensi/batalkan', {
          kuliah: this.kuliah.nomor,
          jenis_schema: this.kuliah.jenisSchema,
          key: this.presensiAksi.key,
        })
        .then((res) => {
          this.loadingDialogBatalakanPresensi = false
          this.presensiAktif = false
          this.dialogKonfirmasiBatalkanPresensi = false
          this.ambilDataPresensi()
          this.$socket.sendObj({
            presensi: true,
            // buka presensi status 1, 2 tutup, 3 batalkan
            status: 3,
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
            key: 'key',
          })
        })
    },
    ambilDataConferenceLainnya() {
      this.$axios
        .get('/conference-lainnya', {
          params: {
            dosen: this.user.nomor,
          },
        })
        .then((res) => {
          this.conferenceLainnya = res.data
        })
    },
    fnDialogConferenceLainnya() {
      if (
        this.conferenceLainnya.nomor != null &&
        this.conferenceLainnya.nomor != ''
      ) {
        this.modeFormConferenceLainnya = 'edit'
        this.dialogFormConferenceLainnya = true
      } else {
        this.modeFormConferenceLainnya = 'tambah'
        this.dialogFormConferenceLainnya = true
      }
    },
    tutupDialogConferenceLainnya() {
      this.dialogFormConferenceLainnya = false
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
