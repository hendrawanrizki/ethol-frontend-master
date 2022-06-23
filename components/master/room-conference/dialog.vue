<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="600" persistent>
      <v-card>
        <v-card-title>
          <span v-show="mode == 'tambah'">Tambah Room Meeting</span>
          <span v-show="mode == 'edit'">Edit Room Meeting</span>
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
              v-model="nomor"
              :rules="[(v) => !!v || 'Nomor harus diisi']"
              outlined
              label="Nomor"
            />
            <v-text-field
              v-model="nama"
              :rules="[(v) => !!v || 'Nama harus diisi']"
              outlined
              label="Nama"
            />
            <v-select
              v-model="server"
              :items="serverConference"
              item-text="nama"
              item-value="nomor"
              label="Server"
              :rules="[(v) => !!v || 'Server harus diisi']"
              outlined
            ></v-select>
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
    serverConference: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      bukaDialog: false,
      loading: false,
      nama: '',
      server: '',
      nomor: null,
      nomorAsli: null,
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
      this.server = v.server
      this.nomor = v.nomor
      this.nomorAsli = v.nomor
    },
  },
  methods: {
    bersihkanForm() {
      this.nama = ''
      this.server = ''
    },
    tambah() {
      if (this.$refs.form_server_conference.validate()) {
        this.loading = true
        this.$axios
          .post('/room-conference', {
            nomor: this.nomor,
            nama: this.nama,
            server: this.server,
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
    edit() {
      if (this.$refs.form_server_conference.validate()) {
        this.loading = true
        this.$axios
          .put('/room-conference', {
            nama: this.nama,
            server: this.server,
            nomor: this.nomor,
            nomorAsli: this.nomorAsli,
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
