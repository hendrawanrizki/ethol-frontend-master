<template>
  <v-select
    v-model="hasil"
    label="Tahun Ajaran"
    :items="tahuns"
    item-text="teks"
    item-value="nilai"
    :rules="[(v) => !!v || 'Tahun Ajaran wajib dipilih']"
    outlined
  />
</template>
<script>
export default {
  props: {
    tahun: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      tahuns: [],
      hasil: null,
    }
  },
  watch: {
    hasil(v) {
      this.$emit('ubah', v)
    },
  },
  created() {
    const tahun = this.$store.getters.tahun
    for (let i = 0; i < 10; i++) {
      this.tahuns.push({
        nilai: tahun - i,
        teks: `${tahun - i}/${tahun - i + 1}`,
      })
    }
    this.hasil = this.$store.getters.tahun
  },
}
</script>
