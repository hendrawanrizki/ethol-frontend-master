<template>
  <v-dialog v-model="dialogEditBatas" width="500" persistent>
    <v-card>
      <v-card-title class="text-h5 lighten-2">
        Ubah Batas Pengumpulan
        <v-spacer></v-spacer>
        <v-btn icon :disabled="loading" @click="dialogEditBatas = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <br />
        <v-form ref="form_edit_jadwal">
          <v-row>
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
          @click="simpanbatas"
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
const moment = require('moment')
moment.locale('id')
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
    selesai: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialogEditBatas: null,
      loading: false,
      editTglJadwal: false,
      tanggal_jadwal: new Date().toISOString().substr(0, 10),
      minDate: new Date().toISOString().substr(0, 10),

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
      this.dialogEditBatas = v
    },
    dialogEditBatas(v) {
      if (v == false) {
        this.$emit('tutup')
        this.clearForm()
      }
    },
    selesai(v) {
      this.tanggal_jadwal = moment(v, 'YYYY-MM-DD HH:mm:ss').format(
        'YYYY-MM-DD'
      )
      const tglJam = v.split(' ')
      const jamFull = tglJam[1]
      const jamPecah = jamFull.split(':')
      this.jamSelesai = jamPecah[0]
      this.menitSelesai = jamPecah[1]
    },
  },
  methods: {
    clearForm() {
      this.tanggal_jadwal = new Date().toISOString().substr(0, 10)
      this.jamSelesai = null
      this.menitSelesai = null
    },
    simpanbatas() {
      if (this.$refs.form_edit_jadwal.validate()) {
        this.loading = true
        this.loadingCatatanNilai = true

        const [day, month, year] = this.formatTanggalJadwal.split('-')
        const tanggal = `${year}-${month}-${day}`
        const tanggalSelesai =
          tanggal + ' ' + this.jamSelesai + ':' + this.menitSelesai + ':00'

        this.$axios
          .put('/ujian/jadwal-dosen', {
            tanggalSelesai,
            nomorUjian: this.nomorUjian,
          })
          .then((res) => {
            if (res.data.sukses) {
              this.dialogEditBatas = false
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
  },
}
</script>
