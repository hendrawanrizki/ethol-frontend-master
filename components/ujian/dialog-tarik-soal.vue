<template>
  <v-dialog v-model="dialogTarikSoal" width="700" persistent>
    <v-card>
      <v-card-title class="text-h5 lighten-2">
        Cek / Tarik Soal
        <v-spacer></v-spacer>
        <v-btn icon :disabled="loading" @click="dialogTarikSoal = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="alertGagal">
        <br />
        <v-alert color="error" style="color: white">
          <v-icon style="color: white">mdi-information-outline</v-icon> &nbsp;
          {{ messageAlertGagal }}
        </v-alert>
      </v-card-text>
      <v-card-text v-if="urlSoal != '' && urlSoal != null">
        <br />
        <img
          v-if="mode == 'gambar'"
          :src="url_file"
          style="width: 100%; height: auto"
        />
        <iframe
          v-else-if="mode == 'dokumen'"
          :src="url_file"
          style="width: 100%; height: 500px; border: none"
        ></iframe>
      </v-card-text>
      <v-card-text v-else>
        <br />
        <div v-if="alertGagal == false">
          <v-alert color="info" style="color: white">
            <v-icon style="color: white">mdi-information-outline</v-icon> &nbsp;
            File tidak ditemukan, silakan klik tombol tarik soal !
          </v-alert>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="loading"
          text
          @click="tarikSoal"
        >
          Tarik Soal
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import teks from '~/mixins/teks'
import file from '~/mixins/file'
export default {
  components: {},
  mixins: [teks, file],
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    nomorUjian: {
      type: Number,
      required: true,
    },
    jenis: {
      type: Number,
      required: true,
    },
    nomorKuliah: {
      type: Number,
      required: true,
    },
    jenisSchema: {
      type: Number,
      required: true,
    },
    tahun: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    urlSoal: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      dialogTarikSoal: false,
      loading: false,
      mode: '',
      url_file: '',
      alertGagal: false,
      messageAlertGagal: '',
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  watch: {
    dialog(v) {
      this.dialogTarikSoal = v
    },
    dialogTarikSoal(v) {
      if (v == false) {
        this.$emit('tutup')
        this.clearForm()
      }
    },
    urlSoal(v) {
      if (v != '' && v != null) {
        this.olahFile(v)
      }
    },
  },
  methods: {
    clearForm() {
      this.mode = ''
      this.url_file = ''
      this.alertGagal = false
      this.messageAlertGagal = ''
    },
    tarikSoal() {
      this.loading = true

      let urlTarikSoal = ''
      if (this.admin == true) {
        urlTarikSoal = '/ujian/tarik-soal-ujian'
      } else if (this.baak == true) {
        urlTarikSoal = '/ujian/tarik-soal-ujian-baak'
      }
      this.$axios
        .post(urlTarikSoal, {
          nomorUjian: this.nomorUjian,
          jenis: this.jenis,
          kuliah: this.nomorKuliah,
          jenisSchema: this.jenisSchema,
          tahun: this.tahun,
          semester: this.semester,
        })
        .then((res) => {
          console.log('res', res)
          if (res.data.success == true) {
            // this.dialogTarikSoal = false
            this.olahFile(res.data.url)
            this.$emit('refresh')
          } else {
            this.alertGagal = true
            this.messageAlertGagal = res.data.message
          }
          this.loading = false
        })
        .catch((err) => {
          this.loading = true
          console.log(err)
        })
    },
    olahFile(v) {
      const extensiFile = this.getExtensiFile(v)
      this.extensi_file = extensiFile
      if (
        extensiFile == 'jpg' ||
        extensiFile == 'jpeg' ||
        extensiFile == 'png' ||
        extensiFile == 'gif' ||
        extensiFile == 'webp'
      ) {
        this.mode = 'gambar'
        this.url_file = v
      } else if (extensiFile == 'pdf') {
        this.mode = 'dokumen'
        this.url_file = v
      } else if (
        extensiFile == 'docx' ||
        extensiFile == 'doc' ||
        extensiFile == 'xlsx' ||
        extensiFile == 'xls' ||
        extensiFile == 'ppt' ||
        extensiFile == 'pptx'
      ) {
        this.mode = 'dokumen'
        this.url_file = `https://docs.google.com/gview?url=${v}&embedded=true`
      }
    },
  },
}
</script>
