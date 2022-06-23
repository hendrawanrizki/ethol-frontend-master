<template>
  <client-only>
    <carousel
      :scroll-per-page="true"
      :per-page-custom="perPageCustom"
      :pagination-padding="pagPadding"
      :pagination-active-color="pagActiveColor"
      :pagination-color="pagColor"
      :pagination-position="pagPosition"
      :pagination-enabled="true"
    >
      <slide
        v-for="(mk, index) in matakuliahLoading"
        :key="index"
        class="ethol-matkul-slider"
        style="padding-right: 2px; padding-left: 2px"
      >
        <v-card outlined class="card-matkul" height="100%">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <ContentLoader height="200">
                  <rect x="0" y="0" rx="0" ry="0" width="200" height="30" />
                  <rect x="350" y="0" rx="5" ry="5" width="50" height="50" />
                  <rect x="0" y="40" rx="5" ry="5" width="300" height="20" />
                  <rect x="0" y="100" rx="5" ry="5" width="300" height="20" />
                  <rect x="280" y="170" rx="5" ry="5" width="150" height="25" />
                </ContentLoader>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </slide>
    </carousel>
  </client-only>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import { mapState } from 'vuex'
export default {
  components: {
    ContentLoader,
  },
  data() {
    return {
      perPageCustom: [
        [320, 1],
        [600, 2],
        [960, 3],
        [1600, 3],
      ],
      pagPadding: 3,
      pagActiveColor: '#026B88',
      pagColor: '#444444',
      pagPosition: 'bottom',
      matakuliahLoading: [1, 2, 3],
    }
  },
  computed: {
    ...mapState(['auth']),
  },
  methods: {
    klikSlideMatkul(dataset) {
      // console.log('dataset', dataset)
    },
  },
}
</script>
