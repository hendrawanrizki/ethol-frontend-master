import colors from 'vuetify/es5/util/colors'
const development = process.env.NODE_ENV !== 'production'

export default {
  server: {
    port: 2000,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ETHOL',
    title: 'Enterprise Technology Hybrid Online Learning',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
  },

  loading: {
    color: 'white',
    height: '3px',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style/ethol-style.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    { src: '~/plugins/vue-carousel.js', ssr: false },
    { src: '~/plugins/persistedState.js', ssr: false },
    { src: '~/plugins/vue-video.js', ssr: false },
    { src: '~/plugins/socket.js', ssr: false },
    { src: '~/plugins/TiptapVuetify', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    'nuxt-user-agent',
    'nuxt-clipboard',
  ],
  // nuxt-clipboard
  clipboard: {
    autoSetContainer: true,
  },
  firebase: {
    lazy: false,
    config: {
      apiKey: 'AIzaSyCZJfp60GIvcK1G2kdt_7g4bZ3Z3AhVslY',
      authDomain: 'ethol-pens.firebaseapp.com',
      projectId: 'ethol-pens',
      storageBucket: 'ethol-pens.appspot.com',
      messagingSenderId: '869097625718',
      appId: '1:869097625718:web:485b9d1a3950ad57a4a757',
      measurementId: 'G-CSV0HLFDPV',
    },
    onFirebaseHosting: false,
    services: {
      messaging: true,
    },
  },

  messaging: {
    createServiceWorker: true,
    actions: [
      {
        action: 'Open',
        url: 'https://ethol.pens.ac.id',
      },
    ],
    fcmPublicVapidKey: process.env.FCM_SERVER_KEY,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: development
      ? 'http://localhost:2020'
      : 'https://ethol.pens.ac.id/api',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          secondary: '#424242',
          error: '#FF5252',
          success: '#4CAF50',
          warning: '#FFC107',
          primary: '#0B668B',
          accent: '#369fc9',
          info: colors.teal.lighten1,
          indigo: '#5400B8',
          save: '#4CAF50',
          danger: '#EF5350',
          warn: '#F57F17',
          passed: '#78909C',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
      }
    },
    transpile: ['vuetify/lib', 'tiptap-vuetify'],
  },
  env: {
    BRAND_SINGKATAN: 'ETHOL',
    BRAND_KEPANJANGAN: 'Enterprise Technology Hybrid Online Learning',
    PEMILIK: 'Politeknik Elektronika Negeri Surabaya',
    SOCKET_URL: 'wss://chat.ethol.pens.ac.id/socket',
    APP_URL: 'https://ethol.pens.ac.id',
    SHARE_URL: development
      ? 'http://localhost:2000/links'
      : 'https://ethol.pens.ac.id/links',
    FCM_SERVER_KEY:
      'AAAAylpBWHY:APA91bGSEzDz9pUhw-5oaFn_K4vT7LJafKOmUOetx7AjFsG1xntyFnayyNO-2yP0-i4DsFdiCN2ue6OmrHnnuDWzhvafSBBmKrttA5HlTzS5vgd_T51PkXZ53Wtykr64CdzjkUvePsJm',
  },
}
