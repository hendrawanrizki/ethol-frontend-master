<template>
  <v-select
    v-model="jurusanDipilih"
    :items="jurusan"
    item-text="jurusan"
    item-value="nomor"
    outlined
    label="Jurusan"
    :rules="[(v) => !!v || 'Jurusan wajib dipilih']"
  ></v-select>
</template>
<script>
export default {
  data() {
    return {
      jurusan: [],
      jurusanDipilih: null,
    }
  },
  watch: {
    jurusanDipilih(v) {
      this.$emit('ubah', v)
    },
  },
  created() {
    this.$axios.get('/mis/jurusan').then((res) => {
      this.jurusan = res.data
      this.jurusanDipilih = res.data[0].nomor
    })
  },
}
</script>
