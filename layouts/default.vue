<template>
  <v-app dark>
    <Snackbar />
    <v-app-bar
      fixed
      clipped-left
      app
      style="background-color: #0b668b; color: white"
      dark
    >
      <v-app-bar-nav-icon class="hidden-lg-and-up" @click="drawer = true" />
      <v-avatar class="hidden-md-and-down mr-3" tile>
        <v-img src="/penswhite.png" contain />
      </v-avatar>
      <div>
        <p class="ethol-nav-brand">
          {{ brand }}
        </p>
        <p class="ethol-nav-long-brand">
          <small>{{ long_brand }}</small>
        </p>
      </div>
      <v-spacer></v-spacer>
      <v-badge
        v-if="dosen || mahasiswa"
        v-show="showIconNotif"
        :content="jumlahNotifikasi"
        :value="jumlahNotifikasi"
        color="red"
        overlap
      >
        <v-btn small icon @click="showNotifikasi()">
          <v-icon> mdi-bell </v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped>
      <UserProfile />
      <v-divider />
      <v-list nav dense>
        <MenuAdmin v-if="admin" />
        <MenuBaak v-else-if="baak" />
        <MenuDosen v-else-if="dosen" />
        <MenuKaprodi v-else-if="kaprodi" />
        <MenuMahasiswa v-else-if="mahasiswa" />
        <MenuLogout />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <nuxt />
    </v-main>
    <v-navigation-drawer
      v-if="dosen || mahasiswa"
      v-model="drawerNotifikasi"
      :right="true"
      temporary
      fixed
      width="400"
    >
      <DrawerNotifikasi
        @close="drawerNotifikasi = false"
        @jumlah="assignJumlah"
        @fungsidrawer="fungsiDrawer"
      />
    </v-navigation-drawer>
  </v-app>
</template>
<script>
import Snackbar from '@/components/utils/snackbar.vue'
import UserProfile from '@/components/user/profil.vue'
import MenuLogout from '@/components/menu/logout.vue'
import MenuAdmin from '@/components/menu/hak/admin.vue'
import MenuBaak from '@/components/menu/hak/baak.vue'
import MenuDosen from '@/components/menu/hak/dosen.vue'
import MenuKaprodi from '@/components/menu/hak/kaprodi.vue'
import MenuMahasiswa from '@/components/menu/hak/mahasiswa.vue'
import DrawerNotifikasi from '@/components/notifikasi/popup-drawer-notifikasi.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    Snackbar,
    UserProfile,
    MenuLogout,
    MenuAdmin,
    MenuBaak,
    MenuDosen,
    MenuKaprodi,
    MenuMahasiswa,
    DrawerNotifikasi,
  },
  data() {
    return {
      brand: process.env.BRAND_SINGKATAN,
      long_brand: process.env.BRAND_KEPANJANGAN,
      drawer: null,
      drawerNotifikasi: false,
      jumlahNotifikasi: 0,

      showIconNotif: true,
    }
  },
  computed: {
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  created() {
    // memulai listener fcm (di layout )
    this.startListenerFCM()
  },
  methods: {
    fungsiDrawer(v) {
      this.drawerNotifikasi = v
    },
    assignJumlah(v) {
      this.jumlahNotifikasi = v
    },
    async startListenerFCM() {
      if (this.dosen || this.mahasiswa) {
        await this.startOnMessageListener()
        await this.requestPermission()
      }
    },
    async startOnMessageListener() {
      try {
        await this.$fire.messaging.onMessage((payload) => {
          // console.info('Message received : ', payload)
          const icon = '/icon-notifikasi.png'
          const body = payload.notification.body
          const notification = new Notification(payload.notification.title, {
            body,
            icon,
          })
          notification.onclick = (event) => {
            event.preventDefault()
            window.open(
              process.env.APP_URL + payload.notification.click_action,
              '_self'
            )
          }
        })
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    async requestPermission() {
      try {
        const permission = await Notification.requestPermission()
        console.log('PERMISSION: ', permission)
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    showNotifikasi() {
      this.drawerNotifikasi = true
    },
  },
}
</script>
<style>
.ethol-nav-brand {
  margin-bottom: 0px !important;
  font-weight: bold;
  font-size: 14pt;
}
.ethol-nav-long-brand {
  margin-bottom: 0px !important;
  margin-top: -10px;
  font-size: 12pt;
}
.ethol-th-table {
  background-color: rgb(240, 255, 250) !important;
}
.swal2-container {
  font-family: sans-serif;
}
.table-noborder,
.table-noborder tr,
.table-noborder th,
.table-noborder td {
  border: none !important;
  text-align: left;
  padding: 5px;
}
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
</style>
