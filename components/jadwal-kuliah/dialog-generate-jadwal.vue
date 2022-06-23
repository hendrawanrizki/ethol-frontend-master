<template>
  <v-dialog v-model="dialogJadwal" width="500" persistent>
    <v-card>
      <v-card-title class="text-h5 lighten-2">
        Sync Jadwal MIS
        <v-spacer></v-spacer>
        <v-btn icon :disabled="loading" @click="dialogJadwal = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <br />
        <v-form ref="form_server_conference">
          <FilterTahun :tahun="tahun" @ubah="ubahTahun" />
          <FilterSemester :semester="semester" @ubah="ubahSemester" />
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="loading"
          text
          @click="prosesGenerate"
        >
          Proses Generate
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import FilterTahun from '~/components/filter/tahun-ajaran.vue'
import FilterSemester from '~/components/filter/semester.vue'
export default {
  components: {
    FilterTahun,
    FilterSemester,
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialogJadwal: null,
      loading: false,
      tahun: null,
      semester: null,
    }
  },
  watch: {
    dialog(v) {
      this.dialogJadwal = v
    },
    dialogJadwal(v) {
      this.$emit('tampilkan', v)
    },
  },
  methods: {
    ubahTahun(v) {
      this.tahun = v
    },
    ubahSemester(v) {
      this.semester = v
    },
    prosesGenerate() {
      this.loading = true
      this.$axios
        .$post('/jadwal/proses-generate-jadwal', {
          tahun: this.tahun,
          semester: this.semester,
        })
        .then((response) => {
          if (response.sukses == true) {
            this.loading = false
            this.dialogJadwal = false
            this.$emit('refresh')
          }
        })
    },
  },
}
</script>
