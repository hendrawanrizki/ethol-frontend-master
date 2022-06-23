<template>
  <v-card outlined class="card-tugas-ethol" hover>
    <v-card-title style="font-size: 16px">
      {{ tugas.title }}
      <v-spacer></v-spacer>
      <v-menu v-if="dosen" bottom left>
        <template #activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon color="grey">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="edit()">
            <v-list-item-title
              ><v-icon small>mdi-pencil</v-icon> Edit</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="hapus()">
            <v-list-item-title
              ><v-icon small>mdi-delete</v-icon> Hapus</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="copyLink()">
            <v-list-item-title>
              <v-icon small>mdi-content-copy</v-icon>
              Salin Link
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-subtitle>
      {{
        tugas.description.length > 50
          ? tugas.description.substring(0, 250) + ' ...'
          : tugas.description
      }}
    </v-card-subtitle>
    <v-card-text>
      <span class="subtitle-1">
        <small>Deadline : {{ tugas.deadline_indonesia }}</small>
      </span>
      <br />
      <span
        v-if="mahasiswa && tugas.submission_time_indonesia != null"
        class="subtitle-1"
      >
        <small>
          Mengumpulkan :
          {{ tugas.submission_time_indonesia }}
        </small>
      </span>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-chip
        v-if="tugas.file.length != 0"
        small
        style="margin-left: 7px"
        class="white--text chip-lampiran-hide-on-mobile"
        color="#0a668b"
        label
      >
        <v-icon small left> mdi-link </v-icon>
        <span>{{ tugas.file.length }} lampiran</span>
      </v-chip>
      &nbsp; &nbsp;
      <v-chip
        v-if="dosen"
        small
        class="white--text"
        :color="
          tugas.jmlMahasiswaMengerjakan == tugas.jmlMahasiswa
            ? '#009688'
            : '#adadad'
        "
        label
      >
        <v-icon small left> mdi-checkbox-marked-outline </v-icon>
        {{ tugas.jmlMahasiswaMengerjakan }} / {{ tugas.jmlMahasiswa }}
      </v-chip>
      <div v-if="mahasiswa">
        <v-chip
          v-if="tugas.status_pengumpulan == 1"
          small
          label
          color="green"
          outlined
        >
          <v-icon small>mdi-check-circle-outline</v-icon> &nbsp; Mengumpulkan
        </v-chip>
        <v-chip
          v-else-if="tugas.status_pengumpulan == 2"
          small
          label
          color="orange darken-1"
          outlined
        >
          <v-icon small>mdi-emoticon-sad</v-icon> &nbsp; Mengumpulkan Terlambat
        </v-chip>
        <v-chip
          v-else-if="tugas.status_pengumpulan == 0"
          small
          label
          color="error"
          outlined
        >
          <v-icon small>mdi-close-circle-outline</v-icon>&nbsp; Belum
          mengumpulkan
        </v-chip>
      </div>
      <v-spacer></v-spacer>
      <v-btn small class="text-none" color="primary" outlined @click="detail()">
        <span>Detail Tugas</span> &nbsp;<v-icon small>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    tugas: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  methods: {
    edit() {
      this.$emit('edit', this.tugas)
    },
    hapus() {
      this.$emit('hapus', this.tugas)
    },
    async copyLink() {
      const v = this.tugas
      try {
        const urlnya =
          process.env.SHARE_URL +
          '/tugas?preview=' +
          window.btoa(v.id.toString())
        await this.$copyText(urlnya)
        alert('Link berhasil disalin !')
      } catch (e) {
        console.error(e)
      }
    },
    detail() {
      this.$emit('detail', this.tugas)
    },
  },
}
</script>
<style>
.card-tugas-ethol:hover {
  transition: box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  transition-property: box-shadow !important;
  transition-duration: 0.4s !important;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  transition-delay: 0s !important;
  cursor: auto;
}
@media all and (max-width: 480px) {
  .chip-lampiran-hide-on-mobile {
    display: none;
  }
}
</style>
