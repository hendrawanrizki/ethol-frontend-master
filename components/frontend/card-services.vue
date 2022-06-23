<template>
  <v-card
    outlined
    color="#E3FFF2"
    style="padding: 20px 20px 5px 20px; border-radius: 15px"
    class="card-services-ethol-front"
  >
    <v-row>
      <v-col md="3" sm="12" cols="12">
        <center>
          <v-icon class="ethol-icon-card">{{ cardLayanan.icon }}</v-icon>
        </center>
      </v-col>
      <v-col md="9" sm="12" cols="12">
        <h2 class="ethol-title-card">{{ cardLayanan.judul }}</h2>
        <p class="ethol-subtitle-card">{{ cardLayanan.sub_judul }}</p>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    cardLayanan: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.card-services-ethol-front:hover {
  box-shadow: -2px 4px 25px 2px rgba(46, 46, 46, 0.15);
  -webkit-box-shadow: -2px 4px 25px 2px rgba(46, 46, 46, 0.15);
  -moz-box-shadow: -2px 4px 25px 2px rgba(46, 46, 46, 0.15);
}
.ethol-container {
  padding-right: 80px;
  padding-left: 80px;
}
.ethol-title-card {
  color: #0b668b;
}
.ethol-subtitle-card {
  font-weight: 300;
}
.ethol-icon-card {
  padding: 24px;
  margin: -10px auto;
  background-color: white;
  border-radius: 100px;
  color: #0a668b;
  text-align: center;
  font-size: 30pt;
}

@media all and (min-width: 1024px) and (max-width: 1280px) {
}

@media all and (min-width: 768px) and (max-width: 1024px) {
}

@media all and (min-width: 480px) and (max-width: 768px) {
}

@media all and (max-width: 480px) {
  .ethol-title-card,
  .ethol-subtitle-card {
    text-align: center;
  }
}
</style>
