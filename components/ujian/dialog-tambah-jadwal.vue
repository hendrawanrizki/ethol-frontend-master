<template>
  <v-dialog v-model="dialogTambahJadwal" width="1200" persistent>
    <v-card>
      <v-card-title class="text-h5 lighten-2">
        Tambah Jadwal
        <v-spacer></v-spacer>
        <v-btn icon :disabled="loading" @click="dialogTambahJadwal = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <br />
        <v-stepper v-model="stepKe" vertical>
          <v-stepper-step :complete="stepKe > 1" step="1">
            Pilih Kuliah
            <small>
              Silakan mencari data kuliah kemudian tekan tombol pilih...
            </small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <br />
            <v-row>
              <v-col cols="12" md="3">
                <FilterTahun :tahun="tahun" @ubah="ubahTahun" />
              </v-col>
              <v-col cols="12" md="3">
                <FilterSemester :semester="semester" @ubah="ubahSemester" />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  placeholder="Cari . . ."
                  outlined
                />
              </v-col>
              <v-col cols="12">
                <v-data-table
                  :headers="[
                    {
                      text: 'Kelas',
                      value: 'kelasnya',
                      sortable: true,
                      class: 'ethol-th-table',
                      width: '10%',
                    },
                    {
                      text: 'Matakuliah',
                      value: 'matakuliah',
                      sortable: true,
                      class: 'ethol-th-table',
                      width: '30%',
                    },
                    {
                      text: 'Dosen',
                      value: 'dosennya',
                      sortable: true,
                      class: 'ethol-th-table',
                      width: '30%',
                    },
                    {
                      text: 'Pertemuan 1',
                      value: 'nama_hari_1',
                      sortable: true,
                      class: 'ethol-th-table',
                      width: '7%',
                    },
                    {
                      text: 'Pertemuan 2',
                      value: 'nama_hari_2',
                      sortable: true,
                      class: 'ethol-th-table',
                      width: '7%',
                    },
                    {
                      text: 'filter nama dosen',
                      value: 'nama_dosen',
                      align: ' d-none',
                    },
                    {
                      text: 'filter kelas',
                      value: 'kode_kelas',
                      align: ' d-none',
                    },
                    {
                      text: 'Opsi',
                      value: 'opsi',
                      sortable: true,
                      class: 'ethol-th-table',
                      align: 'center',
                    },
                  ]"
                  :items="listData"
                  :items-per-page="5"
                  class="elevation-1"
                  :loading="loading"
                  :search="search"
                  loading-text="Loading... Tunggu Sebentar"
                >
                  <template #[`item.kelasnya`]="{ item }">
                    <span class="text-start">
                      {{ item.kode_kelas + ' ' + item.pararel }}
                    </span>
                  </template>
                  <template #[`item.dosennya`]="{ item }">
                    {{
                      hapusStringNull(item.gelar_dpn) +
                      ' ' +
                      hapusStringNull(item.nama_dosen) +
                      ' ' +
                      hapusStringNull(item.gelar_blk)
                    }}
                  </template>
                  <template #[`item.opsi`]="{ item }">
                    <div style="padding: 10px 0px">
                      <center>
                        <v-btn
                          small
                          color="primary"
                          class="text-none"
                          @click="pilih(item)"
                        >
                          <span>Pilih</span>
                        </v-btn>
                      </center>
                    </div>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-step :complete="stepKe > 2" step="2">
            Form Jadwal
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-row>
              <v-col cols="12" md="12" sm="12">
                <v-card outlined>
                  <v-card-text>
                    <table class="noborder" width="100%">
                      <tr>
                        <th width="15%">Kelas</th>
                        <td width="1%">:</td>
                        <td width="34%">{{ data_kelasnya }}</td>
                        <th width="15%">Dosen</th>
                        <td width="1%">:</td>
                        <td width="34%">{{ data_dosennya }}</td>
                      </tr>
                      <tr>
                        <th>Matakuliah</th>
                        <td>:</td>
                        <td>
                          {{ data_matakuliahnya }}
                        </td>
                        <th>Pertemuan 1</th>
                        <td>:</td>
                        <td>{{ data_harinya }}</td>
                      </tr>
                      <tr>
                        <th>Ruang</th>
                        <td>:</td>
                        <td>
                          {{ data_ruangnya }}
                        </td>
                        <th>Pertemuan 2</th>
                        <td>:</td>
                        <td>{{ data_harinya_dua }}</td>
                      </tr>
                    </table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="12" sm="12">
                <v-form ref="form_tambah_jadwal">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        v-model="dosenDipilih"
                        :items="listDataDosen"
                        placeholder="Pilih Dosen"
                        item-text="nama"
                        item-value="nomor"
                        label="Dosen"
                        outlined
                        hide-details
                        filled
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        v-model="roomId"
                        :items="room"
                        placeholder="Pilih Ruangan"
                        item-text="nama"
                        item-value="nomor"
                        hide-details
                        label="Ruang"
                        filled
                      />
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-menu
                        v-model="editTglJadwal"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="formatTanggalJadwal"
                            label="Tanggal"
                            persistent-hint
                            readonly
                            :rules="[
                              () => !!formatTanggalJadwal || 'Wajib Diisi',
                            ]"
                            required
                            v-bind="attrs"
                            filled
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="tanggal_jadwal"
                          no-title
                          :min="minDate"
                          @input="editTglJadwal = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col
                      cols="12"
                      style="
                        padding-top: 0px;
                        padding-bottom: 0px;
                        margin-top: -20px;
                      "
                    >
                      <span>Jam Mulai :</span>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="jamMulai"
                        :items="jam"
                        :rules="[(v) => !!v || 'Jam harus diisi']"
                        filled
                        label="Jam"
                        placeholder="Jam"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="menitMulai"
                        :items="menit"
                        :rules="[(v) => !!v || 'Menit harus diisi']"
                        filled
                        label="Menit"
                        placeholder="Menit"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      style="
                        padding-top: 0px;
                        padding-bottom: 0px;
                        margin-top: -20px;
                      "
                    >
                      <span>Jam Selesai :</span>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="jamSelesai"
                        :items="jam"
                        :rules="[(v) => !!v || 'Jam harus diisi']"
                        filled
                        label="Jam"
                        placeholder="Jam"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="menitSelesai"
                        :items="menit"
                        :rules="[(v) => !!v || 'Menit harus diisi']"
                        filled
                        label="Menit"
                        placeholder="Menit"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
            <br />
            <v-row>
              <v-col cols="12">
                <v-btn
                  class="float-right"
                  color="primary"
                  :loading="loading"
                  :disabled="loading"
                  @click="simpanJadwal"
                >
                  Simpan
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import FilterTahun from '~/components/filter/tahun-ajaran.vue'
import FilterSemester from '~/components/filter/semester.vue'
import teks from '~/mixins/teks'
export default {
  components: {
    FilterTahun,
    FilterSemester,
  },
  mixins: [teks],
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialogTambahJadwal: null,
      loading: false,
      room: [],
      listData: [],
      listDataDosen: [],
      dosenDipilih: null,
      roomId: null,
      editTglJadwal: false,
      tanggal_jadwal: new Date().toISOString().substr(0, 10),
      minDate: new Date().toISOString().substr(0, 10),

      jamMulai: null,
      menitMulai: null,
      jamSelesai: null,
      menitSelesai: null,

      stepKe: 1,
      tahun: null,
      semester: null,
      search: '',

      kuliahDipilih: {},
      data_kuliahnya: '',
      data_jenisSchemanya: '',
      data_kelasnya: '',
      data_dosennya: '',
      data_matakuliahnya: '',
      data_harinya: '',
      data_harinya_dua: '',
      data_ruangnya: '',
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
    formatTanggalJadwal() {
      if (!this.tanggal_jadwal) return null
      const [year, month, day] = this.tanggal_jadwal.split('-')
      return `${day}-${month}-${year}`
    },
  },
  watch: {
    dialog(v) {
      this.dialogTambahJadwal = v
    },
    dialogTambahJadwal(v) {
      if (v == false) {
        this.$emit('tutup')
        this.clearForm()
      }
    },
  },
  created() {
    this.ambilDataRoom()
    this.ambilDataDosen()
  },
  methods: {
    pilih(item) {
      this.kuliahDipilih = item
      this.data_kuliahnya = item.nomor_k
      this.data_jenisSchemanya = item.jenis_schema
      this.data_kelasnya = item.kode_kelas + ' ' + item.pararel
      this.data_dosennya =
        this.hapusStringNull(item.gelar_dpn) +
        ' ' +
        this.hapusStringNull(item.nama_dosen) +
        ' ' +
        this.hapusStringNull(item.gelar_blk)
      this.data_matakuliahnya = item.matakuliah
      this.data_harinya = item.nama_hari_1
        ? item.nama_hari_1 + ' - ' + item.jam_1
        : ''
      this.data_harinya_dua = item.nama_hari_2
        ? item.nama_hari_2 + ' - ' + item.jam_2
        : ''
      this.data_ruangnya = item.nama_ruang_1

      this.roomId = item.ruang_1 ? item.ruang_1 : item.ruang_2
      this.dosenDipilih = item.dosen
      this.stepKe = 2
    },
    ubahTahun(v) {
      this.tahun = v
      this.ambilData()
    },
    ubahSemester(v) {
      this.semester = v
      this.ambilData()
    },
    ambilData() {
      this.loading = true
      if (this.tahun != null && this.semester != null) {
        let urlApi = ''
        if (this.admin) {
          urlApi = '/ujian/cari-kuliah-admin'
        } else if (this.baak) {
          urlApi = '/ujian/cari-kuliah-baak'
        }
        this.$axios
          .get(urlApi, {
            params: {
              program: this.programDipilih,
              jurusan: this.jurusanDipilih,
              tahun: this.tahun,
              semester: this.semester,
              jenis: this.jenis,
            },
          })
          .then((res) => {
            this.loading = false
            this.listData = res.data
          })
      }
    },
    clearForm() {
      this.tanggal_jadwal = new Date().toISOString().substr(0, 10)
      this.jamMulai = null
      this.menitMulai = null
      this.jamSelesai = null
      this.menitSelesai = null
      this.dosenDipilih = null
      this.roomId = null
      this.kuliahDipilih = {}
      this.data_kuliahnya = null
      this.data_jenisSchemanya = null
      this.data_kelasnya = null
      this.data_dosennya = null
      this.data_matakuliahnya = null
      this.data_harinya = null
      this.data_harinya_dua = null
      this.data_ruangnya = null
      this.stepKe = 1
    },
    simpanJadwal() {
      if (this.$refs.form_tambah_jadwal.validate()) {
        this.loading = true
        this.loadingCatatanNilai = true

        const [day, month, year] = this.formatTanggalJadwal.split('-')
        const tanggal = `${year}-${month}-${day}`
        const tanggalMulai =
          tanggal + ' ' + this.jamMulai + ':' + this.menitMulai + ':00'
        const tanggalSelesai =
          tanggal + ' ' + this.jamSelesai + ':' + this.menitSelesai + ':00'

        let urlApiEditJadwal = ''
        if (this.admin == true) {
          urlApiEditJadwal = '/ujian/jadwal-admin'
        } else if (this.baak == true) {
          urlApiEditJadwal = '/ujian/jadwal-baak'
        }
        this.$axios
          .post(urlApiEditJadwal, {
            nomorKuliah: this.data_kuliahnya,
            jenisSchema: this.data_jenisSchemanya,
            dosen: this.dosenDipilih,
            tanggalMulai,
            tanggalSelesai,
            nomorRuang: this.roomId,
          })
          .then((res) => {
            if (res.data.sukses) {
              this.dialogTambahJadwal = false
              this.$emit('refresh')
            }
            this.loading = false
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      }
    },
    ambilDataRoom() {
      this.loading = true
      this.$axios.get('/room-conference').then((res) => {
        this.loading = false
        this.room = res.data
      })
    },
    ambilDataDosen() {
      this.loading = true
      this.$axios.get('/pegawai/dosen-pens').then((res) => {
        this.loading = false
        const listDataDosen = res.data
        const dosennya = []
        for (let index = 0; index < listDataDosen.length; index++) {
          const element = listDataDosen[index]

          dosennya.push({
            nomor: element.nomor,
            nama:
              this.hapusStringNull(element.gelarDpn) +
              ' ' +
              this.hapusStringNull(element.nama) +
              ' ' +
              this.hapusStringNull(element.gelarBlk),
          })
        }

        this.listDataDosen = dosennya
      })
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
