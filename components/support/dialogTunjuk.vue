<template>
  <div class="text-center">
    <v-dialog v-model="bukaDialog" width="800" persistent>
      <v-card>
        <v-card-title>
          Tunjuk BAAK
          <v-spacer></v-spacer>
          <v-btn icon @click="bukaDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <br />
        <v-card-text>
          <v-row>
            <v-col cols="9">
              <v-form ref="form_tunjuk_baak">
                <v-autocomplete
                  v-model="baak"
                  :items="dataBaak"
                  item-text="nama"
                  item-value="nomor"
                  label="BAAK"
                  :rules="[(v) => !!v || 'BAAK harus diisi']"
                  outlined
                  multiple
                  chips
                ></v-autocomplete>
              </v-form>
            </v-col>
            <v-col cols="3">
              <v-btn
                style="margin-top: 10px"
                color="primary"
                :loading="loading"
                :disabled="loading"
                block
                @click="tambah()"
              >
                Simpan
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <br />
          <v-row>
            <v-col cols="12">
              <h3>Data Baak :</h3>
              <br />
              <v-data-table
                :headers="[
                  {
                    text: 'Nama',
                    value: 'namaBaak',
                    sortable: true,
                    width: '35%',
                    class: 'ethol-th-table',
                  },
                  {
                    text: 'Waktu Ditambahakan',
                    value: 'waktuDitambahkanIndonesia',
                    width: '35%',
                    sortable: true,
                    class: 'ethol-th-table',
                  },
                  {
                    text: 'Opsi',
                    value: 'opsinya',
                    align: 'center',
                    class: 'ethol-th-table',
                  },
                ]"
                :items="listDataBaak"
                :items-per-page="10"
                class="elevation-1"
                :loading="loading"
                loading-text="Loading... Tunggu Sebentar"
              >
                <template #[`item.opsinya`]="{ item }">
                  <v-btn
                    small
                    color="red"
                    class="text-none"
                    dark
                    @click="bukaDialogHapus(item)"
                  >
                    <v-icon small>mdi-close-circle</v-icon> &nbsp; Hapus
                  </v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <dialog-delete
      :dialog="dialogHapus"
      :loading="loadingDialogHapus"
      @close="sembunyikanDialogHapus"
      @delete="hapusData"
    ></dialog-delete>
  </div>
</template>
<script>
import DialogDelete from '@/components/utils/dialog-delete.vue'
export default {
  components: {
    'dialog-delete': DialogDelete,
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false,
    },
    nomorSupport: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      bukaDialog: false,
      loading: false,
      baak: [],
      dataBaak: [],
      listDataBaak: [],

      dialogHapus: false,
      loadingDialogHapus: false,

      itemData: {
        nomor: null,
      },
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
  },
  mounted() {
    this.getBaak()
    this.getBaakJoin()
  },
  methods: {
    bukaDialogHapus(item) {
      this.itemData = item
      this.dialogHapus = true
    },
    hapusData() {
      this.loadingDialogHapus = true
      this.$axios
        .delete(`/support/akun-baak/${this.itemData.nomor}`)
        .then((res) => {
          if (res.data.sukses) {
            this.dialogHapus = false
            this.loadingDialogHapus = false
            this.getBaakJoin()
          }
        })
    },
    sembunyikanDialogHapus() {
      this.dialogHapus = false
    },
    bersihkanForm() {
      this.baak = []
    },
    tambah() {
      if (this.$refs.form_tunjuk_baak.validate()) {
        if (this.baak.length == 0) {
          alert('BAAK tidak boleh kosong !')
        } else {
          this.loading = true
          this.$axios
            .post('/support/add-baak', {
              nomorSupport: this.nomorSupport,
              baak: this.baak,
            })
            .finally(() => (this.loading = false))
            .then((res) => {
              if (res.data.sukses) {
                this.loading = false
                this.bersihkanForm()
                this.getBaakJoin()
              }
            })
        }
      }
    },
    getBaak() {
      this.$axios.get('/support/akun-baak').then((res) => {
        this.loading = false
        this.dataBaak = res.data
      })
    },
    getBaakJoin() {
      this.$axios
        .get('/support/daftar-baak-yang-ikut', {
          params: {
            nomor: this.nomorSupport,
          },
        })
        .then((res) => {
          this.listDataBaak = res.data
          this.loading = false
        })
    },
  },
}
</script>
