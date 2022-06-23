<template>
  <v-card
    :class="
      menu.disabled ? 'ethol-menu-content-disabled' : 'ethol-menu-content'
    "
    flat
  >
    <v-img
      class="mx-auto hidden-sm-and-down"
      :src="menu.gambar"
      width="100"
      height="100"
    />
    <v-img
      class="mx-auto hidden-md-and-up"
      :src="menu.gambar"
      width="75"
      height="75"
    />
    <v-card-text class="text-center">
      <span class="caption hidden-md-and-up">
        <strong>{{ menu.judul }}</strong>
      </span>
      <span class="hidden-sm-and-down">
        <strong>{{ menu.judul }}</strong>
      </span>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.ethol-menu-content {
  transition: transform 0.21s;
}
.ethol-menu-content:hover {
  transform: scale(1.06);
  cursor: pointer;
  background-color: rgb(233, 249, 255);
  border-radius: 20px;
}
</style>
