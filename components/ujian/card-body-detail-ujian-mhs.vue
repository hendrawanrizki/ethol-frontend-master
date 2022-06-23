<template>
  <div>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      rounded
      color="blue accent-2"
    ></v-progress-linear>
    <div v-if="dataJawaban.length != 0 && revisi == false">
      <v-card outlined>
        <v-card-title>Detail Pengumpulan Ujian</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <table class="noborder" width="100%">
            <tr>
              <th width="10%">Tanggal Upload</th>
              <td width="2%">:</td>
              <td>
                {{ dataJawabanFirst.tglUpload }}
              </td>
            </tr>
            <tr>
              <th>File Jawaban</th>
              <td width="2%">:</td>
              <td>
                <v-btn
                  color="primary"
                  small
                  class="text-none"
                  @click="downloadJawaban()"
                >
                  <v-icon small>mdi-download</v-icon>
                  &nbsp; <span>Download</span>
                </v-btn>
              </td>
            </tr>
            <tr>
              <th width="10%">Nilai</th>
              <td width="2%">:</td>
              <td>
                {{ dataJawabanFirst.nilai }}
              </td>
            </tr>
            <tr>
              <th width="10%">Tanggal Dinilai</th>
              <td width="2%">:</td>
              <td>
                {{ dataJawabanFirst.tglDinilai }}
              </td>
            </tr>
            <tr>
              <th width="10%">Catatan Dosen</th>
              <td width="2%">:</td>
              <td>
                {{ dataJawabanFirst.keterangan }}
              </td>
            </tr>
          </table>
        </v-card-text>
        <v-card-actions v-if="running == true">
          <v-btn
            color="orange"
            class="text-none"
            small
            dark
            @click="perbaikiJawaban()"
          >
            Perbaiki Jawaban &nbsp;
            <v-icon small>mdi-reload</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else-if="(running || revisi) && urlSoal != null && urlSoal != ''">
      <v-card outlined>
        <v-card-title>Form Pengumpulan Ujian</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="5">
              <v-card>
                <v-card-text>
                  <div
                    v-if="revisi"
                    style="
                      background-color: #ffffc7;
                      padding: 5px;
                      border-radius: 5px;
                    "
                  >
                    Sebelumnya Anda telah mengumpulkan ujian pada
                    {{ dataJawabanFirst.tglUpload }}, silakan isi form dibawah
                    ini untuk memperbaiki jawaban !
                  </div>
                  <br />
                  <v-form ref="form_unggah_jawaban">
                    <h4>Pilih File :</h4>
                    <br />
                    <v-file-input
                      v-model="inputFileJawaban"
                      accept=".pdf, .docx, .png, .jpg, .jpeg"
                      :rules="[
                        (v) => !!v || 'File harus diisi',
                        (v) =>
                          (v && v.size < 10000000) ||
                          'Ukuran file maksimal 10 Mb',
                      ]"
                      prepend-icon=""
                      prepend-inner-icon="mdi-attachment mdi-rotate-90"
                      placeholder="File jawaban ujian"
                      outlined
                    />
                    <v-btn
                      :class="'primary'"
                      class="text-none"
                      :loading="btnLoading"
                      :disabled="btnLoading"
                      @click="upload()"
                    >
                      <v-icon small>mdi-check-circle-outline</v-icon>
                      &nbsp;Simpan
                    </v-btn>
                    <v-btn
                      v-if="revisi"
                      class="text-none"
                      outlined
                      @click="batalPerbaikan()"
                    >
                      <v-icon small>mdi-close-circle-outline</v-icon>
                      &nbsp;Batal
                    </v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="7">
              <v-alert color="warning">
                Silakan upload jawaban ujian dengan ketentuan dibawah ini :
                <ol>
                  <li>
                    Format File yang diizinkan (.pdf, .docx, .png, .jpg, .jpeg)
                  </li>
                  <li>Ukuran Maksimal 10 MB</li>
                  <li v-show="revisi">
                    Memperbaiki jawaban akan menimpa file yang Anda upload
                    sebelumnya untuk ujian ini
                  </li>
                </ol>
              </v-alert>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
    <div
      v-else-if="
        isDone == true &&
        dataJawaban.length == 0 &&
        urlSoal != null &&
        urlSoal != ''
      "
    >
      <v-card outlined>
        <v-card-title>Pengumpulan Ujian</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="background-color: #f7f7f7 !important">
          <v-alert type="error">
            Batas waktu ujian telah habis !
            <br />
            <small>Ujian dapat dikumpulkan dengan status terlambat</small>
          </v-alert>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="5">
              <v-card>
                <v-card-text>
                  <br />
                  <v-form ref="form_unggah_jawaban">
                    <h4>Pilih File :</h4>
                    <br />
                    <v-file-input
                      v-model="inputFileJawaban"
                      accept=".pdf, .docx, .png, .jpg, .jpeg"
                      :rules="[
                        (v) => !!v || 'File harus diisi',
                        (v) =>
                          (v && v.size < 10000000) ||
                          'Ukuran file maksimal 10 Mb',
                      ]"
                      prepend-icon=""
                      prepend-inner-icon="mdi-attachment mdi-rotate-90"
                      placeholder="File jawaban ujian"
                      outlined
                    />
                    <v-btn
                      :class="'primary'"
                      class="text-none"
                      :loading="btnLoading"
                      :disabled="btnLoading"
                      @click="upload()"
                    >
                      <v-icon small>mdi-check-circle-outline</v-icon>
                      &nbsp;Simpan
                    </v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="7">
              <v-alert color="orange" outlined>
                Silakan upload jawaban ujian dengan ketentuan dibawah ini :
                <ol>
                  <li>
                    Format File yang diizinkan (.pdf, .docx, .png, .jpg, .jpeg)
                  </li>
                  <li>Ukuran Maksimal 10 MB</li>
                  <li v-show="revisi">
                    Memperbaiki jawaban akan menimpa file yang Anda upload
                    sebelumnya untuk ujian ini
                  </li>
                  <li style="color: red">
                    <b>Anda hanya dapat melakukan 1 kali upload jawaban</b>
                  </li>
                </ol>
              </v-alert>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import file from '~/mixins/file'
