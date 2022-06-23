<template>
  <v-select
    v-model="bulanDipilih"
    :items="bulanIndonesia"
    outlined
    label="Bulan"
    :rules="[(v) => !!v || 'Bulan wajib dipilih']"
  ></v-select>
</template>
<script>
import waktu from '~/mixins/waktu'
export default {
  mixins: [waktu],
  data() {
    return {
      bulanDipilih: null,
    }
  },
  watch: {
    bulanDipilih(v) {
      this.$emit('ubah', v)
    },
  },
  created() {
    const bulan = new Date().getMonth()
    this.bulanDipilih = parseInt(bulan) + 1
  },
}
</script>
