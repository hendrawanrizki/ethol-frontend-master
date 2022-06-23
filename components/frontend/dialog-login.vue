<template>
  <div class="text-center">
    <v-dialog v-model="visible" width="400">
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          <center>Login</center>
          <v-spacer></v-spacer>
          <v-btn icon small @click="visible = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <br />
          <v-row>
            <v-col cols="12">
              <v-row class="ethol-card-login-option">
                <v-col cols="3" style="padding-top: 0px; padding-bottom: 0px">
                  <v-icon class="ethol-icon-card">
                    mdi-account-multiple-outline
                  </v-icon>
                </v-col>
                <v-col
                  cols="9"
                  style="padding-top: 0px; padding-bottom: 0px"
                  @click="keAuthCas()"
                >
                  <p class="ethol-text-card">Dosen / Staff / Mahasiswa</p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <div class="breakline-on-mobile">
                <br />
              </div>
              <v-row class="ethol-card-login-option">
                <v-col cols="3" style="padding-top: 0px; padding-bottom: 0px">
                  <v-icon class="ethol-icon-card">mdi-account-star</v-icon>
                </v-col>
                <v-col
                  cols="9"
                  style="padding-top: 0px; padding-bottom: 0px"
                  @click="keAuthDosenLb()"
                >
                  <p class="ethol-text-card">Dosen Luar Biasa</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="breakline-on-mobile">
            <br />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapGetters(['production']),
  },
  watch: {
    visible(v) {
      if (!v) {
        this.$emit('tutup')
      }
    },
    dialog(v) {
      this.visible = v
    },
  },
  methods: {
    keAuthDosenLb() {
      this.$router.push('/auth/dosen-lb')
    },
    keAuthCas() {
      this.production
        ? window.open('https://ethol.pens.ac.id/cas', '_self')
        : window.open('http://localhost/cas', '_self')
    },
  },
}
</script>
<style scoped>
.breakline-on-mobile {
  display: block;
}
.ethol-card-login-option {
  padding: 5px;
  border: 1px solid #0a668b;
  border-radius: 5px;
}
.ethol-icon-card {
  padding: 15px;
  background-color: #0a668b;
  border-radius: 100px;
  color: white !important;
  text-align: center;
  font-size: 20pt;
}
.ethol-text-card {
  font-size: 12pt;
  color: #0a668b;
  font-weight: bold;
  margin-top: 16px;
  margin-left: 7px;
}
.ethol-card-login-option:hover {
  cursor: pointer;
  background-color: #0a668b;
}
.ethol-card-login-option:hover .ethol-icon-card {
  background-color: #a7dfff;
  color: #0a668b !important;
}
.ethol-card-login-option:hover .ethol-text-card {
  color: white;
}
@media all and (min-width: 480px) and (max-width: 768px) {
  .ethol-card-login-option {
    padding: 5px;
    border: 1px solid #0a668b;
    border-radius: 5px;
  }
  .ethol-icon-card {
    padding: 15px;
    background-color: #0a668b;
    border-radius: 100px;
    color: white !important;
    text-align: center;
    font-size: 20pt;
  }
  .ethol-text-card {
    font-size: 12pt;
    color: #0a668b;
    font-weight: bold;
    margin-top: 16px;
    margin-left: 0px;
  }
  .breakline-on-mobile {
    display: block;
  }
}
@media all and (max-width: 480px) {
  .ethol-card-login-option {
    padding: 5px;
    border: 1px solid #0a668b;
    border-radius: 5px;
  }
  .ethol-icon-card {
    padding: 15px;
    background-color: #0a668b;
    border-radius: 100px;
    color: white !important;
    text-align: center;
    font-size: 20pt;
  }
  .ethol-text-card {
    font-size: 12pt;
    color: #0a668b;
    font-weight: bold;
    margin-top: 16px;
    margin-left: 7px;
  }
  .breakline-on-mobile {
    display: block;
  }
}
@media all and (max-width: 382px) {
  .ethol-card-login-option {
    padding: 5px;
    border: 1px solid #0a668b;
    border-radius: 5px;
  }
  .ethol-icon-card {
    padding: 15px;
    background-color: #0a668b;
    border-radius: 100px;
    color: white !important;
    text-align: center;
    font-size: 20pt;
    margin-top: 7px;
  }
  .ethol-text-card {
    font-size: 12pt;
    color: #0a668b;
    font-weight: bold;
    margin-top: 16px;
    margin-left: 7px;
  }
  .breakline-on-mobile {
    display: block;
  }
}
</style>
