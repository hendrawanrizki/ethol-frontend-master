<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card outlined>
      <v-card-title>
        Data Jadwal {{ mode.toUpperCase() }}
        <v-spacer></v-spacer>
        <!-- <v-btn
          v-show="mode == 'uas'"
          small
          color="primary"
          class="text-none"
          @click="tambahJadwalUas()"
        >
          <v-icon small>mdi-plus-circle</v-icon> &nbsp;
          <span>Tambah Jadwal</span>
        </v-btn> -->
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="2" lg="2" xl="2">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Cari . . ."
              outlined
            />
          </v-col>
          <v-col cols="12" md="2">
            <FilterTahun :tahun="tahun" @ubah="ubahTahun" />
          </v-col>
          <v-col cols="12" md="2">
            <FilterSemester :semester="semester" @ubah="ubahSemester" />
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3" xl="2">
            <FilterProgram @ubah="ubahProgram" />
          </v-col>
          <v-col cols="12" sm="12" md="4" lg="3" xl="2">
            <FilterJurusan @ubah="ubahJurusan" />
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="[
                {
                  text: 'Kuliah & Kelas',
                  value: 'kk',
                  sortable: true,
                  class: 'ethol-th-table',
                  width: '20%',
                },
                {
                  text: 'Dosen',
                  value: 'dosennya',
                  sortable: true,
                  class: 'ethol-th-table',
                  width: '20%',
                },
                {
                  text: 'Jadwal',
                  value: 'jadwalnya',
                  sortable: true,
                  class: 'ethol-th-table',
                  width: '30%',
                },
                {
                  text: 'filter nama dosen',
                  value: 'nama_dosen',
                  align: ' d-none',
                },
                {
                  text: 'filter ruang',
                  value: 'ujian.room_name',
                  align: ' d-none',
                },
                {
                  text: 'filter ruang',
                  value: 'ujian.mulai_indonesia',
                  align: ' d-none',
                },
                {
                  text: 'filter ruang',
                  value: 'ujian.selesai_indonesia',
                  align: ' d-none',
                },
                {
                  text: 'filter matakuliah',
                  value: 'matakuliah',
                  align: ' d-none',
                },
                {
                  text: 'filter kelas',
                  value: 'kelasnya',
                  align: ' d-none',
                },
                {
                  text: 'Status',
                  value: 'statusnya',
                  class: 'ethol-th-table',
                  width: '10%',
                  align: 'center',
                },
                {
                  text: 'Opsi',
                  value: 'opsi',
                  sortable: true,
                  class: 'ethol-th-table',
                  width: '30%',
                },
              ]"
              :items="listData"
              :items-per-page="10"
              class="elevation-1"
              :loading="loading"
              :search="search"
              loading-text="Loading... Tunggu Sebentar"
            >
              <template #[`item.kk`]="{ item }">
                <span class="text-start">
                  {{ item.matakuliah }}
                </span>
                <br />
                <span class="text-start">
                  {{ item.kelasnya }}
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
              <template #[`item.jadwalnya`]="{ item }">
                <div style="padding-top: 10px; padding-bottom: 10px">
                  <span class="text-start">
                    <v-icon small>mdi-video</v-icon> &nbsp;
                    {{ item.ujian.room_name }}
                  </span>
                  <br />
                  <span class="text-start">
                    <v-icon small>mdi-clock</v-icon> &nbsp;
                    {{ item.ujian.mulai_indonesia }}
                  </span>
                  <br />
                  <span class="text-start">
                    <v-icon small>mdi-clock</v-icon> &nbsp;
                    {{ item.ujian.selesai_indonesia }}
                  </span>
                </div>
              </template>
              <template #[`item.statusnya`]="{ item }">
                <center>
                  <v-tooltip v-if="item.ujian.mulai && item.soal" top>
                    <template #activator="{ on, attrs }">
                      <v-icon
                        size="20"
                        color="success"
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-check-circle-outline
                      </v-icon>
                    </template>
                    <span>Jadwal telah diinput dan Soal tersedia</span>
                  </v-tooltip>
                  <v-tooltip v-else-if="item.ujian.mulai" top>
                    <template #activator="{ on, attrs }">
                      <v-icon
                        size="20"
                        color="warning"
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-information-outline
                      </v-icon>
                    </template>
                    <span>Jadwal telah diinput dan Soal belum tersedia </span>
                  </v-tooltip>
                  <v-tooltip v-else top>
                    <template #activator="{ on, attrs }">
                      <v-icon size="20" color="error" v-bind="attrs" v-on="on">
                        mdi-close-circle-outline
                      </v-icon>
                    </template>
                    <span>Jadwal belum diinput dan Soal belum tersedia </span>
                  </v-tooltip>
                </center>
              </template>
              <template #[`item.opsi`]="{ item }">
                <div style="padding: 10px 0px">
                  <v-btn
                    small
                    color="warning"
                    class="text-none"
                    @click="editJadwal(item)"
                  >
                    <v-icon small>mdi-clock</v-icon>
                    <span>Edit Jadwal</span>
                  </v-btn>
                  <v-btn
                    small
                    color="orange"
                    class="text-none"
                    @click="editTanggal(item)"
                  >
                    <v-icon small>mdi-calendar</v-icon>
                    <span>Edit Tanggal</span>
                  </v-btn>
                  <v-btn
                    small
                    color="error"
                    class="text-none"
                    @click="editDosen(item)"
                  >
                    <v-icon small>mdi-account</v-icon>
                    <span>Ubah Dosen</span>
                  </v-btn>
                  <v-btn
                    small
                    color="success"
                    class="text-none"
                    @click="cekTarikSoal(item)"
                  >
                    <v-icon small>mdi-check</v-icon>
                    <span>Cek / Tarik Soal</span>
                  </v-btn>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <DialogTambahJadwal
      :dialog="dialogTambahJadwal"
      @tutup="dialogTambahJadwal = false"
      @refresh="ambilData"
    />
    <DialogEditJadwal
      :dialog="dialogEditJadwal"
      :nomor-ujian="nomorUjian"
      :nomor-ruang="nomorRuang"
      :tgl-ujian="tglUjian"
      :waktu-mulai="waktuMulai"
      :waktu-selesai="waktuSelesai"
      @tutup="dialogEditJadwal = false"
      @refresh="ambilData"
    />
    <DialogEditDosen
      :dialog="dialogEditDosen"
      :nomor-ujian="nomorUjian"
      :nomor-dosen="nomorDosen"
      @tutup="dialogEditDosen = false"
      @refresh="ambilData"
    />
    <DialogEditTanggal
      :dialog="dialogEditTanggal"
      :tgl-ujian="tglUjian"
      :waktu-mulai="waktuMulai"
      :waktu-selesai="waktuSelesai"
      :nomor-ujian="nomorUjian"
      @tutup="dialogEditTanggal = false"
      @refresh="ambilData"
    />
    <DialogTarikSoal
      :dialog="dialogTarikSoal"
      :nomor-ujian="nomorUjian"
      :jenis="jenis"
      :nomor-kuliah="nomorKuliah"
      :jenis-schema="jenisSchema"
      :tahun="tahun"
      :semester="semester"
      :url-soal="urlSoal"
      @tutup="dialogTarikSoal = false"
      @refresh="ambilData"
    />
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/backend/breadcrumb.vue'
import DialogEditJadwal from '@/components/ujian/dialog-edit-jadwal.vue'
import DialogEditTanggal from '@/components/ujian/dialog-edit-tanggal.vue'
import DialogEditDosen from '@/components/ujian/dialog-edit-dosen.vue'
import DialogTarikSoal from '@/components/ujian/dialog-tarik-soal.vue'
import DialogTambahJadwal from '~/components/ujian/dialog-tambah-jadwal.vue'
import teks from '~/mixins/teks'
import FilterProgram from '~/components/filter/program.vue'
import FilterJurusan from '~/components/filter/jurusan.vue'
import FilterTahun from '~/components/filter/tahun-ajaran.vue'
import FilterSemester from '~/components/filter/semester.vue'
export default {
  components: {
    Breadcrumb,
    FilterTahun,
    FilterSemester,
    FilterProgram,
    FilterJurusan,
    DialogEditJadwal,
    DialogEditTanggal,
    DialogEditDosen,
    DialogTarikSoal,
    DialogTambahJadwal,
  },
  mixins: [teks],
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      judulLaman: 'Jadwal Ujian',
      breadcrumbItem: [
        {
          text: 'Beranda',
          disabled: false,
          exact: true,
          to: '/admin/beranda',
        },
        {
          text: 'Jadwal Kuliah',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      loading: true,
      search: '',
      listData: [],
      programDipilih: null,
      jurusanDipilih: null,
      tahun: null,
      semester: null,
      jenis: null,

      dialogEditJadwal: false,
      dialogTambahJadwal: false,
      dialogEditTanggal: false,
      dialogEditDosen: false,
      dialogTarikSoal: false,

      nomorUjian: 0,
      nomorRuang: 0,
      nomorDosen: 0,
      nomorKuliah: 0,
      jenisSchema: 0,
      tglUjian: '',
      waktuMulai: '',
      waktuSelesai: '',
      urlSoal: '',
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  mounted() {
    if (this.mode == 'uts') {
      this.jenis = 1
    } else if (this.mode == 'uas') {
      this.jenis = 2
    } else {
      this.jenis = null
    }
    this.ambilData()
  },
  methods: {
    ubahProgram(v) {
      this.programDipilih = v
      this.ambilData()
    },
    ubahJurusan(v) {
      this.jurusanDipilih = v
      this.ambilData()
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
      if (
        this.programDipilih != null &&
        this.jurusanDipilih != null &&
        this.tahun != null &&
        this.semester != null &&
        this.jenis != null
      ) {
        let urlApi = ''
        if (this.admin) {
          urlApi = '/ujian'
        } else if (this.baak) {
          urlApi = '/ujian/baak'
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
    editJadwal(item) {
      this.tglUjian = new Date().toISOString().substr(0, 10)
      this.waktuMulai = ''
      this.waktuSelesai = ''

      if (item.ujian.mulai) {
        const wktuMulai = item.ujian.mulai.split(' ')
        const wktuSelesai = item.ujian.selesai.split(' ')
        this.tglUjian = wktuMulai[0]
        this.waktuMulai = wktuMulai[1]
        this.waktuSelesai = wktuSelesai[1]
      }
      this.nomorUjian = item.ujian.nomor
      this.nomorRuang = item.ujian.room_meeting_id
      this.dialogEditJadwal = true
    },
    tambahJadwalUas() {
      this.dialogTambahJadwal = true
    },
    editTanggal(item) {
      if (item.ujian.mulai) {
        const wktuMulai = item.ujian.mulai.split(' ')
        const wktuSelesai = item.ujian.selesai.split(' ')
        this.tglUjian = wktuMulai[0]
        this.waktuMulai = wktuMulai[1]
        this.waktuSelesai = wktuSelesai[1]
        this.nomorUjian = item.ujian.nomor
        this.dialogEditTanggal = true
      } else {
        alert('Tanggal belum diset, silakan pilih edit jadwal !')
      }
    },
    editDosen(item) {
      this.nomorUjian = item.ujian.nomor
      this.nomorDosen = item.nomor_dosen
      this.dialogEditDosen = true
    },
    cekTarikSoal(item) {
      this.nomorUjian = item.ujian.nomor
      this.nomorKuliah = item.nomor
      this.jenisSchema = item.jenis_schema
      this.urlSoal = item.soal == null ? '' : item.soal
      this.dialogTarikSoal = true
    },
  },
}
</script>
