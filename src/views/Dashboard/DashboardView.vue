<template>
    <Navbar />

    <main class="main-padding-right py-4">
        <div class="container">

            <h1 class="page_title fs14 c-light mb-4" id="page_title">{{ $t('pagesTitle.dashboard') }}</h1>

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

/******************* Data *******************/

/******************* computed *******************/

/******************* Methods *******************/

/******************* watch *******************/

/******************* Mounted *******************/


</script>
  
<style lang="scss"></style>