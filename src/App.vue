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


/******************* Data *******************/

/******************* computed *******************/

/******************* Methods *******************/

/******************* watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>
