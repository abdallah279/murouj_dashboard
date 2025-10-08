<template>
    <div class="grid-4 grid-res">
        <productItem v-for="product in products" :key="product.id" :product="product" />
    </div>
</template>

<script setup>

/******************* Import *******************/
import productItem from '@/components/Products/ProductCard.vue'

/******************* Data *******************/

/******************* Emits *******************/
const emit = defineEmits(['remove']);

/******************* Props And Inject *******************/
const props = defineProps({
    products: {
        type: Array,
        required: true,
    }
});

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style>
</style>