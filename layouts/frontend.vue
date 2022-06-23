<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="white"
      class="app-bar-ethol"
    >
      <v-toolbar-title>
        <img class="ethol-image-logo" src="/ethol-logo.png" alt="" />
      </v-toolbar-title>
      <v-row id="ethol-navbar-right" style="width: 96%">
        <v-col cols="12" md="5"> </v-col>
        <v-col cols="12" md="6">
          <ul class="ethol-navbar">
            <li v-for="(m, index) in menu" :key="index">
              <a :class="m.active" :href="m.url">{{ m.label }}</a>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" md="1">
          <v-btn
            dark
            class="btn-login-ethol-frontend"
            @click="dialogLogin = true"
          >
            Login
          </v-btn>
        </v-col>
      </v-row>
      <v-spacer />
      <v-btn
        id="ethol-frontend-navigation-drawer"
        icon
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <DialogLogin :dialog="dialogLogin" @tutup="dialogLogin = false" />
    <v-main>
      <nuxt />
    </v-main>
    <v-navigation-drawer v-model="drawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item v-for="(m, i) in menu" :key="i" :to="m.url" router exact>
          <v-list-item-content>
            <v-list-item-title v-text="m.label" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app style="background-color: #141414">
      <v-row style="padding: 0px !important; margin: 0px !important">
        <v-col cols="12" md="6">
          <p style="color: white" class="ethol-footer-text">
            Made with ❤ in Surabaya
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <p style="float: right; color: white" class="ethol-footer-text">
            &copy; {{ new Date().getFullYear() }} ETHOL Dev Team. All Right
            Reserved
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import DialogLogin from '@/components/frontend/dialog-login.vue'
export default {
  components: {
    DialogLogin,
  },
  data() {
    return {
      clipped: false,
      fixed: false,
      right: false,
      drawer: false,
      dialogLogin: false,
      menu: [
        {
          label: 'Home',
          url: '#home',
          active: false,
        },
        {
          label: 'About',
          url: '#about',
          active: false,
        },
        {
          label: 'Services',
          url: '#services',
          active: false,
        },
        {
          label: 'FAQ',
          url: '#faq',
          active: false,
        },
        {
          label: 'Contact Us',
          url: '#contact',
          active: false,
        },
      ],
    }
  },
}
</script>
<style>
.app-bar-ethol {
  height: 100px !important;
}
.ethol-image-logo {
  width: min(50vw, 150px);
  margin: auto;
  display: block;
  margin-top: 34px;
}
.ethol-navbar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-top: 32px;
  float: right;
}
.ethol-navbar li {
  float: left;
}
.ethol-navbar li a {
  display: block;
  color: #0b668b;
  text-align: center;
  padding: 14px 16px;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
}
.ethol-navbar li a:hover:not(.active) {
  background-color: white;
}
.ethol-navbar li a.active {
  color: #168dbd;
  font-weight: bold;
}
.btn-login-ethol-frontend {
  margin-top: 38px;
  background: linear-gradient(109.6deg, #168dbd 9.95%, #168dbd 93.04%);
  border-radius: 15px !important;
  color: white;
}
#ethol-frontend-navigation-drawer {
  display: none;
}

@media all and (min-width: 1024px) and (max-width: 1280px) {
}

@media all and (min-width: 768px) and (max-width: 1024px) {
}

@media all and (min-width: 480px) and (max-width: 768px) {
  #ethol-navbar-right {
    display: none !important;
  }
  #ethol-frontend-navigation-drawer {
    display: block;
  }
}

@media all and (max-width: 480px) {
  #ethol-navbar-right {
    display: none !important;
  }
  .ethol-image-logo {
    width: min(50vw, 130px) !important;
    margin-top: 30px !important;
    margin-left: -10px !important;
  }
  #ethol-frontend-navigation-drawer {
    display: block;
    margin-top: 10px;
  }
  .ethol-footer-text {
    text-align: center;
    font-size: 14pt;
  }
}
</style>
