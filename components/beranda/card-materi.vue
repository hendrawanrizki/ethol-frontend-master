<template>
  <v-card flat outlined>
    <v-card-title class="subtitle-1">{{ materi.judul }} </v-card-title>
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
    </v-card-actions>
  </v-card>
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
  },
}
</script>