export default {
  mixins: [file],
  data() {
    return {
      loading: false,
      nomorUjian: 0,
      jenisUjian: null,
      dataJawaban: [],
      dataJawabanFirst: {
        nomorJawaban: null,
        tglUpload: '-',
        fileJawaban: null,
        nilai: null,
        tglDinilai: '-',
        keterangan: '',
      },
      running: false,
      isDone: false,
      urlSoal: null,

      inputFileJawaban: null,
      btnLoading: false,
      revisi: false,
    }
  },
  computed: {
    ...mapState({
      ujian: (state) => state.modules.ujian.ujianMahasiswa,
      user: (state) => state.user,
    }),
  },
  watch: {
    nomorUjian(v) {
      this.getPekerjaanMahasiswa()
    },
  },
  methods: {
    assignDataUjian(ujian) {
      this.nomorUjian = ujian.ujian.nomor
      this.jenisUjian = ujian.jenis_ujian
    },
    assignStatus(v) {
      this.running = v.running
      this.isDone = v.isDone
      this.urlSoal = v.urlSoal
    },
    getPekerjaanMahasiswa() {
      this.loading = true
      this.$axios
        .get('/ujian/jawaban', {
          params: {
            nomor: this.nomorUjian,
          },
        })
        .then((res) => {
          this.dataJawaban = res.data
          if (this.dataJawaban.length >= 1) {
            this.dataJawabanFirst = {
              nomorJawaban: this.dataJawaban[0].nomor,
              tglUpload: this.dataJawaban[0].tgl_upload_indonesia,
              fileJawaban: this.dataJawaban[0].url_jawaban,
              nilai: this.dataJawaban[0].nilai,
              tglDinilai: this.dataJawaban[0].tgl_dinilai_indonesia,
              keterangan: this.dataJawaban[0].keterangan,
            }
          }
        })
        .finally(() => (this.loading = false))
    },
    downloadJawaban() {
      this.downloadFileEthol(this.dataJawabanFirst.fileJawaban)
    },
    upload() {
      if (this.$refs.form_unggah_jawaban.validate()) {
        this.btnLoading = true
        const form = new FormData()
        form.append('ujian', this.nomorUjian)
        form.append('mahasiswa', this.user.nomor)
        form.append('file', this.inputFileJawaban)
        this.$axios
          .post('/ujian/submit', form)
          .then((res) => {
            if (res.data.sukses === true) {
              this.getPekerjaanMahasiswa()
              this.revisi = false
              // this.getJawaban()
            }
          })
          .finally(() => {
            this.btnLoading = false
            this.$refs.form_unggah_jawaban.reset()
          })
      }
    },
    perbaikiJawaban() {
      if (this.running == true && this.isDone == false) {
        this.revisi = true
      }
    },
    batalPerbaikan() {
      this.revisi = false
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
