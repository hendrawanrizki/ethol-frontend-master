<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="600" persistent>
      <v-card>
        <v-card-title>
          <span v-show="mode == 'tambah'">Link Conference Lainnya</span>
          <span v-show="mode == 'edit'">Edit Link Conference Lainnya</span>
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
              v-model="url"
              :rules="rulesConferenceLainnya"
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
import validasi from '~/mixins/validasi'
export default {
  mixins: [validasi],
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
      url: '',
      nomor: null,

      rulesConferenceLainnya: [
        (value) => !!value || 'harus diisi.',
        (value) => this.isURL(value) || 'URL tidak valid',
      ],
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
      this.url = v.url
      this.nomor = v.nomor
    },
  },
  methods: {
    bersihkanForm() {
      this.url = ''
    },
    tambah() {
      if (this.$refs.form_server_conference.validate()) {
        this.loading = true
        this.$axios
          .post('/conference-lainnya', { url: this.url })
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
          .put('/conference-lainnya', {
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
