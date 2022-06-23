<template>
  <div>
    <v-card flat outlined>
      <v-card-title class="subtitle-1">{{ materi.title }} </v-card-title>
      <v-card-text class="pb-0 body-2">
        Diupload pada {{ materi.created_indonesia }}
      </v-card-text>
      <v-card-actions>
        <v-chip
          style="margin-left: 8px"
          small
          color="#efefef"
          label
          text-color="black"
        >
          #{{ hurufKapitalSemua(getExtensiFile(materi.path)) }}
        </v-chip>
        <v-spacer />
        <v-btn
          v-if="user.hakAkses.includes('dosen')"
          text
          icon
          color="grey lighten-1"
          @click="copyLink(materi)"
        >
          <v-icon>mdi-content-copy</v-icon>
        </v-btn>
        <v-btn text icon color="brown lighten-1" @click="lihatMateri(materi)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn
          text
          icon
          color="blue darken-2"
          @click="downloadFileEthol(materi.path)"
        >
          <v-icon>mdi-download</v-icon>
        </v-btn>

        <v-btn
          v-if="user.hakAkses.includes('dosen')"
          text
          icon
          color="error"
          @click="hapusMateri(materi)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import teks from '~/mixins/teks'
import file from '~/mixins/file'
export default {
  mixins: [file, teks],
  props: {
    materi: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    lihatMateri(materi) {
      this.$emit('lihat', materi)
    },

    hapusMateri(materi) {
      this.$emit('hapus', materi)
    },

    async copyLink(materi) {
      try {
        const urlnya =
          process.env.SHARE_URL +
          '/materi?preview=' +
          window.btoa(materi.id.toString())
        await this.$copyText(urlnya)
        alert('Link berhasil disalin !')
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
