<template>
  <v-container>
    <v-card outlined>
      <v-card-title style="background-color: #ededed"> Materi </v-card-title>
      <v-card-subtitle style="background-color: #ededed">
        Matakuliah : {{ materinya.matakuliah }}
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <table class="noborder" width="100%">
          <tr>
            <th>Judul</th>
            <td>:</td>
            <td>{{ materinya.title }}</td>
          </tr>
          <tr>
            <th>Dosen</th>
            <td>:</td>
            <td>{{ materinya.dosen }}</td>
          </tr>
        </table>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          small
          class="text-none"
          @click="dialogLihatMateri = true"
        >
          <span>Buka Materi</span>
        </v-btn>
      </v-card-actions>
    </v-card>
    <DialogLihatMateri
      :dialog="dialogLihatMateri"
      :materi="materinya"
      :nama-matkul-prop="materinya.matakuliah"
      @tutup="dialogLihatMateri = false"
    />
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import DialogLihatMateri from '~/components/kuliah/materi/dialog-lihat-materi.vue'
export default {
  components: {
    DialogLihatMateri,
  },
  middleware: ['auth'],
  data() {
    return {
      dialogLihatMateri: false,
      materinya: {
        matakuliah: '',
      },
    }
  },
  head() {
    return {
      title: `Akses Materi `,
      meta: [
        {
          hid: `${process.env.BRAND_SINGKATAN} Materi `,
          name: `${process.env.BRAND_SINGKATAN} Materi `,
          content: `Akses cepat ke Materi ${process.env.BRAND_SINGKATAN} PENS `,
        },
        {
          property: 'og:title',
          content: `${process.env.BRAND_SINGKATAN} Materi `,
        },
        {
          property: 'og:description',
          content: `Akses cepat ke Materi ${process.env.BRAND_SINGKATAN} PENS `,
        },
      ],
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  mounted() {
    const { preview } = this.$route.query
    const nomorMateri = window.atob(preview)
    this.$axios
      .get(`/materi/by-id/`, {
        params: {
          nomorMateri,
        },
      })
      .then((res) => {
        this.loading = false
        this.materinya = res.data
        this.dialogLihatMateri = true
      })
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
</style>
