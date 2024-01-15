<template>
  <router-view />
  <Toast />
</template>

<script setup>

/******************* Import *******************/
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { useRoute } from 'vue-router';

/******************* FCM *******************/
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDW-qr1GKM1reWp50zmVBez5sJpMB-FFg0",
  authDomain: "muroijweb.firebaseapp.com",
  projectId: "muroijweb",
  storageBucket: "muroijweb.appspot.com",
  messagingSenderId: "658005338154",
  appId: "1:658005338154:web:9f2b287e46d6e384247b53"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging();

onMessage(messaging, (payload) => {
  toast.add({ severity: 'info', summary: `${payload.notification.title}`, detail: `${payload.notification.body}`, life: 3500 });
});

getToken(messaging, { vapidKey: 'BIP2wzYjZNzvOnMXte9xHnfEfSycBidse_a3vJZaDmI7IyFokaXYSNBb7zeLIHzMedevv_bOcLE7TaCN66QvBVk' }).then((currentToken) => {
  if (currentToken) {
    localStorage.setItem('notificationToken', currentToken)
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});

/******************* Data *******************/

/******************* computed *******************/

/******************* Methods *******************/

/******************* watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>
