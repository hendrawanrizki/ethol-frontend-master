<template>
  <v-dialog v-model="dialogEditJadwal" width="500" persistent>
    <v-card>
      <v-card-title class="text-h5 lighten-2">
        Edit Jadwal
        <v-spacer></v-spacer>
        <v-btn icon :disabled="loading" @click="dialogEditJadwal = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <br />
        <v-form ref="form_edit_jadwal">
          <v-row>
            <v-col cols="12" md="6">
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
                    :rules="[() => !!formatTanggalJadwal || 'Wajib Diisi']"
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
            <v-col
              cols="12"
              style="padding-top: 0px; padding-bottom: 0px; margin-top: -20px"
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
              style="padding-top: 0px; padding-bottom: 0px; margin-top: -20px"
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
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="loading"
          text
          @click="simpanJadwal"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import teks from '~/mixins/teks'
export default {
  components: {},
  mixins: [teks],
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    nomorUjian: {
      type: Number,
      required: true,
    },
    nomorRuang: {
      type: Number,
      required: true,
    },
    tglUjian: {
      type: String,
      required: false,
      default: () => {
        return new Date().toISOString().substr(0, 10)
      },
    },
    waktuSelesai: {
      type: String,
      required: false,
      default: '',
    },
    waktuMulai: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      dialogEditJadwal: null,
      loading: false,
      room: [],
      roomId: null,
      editTglJadwal: false,
      tanggal_jadwal: new Date().toISOString().substr(0, 10),
      minDate: new Date().toISOString().substr(0, 10),

      jamMulai: null,
      menitMulai: null,
      jamSelesai: null,
      menitSelesai: null,
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
      this.dialogEditJadwal = v
    },
    dialogEditJadwal(v) {
      if (v == false) {
        this.$emit('tutup')
        this.clearForm()
      }
    },
    nomorRuang(v) {
      this.roomId = v
    },
    tglUjian(v) {
      this.tanggal_jadwal = v
    },
    waktuMulai(v) {
      if (v) {
        const x = v.split(':')
        this.jamMulai = x[0]
        this.menitMulai = x[1]
      } else if (v == '') {
        this.jamMulai = null
        this.menitMulai = null
      }
    },
    waktuSelesai(v) {
      if (v) {
        const x = v.split(':')
        this.jamSelesai = x[0]
        this.menitSelesai = x[1]
      } else if (v == '') {
        this.jamSelesai = null
        this.menitSelesai = null
      }
    },
  },
  created() {
    this.ambilDataRoom()
  },
  methods: {
    clearForm() {
      // this.tanggal_jadwal = new Date().toISOString().substr(0, 10)
      // this.jamMulai = null
      // this.menitMulai = null
      // this.jamSelesai = null
      // this.menitSelesai = null
    },
    simpanJadwal() {
      if (this.$refs.form_edit_jadwal.validate()) {
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
          .put(urlApiEditJadwal, {
            tanggalMulai,
            tanggalSelesai,
            nomorRuang: this.roomId,
            nomorUjian: this.nomorUjian,
          })
          .then((res) => {
            if (res.data.sukses) {
              this.dialogEditJadwal = false
              this.$emit('refresh')
            }
            this.loading = false
          })
          .catch((err) => {
            this.loading = true
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
  },
}
</script>
