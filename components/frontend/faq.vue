<template>
  <div>
    <h2>FAQ</h2>
    <small style="font-size: 15px !important">Frequently Asked Questions</small>
    <br />
    <br />
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <v-card outlined class="card-faq">
          <v-card-title> Mahasiswa </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-expansion-panels v-model="panel" multiple>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><p style="font-size: 14pt">
                    Apa yang harus dilakukan jika tidak bisa login ke ETHOL
                    karena lupa email dan password ?
                  </p></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  Silahkan menghubungi petugas UPT Jaringan dan Komputer, Akses
                  kredensial mahasiswa tidak ditangani oleh Tim ETHOL.
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><p style="font-size: 14pt">
                    Bagaimana jika kuliah saya di semester ini tidak muncul ?
                  </p></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  Silahkan mengecek status daftar ulang di Online MIS dan
                  pastikan anda sudah melakukan daftar ulang dengan cara klik
                  Tombol Daftar Ulang yang ada di Online MIS. Setelah anda
                  melakukan klik pada tombol tersebut harap kuliah anda akan
                  muncul di ETHOL satu hari setelahnya. Harap menunggu.
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><p style="font-size: 14pt">
                    Bagaimana jika saya tidak dapat melakukan klik pada tombol
                    Presensi saat akan mengikuti perkuliahan online ?
                  </p></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  Harap dipastikan dosen pengampu kuliah sudah membuka presensi
                  dengan cara menghubungi dosen pengampu melalui PJ Kuliah di
                  kelas anda. Jika teman anda sudah berhasil melakukan presensi
                  namun tombol Presensi yang tampil di browser anda sedang dalam
                  posisi tidak dapat di klik, maka dosen sudah menutup presensi
                  tersebut dan anda dianggap terlambat mengikuti perkuliahan dan
                  presensi anda berstatus Alpha.
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><p style="font-size: 14pt">
                    Data rekap presensi yang valid apakah yang ada di ETHOL atau
                    Online MIS ?
                  </p></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  Data rekap presensi yang valid adalah data yang terekap di
                  Online MIS, data yang tersimpan di ETHOL merupakan data
                  presensi online yang kemudian akan tersimpan di Online MIS
                  satu hari setelah presensi online dilakukan di ETHOL.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-card outlined class="card-faq">
          <v-card-title> Dosen </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-expansion-panels v-model="panel_dosen" multiple>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><p style="font-size: 14pt">
                    Bagaimana cara setting Conference Lainnya ?
                  </p></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  Masuk ke halaman kuliah, klik tombol pengaturan yang terletak
                  disamping tombol conference lainnya. Setelah muncul form
                  silahkan masukkan url conference dari aplikasi pihak ketiga
                  seperti zoom, google meet, dll
                  <br />
                  Contoh url :
                  <a href="https://meet.google.com/itk-wjog-bbx">Meet</a> ,
                  <a
                    href="https://us02web.zoom.us/j/89355489118?pwd=OWNYc2gxQjRzQzB1OFk2T0s0Z1VoZz09#success"
                    >Join our Cloud HD Video Meeting</a
                  >
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><p style="font-size: 14pt">
                    Apakah dosen bisa membuka presensi di kuliah yang berbeda
                    dalam waktu bersamaan ?
                  </p></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  Dosen hanya dapat membuka presensi satu kali dalam satu waktu,
                  untuk membuka presensi baru harap menutup presensi sebelumnya
                  yang masih terbuka.
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><p style="font-size: 14pt">
                    Data rekap presensi yang valid apakah yang ada di ETHOL atau
                    MIS ?
                  </p></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  Data rekap presensi yang valid adalah data yang terekap di
                  MIS, data yang tersimpan di ETHOL merupakan data presensi
                  online yang kemudian akan tersimpan di MIS satu hari setelah
                  presensi online dilakukan di ETHOL.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br />
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      panel: [],
      panel_dosen: [],
    }
  },
}
</script>
<style scoped>
.card-faq {
  border-radius: 15px;
  box-shadow: -2px 8px 29px 2px rgba(46, 46, 46, 0.15);
  -webkit-box-shadow: -2px 8px 29px 2px rgba(46, 46, 46, 0.15);
  -moz-box-shadow: -2px 8px 29px 2px rgba(46, 46, 46, 0.15);
}
</style>
