<template>
  <client-only>
    <carousel
      :scroll-per-page="true"
      :per-page-custom="perPageCustom"
      :pagination-padding="pagPadding"
      :pagination-active-color="pagActiveColor"
      :pagination-color="pagColor"
      :pagination-position="pagPosition"
      :pagination-enabled="true"
    >
      <slide
        v-for="(mk, index) in matakuliah"
        :key="index"
        :data-index="index"
        :data-name="mk.matakuliah.nama"
        class="ethol-matkul-slider"
        @slideclick="klikSlideMatkul"
      >
        <CardKuliahMahasiswa
          v-if="auth.hakAktif == 'mahasiswa'"
          :matkul="mk"
          :index="index"
        />
        <CardKuliahDosen
          v-else-if="auth.hakAktif == 'dosen'"
          :matkul="mk"
          :index="index"
        />
      </slide>
    </carousel>
  </client-only>
</template>
<script>
import CardKuliahMahasiswa from '@/components/kuliah/card-kuliah-mahasiwa.vue'
import CardKuliahDosen from '@/components/kuliah/card-kuliah-dosen.vue'
import { mapState } from 'vuex'
export default {
  components: {
    CardKuliahMahasiswa,
    CardKuliahDosen,
  },
  props: {
    matakuliah: {
      type: Array,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      perPageCustom: [
        [320, 1],
        [600, 2],
        [960, 3],
        [1600, 3],
      ],
      pagPadding: 3,
      pagActiveColor: '#026B88',
      pagColor: '#444444',
      pagPosition: 'bottom',
    }
  },
  computed: {
    ...mapState(['auth']),
  },
  methods: {
    klikSlideMatkul(dataset) {
      // console.log('dataset', dataset)
    },
  },
}
</script>
