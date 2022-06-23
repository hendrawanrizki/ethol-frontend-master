<template>
  <v-card
    outlined
    style="padding: 20px 20px 5px 20px"
    class="ethol-card"
    :to="cardData.to"
  >
    <v-row>
      <v-col
        md="3"
        sm="3"
        cols="3"
        style="padding-top: 5px; padding-bottom: 17px"
      >
        <center>
          <v-icon class="ethol-icon-card">{{ cardData.icon }}</v-icon>
        </center>
      </v-col>
      <v-col md="9" sm="9" cols="9">
        <h2 class="ethol-title-card">{{ cardData.title }}</h2>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    cardData: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.ethol-card:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.ethol-card {
  transition: transform 0.2s;
}
.ethol-title-card {
  color: #0b668b;
}

.ethol-icon-card {
  padding: 15px;
  background-color: #36474e;
  border-radius: 100px;
  color: #ffffff;
  text-align: center;
  font-size: 15pt;
  margin-top: 0px;
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
    text-align: left;
  }
}
</style>
