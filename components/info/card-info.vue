<template>
  <v-card
    outlined
    style="border-radius: 8px; padding-top: 5px; padding-bottom: 5px"
  >
    <v-card-text>
      <v-row>
        <v-col cols="8">
          <h3 style="margin-top: 13px">{{ info.judul }}</h3>
        </v-col>
        <v-col cols="4">
          <center>
            <v-avatar
              tile
              :color="info.warna"
              style="border-radius: 8px !important; color: white"
            >
              <h3>{{ info.jumlah }}</h3>
            </v-avatar>
          </center>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
}
</script>
