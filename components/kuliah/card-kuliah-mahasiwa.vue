<template>
  <v-card outlined class="card-matkul" height="100%">
    <v-card-text>
      <v-row>
        <v-col cols="10">
          <div class="container-kuliah-mobile">
            <div style="margin-top: 6px">
              <span class="card-title-mobile">
                {{ matkul.matakuliah.nama }}
              </span>
            </div>
            <div>
              <span class="card-subtitle-mobile">
                {{
                  hapusStringNull(matkul.gelar_dpn) +
                  ' ' +
                  hapusStringNull(matkul.dosen) +
                  ' ' +
                  hapusStringNull(matkul.gelar_blk)
                }}
              </span>
            </div>
            <div style="margin-top: 18px"></div>
            <div>
              <span
                v-for="(jd, idx) in matkul.jadwal"
                :key="idx"
                class="card-jadwal-mobile"
              >
                {{ jd.hari }},&nbsp;{{ jd.jam_awal }}&nbsp;
                {{ jd.jam_akhir == null ? '' : '- ' + jd.jam_akhir }}
                <br />
              </span>
            </div>
          </div>
        </v-col>
        <v-col cols="2">
          <v-avatar
            tile
            :color="listWarna[index].color"
            size="45"
            style="
              color: white;
              font-weight: bold;
              border-radius: 6px !important;
              position: absolute;
              right: 10px;
            "
          >
            {{ limitDuaTigaKarakter(akronim(matkul.matakuliah.nama)) }}
          </v-avatar>
        </v-col>
        <v-col cols="2">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            style="position: absolute; bottom: 0; right: 0"
            class="text-none"
            @click="keDetail(matkul)"
          >
            <span>
              Akses Kuliah
              <v-icon small>mdi-arrow-right</v-icon>
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import teks from '~/mixins/teks'
export default {
  mixins: [teks],
  props: {
    matkul: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    keDetail(matkul) {
      this.$store.dispatch('modules/kuliah/simpan_kuliah_mahasiswa', matkul)
      this.$router.push('/mahasiswa/kuliah/detail')
    },
  },
}
</script>
<style scoped>
.card-matkul {
  border-radius: 6px !important;
  margin: 0px 3px 5px 3px;
}
.card-matkul:hover {
  cursor: grab;
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
