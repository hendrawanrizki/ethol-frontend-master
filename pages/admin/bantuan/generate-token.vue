<template>
  <v-container>
    <v-card flat>
      <v-card-title> Generate Token </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <span>
              Gunakan form berikut untuk mendapatkan token. Token dapat
              digunakan untuk bypass login tanpa melalui cas
            </span>
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12">
            <v-form ref="form_generate_token">
              <v-text-field
                v-model="form.nomor"
                :rules="[(v) => !!v || 'Nomor wajib diisi']"
                outlined
                label="Nomor"
                hint="Inputkan nomor pada tabel pegawai/mahasiswa"
              />
              <v-text-field
                v-model="form.nipnrp"
                :rules="[(v) => !!v || 'NIP / NRP wajib diisi']"
                outlined
                label="NIP / NRP"
              />
              <v-text-field
                v-model="form.nama"
                :rules="[(v) => !!v || 'Nama wajib diisi']"
                outlined
                label="Nama"
              />
              <v-select
                v-model="form.hakAkses"
                :rules="[(v) => !!v || 'Hak wajib dipilih']"
                :items="haks"
                outlined
                multiple
                label="Hak Akses"
              />
              <v-btn text class="primary" :loading="loading" @click="kirim()">
                Kirim
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title> Hasil </v-card-title>
        <v-card-text>
          <span id="token_hasil">{{ token }}</span>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  middleware: ['auth', 'admin'],
  data() {
    return {
      form: {
        nomor: null,
        nipnrp: null,
        nama: null,
        hakAkses: [],
      },
      haks: ['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa'],
      token: null,
      dialog: false,
      loading: false,
    }
  },
  methods: {
    kirim() {
      if (this.$refs.form_generate_token.validate()) {
        this.loading = true
        this.$axios
          .post('/auth/generate-token', {
            ...this.form,
          })
          .then((res) => {
            if (res.data.sukses) {
              this.token = res.data.token
              this.dialog = true
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>
