<template>
  <v-dialog v-model="dialog" width="600">
    <v-tabs
      v-model="tab"
      background-color="primary accent-4"
      class="elevation-2"
      dark
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="i in tabs" :key="i" :href="`#${i}`">
        {{ i }}
      </v-tab>

      <v-tab-item value="Kuliah">
        <v-card>
          <v-card-text>
            <v-alert color="info" dark icon="mdi-information-outline" prominent>
              Join Room Perkuliahan dapat dilakukan melalui Halaman Perkuliahan
              dengan cara klik tombol 'Akses Kuliah' pada item matakuliah di
              Halaman Beranda
            </v-alert>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="Umum">
        <v-card flat tile>
          <form
            style="width: 100%"
            :action="publicMeeting ? publicMeeting.server.url : ''"
            method="POST"
          >
            <input
              type="hidden"
              name="meeting"
              :value="publicMeeting ? publicMeeting.nama : ''"
            />
            <input type="hidden" name="name" :value="user.nama" />
            <input
              type="hidden"
              name="role"
              :value="user.hakAkses.includes('dosen') ? 1 : 2"
            />
            <v-row class="pa-0 ma-0" align="center">
              <v-col cols="12">
                <v-autocomplete
                  v-model="publicRoomId"
                  :items="publicRoom"
                  placeholder="Pilih Ruangan"
                  item-text="nama"
                  item-value="nomor"
                  outlined
                  hide-details
                  filled
                />
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="text-none primary"
                  :disabled="publicRoomId === null"
                  large
                  type="submit"
                >
                  Masuk
                </v-btn>
              </v-col>
            </v-row>
          </form>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    dialogKuliah: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      tab: null,
      tabs: ['Kuliah', 'Umum'],

      publicRoom: [],
      publicMeeting: null,
      publicRoomId: null,
    }
  },
  computed: {
    ...mapState({
      ruangUmum: (state) => state.modules.ruangUmum.listRuangUmum,
      user: (state) => state.user,
    }),
  },
  watch: {
    dialogKuliah(v) {
      this.dialog = v
    },
    dialog(v) {
      if (this.dialog == false) {
        this.$emit('tutup')
      }
    },
    publicRoomId(v) {
      this.publicMeeting = {
        ...this.publicRoom.find((item) => item.nomor === v),
      }
    },
  },
  mounted() {
    if (this.ruangUmum.length == 0) {
      this.ambilDataRoom()
    } else {
      this.publicRoom = this.ruangUmum
    }
  },
  methods: {
    ambilDataRoom() {
      this.loading = true
      this.$axios.get('/room-conference/umum').then((res) => {
        this.loading = false
        this.publicRoom = res.data
        this.$store.dispatch(
          'modules/ruangUmum/simpan_ruang_umum',
          this.publicRoom
        )
      })
    },
  },
}
</script>
