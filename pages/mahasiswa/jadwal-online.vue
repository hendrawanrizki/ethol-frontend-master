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
  middleware: ['auth', 'mahasiswa'],
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
      jadwalMahasiswa: (state) => state.modules.jadwal.jadwalMahasiswa,
      user: (state) => state.user,
    }),
  },
  created() {
    if (this.jadwalMahasiswa.length == 0) {
      this.ambilData()
    } else {
      this.jadwalPerHari = this.jadwalMahasiswa
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
          'modules/jadwal/simpan_jadwal_mahasiswa',
          this.jadwalPerHari
        )
      })
    },
  },
}
</script>
