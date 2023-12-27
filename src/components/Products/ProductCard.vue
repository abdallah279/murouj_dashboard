<template>
    <div class="product_card">
        <img :src="product.product_image" alt="" class="product_img">
        <div class="product_body">
            <h3 class="product_name">{{ product.product_name }}</h3>
        </div>
    </div>
</template>

<script setup>

/******************* Import *******************/

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Emits *******************/

/******************* Props *******************/
const props = defineProps({
    product: {
        type: Object,
        required: true,
    }
})

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style></style>