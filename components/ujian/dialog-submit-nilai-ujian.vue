<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="700" persistent>
      <v-card>
        <v-card-title>
          <span v-show="mode == 'beri'">Beri Nilai</span>
          <span v-show="mode == 'edit'">Edit Nilai</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="bukaDialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <br />
        <v-card-text>
          <v-card outlined>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="12" sm="12">
                  <table class="noborder" width="100%">
                    <tr>
                      <th width="25%">NRP</th>
                      <td width="2%">:</td>
                      <td>{{ itemData.nrp }}</td>
                    </tr>
                    <tr>
                      <th>Nama</th>
                      <td width="2%">:</td>
                      <td>{{ itemData.nama }}</td>
                    </tr>
                    <tr>
                      <th>Tanggal Mengumpulkan</th>
                      <td width="2%">:</td>
                      <td>{{ itemData.tgl_upload_indonesia }}</td>
                    </tr>
                    <tr>
                      <th>File Mahasiswa</th>
                      <td width="2%">:</td>
                      <td>
                        <v-btn
                          small
                          color="primary"
                          class="text-none"
                          @click="downloadTugas(itemData)"
                        >
                          <v-icon small>mdi-cloud-download</v-icon> &nbsp;
                          <span>Download</span>
                        </v-btn>
                      </td>
                    </tr>
                    <tr v-if="itemData.nilai != null">
                      <th>Nilai</th>
                      <td width="2%">:</td>
                      <td>{{ itemData.nilai }}</td>
                    </tr>
                    <tr v-if="itemData.keterangan != null">
                      <th>Catatan Dosen</th>
                      <td width="2%">:</td>
                      <td>{{ itemData.keterangan }}</td>
                    </tr>
                    <tr v-if="itemData.tgl_dinilai_indonesia != null">
                      <th>Tanggal Koreksi</th>
                      <td width="2%">:</td>
                      <td>{{ itemData.tgl_dinilai_indonesia }}</td>
                    </tr>
                  </table>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <br />
          <v-form ref="form_catatan_nilai">
            <v-text-field
              v-model="nilai"
              outlined
              label="Nilai"
              placeholder="Nilai : 0-100"
              :rules="rulesNilai"
              @keypress="isNumber($event)"
            >
            </v-text-field>
            <v-textarea
              v-model="catatan"
              outlined
              label="Catatan"
              rows="2"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn
            :color="mode == 'beri' ? 'primary' : 'orange'"
            :loading="loadingCatatanNilai"
            :disabled="loadingCatatanNilai"
            class="text-none"
            @click="simpan_catatan_nilai()"
          >
            <span>Simpan</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import file from '~/mixins/file'
import validasi from '~/mixins/validasi'
export default {
  mixins: [file, validasi],
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false,
    },
    mode: {
      type: String,
      required: true,
      default: 'tambah',
    },
    itemData: {
      type: Object,
      required: true,
    },
    nomorUjianMahasiswa: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      bukaDialog: false,
      loadingCatatanNilai: false,
      catatan: '',
      rulesNilai: [(v) => v <= 100 || 'Nilai 0 - 100'],
      nilai: '',
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
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
    itemData(v) {
      this.nilai = v.nilai
      this.catatan = v.keterangan
    },
  },
  mounted() {},
  methods: {
    downloadTugas(v) {
      this.downloadFileEthol(v.url_jawaban)
    },
    bersihkanForm() {
      this.catatan = ''
      this.file = null
      this.loading = false
    },
    simpan_catatan_nilai() {
      if (this.$refs.form_catatan_nilai.validate()) {
        if (
          (this.nilai == null || this.nilai == '') &&
          (this.catatan == '' || this.catatan == null)
        ) {
          alert('Harap isi nilai atau catatan !')
        } else {
          this.loadingCatatanNilai = true
          this.$axios
            .put('/ujian/update-catatan-nilai', {
              nomor_ujian_mahasiswa: this.nomorUjianMahasiswa,
              catatanDosen: this.catatan,
              nilai: this.nilai,
            })
            .then((res) => {
              if (res.data.sukses) {
                this.loadingCatatanNilai = false
                this.bukaDialog = false
                this.$emit('refresh')
              } else {
                this.loadingCatatanNilai = false
              }
            })
            .catch((err) => {
              this.loadingCatatanNilai = false
              console.log(err)
            })
        }
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
