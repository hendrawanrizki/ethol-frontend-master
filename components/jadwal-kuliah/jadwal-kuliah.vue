<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card outlined>
      <v-card-title>
        Data Jadwal Kuliah
        <v-spacer></v-spacer>
        <v-btn
          v-if="$store.state.auth.hakAktif == 'admin'"
          small
          color="primary"
          outlined
          class="text-none"
          @click="dialogJadwal = true"
        >
          <v-icon small>mdi-find-replace</v-icon> <span> Sync Jadwal MIS </span>
        </v-btn>
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
                  text: 'Matakuliah',
                  value: 'matakuliah',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Dosen',
                  value: 'dosennya',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Kelas',
                  value: 'kelasnya',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Pertemuan 1',
                  value: 'jadwal_ke_1',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Pertemuan 2',
                  value: 'jadwal_ke_2',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'filter nama dosen',
                  value: 'nama_dosen',
                  align: ' d-none',
                },
              ]"
              :items="listData"
              :items-per-page="10"
              class="elevation-1"
              :loading="loading"
              :search="search"
              loading-text="Loading... Tunggu Sebentar"
            >
              <template #[`item.dosennya`]="{ item }">
                {{
                  hapusStringNull(item.gelar_dpn) +
                  ' ' +
                  hapusStringNull(item.nama_dosen) +
                  ' ' +
                  hapusStringNull(item.gelar_blk)
                }}
              </template>
              <template #[`item.kelasnya`]="{ item }">
                {{ item.kode_kelas + ' - ' + item.pararel }}
              </template>
              <template #[`item.jadwal_ke_1`]="{ item }">
                <div style="padding-top: 10px; padding-bottom: 10px">
                  <span class="subtitle-1">
                    <v-icon small>mdi-calendar-today</v-icon> &nbsp;
                    {{ item.jadwal[0].nama_hari }}
                  </span>
                  <br />
                  <span class="subtitle-1">
                    <v-icon small>mdi-clock</v-icon> &nbsp;
                    {{
                      item.jadwal[0].jam_awal + ' - ' + item.jadwal[0].jam_akhir
                    }}
                  </span>
                  <br />
                  <span class="subtitle-1">
                    <v-icon small>mdi-video</v-icon> &nbsp;
                    {{ item.jadwal[0].nama_ruang }}
                  </span>
                </div>
              </template>
              <template #[`item.jadwal_ke_2`]="{ item }">
                <div
                  v-if="item.jadwal.length == 2"
                  style="padding-top: 10px; padding-bottom: 10px"
                >
                  <span class="subtitle-1">
                    <v-icon small>mdi-calendar-today</v-icon> &nbsp;
                    {{ item.jadwal[1].nama_hari }}
                  </span>
                  <br />
                  <span class="subtitle-1">
                    <v-icon small>mdi-clock</v-icon> &nbsp;
                    {{
                      item.jadwal[1].jam_awal + ' - ' + item.jadwal[1].jam_akhir
                    }}
                  </span>
                  <br />
                  <span class="subtitle-1">
                    <v-icon small>mdi-video</v-icon> &nbsp;
                    {{ item.jadwal[1].nama_ruang }}
                  </span>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
      <DialogGenerateJadwal
        :dialog="dialogJadwal"
        @tampilkan="tampilkanDialog"
        @refresh="ambilData"
      />
    </v-card>
  </v-container>
</template>
<script>
import Breadcrumb from '@/components/backend/breadcrumb.vue'
import teks from '~/mixins/teks'
import FilterProgram from '~/components/filter/program.vue'
import FilterJurusan from '~/components/filter/jurusan.vue'
import FilterTahun from '~/components/filter/tahun-ajaran.vue'
import FilterSemester from '~/components/filter/semester.vue'
import DialogGenerateJadwal from '~/components/jadwal-kuliah/dialog-generate-jadwal.vue'

export default {
  components: {
    Breadcrumb,
    FilterTahun,
    FilterSemester,
    FilterProgram,
    FilterJurusan,
    DialogGenerateJadwal,
  },
  mixins: [teks],
  data() {
    return {
      judulLaman: 'Jadwal Kuliah',
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
      dialogJadwal: false,
    }
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
        this.semester != null
      ) {
        this.$axios
          .get('/jadwal', {
            params: {
              program: this.programDipilih,
              jurusan: this.jurusanDipilih,
              tahun: this.tahun,
              semester: this.semester,
            },
          })
          .then((res) => {
            this.loading = false
            this.listData = res.data
          })
      }
    },
    tampilkanDialog(v) {
      this.dialogJadwal = v
    },
  },
}
</script>
