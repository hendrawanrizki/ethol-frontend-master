<template>
  <v-card outlined>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <table class="noborder">
            <tr>
              <th>Matakuliah</th>
              <td>: {{ detailPresensi.matakuliah }}</td>
            </tr>
            <tr>
              <th>Kelas</th>
              <td>: {{ detailPresensi.kelas }}</td>
            </tr>
          </table>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <table class="noborder">
            <tr>
              <th>Tahun Ajaran</th>
              <td>: {{ detailPresensi.tahunAjaran }}</td>
            </tr>
            <tr>
              <th>Semester</th>
              <td>
                :
                {{ detailPresensi.semester }}
              </td>
            </tr>
          </table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import teks from '~/mixins/teks'
import local from '~/service/local'
import waktu from '~/mixins/waktu'
export default {
  mixins: [waktu, teks],
  data() {
    return {
      detailPresensi: {
        kuliah: '',
        matakuliah: '',
        kelas: '',
        jumlah: '',
        jenis_schema: '',
        tahunAjaran: '',
        semester: '',
      },
      loading: true,
    }
  },
  watch: {},
  mounted() {
    this.detailPresensi = local.getPresensi()
  },
  methods: {},
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
</style>
