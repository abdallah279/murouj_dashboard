<template>
    <div class="row gy-5">
        <div class="col-md-6" v-for="invoice in invoices" :key="invoice.id">
            <invoiceCard :invoice="invoice" />
        </div>
    </div>
</template>
  
<script setup>
/******************* Import *******************/
import invoiceCard from "@/components/Invoices/InvoiceCard.vue";

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    invoices: {
        type: Array,
        default: [],
    },
});

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>
  
<style lang="scss"></style>