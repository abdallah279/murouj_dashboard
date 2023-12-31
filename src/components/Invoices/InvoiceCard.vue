<template>
    <div class="invoice_card">
        <div class="invoice_card_header">
            <img src="@/assets/imgs/icons/file.png" alt="" class="icon">
            <h5 class="c-black fs14">{{ $t('invoices.invoiceNumber') }} #{{ invoice.invoice_num }}</h5>
        </div>
        <div class="invoice_card_body">

            <div class="d-flex-between gap-3 mb-2">
                <p class="c-black">{{ $t('invoices.invoiceDate') }}</p>
                <p class="c-black">{{ invoice.date }}</p>
            </div>

            <div class="d-flex-between gap-3 mb-2">
                <p class="c-black">{{ $t('invoices.ordernumber') }}</p>
                <p class="c-black">{{ invoice.order_num }}</p>
            </div>

            <div class="d-flex-between gap-3 mb-2">
                <p class="c-black">{{ $t('invoices.invoiceVat') }}</p>
                <p class="c-blue">{{ invoice.vat_amount }} {{ invoice.currency }}</p>
            </div>

            <div class="d-flex-between gap-3">
                <p class="c-black">{{ $t('invoices.orderVat') }}</p>
                <p class="c-blue">{{ invoice.final_total }} {{ invoice.currency }}</p>
            </div>

        </div>
        <div class="invoice_card_footer">
            <router-link :to="{ name: 'invoiceDetailes', params: { id: invoice.id } }" class="main-btn rounded-0 w-100">
                {{ $t('invoices.showBtn') }}
                <i class="pi pi-angle-left"></i>
            </router-link>
        </div>
    </div>
</template>
  
<script setup>
/******************* Import *******************/

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    invoice: {
        type: Object,
        default: {},
    },
});

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>
  
<style lang="scss"></style>