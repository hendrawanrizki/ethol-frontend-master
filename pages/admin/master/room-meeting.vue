<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-card flat>
      <v-card-title> Room Meeting </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" xl="2">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Cari . . ."
              outlined
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="2"
            lg="2"
            xl="2"
            offset-md="6"
            offset-lg="7"
          >
            <v-btn
              color="primary"
              block
              class="text-none"
              style="margin-top: 20px"
              @click="tambahData"
            >
              <span>+ Tambah Data</span>
            </v-btn>
          </v-col>
          <v-col cols="12" style="padding-top: 0px">
            <v-data-table
              :headers="[
                {
                  text: 'Nomor',
                  value: 'nomor',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Room',
                  value: 'nama',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Server',
                  value: 'server.nama',
                  sortable: true,
                  class: 'ethol-th-table',
                },
                {
                  text: 'Opsi',
                  value: 'opsi',
                  sortable: false,
                  class: 'ethol-th-table',
                  align: 'center',
                },
              ]"
              :items="listData"
              :items-per-page="10"
              class="elevation-1"
              :loading="loading"
              :search="search"
              loading-text="Loading... Tunggu Sebentar"
            >
              <template #[`item.opsi`]="{ item }">
                <v-btn color="warning" icon @click="editData(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="error" icon @click="bukaDialogHapus(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <dialog-form
      :mode="modeForm"
      :dialog="dialogForm"
      :item-data="itemData"
      :server-conference="serverConference"
      @tutup="tutupDialog"
      @refresh="ambilData"
    ></dialog-form>
    <dialog-delete
      :dialog="dialogHapus"
      :loading="loadingDialogHapus"
      @close="sembunyikanDialogHapus"
      @delete="hapusData"
    ></dialog-delete>
  </v-container>
</template>
<script>
import Breadcrumb from '@/components/backend/breadcrumb.vue'
import DialogDelete from '@/components/utils/dialog-delete.vue'
import Dialog from '@/components/master/room-conference/dialog.vue'
export default {
  components: {
    Breadcrumb,
    'dialog-form': Dialog,
    'dialog-delete': DialogDelete,
  },
  middleware: ['auth', 'admin'],
  data() {
    return {
      judulLaman: '',
      breadcrumbItem: [
        {
          text: 'Beranda',
          disabled: false,
          exact: true,
          to: '/admin/beranda',
        },
        {
          text: 'Master',
          disabled: true,
          exact: true,
          to: '#',
        },
        {
          text: 'Room Meeting',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      loading: true,
      search: '',
      listData: [],

      modeForm: '',
      dialogForm: false,
      itemData: {
        nomor: null,
        nama: '',
        server: '',
      },
      dialogHapus: false,
      loadingDialogHapus: false,

      serverConference: [],
    }
  },
  created() {
    this.ambilDataServerConference()
    this.ambilData()
  },
  methods: {
    ambilDataServerConference() {
      this.loading = true
      this.$axios.get('/server-conference').then((res) => {
        this.loading = false
        this.serverConference = res.data
      })
    },
    ambilData() {
      this.loading = true
      this.$axios.get('/room-conference').then((res) => {
        this.loading = false
        this.listData = res.data
      })
    },
    tutupDialog() {
      this.dialogForm = false
    },
    tambahData() {
      this.modeForm = 'tambah'
      this.dialogForm = true
    },
    editData(item) {
      this.itemData = item
      this.modeForm = 'edit'
      this.dialogForm = true
    },
    bukaDialogHapus(item) {
      this.itemData = item
      this.dialogHapus = true
    },
    sembunyikanDialogHapus() {
      this.dialogHapus = false
      this.bersihkanItemData()
    },
    bersihkanItemData() {
      this.itemData = {
        nomor: null,
        nama: '',
        server: '',
      }
    },
    hapusData() {
      this.loadingDialogHapus = true
      this.$axios
        .delete(`/room-conference/${this.itemData.nomor}`)
        .then((res) => {
          if (res.data.sukses) {
            this.dialogHapus = false
            this.loadingDialogHapus = false
            this.ambilData()
            this.sembunyikanDialogHapus()
          }
        })
    },
  },
}
</script>
