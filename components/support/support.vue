<template>
  <div>
    <h3>Support</h3>
    <p>Laporkan masalah terkait aplikasi ETHOL</p>
    <v-btn color="primary" class="text-none" @click="buatTiketBaru">
      <v-icon small>mdi-pencil</v-icon>
      &nbsp; <span>Buat Tiket</span>
    </v-btn>
    <br />
    <br />
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Pencarian"
      filled
      hide-details
    ></v-text-field>
    <br />
    <v-data-table
      :headers="[
        {
          text: 'Judul',
          value: 'judul',
          sortable: true,
          class: 'ethol-th-table',
          width: '40%',
        },
        {
          text: 'Waktu Dibuat',
          value: 'waktuDibuatIndonesia',
          sortable: true,
          class: 'ethol-th-table',
          width: '20%',
        },
        {
          text: 'Status',
          value: 'statusnya',
          sortable: true,
          align: 'center',
          class: 'ethol-th-table',
        },
        {
          text: 'filter status',
          value: 'ketStatus',
          align: ' d-none',
        },
        {
          text: 'Opsi',
          value: 'opsinya',
          sortable: true,
          align: 'center',
          class: 'ethol-th-table',
        },
      ]"
      :items="listData"
      :items-per-page="10"
      class="elevation-1"
      :loading="loading"
      :search="search"
      loading-text="Loading... Tunggu Sebentar"
    >
      <template #[`item.statusnya`]="{ item }">
        <v-chip v-if="item.status == '1'" small label color="#6ab04c" dark>
          {{ item.ketStatus }}
        </v-chip>
        <v-chip
          v-else-if="item.status == '2' || item.status == '3'"
          small
          label
          color="#ffa801"
          style="font-weight: 500"
        >
          {{ item.ketStatus }}
        </v-chip>
        <v-chip
          v-else-if="item.status == '4'"
          style="font-weight: 500"
          small
          label
          color="#d2dae2"
        >
          {{ item.ketStatus }}
        </v-chip>
      </template>
      <template #[`item.opsinya`]="{ item }">
        <v-btn small color="primary" class="text-none" @click="detail(item)">
          <v-icon small>mdi-eye</v-icon> &nbsp;
          <span>Detail</span>
        </v-btn>
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
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    'dialog-delete': DialogDelete,
  },
  data() {
    return {
      loading: false,
      listData: [],
      search: '',

      dialogHapus: false,
      loadingDialogHapus: false,

      itemData: {
        nomor: null,
      },
    }
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
    }),
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  mounted() {
    this.getSupport()
  },
  methods: {
    getSupport() {
      this.$axios
        .get('/support', {
          params: {
            hakAkses: this.auth.hakAktif,
          },
        })
        .then((res) => {
          this.loading = false
          this.listData = res.data
        })
    },
    detail(item) {
      this.$store.dispatch('modules/support/simpan_support', item)
      if (this.mahasiswa) {
        this.$router.push('/mahasiswa/support/detail')
      } else if (this.dosen) {
        this.$router.push('/dosen/support/detail')
      } else if (this.kaprodi) {
        this.$router.push('/kaprodi/support/detail')
      }
    },
    buatTiketBaru() {
      if (this.mahasiswa) {
        this.$router.push('/mahasiswa/support/buat')
      } else if (this.dosen) {
        this.$router.push('/dosen/support/buat')
      } else if (this.kaprodi) {
        this.$router.push('/kaprodi/support/buat')
      }
    },
    bukaDialogHapus(item) {
      this.itemData = item
      this.dialogHapus = true
    },
    hapusData() {
      this.loadingDialogHapus = true
      this.$axios.delete(`/support/${this.itemData.nomor}`).then((res) => {
        if (res.data.sukses) {
          this.dialogHapus = false
          this.loadingDialogHapus = false
          this.getSupport()
        }
      })
    },
    sembunyikanDialogHapus() {
      this.dialogHapus = false
      this.bersihkanItemData()
    },
    bersihkanItemData() {
      this.itemData = {
        nomor: null,
      }
    },
  },
}
</script>
