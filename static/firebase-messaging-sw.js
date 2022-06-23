importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyCZJfp60GIvcK1G2kdt_7g4bZ3Z3AhVslY',
  authDomain: 'ethol-pens.firebaseapp.com',
  projectId: 'ethol-pens',
  storageBucket: 'ethol-pens.appspot.com',
  messagingSenderId: '869097625718',
  appId: '1:869097625718:web:485b9d1a3950ad57a4a757',
  measurementId: 'G-CSV0HLFDPV',
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  // console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon:"/icon-notifikasi.png",
    actions:[{
      title:"Buka",
      action:payload.notification.click_action,
    }],
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
