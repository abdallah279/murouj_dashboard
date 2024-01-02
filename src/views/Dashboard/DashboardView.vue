<template>
    <Navbar />

    <main class="main-padding-right py-4">
        <div class="container">

            <h1 class="page_title fs14 c-black" :class="{ 'mb-4': !(['financial', 'newSettlement', 'finshedSettlement', 'settlementDetailes']).includes(route.name) }" id="page_title">{{ pageTitle }}</h1>

            <router-view v-slot="{ Component, route }">
                <Transition name="slide-fade" mode="out-in">
                    <div :key="route.name">
                        <component :is="Component"></component>
                    </div>
                </Transition>
            </router-view>

        </div>
    </main>

    <Sidebar />
</template>
  
<script setup>

/******************* Import *******************/
import Navbar from "@/components/layout/MainNavbar.vue";
import Sidebar from "@/components/layout/MainSidebar.vue";
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

/******************* Data *******************/
const pageTitle = ref('');
const route = useRoute();

/******************* computed *******************/

/******************* Methods *******************/

/******************* watch *******************/
watch(() => route.path, () => {
    pageTitle.value = document.title;
});

/******************* Mounted *******************/
onMounted(() => {
    pageTitle.value = document.title;
});


</script>
  
<style lang="scss"></style>