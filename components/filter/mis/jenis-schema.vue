<template>
  <v-select
    v-model="jenisSchemaDipilih"
    :items="jenisSchema"
    item-text="jenis_schema"
    item-value="nomor"
    outlined
    label="Jenis Schema"
    :rules="[(v) => !!v || 'Jenis Schema wajib dipilih']"
  ></v-select>
</template>
<script>
export default {
  data() {
    return {
      jenisSchema: [],
      jenisSchemaDipilih: null,
    }
  },
  watch: {
    jenisSchemaDipilih(v) {
      this.$emit('ubah', v)
    },
  },
  created() {
    this.$axios.get('/mis/jenis-schema').then((res) => {
      this.jenisSchema = res.data
      this.jenisSchemaDipilih = res.data[0].nomor
    })
  },
}
</script>
