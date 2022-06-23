<template>
  <div style="background-color: #e7eaff; padding: 0px">
    <table class="noborder" width="100%">
      <tr>
        <th width="13%">Kategori</th>
        <td width="2%">:</td>
        <td>
          <span class="kategori-notifikasi">{{
            kategoriNotifikasi | removeDash
          }}</span>
        </td>
      </tr>
      <tr>
        <th>Pemberitahuan</th>
        <td width="2%">:</td>
        <td>
          {{ keteranganNotifikasi }}
        </td>
      </tr>
      <tr>
        <th>Waktu</th>
        <td width="2%">:</td>
        <td>{{ waktuNotifikasi }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  components: {},
  filters: {
    removeDash(value) {
      if (!value) return ''
      value = value.toString()
      return value.replace('-', ' ')
    },
  },

  data() {
    return {
      loading: false,
      kategoriNotifikasi: null,
      keteranganNotifikasi: null,
      waktuNotifikasi: null,
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  created() {
    this.loadNotifikasi()
  },
  methods: {
    loadNotifikasi() {
      let url = ''
      if (this.mahasiswa) {
        url = '/notifikasi/mahasiswa-by-id'
      } else if (this.dosen) {
        url = '/notifikasi/dosen-by-id'
      }
      this.$axios
        .get(url, {
          params: {
            idNotifikasi: this.$route.params.id,
          },
        })
        .then((res) => {
          if (res.data.success == true) {
            this.kategoriNotifikasi = res.data.kodenotifikasi
            this.keteranganNotifikasi = res.data.keterangan
            this.waktuNotifikasi = res.data.waktuNotifikasi
            this.$emit('loaddata', res.data.data_terkait)
          }
        })
    },
  },
}
</script>
<style lang="css" scoped>
.noborder,
.noborder tr,
.noborder th,
.noborder td {
  border: none !important;
  text-align: left;
  padding: 5px;
}
.kategori-notifikasi {
  color: #f97737;
  font-weight: bold;
}
</style>
