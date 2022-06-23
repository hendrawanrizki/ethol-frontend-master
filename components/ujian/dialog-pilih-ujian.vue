<template>
  <v-dialog v-model="dialog" width="400">
    <v-tabs
      v-model="tab"
      background-color="primary accent-2"
      class="elevation-2"
      dark
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="i in tabs" :key="i" :href="`#${i}`">
        {{ i }}
      </v-tab>

      <v-tab-item value="Ujian Online">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-card class="ethol-menu-content" outlined @click="keUts">
                  <v-img
                    class="mx-auto hidden-sm-and-down"
                    src="/services/ujian-uts.png"
                    width="100"
                    height="100"
                  />
                  <v-img
                    class="mx-auto hidden-md-and-up"
                    src="/services/ujian-uts.png"
                    width="75"
                    height="75"
                  />
                  <v-card-text class="text-center">
                    <span class="caption hidden-md-and-up">
                      <strong>UTS</strong>
                    </span>
                    <span class="hidden-sm-and-down">
                      <strong>UTS</strong>
                    </span>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card class="ethol-menu-content" outlined @click="keUas">
                  <v-img
                    class="mx-auto hidden-sm-and-down"
                    src="/services/ujian-uas.png"
                    width="100"
                    height="100"
                  />
                  <v-img
                    class="mx-auto hidden-md-and-up"
                    src="/services/ujian-uas.png"
                    width="75"
                    height="75"
                  />
                  <v-card-text class="text-center">
                    <span class="caption hidden-md-and-up">
                      <strong>UAS</strong>
                    </span>
                    <span class="hidden-sm-and-down">
                      <strong>UAS</strong>
                    </span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    dialogUjian: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      tab: null,
      tabs: ['Ujian Online'],
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  watch: {
    dialogUjian(v) {
      this.dialog = v
    },
    dialog(v) {
      if (this.dialog == false) {
        this.$emit('tutup')
      }
    },
  },
  mounted() {},
  methods: {
    keUts() {
      if (this.dosen) {
        this.$router.push('/dosen/uts')
      } else if (this.mahasiswa) {
        this.$router.push('/mahasiswa/uts')
      }
    },
    keUas() {
      if (this.dosen) {
        this.$router.push('/dosen/uas')
      } else if (this.mahasiswa) {
        this.$router.push('/mahasiswa/uas')
      }
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
  background-color: rgb(250, 250, 250);
}
</style>
