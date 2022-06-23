<template>
  <v-container>
    <Breadcrumb :breadcrumb-item="breadcrumbItem" :judul-laman="judulLaman" />
    <v-row>
      <v-col v-for="(cd, index) in cardData" :key="index" cols="12" md="3">
        <v-card>
          <card-with-left-icon :card-data="cd"></card-with-left-icon>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Breadcrumb from '@/components/backend/breadcrumb.vue'
import CardWithLefttIcon from '~/components/card/card-with-left-icon.vue'
export default {
  components: {
    Breadcrumb,
    'card-with-left-icon': CardWithLefttIcon,
  },
  middleware: ['auth', 'admin'],
  data() {
    return {
      judulLaman: 'MIS',
      breadcrumbItem: [
        {
          text: 'Beranda',
          disabled: false,
          exact: true,
          to: '/admin/beranda',
        },
        {
          text: 'MIS',
          disabled: true,
          exact: true,
          to: '#',
        },
      ],
      cardData: [
        {
          title: 'Agama',
          icon: 'mdi-shield-outline',
          to: '/admin/master/mis/agama',
        },
        {
          title: 'Hari',
          icon: 'mdi-calendar',
          to: '/admin/master/mis/hari',
        },
        {
          title: 'Jam',
          icon: 'mdi-calendar-clock',
          to: '/admin/master/mis/jam',
        },
        {
          title: 'Jam PJJ',
          icon: 'mdi-calendar-clock',
          to: '/admin/master/mis/jam-pjj',
        },
        {
          title: 'Jam PSDKU',
          icon: 'mdi-calendar-clock',
          to: '/admin/master/mis/jam-psdku',
        },
        {
          title: 'Jam Reguler',
          icon: 'mdi-calendar-clock',
          to: '/admin/master/mis/jam-reguler',
        },
        {
          title: 'Skema',
          icon: 'mdi-source-merge',
          to: '/admin/master/mis/skema',
        },
        {
          title: 'Jurusan',
          icon: 'mdi-barley',
          to: '/admin/master/mis/jurusan',
        },
        {
          title: 'Kelas',
          icon: 'mdi-home-variant',
          to: '/admin/master/mis/kelas',
        },
        {
          title: 'Kuliah',
          icon: 'mdi-book',
          to: '/admin/master/mis/kuliah',
        },
        {
          title: 'Kuliah Agama',
          icon: 'mdi-book',
          to: '/admin/master/mis/kuliah-agama',
        },
        {
          title: 'Kuliah Agama Mahasiswa',
          icon: 'mdi-book',
          to: '/admin/master/mis/kuliah-agama-mahasiswa',
        },
        {
          title: 'Kuliah Pararel',
          icon: 'mdi-book',
          to: '/admin/master/mis/kuliah-pararel',
        },
        {
          title: 'Mahasiswa',
          icon: 'mdi-account',
          to: '/admin/master/mis/mahasiswa',
        },
        {
          title: 'Mahasiswa Semester',
          icon: 'mdi-account-box-outline',
          to: '/admin/master/mis/mahasiswa-semester',
        },
        {
          title: 'Matakuliah',
          icon: 'mdi-bookmark',
          to: '/admin/master/mis/matakuliah',
        },
        {
          title: 'Pegawai',
          icon: 'mdi-account-multiple-outline',
          to: '/admin/master/mis/pegawai',
        },
        {
          title: 'Program',
          icon: 'mdi-chemical-weapon',
          to: '/admin/master/mis/program',
        },
        {
          title: 'Ruang Kuliah',
          icon: 'mdi-home-modern',
          to: '/admin/master/mis/ruang-kuliah',
        },
        {
          title: 'Soal',
          icon: 'mdi-checkbox-marked-circle-outline',
          to: '/admin/master/mis/soal',
        },
        {
          title: 'Soal Agama',
          icon: 'mdi-checkbox-marked-circle-outline',
          to: '/admin/master/mis/soal-agama',
        },
      ],
    }
  },
}
</script>
