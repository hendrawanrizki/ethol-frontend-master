<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="600" persistent>
      <v-card>
        <v-card-title>
          <span v-show="mode == 'tambah'">Tambah Server Conference</span>
          <span v-show="mode == 'edit'">Edit Server Conference</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="bukaDialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <br />
        <v-card-text>
          <v-form ref="form_server_conference">
            <v-text-field
              v-model="nama"
              :rules="[(v) => !!v || 'Nama harus diisi']"
              outlined
              label="Nama"
            />
            <v-text-field
              v-model="url"
              :rules="[(v) => !!v || 'Url harus diisi']"
              outlined
              label="Url"
            />
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
            {{ mode == 'tambah' ? 'Simpan' : 'Perbarui' }}
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
    mode: {
      type: String,
      required: true,
      default: 'tambah',
    },
    itemData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      bukaDialog: false,
      loading: false,
      nama: '',
      url: '',
      nomor: null,
    }
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
      this.nama = v.nama
      this.url = v.url
      this.nomor = v.nomor
    },
  },
  methods: {
    bersihkanForm() {
      this.nama = ''
      this.url = ''
    },
    tambah() {
      if (this.$refs.form_server_conference.validate()) {
        this.loading = true
        this.$axios
          .post('/server-conference', { nama: this.nama, url: this.url })
          .then((res) => {
            if (res.data.sukses) {
              this.loading = false
              this.bukaDialog = false
              this.bersihkanForm()
              this.$emit('refresh')
            }
          })
      }
    },
    edit() {
      if (this.$refs.form_server_conference.validate()) {
        this.loading = true
        this.$axios
          .put('/server-conference', {
            nama: this.nama,
            url: this.url,
            nomor: this.nomor,
          })
          .then((res) => {
            if (res.data.sukses) {
              this.loading = false
              this.bukaDialog = false
              this.bersihkanForm()
              this.$emit('refresh')
            }
          })
      }
    },
  },
}
</script>
