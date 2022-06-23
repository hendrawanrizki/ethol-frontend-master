<template>
  <v-card outlined :hover="hover">
    <v-list style="padding: 0px">
      <v-list-item style="padding-top: 0px">
        <v-list-item-icon>
          <img :src="thumbFile(namaFile)" style="width: 35px; height: 35px" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ getNamaFile(namaFile) }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ getExtensiFile(namaFile) }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon medium class="pointer" @click="aksiIcon"> {{ icon }} </v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import teks from '~/mixins/teks'
import file from '~/mixins/file'
export default {
  mixins: [teks, file],
  props: {
    path: {
      type: String,
      required: true,
    },
    namaFile: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    hover: {
      type: Boolean,
      default: true,
    },
  },
  watch: {},
  methods: {
    aksiIcon() {
      const data = {
        namaFile: this.namaFile,
        path: this.path,
        icon: this.icon,
      }
      this.$emit('aksiicon', data)
    },
  },
}
</script>
