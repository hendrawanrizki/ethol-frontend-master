<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogForm"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary" style="box-shadow: none !important">
          <v-btn icon dark @click="dialogForm = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title v-if="mode == 'tambah'">Buat Tugas</v-toolbar-title>
          <v-toolbar-title v-else-if="mode == 'edit'">
            Edit Tugas
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div style="padding: 15px">
          <v-card>
            <v-form ref="form_tugas">
              <v-row style="padding: 45px 15px 15px 15px">
                <v-col cols="12" md="7" sm="12">
                  <v-text-field
                    v-model="judul"
                    prepend-icon="mdi-book"
                    :rules="[(v) => !!v || 'Judul harus diisi']"
                    placeholder="Judul tugas . . ."
                    label="Judul"
                    filled
                  ></v-text-field>
                  <v-textarea
                    v-model="deskripsi"
                    prepend-icon="mdi-sort-variant"
                    filled
                    :rules="[(v) => !!v || 'Deskripsi harus diisi']"
                    placeholder="Deskripsi tugas . . ."
                    label="Deskripsi"
                  ></v-textarea>
                  <v-select
                    v-model="kuliahDipilih"
                    :items="listKuliah"
                    :rules="[(v) => v.length != 0 || 'Kelas harus dipilih']"
                    item-text="nama"
                    item-value="nomor"
                    prepend-icon="mdi-animation"
                    filled
                    label="Pilih kelas"
                    placeholder="Pilih kelas"
                    :hint="
                      mode == 'tambah'
                        ? 'Anda bisa memilih lebih dari satu kelas'
                        : ''
                    "
                    persistent-hint
                    multiple
                    class="mb-2"
                    :disabled="mode == 'edit' ? true : false"
                  />
                </v-col>
                <v-col cols="12" md="5" sm="12">
                  <v-row>
                    <v-col cols="6">
                      <v-menu
                        v-model="deadline"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="formatTanggalDeadline"
                            label="Tanggal Deadline"
                            prepend-icon="mdi-calendar"
                            persistent-hint
                            readonly
                            :rules="[
                              () => !!formatTanggalDeadline || 'Wajib Diisi',
                            ]"
                            required
                            v-bind="attrs"
                            filled
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="tanggal_deadline"
                          no-title
                          :min="minDate"
                          @input="deadline = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        v-model="jamDeadline"
                        :items="jam"
                        :rules="[(v) => !!v || 'Jam harus diisi']"
                        filled
                        label="Jam"
                        placeholder="Jam"
                      />
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        v-model="menitDeadline"
                        :items="menit"
                        :rules="[(v) => !!v || 'Menit harus diisi']"
                        filled
                        label="Menit"
                        placeholder="Menit"
                      />
                    </v-col>
                    <v-col cols="12">
                      <div v-if="mode == 'tambah'">
                        <v-file-input
                          v-model="file"
                          filled
                          label="Lampiran"
                          placeholder="File pendukung"
                          prepend-icon="mdi-attachment mdi-rotate-90"
                        />
                      </div>
                      <div
                        v-else-if="mode == 'edit' && fileDiedit == false"
                        style="padding-left: 32px"
                      >
                        <h4>File Lampiran</h4>
                        <br />
                        <CardFile
                          v-for="(lfe, index) in listFileEdit"
                          :key="index"
                          :nama-file="lfe.path"
                          :path="lfe.path"
                          icon="mdi-download"
                          @aksiicon="downloadFileTugas"
                        />
                        <br />
                        <v-btn
                          outlined
                          small
                          class="text-none"
                          @click="ubahFile"
                        >
                          <span>Ubah File</span>
                        </v-btn>
                      </div>
                      <div v-else-if="mode == 'edit' && fileDiedit == true">
                        <v-file-input
                          v-model="file"
                          filled
                          label="Lampiran"
                          placeholder="File pendukung"
                          prepend-icon="mdi-attachment mdi-rotate-90"
                        />
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :color="mode == 'tambah' ? 'primary' : 'orange'"
                :loading="loading"
                :disabled="loading"
                @click="mode == 'tambah' ? simpan() : edit()"
              >
                {{ mode == 'tambah' ? 'SIMPAN TUGAS' : 'Perbarui Tugas' }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import CardFile from '@/components/card/card-file.vue'
import validasi from '~/mixins/validasi'
import file from '~/mixins/file'
import teks from '~/mixins/teks'
export default {
  components: {
    CardFile,
  },
  mixins: [file, validasi, teks],
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    tugas: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
      default: 'tambah',
    },
  },
  data() {
    return {
      loading: false,
      dialogForm: false,
      deadline: false,
      tanggal_deadline: new Date().toISOString().substr(0, 10),
      judul: null,
      deskripsi: null,
      file: null,
      minDate: new Date().toISOString().substr(0, 10),
      jam_deadline: '00:00',
      jamDeadline: null,
      menitDeadline: null,
      kuliahDipilih: [],
      listKuliah: [],
      clockRules: [
        (v) =>
          /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(v) ||
          'Format jam harus valid',
      ],

      listFileEdit: [],
      fileDiedit: false,
      nomorTugas: null,
    }
  },
  computed: {
    ...mapState({
      matakuliahDosen: (state) => state.modules.matakuliah.matakuliahDosen,
      kuliahDosen: (state) => state.modules.kuliah.kuliahDosen,
      user: (state) => state.user,
    }),
    formatTanggalDeadline() {
      if (!this.tanggal_deadline) return null
      const [year, month, day] = this.tanggal_deadline.split('-')
      return `${day}-${month}-${year}`
    },
  },
  watch: {
    dialog(v) {
      this.dialogForm = v
    },
    dialogForm(v) {
      if (v == false) {
        this.$emit('tutup', v)
        this.bersihkanForm()
      } else {
        this.loadKuliahDropdown()
      }
    },
    tugas(v) {
      if (Object.keys(v).length !== 0 && this.mode == 'edit') {
        this.judul = v.title
        this.deskripsi = v.description
        this.tanggal_deadline = v.deadline.substr(0, 10)
        this.jamDeadline = v.deadline.substr(11, 2)
        this.menitDeadline = v.deadline.substr(14, 2)
        this.listFileEdit = v.file
        this.nomorTugas = v.id
      }
    },
  },
  methods: {
    loadKuliahDropdown() {
      this.listKuliah = this.matakuliahDosen

      if (
        Object.keys(this.kuliahDosen).length === 0 &&
        this.kuliahDosen.constructor === Object
      ) {
        console.log('')
      } else {
        this.listKuliah.forEach((element) => {
          if (element.matakuliah.nomor == this.kuliahDosen.matakuliah.nomor) {
            this.kuliahDipilih.push(element.nomor)
          }
          element.nama = element.matakuliah.nama + ' (' + element.kelas + ')'
        })
      }
    },
    simpan() {
      if (this.$refs.form_tugas.validate()) {
        const formData = new FormData()
        formData.append('judul', this.judul)
        formData.append('deskripsi', this.deskripsi)
        formData.append(
          'tglDeadline',
          this.tanggal_deadline +
            ' ' +
            this.jamDeadline +
            ':' +
            this.menitDeadline +
            ':00'
        )
        this.kuliahDipilih.forEach((kd) => {
          this.listKuliah.forEach((lk) => {
            if (lk.nomor == kd) {
              formData.append(
                'idKuliah[]',
                kd + '-' + lk.jenisSchema + '-' + lk.matakuliah.nama
              )
            }
          })
        })
        formData.append('nomorDosen', this.user.nomor)
        formData.append('file', this.file)
        this.loading = true
        this.$axios
          .post('/tugas', formData)
          .then((res) => {
            if (res.data.sukses) {
              this.$emit('refresh')
              this.bersihkanForm()
              this.dialogForm = false
              this.loading = false
            } else {
              this.loading = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            this.loading = false
          })
      }
    },
    edit() {
      if (this.$refs.form_tugas.validate()) {
        const formData = new FormData()
        formData.append('nomorTugas', this.nomorTugas)
        formData.append('judul', this.judul)
        formData.append('deskripsi', this.deskripsi)
        formData.append(
          'tglDeadline',
          this.tanggal_deadline +
            ' ' +
            this.jamDeadline +
            ':' +
            this.menitDeadline +
            ':00'
        )
        this.kuliahDipilih.forEach((element) => {
          formData.append('idKuliah[]', parseInt(element))
        })
        formData.append('nomorDosen', this.user.nomor)
        formData.append('file', this.file)
        this.loading = true
        this.$axios.put('/tugas', formData).then((res) => {
          if (res.data.sukses) {
            this.$emit('refresh')
            this.bersihkanForm()
            this.dialogForm = false
            this.loading = false
          } else {
            this.loading = false
          }
        })
      }
    },
    bersihkanForm() {
      this.deadline = false
      this.tanggal_deadline = new Date().toISOString().substr(0, 10)
      this.judul = null
      this.deskripsi = null
      this.file = null
      this.minDate = new Date().toISOString().substr(0, 10)
      this.jam_deadline = '00:00'
      this.kuliahDipilih = []
      this.fileDiedit = false
    },
    downloadFileTugas(v) {
      this.downloadFileEthol(v.path)
    },
    ubahFile() {
      this.fileDiedit = true
    },
  },
}
</script>
