<template>
  <v-card
    :style="{
      background: generate(nomor + dosen),
    }"
    class="card-wrapper"
    flat
    dark
  >
    <v-card-text class="py-0">
      <v-row align="center">
        <v-col cols="2" sm="2" md="2" lg="2" class="text-center">
          <v-icon size="18">mdi-book-outline</v-icon>
        </v-col>
        <v-col cols="10" sm="10" md="10" lg="10" class="white--text">
          {{ matakuliah.nama }}
        </v-col>
        <v-col cols="2" sm="2" md="2" lg="2" class="text-center">
          <v-icon size="18">mdi-account-outline</v-icon>
        </v-col>
        <v-col cols="10" sm="10" md="10" lg="10" class="white--text">
          {{ dosen }}
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <!-- <v-btn text class="text-none white black--text"> Akses Kuliah </v-btn> -->
    </v-card-actions>
  </v-card>
</template>
<script>
import Color from 'color-hash'
export default {
  props: {
    nomor: {
      type: Number,
      required: true,
    },
    dosen: {
      type: String,
      required: true,
    },
    jenisSchema: {
      type: Number,
      required: true,
    },
    matakuliah: {
      type: Object,
      required: true,
    },
  },
  methods: {
    generate(param) {
      const color = new Color()
      return color.hex(param)
    },
  },
}
</script>
<style scoped>
.card-wrapper {
  margin: 0px 3px 5px 3px;
  border-radius: 7px;
}
</style>
