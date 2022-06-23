<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="600" persistent>
      <v-card>
        <v-card-title>
          <span v-show="mode == 'tambah'">Tambah Tanggal Libur</span>
          <span v-show="mode == 'edit'">Edit Tanggal Libur</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="bukaDialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <br />
        <v-card-text>
          <v-form ref="form_tanggal_libur">
            <v-menu
              ref="inputDate"
              v-model="datePicker"
              :close-on-content-click="true"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template #activator="{ on }">
                <v-text-field
                  v-model="tanggal"
                  :rules="[(v) => !!v || 'Tanggal harus diisi']"
                  outlined
                  readonly
                  label="Tanggal"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-if="datePicker"
                v-model="tanggal"
                reactive
                no-title
                scrollable
              />
            </v-menu>
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
      datePicker: false,
      tanggal: null,
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
      this.datePicker = v.datePicker
      this.tanggal = v.tanggal
    },
  },
  methods: {
    bersihkanForm() {
      this.datePicker = false
      this.tanggal = null
    },
    tambah() {
      if (this.$refs.form_tanggal_libur.validate()) {
        this.loading = true
        this.$axios.post('/libur', { tanggal: this.tanggal }).then((res) => {
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
