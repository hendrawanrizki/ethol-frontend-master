<template>
  <div>
    <h3>Support</h3>
    <p>Laporkan masalah terkait aplikasi ETHOL</p>
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
          text: 'Nama User',
          value: 'namaUser',
          sortable: true,
          class: 'ethol-th-table',
          width: '20%',
        },
        {
          text: 'Akses',
          value: 'aksesnya',
          sortable: true,
          class: 'ethol-th-table',
          width: '10%',
        },
        {
          text: 'Judul',
          value: 'judul',
          sortable: true,
          class: 'ethol-th-table',
          width: '20%',
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
      <template #[`item.aksesnya`]="{ item }">
        {{ capitalizeFirstLetter(item.tipe) }}
      </template>
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
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      listData: [],
      search: '',
    }
  },
  computed: {
    ...mapState({
      auth: (state) => state.auth,
    }),
  },
  mounted() {
    this.getSupport()
  },
  methods: {
    getSupport() {
      this.$axios.get('/support/list-admin', {}).then((res) => {
        this.loading = false
        this.listData = res.data
      })
    },
    detail(item) {
      this.$store.dispatch('modules/support/simpan_support', item)
      this.$router.push('/admin/support/detail')
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>
