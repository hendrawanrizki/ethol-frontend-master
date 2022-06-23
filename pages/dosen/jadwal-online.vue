<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in jadwalPerHari"
        :key="index"
        cols="12"
        md="4"
        sm="6"
        xs="12"
      >
        <v-card style="margin-bottom: 5px" outlined height="100%">
          <v-card-title
            :class="'card-header white--text' + ' ' + listWarna[index].color"
          >
            {{ item.text }}
          </v-card-title>
          <div v-if="item.jadwal.length > 0">
            <v-list v-for="(j, i_jadwal) in item.jadwal" :key="i_jadwal" hover>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title style="font-size: 17px">
                    {{ j.matakuliah }}
                  </v-list-item-title>
                  <v-row v-if="j.isKuliahGabungan == true">
                    <v-col cols="12" md="6" sm="12">
                      <v-chip
                        label
                        :color="listWarna[index].color"
                        style="color: white"
                        small
                        >Kelas Gabungan<v-icon x-small right> mdi-star </v-icon>
                      </v-chip>
                    </v-col>
                  </v-row>
                  <div v-if="j.dataKuliahGabungan.length != 0">
                    <div
                      v-for="(dkg, index_dkg) in j.dataKuliahGabungan"
                      :key="index_dkg"
                    >
                      <div v-if="index_dkg != 0" style="margin-top: 12px"></div>
                      <v-list-item-subtitle
                        style="font-size: 15px; padding-top: 5px"
                      >
                        <v-icon small class="">mdi-book</v-icon>
                        {{ dkg.kelas }} kelas {{ dkg.pararel }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle
                        style="font-size: 15px; padding-top: 5px"
                      >
                        <v-icon small class="">mdi-clock</v-icon>
                        <span v-if="dkg.hari_1 == item.value">
                          {{ dkg.jam_1_awal ? dkg.jam_1_awal : '-' }}
                          {{ dkg.jam_1_akhir ? ' - ' + dkg.jam_1_akhir : '' }}
                        </span>
                        <span v-else-if="dkg.hari_2 == item.value">
                          {{ dkg.jam_2_awal ? dkg.jam_2_awal : '-' }}
                          {{ dkg.jam_2_akhir ? ' - ' + dkg.jam_2_akhir : '' }}
                        </span>
                        <span v-else> - </span>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle
                        style="font-size: 15px; padding-top: 5px"
                      >
                        <v-icon small class="">mdi-video</v-icon>
                        <span v-if="dkg.hari_1 == item.value">
                          {{ dkg.nama_ruang_1 }}
                        </span>
                        <span v-else-if="dkg.hari_2 == item.value">
                          {{ dkg.nama_ruang_2 }}
                        </span>
                        <span v-else> - </span>
                      </v-list-item-subtitle>
                    </div>
                  </div>
                  <div v-else>
                    <v-list-item-subtitle
                      style="font-size: 15px; padding-top: 5px"
                    >
                      <v-icon small class="">mdi-book</v-icon>
                      {{ j.kode_kelas }} kelas {{ j.pararel }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle
                      style="font-size: 15px; padding-top: 5px"
                    >
                      <v-icon small class="">mdi-clock</v-icon>
                      {{ j.jam_awal ? j.jam_awal : '-' }}
                      {{ j.jam_akhir ? ' - ' + j.jam_akhir : '' }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle
                      style="font-size: 15px; padding-top: 5px"
                    >
                      <v-icon small class="">mdi-video</v-icon>
                      {{ j.ruang }}
                    </v-list-item-subtitle>
                  </div>
                </v-list-item-content>
                <v-list-item-action> </v-list-item-action>
              </v-list-item>
            </v-list>
          </div>
          <div v-else>
            <v-card flat>
              <v-card-text> Tidak Ada Jadwal </v-card-text>
            </v-card>
          </div>
          <!-- </v-card-text> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import waktu from '~/mixins/waktu'
import teks from '~/mixins/teks'
export default {
  mixins: [waktu, teks],
  middleware: ['auth', 'dosen'],
  transition: 'slide-bottom',
  data() {
    return {
      jadwalOnline: [],
      jadwalPerHari: [],
      maxJadwalPerHari: 0,
    }
  },
  computed: {
    ...mapState({
      jadwalDosen: (state) => state.modules.jadwal.jadwalDosen,
      user: (state) => state.user,
    }),
  },
  created() {
    if (this.jadwalDosen.length == 0) {
      this.ambilData()
    } else {
      this.jadwalPerHari = this.jadwalDosen
    }
  },
  methods: {
    ambilData() {
      this.$axios('/jadwal/jadwal-online', {
        params: {
          tahun: this.tahunAjaranAktifOnly,
          semester: this.semesterAktif,
        },
      }).then((res) => {
        const jadwalPerHari = this.hariEthol
        this.jadwalOnline = res.data

        jadwalPerHari.forEach((jp) => {
          jp.jadwal = []
        })

        this.jadwalOnline.forEach((jo) => {
          jadwalPerHari.forEach((jp) => {
            if (jo.nomor_hari == jp.value) {
              jp.jadwal.push(jo)
            }
          })
        })
        this.jadwalPerHari = jadwalPerHari

        this.jadwalPerHari.forEach((jp) => {
          if (this.maxJadwalPerHari < jp.jadwal.length) {
            this.maxJadwalPerHari = jp.jadwal.length
          }
        })

        this.$store.dispatch(
          'modules/jadwal/simpan_jadwal_dosen',
          this.jadwalPerHari
        )
      })
    },
  },
}
</script>
