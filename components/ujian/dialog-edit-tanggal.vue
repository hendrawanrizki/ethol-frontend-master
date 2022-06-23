<template>
  <v-dialog v-model="dialogEditTanggal" width="500" persistent>
    <v-card>
      <v-card-title class="text-h5 lighten-2">
        Edit Tanggal
        <v-spacer></v-spacer>
        <v-btn icon :disabled="loading" @click="dialogEditTanggal = false"
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
    tglUjian: {
      type: String,
      required: true,
    },
    waktuSelesai: {
      type: String,
      required: true,
    },
    waktuMulai: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialogEditTanggal: null,
      loading: false,
      room: [],
      roomId: null,
      editTglJadwal: false,
      tanggal_jadwal: new Date().toISOString().substr(0, 10),
      minDate: new Date().toISOString().substr(0, 10),
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
      this.dialogEditTanggal = v
    },
    dialogEditTanggal(v) {
      if (v == false) {
        this.$emit('tutup')
        this.clearForm()
      }
    },
    tglUjian(v) {
      this.tanggal_jadwal = v
    },
  },
  methods: {
    clearForm() {
      // this.tanggal_jadwal = new Date().toISOString().substr(0, 10)
    },
    simpanJadwal() {
      if (this.$refs.form_edit_jadwal.validate()) {
        this.loading = true
        this.loadingCatatanNilai = true

        const [day, month, year] = this.formatTanggalJadwal.split('-')
        const tanggal = `${year}-${month}-${day}`
        const tanggalMulai = tanggal + ' ' + this.waktuMulai
        const tanggalSelesai = tanggal + ' ' + this.waktuSelesai

        let urlApiEditJadwal = ''
        if (this.admin == true) {
          urlApiEditJadwal = '/ujian/tanggal-admin'
        } else if (this.baak == true) {
          urlApiEditJadwal = '/ujian/tanggal-baak'
        }
        this.$axios
          .put(urlApiEditJadwal, {
            tanggalMulai,
            tanggalSelesai,
            nomorUjian: this.nomorUjian,
          })
          .then((res) => {
            if (res.data.sukses) {
              this.dialogEditTanggal = false
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
  },
}
</script>
