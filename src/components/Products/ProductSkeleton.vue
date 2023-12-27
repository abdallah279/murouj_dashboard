<template>
    <div class="grid-4 grid-res">
        <div class="product_card" v-for="i in 2" :key="i">
            <Skeleton height="210px" class="rounded-0"></Skeleton>
            <div class="product_body">
                <Skeleton width="12rem" height=".7rem" class="mb-3"></Skeleton>
                <Skeleton width="6rem" height=".7rem" class="mb-3 small" v-if="!view"></Skeleton>
                <div class="price_con" v-if="!view">
                    <Skeleton width="4rem" height=".7rem"></Skeleton>
                    <Skeleton width="4rem" height=".7rem"></Skeleton>
                </div>
            </div>
            <Skeleton width="100%" height="50px" class="rounded-0" v-if="!view"></Skeleton>
        </div>
    </div>
</template>
  
<script setup>
/******************* Import *******************/
import { inject } from 'vue';
import Skeleton from 'primevue/skeleton';

/******************* Data *******************/

/******************* Provide && Inject *******************/
const view = inject('view', false);

/******************* Props *******************/

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>
  
<style></style>