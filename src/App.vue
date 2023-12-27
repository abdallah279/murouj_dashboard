<template>
  <Navbar v-if="!'PageNotFound'.includes(route.name)" />

  <main :class="notFound">
    <div :class="{container: !'PageNotFound'.includes(route.name)}">

      <h1 class="page_title fs14 c-light mb-4" id="page_title" v-if="!'PageNotFound'.includes(route.name)"></h1>

      <router-view v-slot="{ Component, route }">
        <Transition name="slide-fade" mode="out-in">
          <div :key="route.name">
            <component :is="Component"></component>
          </div>
        </Transition>
      </router-view>

    </div>
  </main>

  <!-- <router-view></router-view> -->

  <Sidebar v-if="!'PageNotFound'.includes(route.name)" />
  <Toast />
</template>

<script setup>
import Navbar from "@/components/layout/MainNavbar.vue";
import Sidebar from "@/components/layout/MainSidebar.vue";
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import { computed } from "vue";
const toast = useToast();
import { useRoute } from 'vue-router';

// Route
const route = useRoute();

const notFound = computed(() => {
  return !'PageNotFound'.includes(route.name) ? ['main-padding-right' ,'py-4'] : ''
});

</script>

<style lang="scss"></style>
