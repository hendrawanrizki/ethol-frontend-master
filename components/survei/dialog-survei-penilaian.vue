<template>
  <v-dialog
    v-model="bukaDialog"
    style="top: 10% !important; position: absolute"
    width="700"
    persistent
  >
    <v-card>
      <v-card-title style="background-color: #f5f5f5">
        Survei penilaian aplikasi ETHOL
      </v-card-title>
      <v-divider></v-divider>
      <br />
      <v-card-text>
        <v-alert v-show="tampilkan == 'alert_buka'" color="blue" type="info">
          Mohon ketersedian waktunya untuk mengisi survei penilaian penggunaan
          aplikasi ETHOL.
          <br />
          <small
            >Survei penilaian ini terdiri dari 3 pertanyaan dan 1 saran
            masukan</small
          >
        </v-alert>
        <v-alert
          v-show="tampilkan == 'alert_selesai'"
          color="success"
          type="success"
        >
          Terimakasih telah mengisi survei penilaian aplikasi ETHOL.
        </v-alert>
        <div v-show="tampilkan == 'soal_1'">
          <v-alert v-show="pesanErrorSatu" type="error" color="danger"
            >Harap pilih minimal 1 fitur</v-alert
          >
          <p style="font-size: 13pt">
            1. Fitur apa saya yang anda gunakan di aplikasi ETHOL ?
            <span style="color: red">*</span>
          </p>
          <v-checkbox
            v-model="fitur"
            label="Absensi"
            value="Absensi"
            hide-details
            color="primary"
          ></v-checkbox>
          <v-checkbox
            v-model="fitur"
            label="Tugas"
            value="Tugas"
            hide-details
            color="primary"
          ></v-checkbox>
          <v-checkbox
            v-model="fitur"
            label="Conference"
            value="Conference"
            hide-details
            color="primary"
          ></v-checkbox>
          <v-checkbox
            v-model="fitur"
            label="Materi"
            value="Materi"
            hide-details
            color="primary"
          ></v-checkbox>
          <v-checkbox
            v-model="fitur"
            label="Video"
            value="Video"
            hide-details
            color="primary"
          ></v-checkbox>
        </div>
        <div v-show="tampilkan == 'soal_2'">
          <v-alert v-show="pesanErrorDua" type="error" color="danger"
            >Harap pilih jenis conference</v-alert
          >
          <p style="font-size: 13pt">
            2. Conference apa yg sering anda gunakan saat perkuliahan daring ?
            <span style="color: red">*</span>
          </p>
          <v-radio-group v-model="tipeConference">
            <v-radio label="Conference Ethol" value="1"></v-radio>
            <v-radio label="Zoom" value="2"></v-radio>
            <v-radio label="Google Meet" value="3"></v-radio>
          </v-radio-group>
        </div>
        <div v-show="tampilkan == 'soal_3'">
          <v-alert v-show="pesanErrorTiga" type="error" color="danger"
            >Harap pilih salah satu</v-alert
          >
          <p style="font-size: 13pt">
            3. Apakah anda puas dengan layanan ETHOL ?
            <span style="color: red">*</span>
          </p>
          <v-radio-group v-model="ratingKepuasan">
            <v-radio label="Tidak Puas" value="1"></v-radio>
            <v-radio label="Kurang Puas" value="2"></v-radio>
            <v-radio label="Biasa Saja" value="3"></v-radio>
            <v-radio label="Puas" value="4"></v-radio>
            <v-radio label="Sangat Puas" value="5"></v-radio>
          </v-radio-group>
        </div>
        <div v-show="tampilkan == 'soal_4'">
          <p style="font-size: 13pt">
            4. Apabila ada kesulitan selama menggunakan ethol atau saran dan
            masukan untuk ethol, silahkan tuliskan disini ...
          </p>
          <v-textarea
            v-model="saranMasukan"
            filled
            name="kritikdansaran"
            label="Saran & Masukkan"
            placeholder="Tuliskan saran & masukkan anda di sini ..."
          ></v-textarea>
        </div>
      </v-card-text>

      <v-divider> </v-divider>

      <v-card-actions>
        <v-spacer />
        <div v-show="tampilkan == 'alert_buka'">
          <v-btn
            small
            class="text-none"
            color="primary"
            outlined
            @click="bukaDialog = false"
            ><span>Lain Kali</span></v-btn
          >
          <v-btn
            color="primary"
            small
            class="text-none"
            depressed
            @click="tampilkan = 'soal_1'"
            ><span>Mulai Survei</span> &nbsp;
            <v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
        <div v-show="tampilkan == 'soal_1'">
          <v-btn
            color="primary"
            small
            class="text-none"
            depressed
            @click="validasi_soal(1)"
            ><span>Selanjutnya</span> &nbsp;
            <v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
        <div v-show="tampilkan == 'soal_2'">
          <v-btn
            color="primary"
            small
            class="text-none"
            depressed
            outlined
            @click="tampilkan = 'soal_1'"
          >
            <v-icon small>mdi-arrow-left</v-icon>&nbsp; <span>Sebelumnya</span>
          </v-btn>
          <v-btn
            color="primary"
            small
            class="text-none"
            depressed
            @click="validasi_soal(2)"
            ><span>Selanjutnya</span> &nbsp;
            <v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
        <div v-show="tampilkan == 'soal_3'">
          <v-btn
            color="primary"
            small
            class="text-none"
            depressed
            outlined
            @click="tampilkan = 'soal_2'"
          >
            <v-icon small>mdi-arrow-left</v-icon>&nbsp; <span>Sebelumnya</span>
          </v-btn>
          <v-btn
            color="primary"
            small
            class="text-none"
            depressed
            @click="validasi_soal(3)"
            ><span>Selanjutnya</span> &nbsp;
            <v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
        <div v-show="tampilkan == 'soal_4'">
          <v-btn
            color="primary"
            small
            class="text-none"
            depressed
            outlined
            :loading="loading"
            :disabled="loading"
            @click="tampilkan = 'soal_3'"
          >
            <v-icon small>mdi-arrow-left</v-icon>&nbsp; <span>Sebelumnya</span>
          </v-btn>
          <v-btn
            color="primary"
            small
            class="text-none"
            depressed
            :loading="loading"
            :disabled="loading"
            @click="simpan()"
            ><span>SIMPAN</span>
          </v-btn>
        </div>
        <div v-show="tampilkan == 'alert_selesai'">
          <v-btn
            color="primary"
            small
            class="text-none"
            depressed
            @click="bukaDialog = false"
            ><span>Tutup</span>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      bukaDialog: false,
      loading: false,
      tampilkan: 'alert_buka',
      pesanErrorSatu: false,
      isSatuSubmitted: false,
      pesanErrorDua: false,
      isDuaSubmitted: false,
      pesanErrorTiga: false,
      isTigaSubmitted: false,
      fitur: [],
      tipeConference: null,
      ratingKepuasan: null,
      saranMasukan: null,
    }
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
    fitur(v) {
      if (this.isSatuSubmitted == true && v.length == 0) {
        this.pesanErrorSatu = true
      } else {
        this.pesanErrorSatu = false
      }
    },
    tipeConference(v) {
      if (this.isDuaSubmitted == true && v == null) {
        this.pesanErrorDua = true
      } else {
        this.pesanErrorDua = false
      }
    },
    ratingKepuasan(v) {
      if (this.isTigaSubmitted == true && v == null) {
        this.pesanErrorTiga = true
      } else {
        this.pesanErrorTiga = false
      }
    },
  },
  mounted() {},
  methods: {
    bersihkanForm() {
      this.pesanErrorSatu = false
      this.isSatuSubmitted = false
      this.pesanErrorDua = false
      this.isDuaSubmitted = false
      this.pesanErrorTiga = false
      this.isTigaSubmitted = false
      this.fitur = []
      this.tipeConference = null
      this.ratingKepuasan = null
      this.saranMasukan = null
    },
    validasi_soal(i) {
      if (i == 1) {
        this.isSatuSubmitted = true
        if (this.fitur.length == 0) {
          this.pesanErrorSatu = true
        } else {
          this.pesanErrorSatu = false
          this.tampilkan = 'soal_2'
        }
      } else if (i == 2) {
        this.isDuaSubmitted = true
        if (this.tipeConference == null) {
          this.pesanErrorDua = true
        } else {
          this.pesanErrorDua = false
          this.tampilkan = 'soal_3'
        }
      } else if (i == 3) {
        this.isTigaSubmitted = true
        if (this.ratingKepuasan == null) {
          this.pesanErrorTiga = true
        } else {
          this.pesanErrorTiga = false
          this.tampilkan = 'soal_4'
        }
      }
    },
    simpan() {
      this.loading = true
      this.$axios
        .post('/survei-penilaian', {
          fitur: this.fitur,
          tipeConference: this.tipeConference,
          ratingKepuasan: this.ratingKepuasan,
          saranMasukan: this.saranMasukan,
        })
        .then((res) => {
          if (res.data.sukses) {
            this.$emit('refresh')
            this.bersihkanForm()
            this.tampilkan = 'alert_selesai'
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style scoped>
#btn-batal:hover {
  cursor: pointer !important;
}
</style>
