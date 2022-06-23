<template>
  <v-carousel cycle height="600" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item
      v-for="(slide, i) in sliderEthol"
      :key="i"
      style="padding-bottom: 10px"
    >
      <template v-if="slide.versi == '1'">
        <v-sheet
          :id="`slider-ethol-` + i"
          class="ethol-bg-slider-v1"
          height="100%"
        >
          <v-row class="fill-height">
            <v-col cols="12" md="8">
              <div class="text-h4 ethol-title-slider-v1">
                {{ slide.judul }}
              </div>
              <div class="text-h2 ethol-subtitle-slider-v1">
                {{ slide.sub_judul }}
              </div>
              <v-btn color="#4770D9" class="ethol-cta-slider-v1" rounded>
                Learn Now
              </v-btn>
            </v-col>
            <v-col cols="12" md="4" class="ethol-slider-right-column">
              <v-row style="margin-top: 110px">
                <v-col
                  v-for="(img_slide, index) in slide.gambar"
                  :key="index"
                  cols="12"
                  md="6"
                >
                  <img class="ethol-img-rounded-cube" :src="img_slide" alt="" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </template>
      <template v-else-if="slide.versi == '2'">
        <v-sheet
          :id="`slider-ethol-` + i"
          class="ethol-bg-slider-v2"
          height="100%"
        >
          <v-row class="fill-height">
            <v-col cols="12" md="8">
              <div class="text-h4 ethol-title-slider-v2">
                {{ slide.judul }}
              </div>
              <div class="text-h2 ethol-subtitle-slider-v1">
                {{ slide.sub_judul }}
              </div>
              <v-btn color="#4770D9" class="ethol-cta-slider-v1" rounded>
                Learn Now
              </v-btn>
            </v-col>
            <v-col cols="12" md="4" class="ethol-slider-right-column">
              <v-row style="margin-top: 110px">
                <v-col
                  v-for="(img_slide, index) in slide.gambar"
                  :key="index"
                  cols="12"
                  md="6"
                >
                  <img
                    class="ethol-img-rounded-circle"
                    :src="img_slide"
                    alt=""
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </template>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  props: {
    sliderEthol: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style scoped>
.ethol-img-rounded-cube {
  width: 200px;
  border-radius: 50px;
  box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
  -webkit-box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
  -moz-box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
}
.ethol-img-rounded-circle {
  width: 180px;
  border-radius: 100px;
  box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
  -webkit-box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
  -moz-box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
}

.ethol-title-slider-v1 {
  margin: 190px 0px 0px 100px;
  color: white;
  font-weight: 400;
}
.ethol-title-slider-v2 {
  margin: 160px 0px 0px 100px;
  color: black;
  font-weight: 400;
}
.ethol-subtitle-slider-v1 {
  margin: 20px 0px 0px 98px;
  color: #ffbe58;
  font-weight: bold;
  -webkit-text-stroke: 1.5px black;
}
.ethol-bg-slider-v1 {
  background: rgb(71, 112, 217);
  background-image: url('/slider/bg5.png');
  background-image: url('/slider/bg5.png'),
    linear-gradient(177deg, rgba(71, 112, 217, 1) 0%, rgba(0, 18, 66, 1) 100%);
  background-repeat: no-repeat;
  background-size: cover;
}
.ethol-cta-slider-v1 {
  margin: 50px 0px 0px 100px;
  color: white;
}

.ethol-bg-slider-v2 {
  background: rgb(71, 112, 217);
  background-image: url('/slider/bg2.png');
  background-image: url('/slider/bg2.png'),
    linear-gradient(177deg, rgba(71, 112, 217, 1) 0%, rgba(0, 18, 66, 1) 100%);
  background-repeat: no-repeat;
  background-size: cover;
}

@media all and (min-width: 1024px) and (max-width: 1280px) {
}

@media all and (min-width: 768px) and (max-width: 1024px) {
  .ethol-title-slider-v1 {
    margin: 130px 0px 0px 100px;
    color: white;
    font-weight: 400;
  }
  .ethol-title-slider-v2 {
    margin: 130px 0px 0px 100px;
    color: black;
    font-weight: 400;
  }
  .ethol-img-rounded-cube {
    width: 140px;
    border-radius: 50px;
    box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
    -webkit-box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
    -moz-box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
  }
  .ethol-img-rounded-circle {
    width: 140px;
    border-radius: 100px;
    box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
    -webkit-box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
    -moz-box-shadow: 9px 10px 13px -8px rgba(64, 64, 64, 0.75);
  }
}

@media all and (min-width: 480px) and (max-width: 768px) {
  .ethol-slider-right-column {
    display: none;
  }
}

@media all and (max-width: 480px) {
  .ethol-slider-right-column {
    display: none;
  }
  .ethol-title-slider-v1 {
    margin: 130px 0px 0px 30px;
    color: white;
    font-weight: 400;
    font-size: 18pt !important;
  }
  .ethol-title-slider-v2 {
    margin: 70px 0px 0px 30px;
    color: black;
    font-weight: 400;
    font-size: 18pt !important;
  }
  .ethol-subtitle-slider-v1 {
    margin: 20px 0px 0px 30px;
    color: #ffbe58;
    font-weight: bold;
    -webkit-text-stroke: 0.5px black;
    font-size: 36pt !important;
  }
  .ethol-cta-slider-v1 {
    margin: 70px 0px 0px 30px;
    color: white;
  }
  .ethol-bg-slider-v1 {
    background: rgb(71, 112, 217);
    background: linear-gradient(
      177deg,
      rgba(71, 112, 217, 1) 0%,
      rgba(0, 18, 66, 1) 100%
    );
  }
}
</style>
