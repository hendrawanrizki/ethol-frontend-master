<template>
  <v-select
    v-model="programDipilih"
    :items="program"
    item-text="program"
    item-value="nomor"
    outlined
    label="Program"
    :rules="[(v) => !!v || 'Program wajib dipilih']"
  ></v-select>
</template>
<script>
export default {
  data() {
    return {
      program: [],
      programDipilih: null,
    }
  },
  watch: {
    programDipilih(v) {
      this.$emit('ubah', v)
    },
  },
  created() {
    this.$axios.get('/program').then((res) => {
      this.program = res.data
      this.programDipilih = res.data[0].nomor
    })
  },
}
</script>
