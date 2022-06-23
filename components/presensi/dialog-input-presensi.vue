<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="700" persistent>
      <v-card>
        <v-card-title>
          <span>Input Presensi</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="bukaDialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <br />
        <v-card-text>
          <v-form ref="form_input_presensi">
            <table class="noborder" width="100%">
              <tr>
                <th width="25%">Matakuliah</th>
                <td width="2%">:</td>
                <td>{{ dataPresensi ? dataPresensi.matakuliah : '' }}</td>
              </tr>
              <tr>
                <th>Dosen</th>
                <td width="2%">:</td>
                <td>{{ dataPresensi ? dataPresensi.dosen : '' }}</td>
              </tr>
              <tr>
                <th>Waktu Absen Dosen</th>
                <td width="2%">:</td>
                <td>
                  {{ dataPresensi ? dataPresensi.tanggalAbsenIndonesia : '' }}
                </td>
              </tr>
              <tr>
                <th>NRP</th>
                <td width="2%">:</td>
                <td>{{ mahasiswa ? mahasiswa.nrp : '' }}</td>
              </tr>
              <tr>
                <th>Mahasiswa</th>
                <td width="2%">:</td>
                <td>{{ mahasiswa ? mahasiswa.nama : '' }}</td>
              </tr>
            </table>
            <br />
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="tglPresensi"
                  label="Tanggal Presensi"
                  disabled
                  filled
                >
                </v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="jamPresensi"
                  :items="jam"
                  :rules="[(v) => !!v || 'Jam harus diisi']"
                  filled
                  label="Jam"
                  placeholder="Jam"
                />
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="menitPresensi"
                  :items="menit"
                  :rules="[(v) => !!v || 'Menit harus diisi']"
                  filled
                  label="Menit"
                  placeholder="Menit"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="loading"
            class="text-none"
            @click="simpanPresensi"
          >
            <span>Simpan</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import teks from '~/mixins/teks'
export default {
  mixins: [teks],
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false,
    },
    mahasiswa: {
      type: Object,
      required: true,
    },
    dataPresensi: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      bukaDialog: false,
      loading: false,
      tglPresensi: '',
      jamPresensi: null,
      menitPresensi: null,
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen']),
  },
  watch: {
    bukaDialog(v) {
      if (!v) {
        this.bersihkanForm()
        this.$emit('tutup')
      }
    },
    dialog(v) {
      this.bukaDialog = v
    },
    dataPresensi(v) {
      if (v) {
        this.tglPresensi = v.tanggalAbsen
      }
    },
  },

  mounted() {},
  methods: {
    bersihkanForm() {
      this.tglPresensi = ''
      this.jamPresensi = null
      this.menitPresensi = null
      this.loading = false
    },
    simpanPresensi() {
      if (this.$refs.form_input_presensi.validate()) {
        this.loading = true
        let url = ''
        if (this.baak) {
          url = '/presensi/mahasiswa-mode-baak'
        } else if (this.admin) {
          url = '/presensi/mahasiswa-mode-admin'
        }
        this.$axios
          .post(url, {
            kuliah: this.dataPresensi.kuliah,
            jenis_schema: this.dataPresensi.jenisSchema,
            kuliah_asal: this.mahasiswa.kuliah_asal,
            mahasiswa: this.mahasiswa.nomor,
            key: this.dataPresensi.keyPresensi,
            waktuPresensi:
              this.tglPresensi +
              ' ' +
              this.jamPresensi +
              ':' +
              this.menitPresensi,
          })
          .then((res) => {
            if (res.data.sukses) {
              this.loading = false
              this.bukaDialog = false
              this.bersihkanForm()
              this.$emit('refresh')
            }
          })
      }
    },
  },
}
</script>
<style scoped>
#btn-batal:hover {
  cursor: pointer !important;
}
.noborder,
.noborder tr,
.noborder th,
.noborder td {
  border: none !important;
  text-align: left;
  padding: 5px;
}
</style>
