<template>
  <v-card outlined hover style="margin-top: 15px">
    <v-card-text>
      <h3>{{ pengumuman.judul }}</h3>
      <p>{{ pengumuman.isi }}</p>
      <p v-if="pengumuman.dari == 'baak'">
        <small>Dibuat Oleh BAAK</small>
        <br />
        <small>{{ pengumuman.waktu_indonesia }}</small>
      </p>
      <p v-if="pengumuman.dari == 'kuliah'">
        <small>Matakuliah : {{ pengumuman.matakuliah }}</small>
        <br />
        <small>{{ pengumuman.waktu_indonesia }}</small>
      </p>
      <CardFile
        v-if="pengumuman.dari == 'baak' || pengumuman.file_download != null"
        :nama-file="pengumuman.file_download"
        :path="pengumuman.file_download"
        icon="mdi-download"
        :hover="false"
        @aksiicon="downloadFilePengumuman"
      />
    </v-card-text>
  </v-card>
</template>
<script>
import CardFile from '@/components/card/card-file.vue'
import file from '~/mixins/file'

export default {
  components: {
    CardFile,
  },
  mixins: [file],
  props: {
    pengumuman: {
      type: Object,
      required: true,
    },
  },
  methods: {
    downloadFilePengumuman(v) {
      this.downloadFileEthol(v.path)
    },
  },
}
</script>
