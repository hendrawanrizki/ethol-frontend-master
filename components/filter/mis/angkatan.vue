<template>
  <v-select
    v-model="angkatanDipilih"
    :items="angkatan"
    outlined
    label="Angkatan"
    :rules="[(v) => !!v || 'Angkatan wajib dipilih']"
  ></v-select>
</template>
<script>
export default {
  data() {
    return {
      angkatan: [],
      angkatanDipilih: null,
    }
  },
  watch: {
    angkatanDipilih(v) {
      this.$emit('ubah', v)
    },
  },
  created() {
    const tahunAwal = 2000
    const tahunAkhir = new Date().getFullYear()
    const angkatan = []
    for (let index = tahunAwal; index <= parseInt(tahunAkhir); index++) {
      angkatan.push(index)
    }
    this.angkatan = angkatan
    this.angkatanDipilih = parseInt(tahunAkhir)
  },
}
</script>
