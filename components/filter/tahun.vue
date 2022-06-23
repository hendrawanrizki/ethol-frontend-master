<template>
  <v-select
    v-model="tahunDipilih"
    :items="tahun"
    outlined
    label="Tahun"
    :rules="[(v) => !!v || 'Tahun wajib dipilih']"
  ></v-select>
</template>
<script>
export default {
  data() {
    return {
      tahun: [],
      tahunDipilih: null,
    }
  },
  watch: {
    tahunDipilih(v) {
      this.$emit('ubah', v)
    },
  },
  created() {
    const tahunAwal = 2016
    const tahunAkhir = new Date().getFullYear()
    const tahun = []
    for (let index = tahunAwal; index <= parseInt(tahunAkhir); index++) {
      tahun.push(index)
    }
    this.tahun = tahun.reverse()
    this.tahunDipilih = parseInt(tahunAkhir)
  },
}
</script>
