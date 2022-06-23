<template>
  <div class="container text-center">
    <div class="mt-5">
      <h1 class="title p-5">NUXT Firebase Cloud Messaging</h1>
      <v-divider></v-divider>
      <br />
      <v-btn color="error" :disabled="listenersStarted" @click="startListeners"
        ><span class="font-size">Jalankan</span></v-btn
      >
      <v-btn
        color="info"
        :disabled="!listenersStarted"
        @click="sendNotification"
        ><span class="font-size">Kirim Notifikasi</span></v-btn
      >
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  middleware: ['auth', 'admin'],
  data() {
    return {
      listenersStarted: false,
      idToken: '',
    }
  },
  methods: {
    async startListeners() {
      await this.startOnMessageListener()
      await this.startTokenRefreshListener()
      await this.requestPermission()
      await this.getIdToken()
      this.listenersStarted = true
    },
    startOnMessageListener() {
      try {
        this.$fire.messaging.onMessage((payload) => {
          console.info('Message received : ', payload)
        })
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    startTokenRefreshListener() {
      try {
        this.$fire.messaging.onTokenRefresh(async () => {
          try {
            this.idToken = await this.$fire.messaging.getToken()
            console.log('REFRESH_TOKEN ', this.idToken)
          } catch (e) {
            console.error('Error : ', e)
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
    async getIdToken() {
      try {
        this.idToken = await this.$fire.messaging.getToken()
        console.log('TOKEN: ' + this.idToken)
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    async sendNotification() {
      try {
        const data = {
          // to: this.idToken,
          to: this.idToken,
          notification: {
            body: 'Body',
            title: 'Welcome to NUXT FCM',
          },
          data: {
            body: 'Data Body',
            title: 'Welcome to NUXT FCM',
          },
        }
        const config = {
          method: 'post',
          url: 'https://fcm.googleapis.com/fcm/send',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `key=${process.env.FCM_SERVER_KEY}`,
          },
          data,
        }
        await axios(config).then((res) => console.log('Success : ', res))
      } catch (e) {
        console.error('Error : ', e)
      }
    },
  },
}
</script>
<style>
.icon-size {
  font-size: 14px;
}
.font-size {
  font-size: 14px;
}
</style>
