<template>
  <v-select
    v-model="hariDipilih"
    :items="hari"
    item-text="hari"
    item-value="nomor"
    outlined
    label="Hari"
  ></v-select>
</template>
<script>
export default {
  data() {
    return {
      hari: [],
      hariDipilih: null,
    }
  },
  watch: {
    hariDipilih(v) {
      this.$emit('ubah', v)
    },
  },
  created() {
    this.$axios.get('/mis/hari').then((res) => {
      this.hari = res.data
      this.hariDipilih = res.data[0].nomor
    })
  },
}
</script>
