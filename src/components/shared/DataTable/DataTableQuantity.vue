<template>
    <div class="number-input sec">

        <button type="button" class="plus btn-num" @click="updateQuantity('plus')">
            <i class="pi pi-plus"></i>
        </button>

        <input type="text" :value="quantity" min="1" disabled />

        <button type="button" class="minus btn-num" :disabled="quantity == 1" @click="updateQuantity('minus')">
            <i class="pi pi-minus"></i>
        </button>

    </div>
</template>

<script setup>
/******************* Import *******************/
import { onMounted, onUnmounted, ref } from 'vue';

/******************* Data *******************/

const quantity = ref(1);

/******************* Provide && Inject *******************/
const props = defineProps({
    productId: {
        type: Number
    }
});

/******************* Emits *******************/
const emit = defineEmits(['updateProduct']);

/******************* Props *******************/

/******************* Methods *******************/

// updateQuantity
const updateQuantity = async (calc) => {

    if (calc == 'plus') {
        quantity.value++;
    } else {
        quantity.value > 1 ? quantity.value-- : false;
    }

    emit('updateProduct', {
        qty: quantity.value,
        id: props.productId
    });
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onUnmounted(() => {
    quantity.value = 1;
});

</script>

<style lang="scss"></style>