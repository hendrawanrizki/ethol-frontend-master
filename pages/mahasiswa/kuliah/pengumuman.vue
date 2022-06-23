<template>
  <div>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      rounded
      color="blue accent-2"
    ></v-progress-linear>

    <v-container>
      <v-row class="row-title-kuliah">
        <v-col cols="12">
          <h2 class="ethol-title-kuliah">
            {{ kuliah.matakuliah ? kuliah.matakuliah.nama : '' }}
            -
            {{ kuliah.kelas }} Kelas {{ kuliah.pararel }}
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(ld, index) in listData" :key="index" cols="12" md="12">
          <CardPengumuman :pengumuman="ld" />
        </v-col>
      </v-row>
      <v-row v-if="listData.length == 0 && loading == false">
        <v-col cols="12">
          <h4 style="font-weight: 400">Belum ada pengumumuman !</h4></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CardPengumuman from '~/components/kuliah/pengumuman/card-pengumuman.vue'
export default {
  components: {
    CardPengumuman,
  },
  layout: 'kuliah',
  middleware: ['auth', 'mahasiswa'],
  transition: 'slide-bottom',
  data() {
    return {
      listData: [],
      loading: true,
    }
  },
  computed: {
    ...mapState({
      kuliah: (state) => state.modules.kuliah.kuliahMahasiswa,
      user: (state) => state.user,
    }),
  },
  mounted() {
    this.ambilData()
  },
  methods: {
    ambilData() {
      this.loading = true
      this.$axios
        .get('/pengumuman', {
          params: {
            kuliah: this.kuliah.nomor,
            jenis_schema: this.kuliah.jenisSchema,
          },
        })
        .then((res) => {
          this.loading = false
          this.listData = res.data
        })
    },
  },
}
</script>
<style scoped>
.ethol-title-kuliah {
  margin-top: 10px !important;
}
</style>
