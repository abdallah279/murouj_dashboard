<template>
    <div v-if="!loading">
        <div class="profit_card card_style">
            <h5 class="profit_name">{{ title }}</h5>
            <div class="profit_bottom">
                <span class="num">{{ number.toFixed(2) }} <span class="fs15">{{ currency }}</span></span>
                <img :src="chart" alt="" class="chart_img">
            </div>
        </div>
    </div>

    <div v-if="loading">
        <div class="profit_card card_style">
            <Skeleton class="profit_name" height=".6rem" width="4rem"></Skeleton>
            <div class="profit_bottom mt-5">
                <Skeleton height=".6rem" width="6rem"></Skeleton>
                <Skeleton height=".6rem" width="6rem"></Skeleton>
            </div>
        </div>
    </div>
</template>

<script setup>

/******************* Import *******************/
import Skeleton from 'primevue/skeleton';

/******************* Data *******************/

/******************* Props *******************/
const props = defineProps({
    title: {
        type: String
    },
    currency: {
        type: String
    },
    number: {
        type: Number
    },
    chart: {
        type: String
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style></style>