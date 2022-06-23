<template>
  <v-card outlined class="card-ujian" height="100%">
    <v-card-text>
      <v-row>
        <v-col cols="10">
          <div class="container-kuliah-mobile">
            <div style="margin-top: 6px">
              <span class="card-title-mobile">
                {{ ujian.matakuliah.nama }}
              </span>
            </div>
            <div>
              <span class="card-subtitle-mobile">
                {{
                  hapusStringNull(ujian.dosen.gelar_dpn) +
                  ' ' +
                  hapusStringNull(ujian.dosen.nama) +
                  ' ' +
                  hapusStringNull(ujian.dosen.gelar_blk)
                }}
              </span>
            </div>
            <div style="margin-top: 18px"></div>
            <div>
              <span class="card-jadwal-mobile">
                {{ ujian.ujian.mulai_indonesia }} -
                {{ ujian.ujian.selesai_indonesia }}
              </span>
            </div>
          </div>
        </v-col>
        <v-col cols="auto">
          <v-avatar
            tile
            :color="listWarna[index].color"
            size="40"
            style="
              color: white;
              font-weight: bold;
              border-radius: 6px !important;
              position: absolute;
              right: 10px;
            "
          >
            {{ limitDuaTigaKarakter(akronim(ujian.matakuliah.nama)) }}
          </v-avatar>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        outlined
        style="position: absolute; bottom: 6; right: 10px"
        class="text-none"
        small
        @click="keDetail(ujian)"
      >
        <span>
          Lihat Ujian
          <v-icon small>mdi-arrow-right</v-icon>
        </span>
      </v-btn>
      <br />
    </v-card-actions>
  </v-card>
</template>
<script>
import teks from '~/mixins/teks'
export default {
  mixins: [teks],
  props: {
    ujian: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    jenisUjian: {
      type: String,
      required: true,
    },
  },
  methods: {
    keDetail(ujian) {
      this.$store.dispatch('modules/ujian/simpan_ujian_mahasiswa', ujian)
      if (ujian.kuliah_agama == 0) {
        if (this.jenisUjian == '2') {
          this.$router.push('/mahasiswa/uas/detail')
        } else if (this.jenisUjian == '1') {
          this.$router.push('/mahasiswa/uts/detail')
        } else {
          this.$router.push('/mahasiswa')
        }
      } else if (ujian.kuliah_agama == 1) {
        if (this.jenisUjian == '2') {
          this.$router.push('/mahasiswa/uas/detail-ujian')
        } else if (this.jenisUjian == '1') {
          this.$router.push('/mahasiswa/uts/detail-ujian')
        } else {
          this.$router.push('/mahasiswa')
        }
      }
    },
  },
}
</script>
<style scoped>
.card-ujian {
  border-radius: 6px !important;
  margin: 0px 3px 5px 3px;
}
.card-title-mobile:hover,
.card-subtitle-mobile:hover {
  cursor: auto;
}
.card-title-mobile {
  font-size: 16pt;
  color: black;
  font-weight: 500;
}
@media all and (max-width: 480px) {
  .card-title-mobile {
    font-size: 14pt !important;
  }
  .card-subtitle-mobile {
    font-size: 10pt !important;
  }
  .card-jadwal-mobile {
    font-size: 10pt !important;
  }
  .container-thumb-mobile {
    padding-left: 0px;
  }
}
</style>
