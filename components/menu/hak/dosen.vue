<template>
  <div>
    <div v-for="(menu, i) in menus" :key="i">
      <MenuGroup
        v-if="Object.prototype.hasOwnProperty.call(menu, 'submenu')"
        :text="menu.text"
        :icon="menu.icon"
        :submenu="menu.submenu"
      />
      <MenuSingle
        v-else
        :text="menu.text"
        :icon="menu.icon"
        :route="menu.route"
      />
    </div>
  </div>
</template>
<script>
import MenuSingle from '@/components/menu/single.vue'
import MenuGroup from '@/components/menu/group.vue'
export default {
  components: {
    MenuSingle,
    MenuGroup,
  },
  data() {
    return {
      menus: [
        {
          text: 'Beranda',
          route: '/dosen/beranda',
          icon: 'mdi-home-outline',
        },
        {
          text: 'Matakuliah',
          route: '/dosen/matakuliah',
          icon: 'mdi-book-outline',
        },
        {
          text: 'Jadwal Online',
          route: '/dosen/jadwal-online',
          icon: 'mdi-calendar-outline',
        },
        {
          text: 'Tugas Online',
          route: '/dosen/tugas-online',
          icon: 'mdi-pencil-box-outline',
        },
        {
          text: 'Ujian Online',
          icon: 'mdi-pen',
          submenu: [
            {
              text: 'UTS',
              route: '/dosen/uts',
            },
            {
              text: 'UAS',
              route: '/dosen/uas',
            },
          ],
        },
        {
          text: 'Rekap Presensi',
          route: '/dosen/rekap-presensi',
          icon: 'mdi-check-all',
        },
      ],
    }
  },
}
</script>
