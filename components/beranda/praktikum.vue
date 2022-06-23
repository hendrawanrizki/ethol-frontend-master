<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3>Praktikum</h3>
      </v-col>
      <v-col cols="12" md="6">
        <v-card
          hover
          @click="
            openPraktikum(
              'Paket Pemrograman & Database',
              'https://ethol.pens.ac.id/w3sch00l'
            )
          "
        >
          <v-card-text> Paket Pemrograman & Database </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card
          hover
          @click="openPraktikum('Tools Pemrograman', 'https://codepen.io/pen/')"
        >
          <v-card-text> Tools Pemrograman </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent fullscreen>
      <v-card tile>
        <v-card-title class="primary" style="height: 10vh">
          <span class="subtitle-1 white--text">{{ title }}</span>
          <v-spacer />
          <v-btn icon text @click="close()">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-0" style="height: 90vh">
          <iframe :key="link" :src="link" class="full" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: null,
      dialog: false,
      link: null,
    }
  },
  methods: {
    openPraktikum(judul, link) {
      this.dialog = true
      this.link = link
      this.title = judul
    },
    close() {
      this.dialog = false
      this.link = null
    },
  },
}
</script>
<style scoped>
.shadow {
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}
.full {
  width: 100%;
  height: 100%;
}
</style>
