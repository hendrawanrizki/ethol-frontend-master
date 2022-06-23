<template>
  <v-select
    v-model="hasil"
    label="Semester"
    :items="semesters"
    item-text="teks"
    item-value="nilai"
    :rules="[(v) => !!v || 'Semester wajib dipilih']"
    outlined
  />
</template>
<script>
export default {
  props: {
    semester: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      semesters: [
        { nilai: 1, teks: 'Ganjil' },
        { nilai: 2, teks: 'Genap' },
      ],
      hasil: null,
    }
  },
  watch: {
    hasil(v) {
      this.$emit('ubah', v)
    },
  },
  created() {
    this.hasil = this.$store.getters.semester
  },
}
</script>
