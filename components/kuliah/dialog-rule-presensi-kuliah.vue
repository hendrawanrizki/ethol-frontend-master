<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="600" persistent>
      <v-card>
        <v-card-title>
          <span>Aturan Presensi Kuliah</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="bukaDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <br />
        <v-card-text>
          <ol>
            <li>
              Dosen tidak dapat melakukan RAPEL (melakukan perkuliahan yang sama
              dalam jeda waktu perkuliahan yang pertama belum selesai) maupun
              DOBEL (melakukan dua perkuliahan/lebih di waktu yang sama)
            </li>
            <br />
            <li>
              Dosen klik tombol
              <span class="info--text" style="font-weight: 600">
                BUKA PRESENSI BARU
              </span>
              untuk membuka presensi dan secara otomatis tombol presensi di
              mahasiswa akan aktif
            </li>
            <br />
            <li>
              Dosen dapat melakukan pembatalan presensi dengan klik tombol
              <span class="error--text" style="font-weight: 600">BATALKAN</span>
            </li>
            <br />
            <li>
              Mahasiswa hanya dapat melakukan presensi jika Tombol
              <span class="primary--text" style="font-weight: 600">
                PRESENSI
              </span>
              enable. Tombol tersebut akan enable saat dosen membuka presensi
              sampai waktu perkuliahan selesai (Presensi menutup otomatis saat
              jam perkuliahan selesai)
            </li>
            <br />
            <li>
              Tombol conference pada mahasiswa akan aktif setelah mahasiswa
              melakukan presensi
            </li>
            <br />
            <li>
              Presensi di Online MIS akan terekap sehari setelah presensi
              dilakukan di ETHOL
            </li>
            <br />
            <li>
              Presensi tercatat di online MIS apabila terdapat data presensi
              dosen dan mahasiswa pada sesi perkuliahan yang sama
            </li>
            <br />
            <li>
              Perkuliahan pengganti disarankan menggunakan
              <span class="info--text" style="font-weight: 600">
                Conference Lainnya
              </span>
              supaya tidak crash room dengan perkuliahan kelas lain. Dosen dapat
              menyisipkan url conference dari aplikasi lain (zoom, google meet,
              dll)
            </li>
          </ol>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn small color="primary" text @click="bukaDialog = false">
            Tutup
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
    }
  },
  watch: {
    bukaDialog(v) {
      if (!v) {
        this.$emit('tutup')
      }
    },
    dialog(v) {
      this.bukaDialog = v
    },
  },
  methods: {},
}
</script>
