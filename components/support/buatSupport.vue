<template>
  <div>
    <h2>Buat Tiket</h2>
    <br />
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-text>
            <v-alert color="light-blue lighten-4">
              Silakan isi form berikut jika terdapat masalah saat menggunakan
              ETHOL !
            </v-alert>
            <div style="border-top: 0.5px dashed grey"></div>
            <br />
            <v-row>
              <v-col cols="12" md="8">
                <v-form ref="form_support">
                  <p style="font-weight: 600; font-size: 13pt">Judul :</p>
                  <v-text-field
                    v-model="judul"
                    :rules="[(v) => !!v || 'Judul harus diisi']"
                    placeholder="Judul . . ."
                    filled
                  ></v-text-field>
                </v-form>
                <p style="font-weight: 600; font-size: 13pt">Keterangan :</p>
                <Editor @updatecontent="updatecontent" />
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="12" md="4">
                <v-btn
                  color="green"
                  small
                  class="text-none"
                  dark
                  @click="tambahLampiran"
                >
                  <v-icon small>mdi-plus-circle</v-icon>&nbsp;
                  <span>Tambah Lampiran</span>
                </v-btn>
                <br />
                <br />
                <div v-for="(l, index) in lampiran" :key="index">
                  <v-row>
                    <v-col cols="12" md="10">
                      <v-file-input
                        :key="index"
                        v-model="l.file"
                        label="File"
                        hide-details
                        prepend-icon=""
                        prepend-inner-icon="mdi-attachment mdi-rotate-90"
                        outlined
                        accept=".pdf, .png, .jpeg, .jpg"
                        @change="fileToBase64(index, l.file)"
                      />
                    </v-col>
                    <v-col cols="12" md="2">
                      <v-btn
                        icon
                        color="red"
                        style="margin-top: 5px"
                        @click="hapusLampiran(index)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
                <v-row v-show="lampiran.length != 0">
                  <v-col cols="12">
                    <small> File yang diizinkan .pdf, .png, .jpeg, .jpg </small>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="primary"
              :loading="loadingSave"
              :disabled="loadingSave"
              @click="simpanData"
            >
              <v-icon small>mdi-check-circle-outline</v-icon>
              &nbsp;SIMPAN
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Editor from '@/components/wysiwyg/editor.vue'
import { mapState, mapGetters } from 'vuex'
import file from '~/mixins/file'
export default {
  components: {
    Editor,
  },
  mixins: [file],
  data() {
    return {
      loading: false,
      loadingSave: false,
      judul: '',
      lampiran: [],
      keterangan: '',
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      auth: (state) => state.auth,
    }),
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  mounted() {},
  methods: {
    updatecontent(v) {
      this.keterangan = v
    },
    async fileToBase64(i, file) {
      if (file) {
        const base64 = await this.toBase64(file)
        const ext = file.name.split('.')
        this.lampiran[i].file_base_64 = base64
        this.lampiran[i].extensi_file = ext[ext.length - 1]
        this.lampiran[i].original_name = ext[0]
      }
    },
    tambahLampiran() {
      this.lampiran.push({
        file: null,
        file_base_64: null,
        extensi_file: null,
        original_name: null,
      })
    },
    hapusLampiran(i) {
      this.lampiran.splice(i, 1)
    },
    simpanData() {
      if (this.$refs.form_support.validate()) {
        let checkLampiranvalid = true
        for (let index = 0; index < this.lampiran.length; index++) {
          const element = this.lampiran[index]
          if (element.file == null) {
            checkLampiranvalid = false
          }
        }
        if (checkLampiranvalid == true) {
          const self = this
          this.loadingSave = true
          this.$axios
            .$post('/support', {
              judul: this.judul,
              lampiran: this.lampiran,
              deskripsi: this.keterangan,
              tipeAkses: this.auth.hakAktif,
            })
            .finally(() => (this.loadingSave = false))
            .then((response) => {
              if (response.sukses == true) {
                setTimeout(function () {
                  if (self.mahasiswa) {
                    self.$router.push('/mahasiswa/support')
                  } else if (self.dosen) {
                    self.$router.push('/dosen/support')
                  } else if (self.kaprodi) {
                    self.$router.push('/kaprodi/support')
                  }
                }, 1500)
              }
            })
            .catch((err) => {
              if (err.response.status == 413 || err.response.status == '413') {
                alert('Lampiran File Terlalu Besar')
              } else {
                alert('Gagal menyimpan data !')
              }
            })
        } else {
          alert('Harap isi semua lampiran yang telah Anda tambahkan !')
        }
      }
    },
  },
}
</script>
