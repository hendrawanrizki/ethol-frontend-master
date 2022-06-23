<template>
  <v-card outlined>
    <v-card-title>
      <v-row>
        <v-col cols="10">
          {{ pengumuman.judul }}
          <p
            style="
              font-size: 9pt;
              font-weight: 400;
              color: grey;
              margin-top: -5px;
              margin-left: 1px;
            "
          >
            {{ pengumuman.waktu_indonesia }}
          </p>
        </v-col>
        <v-col cols="2">
          <div v-if="dosen" style="float: right !important">
            <v-menu>
              <template #activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list class="body-2">
                <v-list-item @click="edit()"> Edit </v-list-item>
                <v-list-item @click="hapus()"> Hapus </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text style="padding-bottom: 0px">
      <p style="text-align: justify" v-text="pengumuman.isi_pengumuman"></p>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    pengumuman: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  methods: {
    edit() {
      this.$emit('edit', this.pengumuman)
    },
    hapus() {
      this.$emit('hapus', this.pengumuman)
    },
  },
}
</script>
