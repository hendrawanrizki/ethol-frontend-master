<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn
          v-if="mahasiswa"
          icon
          color="white"
          to="/mahasiswa/materi-perkuliahan"
        >
          <v-icon color="#3b3b3bde">mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
          v-else-if="dosen"
          icon
          color="white"
          to="/dosen/materi-perkuliahan"
        >
          <v-icon color="#3b3b3bde">mdi-arrow-left</v-icon>
        </v-btn>
        <span v-if="daftarMateri.length != 0" class="title">
          {{ daftarMateri[0].matakuliah }}
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(item, i) in daftarMateri"
        :key="i"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
      >
        <CardMateri :materi="item" @lihat="lihatMateri" />
      </v-col>
    </v-row>
    <DialogLihatMateri
      :dialog="dialogLihatMateri"
      :materi="materi"
      :nama-matkul-prop="materi.matakuliah"
      @tutup="dialogLihatMateri = false"
    />
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import CardMateri from '~/components/beranda/card-materi.vue'
import DialogLihatMateri from '~/components/kuliah/materi/dialog-lihat-materi.vue'
export default {
  components: {
    CardMateri,
    DialogLihatMateri,
  },
  data() {
    return {
      daftarMateri: [],
      dialogLihatMateri: false,
      materi: {},
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  mounted() {
    if (process.browser) {
      this.daftarMateri = JSON.parse(localStorage.getItem('materi'))
    }
  },
  methods: {
    lihatMateri(materi) {
      this.materi = materi
      this.dialogLihatMateri = true
    },
  },
}
</script>
