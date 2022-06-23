<template>
  <v-container>
    <v-row>
      <v-col v-for="(i, index) in info" :key="index" cols="12" md="3">
        <card-info :info="i"></card-info>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardInfo from '@/components/info/card-info.vue'
export default {
  components: {
    'card-info': CardInfo,
  },
  middleware: ['auth', 'admin'],
  data() {
    return {
      info: [
        {
          judul: 'Pengumuman',
          warna: 'blue',
          jumlah: 10,
        },
        {
          judul: 'Rekap Materi',
          warna: 'indigo',
          jumlah: 530,
        },
        {
          judul: 'Tugas Online',
          warna: 'pink',
          jumlah: 2424,
        },
        {
          judul: 'FAQ',
          warna: 'green',
          jumlah: 14,
        },
      ],
    }
  },
  created() {
    this.$axios.get('/mis/program')
  },
}
</script>
