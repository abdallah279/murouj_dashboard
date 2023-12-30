<template>
    <main class="auth_layout py-5 px-4">
        <img src="@/assets/imgs/auth_bg.png" alt="" class="auth_bg">
        <div class="container">

            <div class="row">
                <div class="col-xl-6 col-lg-8 mx-auto">

                    <div class="card_style px-lg-5 py-5">
                        <img src="@/assets/imgs/login_logo.png" alt="" class="login_logo sm mb-4 d-block mx-auto">

                        <router-view v-slot="{ Component, route }">
                            <Transition name="slide-fade" mode="out-in">
                                <div :key="route.name">
                                    <component :is="Component"></component>
                                </div>
                            </Transition>
                        </router-view>
                    </div>

                </div>
            </div>

        </div>
    </main>
</template>
  
<script setup>

/******************* Import *******************/

/******************* Data *******************/

/******************* computed *******************/

/******************* Methods *******************/

/******************* watch *******************/

/******************* Mounted *******************/

</script>
  
<style lang="scss"></style>
  