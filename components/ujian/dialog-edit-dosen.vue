<template>
  <v-dialog v-model="dialogEditDosen" width="500" persistent>
    <v-card>
      <v-card-title class="text-h5 lighten-2">
        Edit Dosen
        <v-spacer></v-spacer>
        <v-btn icon :disabled="loading" @click="dialogEditDosen = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <br />
        <v-form ref="form_edit_dosen">
          <v-row>
            <v-col cols="12" md="12">
              <v-autocomplete
                v-model="dosenDipilih"
                :items="listDataDosen"
                placeholder="Pilih Dosen"
                item-text="nama"
                item-value="nomor"
                label="Dosen"
                outlined
                hide-details
                filled
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="loading"
          text
          @click="simpanDosen"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import teks from '~/mixins/teks'
export default {
  components: {},
  mixins: [teks],
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    nomorUjian: {
      type: Number,
      required: true,
    },
    nomorDosen: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dialogEditDosen: null,
      loading: false,
      dosenDipilih: null,
      listDataDosen: [],
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  watch: {
    dialog(v) {
      this.dialogEditDosen = v
    },
    dialogEditDosen(v) {
      if (v == false) {
        this.$emit('tutup')
        this.clearForm()
      }
    },
    nomorDosen(v) {
      this.dosenDipilih = v
    },
  },
  created() {
    this.ambilDataDosen()
  },
  methods: {
    clearForm() {
      this.dosenDipilih = null
    },
    simpanDosen() {
      if (this.$refs.form_edit_dosen.validate()) {
        this.loading = true
        this.loadingCatatanNilai = true

        let urlApiEditJadwal = ''
        if (this.admin == true) {
          urlApiEditJadwal = '/ujian/dosen-admin'
        } else if (this.baak == true) {
          urlApiEditJadwal = '/ujian/dosen-baak'
        }
        this.$axios
          .put(urlApiEditJadwal, {
            nomorDosen: this.dosenDipilih,
            nomorUjian: this.nomorUjian,
          })
          .then((res) => {
            if (res.data.sukses) {
              this.dialogEditDosen = false
              this.$emit('refresh')
            }
            this.loading = false
          })
          .catch((err) => {
            this.loading = true
            console.log(err)
          })
      }
    },
    ambilDataDosen() {
      this.loading = true
      this.$axios.get('/pegawai/dosen-pens').then((res) => {
        this.loading = false
        const listDataDosen = res.data
        const dosennya = []
        for (let index = 0; index < listDataDosen.length; index++) {
          const element = listDataDosen[index]

          dosennya.push({
            nomor: element.nomor,
            nama:
              this.hapusStringNull(element.gelarDpn) +
              ' ' +
              this.hapusStringNull(element.nama) +
              ' ' +
              this.hapusStringNull(element.gelarBlk),
          })
        }

        this.listDataDosen = dosennya
      })
    },
  },
}
</script>
