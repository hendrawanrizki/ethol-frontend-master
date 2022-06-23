<template>
  <v-card outlined style="border-radius: 10px">
    <v-card-title>
      <ContentLoader height="25">
        <circle cx="12" cy="12" r="12" />
        <rect x="35" y="4" rx="3" ry="3" width="120" height="14" />
      </ContentLoader>
    </v-card-title>
    <v-card-text>
      <br />
      <ContentLoader height="55">
        <rect x="0" y="0" rx="3" ry="3" width="500" height="8" />
        <rect x="0" y="17" rx="3" ry="3" width="500" height="8" />
        <rect x="0" y="34" rx="3" ry="3" width="300" height="8" />
      </ContentLoader>
    </v-card-text>
  </v-card>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader,
  },
}
</script>
