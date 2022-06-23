<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="600" persistent>
      <v-card>
        <v-card-title>
          <span v-show="mode == 'tambah'">Submit Tugas</span>
          <span v-show="mode == 'edit'">Edit Jawaban</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="bukaDialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <br />
        <v-card-text>
          <v-form ref="form_jawaban">
            <v-textarea
              v-model="catatan"
              prepend-icon="mdi-sort-variant"
              outlined
              label="Catatan"
            ></v-textarea>
            <v-file-input
              v-if="mode == 'tambah'"
              v-model="file"
              :rules="[(v) => !!v || 'File harus diisi']"
              solo
              outlined
              flat
              placeholder="File Jawaban"
              prepend-icon="mdi-attachment mdi-rotate-90"
            />
            <div
              v-else-if="mode == 'edit' && fileDiedit == false"
              style="margin-left: 33px"
            >
              <CardFile
                :nama-file="itemData.submission_file"
                :path="itemData.submission_file"
                icon="mdi-download"
                @aksiicon="downloadFileTugas"
              />
              <br />
              <v-btn
                v-if="mode == 'edit' && fileDiedit == false"
                small
                class="text--none"
                outlined
                @click="fileDiedit = true"
              >
                <span>Ubah File</span>
              </v-btn>
            </div>
            <div v-else-if="mode == 'edit' && fileDiedit == true">
              <v-file-input
                v-model="file"
                :rules="[(v) => !!v || 'File harus diisi']"
                solo
                outlined
                flat
                placeholder="File Jawaban"
                prepend-icon="mdi-attachment mdi-rotate-90"
              >
                <template slot="append">
                  <span id="btn-batal" @click="fileDiedit = false">Batal</span>
                </template>
              </v-file-input>
            </div>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn
            :text="loading == false"
            :color="mode == 'tambah' ? 'primary' : 'warning'"
            :loading="loading"
            :disabled="loading"
            @click="mode == 'tambah' ? tambah() : edit()"
          >
            {{ mode == 'tambah' ? 'Submit Tugas' : 'Edit Jawaban' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CardFile from '@/components/card/card-file.vue'
import { mapState } from 'vuex'
import file from '~/mixins/file'
export default {
  components: {
    CardFile,
  },
  mixins: [file],
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
    idTugas: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      bukaDialog: false,
      loading: false,
      catatan: '',
      file: null,
      fileDiedit: false,
    }
  },
  computed: {
    ...mapState({
      matakuliahMahasiswa: (state) =>
        state.modules.matakuliah.matakuliahMahasiswa,
      kuliahMahasiswa: (state) => state.modules.kuliah.kuliahMahasiswa,
      user: (state) => state.user,
    }),
  },
  watch: {
    bukaDialog(v) {
      if (!v) {
        this.bersihkanForm()
        this.$emit('tutup')
      } else {
        this.catatan = this.itemData.student_note
      }
    },
    dialog(v) {
      this.bukaDialog = v
    },
  },
  mounted() {},
  methods: {
    bersihkanForm() {
      this.catatan = ''
      this.file = null
      this.loading = false
    },
    tambah() {
      if (this.$refs.form_jawaban.validate()) {
        const formData = new FormData()
        formData.append('id_tugas', this.idTugas)
        formData.append('catatan', this.catatan)
        formData.append('file', this.file)
        this.loading = true
        this.$axios
          .post('/tugas/submit', formData)
          .then((res) => {
            if (res.data.sukses) {
              this.$emit('refresh')
              this.bersihkanForm()
              this.bukaDialog = false
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    edit() {
      if (this.$refs.form_jawaban.validate()) {
        const formData = new FormData()
        formData.append('id_tugas', this.idTugas)
        formData.append('catatan', this.catatan)
        formData.append('fileDiedit', this.fileDiedit)
        formData.append('file', this.file)
        formData.append(
          'nomor_tugas_file_mahasiswa',
          this.itemData.nomor_tugas_file_mahasiswa
        )
        formData.append(
          'nomor_tugas_mahasiswa',
          this.itemData.nomor_tugas_mahasiswa
        )
        this.loading = true
        this.$axios
          .put('/tugas/submit', formData)
          .then((res) => {
            if (res.data.sukses) {
              this.$emit('refresh')
              this.bersihkanForm()
              this.bukaDialog = false
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    downloadFileTugas(v) {
      this.downloadFileEthol(v.path)
    },
  },
}
</script>
<style scoped>
#btn-batal:hover {
  cursor: pointer !important;
}
</style>
