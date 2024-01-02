<template>
    <div class="order_cards">
        <RequestCard v-for="request in requests" :key="request.id" :request="request" />
    </div>
</template>

<script setup>
/******************* Import *******************/
import RequestCard from "@/components/Settlements/OrderCard.vue";

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    requests: {
        type: Object
    }
})

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>