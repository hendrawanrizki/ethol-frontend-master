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
    <br />
    <v-row>
      <v-col cols="12" md="5">
        <h2>Detail Tiket</h2>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn
          v-if="admin"
          color="primary"
          class="text-none"
          @click="bukaDialogTunjuk()"
        >
          <v-icon small>mdi-account-check</v-icon> &nbsp;
          <span>Tunjuk BAAK</span>
        </v-btn>
      </v-col>
      <v-col cols="12" md="2">
        <v-checkbox
          v-show="admin || baak"
          v-model="isSelesai"
          style="margin-top: -3px"
          label="Tandai Selesai"
        ></v-checkbox>
      </v-col>
      <v-col cols="12" md="3">
        <v-chip
          v-if="pertanyaan.status == '1'"
          class="float-right"
          label
          color="#6ab04c"
          dark
        >
          Status : {{ pertanyaan.ketStatus }}
        </v-chip>
        <v-chip
          v-else-if="pertanyaan.status == '2' || pertanyaan.status == '3'"
          class="float-right"
          label
          color="#ffa801"
          style="font-weight: 500"
        >
          Status : {{ pertanyaan.ketStatus }}
        </v-chip>
        <v-chip
          v-else-if="pertanyaan.status == '4'"
          class="float-right"
          style="font-weight: 500"
          label
          dark
          color="green"
        >
          Status : {{ pertanyaan.ketStatus }}
        </v-chip>
      </v-col>
    </v-row>
    <br />
    <v-row v-show="pertanyaan.status == '4'">
      <v-col cols="12" md="12">
        <v-alert color="blue" type="info">
          Tiket yang Anda buat saat ini sudah <b>selesai / <i>closed</i></b
          >, silakan balas untuk membuka kembali percakapan !
        </v-alert>
      </v-col>
    </v-row>
    <!-- form balasan -->
    <v-row>
      <v-col cols="12">
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header
              style="
                color: #31708f;
                background-color: #d9edf7;
                border-color: #bce8f1;
              "
            >
              <div><v-icon small color="#31708f">mdi-pencil</v-icon> Balas</div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <br />
              <v-row>
                <v-col cols="12" md="8">
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
                      <small>
                        File yang diizinkan .pdf, .png, .jpeg, .jpg
                      </small>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <br />
              <br />
              <v-row>
                <v-col cols="12">
                  <center>
                    <v-btn
                      color="primary"
                      :loading="loadingSave"
                      :disabled="loadingSave"
                      @click="beriBalasan"
                    >
                      <v-icon small>mdi-check-circle-outline</v-icon>
                      &nbsp;SIMPAN
                    </v-btn>
                  </center>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <!-- end form balasan -->

    <!-- balasan -->
    <v-row v-for="(b, index) in balasan" :key="index">
      <v-col cols="12">
        <v-card outlined>
          <v-card-title style="padding: 5px; background-color: #f5f5f5">
            <v-row>
              <v-col cols="12" md="9">
                <v-list-item>
                  <v-list-item-avatar size="60">
                    <v-img src="/user.png" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <span>{{ b.nama_user }}</span>
                    <span class="caption">{{
                      capitalizeFirstLetter(b.tipe)
                    }}</span>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" md="3">
                <div
                  style="font-size: 13px; color: black; margin-top: 15px"
                  class="float-right"
                >
                  {{ b.waktuDibalasIndonesia }}
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <!-- eslint-disable vue/no-v-html -->
            <div v-html="b.deskripsi"></div>
            <!--eslint-enable-->
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12">Lampiran : </v-col>
              <v-col v-show="b.lampiran.length == 0">
                Tidak ada lampiran
              </v-col>
              <v-col
                v-for="(bl, indexl) in b.lampiran"
                v-show="b.lampiran.length != 0"
                :key="indexl"
                cols="12"
                md="3"
              >
                <CardFile
                  :nama-file="bl.path"
                  :path="bl.path"
                  icon="mdi-download"
                  :hover="false"
                  @aksiicon="downloadFileLampiran"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            IP Address :
            {{ b.ip_address }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- end balasan -->

    <!-- pertanyaan -->
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title style="padding: 5px; background-color: #f5f5f5">
            <v-row>
              <v-col cols="12" md="9">
                <v-list-item>
                  <v-list-item-avatar size="60">
                    <v-img src="/user.png" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <span>{{ pertanyaan.nama ? pertanyaan.nama : '' }}</span>
                    <span class="caption">{{
                      capitalizeFirstLetter(
                        pertanyaan.tipe ? pertanyaan.tipe : '-'
                      )
                    }}</span>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" md="3">
                <div
                  style="font-size: 13px; color: black; margin-top: 15px"
                  class="float-right"
                >
                  {{
                    pertanyaan.waktuDibuatIndonesia
                      ? pertanyaan.waktuDibuatIndonesia
                      : '-'
                  }}
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <h4>{{ pertanyaan.judul ? pertanyaan.judul : '' }}</h4>
            <!-- eslint-disable vue/no-v-html -->
            <div v-html="pertanyaan.deskripsi"></div>
            <!--eslint-enable-->
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12">Lampiran : </v-col>
              <v-col v-show="lampiranPertanyaan.length == 0">
                Tidak ada lampiran
              </v-col>
              <v-col
                v-for="(lp, index) in lampiranPertanyaan"
                v-show="lampiranPertanyaan.length != 0"
                :key="index"
                cols="12"
                md="3"
              >
                <CardFile
                  :nama-file="lp.path"
                  :path="lp.path"
                  icon="mdi-download"
                  :hover="false"
                  @aksiicon="downloadFileLampiran"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            IP Address :
            {{ pertanyaan.ip_address ? pertanyaan.ip_address : '' }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- end pertanyaan -->

    <DialogTunjuk
      v-if="admin"
      :dialog="dialogTunjuk"
      :nomor-support="supportDetail.nomor"
      @tutup="tutupDialogTunjuk"
    ></DialogTunjuk>
  </div>
</template>
<script>
import CardFile from '@/components/card/card-file.vue'
import Editor from '@/components/wysiwyg/editor.vue'
import DialogTunjuk from '@/components/support/dialogTunjuk.vue'
import { mapState, mapGetters } from 'vuex'
import file from '~/mixins/file'
export default {
  components: {
    Editor,
    CardFile,
    DialogTunjuk,
  },
  mixins: [file],
  data() {
    return {
      loading: false,
      loadingSave: false,
      pertanyaan: {
        nama: '',
        nip_nrp: '',
        tipe: '',
        status: '',
        ketStatus: '',
      },
      lampiran: [],
      keterangan: '',
      lampiranPertanyaan: [],
      balasan: [],
      dialogTunjuk: false,
      isSelesai: false,
    }
  },
  computed: {
    ...mapState({
      supportDetail: (state) => state.modules.support.supportDetail,
      user: (state) => state.user,
      auth: (state) => state.auth,
      ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
    }),
  },
  watch: {
    isSelesai(v) {
      if (v == true) {
        this.tandaiSelesai()
      }
    },
  },
  mounted() {
    this.getNamadanStatus()
    this.getLampiran()
    this.getJawaban()
  },
  methods: {
    updatecontent(v) {
      this.keterangan = v
    },
    getNamadanStatus() {
      this.loading = true
      this.$axios
        .get('/support/nama', {
          params: {
            nomor: this.supportDetail.nomor,
          },
        })
        .then((res) => {
          this.loading = false
          if (res.data.ditemukan == true) {
            this.pertanyaan = this.supportDetail
            this.pertanyaan.nama = res.data.nama
            this.pertanyaan.nip_nrp = res.data.nip_nrp
            this.pertanyaan.tipe = res.data.tipe
            this.pertanyaan.status = res.data.status
            this.pertanyaan.ketStatus = res.data.ketStatus

            if (res.data.status == '4') {
              this.isSelesai = true
            } else {
              this.isSelesai = false
            }
          } else {
            //   kembali ke halaman awal
          }
        })
    },
    getLampiran() {
      this.loading = true
      this.$axios
        .get('/support/lampiran', {
          params: {
            nomor: this.supportDetail.nomor,
          },
        })
        .then((res) => {
          this.loading = false
          this.lampiranPertanyaan = res.data
        })
    },
    getJawaban() {
      this.loading = true
      this.$axios
        .get('/support/balas', {
          params: {
            nomor: this.supportDetail.nomor,
          },
        })
        .then((res) => {
          this.loading = false
          this.balasan = res.data
        })
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
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
    downloadFileLampiran(v) {
      this.downloadFileEthol(v.path)
    },
    beriBalasan() {
      if (this.keterangan != '' && this.keterangan != null) {
        let checkLampiranvalid = true
        for (let index = 0; index < this.lampiran.length; index++) {
          const element = this.lampiran[index]
          if (element.file == null) {
            checkLampiranvalid = false
          }
        }
        if (checkLampiranvalid == true) {
          // const self = this
          this.loadingSave = true
          this.$axios
            .$post('/support/balas', {
              lampiran: this.lampiran,
              deskripsi: this.keterangan,
              tipeAkses: this.auth.hakAktif,
              nomorSupport: this.supportDetail.nomor,
            })
            .finally(() => (this.loadingSave = false))
            .then((response) => {
              if (response.sukses == true) {
                this.getNamadanStatus()
                this.getJawaban()

                this.lampiran = []
                this.keterangan = ''
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
      } else {
        alert('Harap isi keterangan balasan Anda !')
      }
    },
    bukaDialogTunjuk() {
      this.dialogTunjuk = true
    },
    tutupDialogTunjuk() {
      this.dialogTunjuk = false
    },
    tandaiSelesai() {
      this.loading = true
      this.$axios
        .$post('/support/tandai-selesai', {
          nomorSupport: this.supportDetail.nomor,
        })
        .finally(() => (this.loading = false))
        .then((response) => {
          if (response.sukses == true) {
            this.getNamadanStatus()
            this.getJawaban()

            this.lampiran = []
            this.keterangan = ''
          }
        })
        .catch((err) => {
          if (err.response.status == 413 || err.response.status == '413') {
            alert('Lampiran File Terlalu Besar')
          } else {
            alert('Gagal menyimpan data !')
          }
        })
    },
  },
}
</script>
