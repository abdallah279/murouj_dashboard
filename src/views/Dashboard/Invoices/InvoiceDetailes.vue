<template>
    <!--****** Card Style *****-->
    <div class="card_style py-5 px-lg-5">

        <div class="row">
            <div class="col-xl-6 col-lg-8 mx-auto">

                <!-- **** Invoice **** -->
                <div class="shadow-sm py-4" v-if="!loading">
                    <img src="@/assets/imgs/login_logo.png" alt="" class="login_logo d-block mx-auto sm mb-4">

                    <!--**** Invoice Item ****-->
                    <div class="invoice_item px-3 px-lg-5m px-md-4 py-4">

                        <div class="d-flex-between gap-3 mb-2">
                            <p class="c-black">{{ $t('invoices.tax_number') }} :</p>
                            <p class="c-black">{{ invoice.tax_number }}</p>
                        </div>

                        <div class="d-flex-between gap-3 mb-2">
                            <p class="c-black">{{ $t('invoices.invoiceNumber') }}:</p>
                            <p class="c-black">{{ invoice.invoice_num }}</p>
                        </div>

                        <div class="d-flex-between gap-3">
                            <p class="c-black">{{ $t('invoices.invoiceTime') }} :</p>
                            <p class="c-black">{{ invoice.time }}</p>
                        </div>

                    </div>

                    <!--**** Invoice Item ****-->
                    <div class="invoice_item px-3 px-lg-5m px-md-4 py-4">

                        <div class="d-flex-between gap-3 mb-2">
                            <p class="c-black">{{ $t('invoices.orderDetailes') }}</p>
                        </div>

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

                    <!--**** Invoice Item ****-->
                    <div class="invoice_item px-3 px-lg-5m px-md-4 py-4">

                        <div class="d-flex-between gap-3 mb-2">
                            <p class="c-black">{{ $t('invoices.payType') }} : {{ invoice.pay_type_text }}</p>
                        </div>

                        <div class="d-flex-between gap-3 mb-2">
                            <p class="c-black">{{ $t('invoices.totalProduct') }}</p>
                            <p class="c-blue">{{ invoice.products_price }} {{ invoice.currency }}</p>
                        </div>

                        <div class="d-flex-between gap-3 mb-2">
                            <p class="c-black">القيمة المضافة (VAT) %15</p>
                            <p class="c-blue">{{ invoice.vat_amount }} {{ invoice.currency }}</p>
                        </div>

                        <div class="d-flex-between gap-3">
                            <p class="c-black">المبلغ الإجمالي يتضمن الضريبة </p>
                            <p class="c-blue">{{ invoice.final_total }} {{ invoice.currency }}</p>
                        </div>

                    </div>

                    <!-- <img src="https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl={{route('orderDetailsInvoicePdf',['order_id' => $orderId,'provider_order_id' => $providerOrderId])}}" alt="QR Code"> -->

                    <img src="@/assets/imgs/icons/qr_code.png" alt="" class="qr_code">

                </div>

                <!-- **** Skeleton **** -->
                <div class="shadow-sm py-4" v-if="loading">
                    <Skeleton shape="circle" size="7rem" class="d-block mx-auto mb-4"></Skeleton>
                    <div class="invoice_item px-3 px-lg-5m px-md-4 py-4" :class="{ 'border-0': i == 3 }" v-for="i in 3" :key="i">

                        <div class="d-flex-between gap-3" :class="{ 'mb-3': i != 4 }" v-for="i in 4" :key="i">
                            <Skeleton height=".6rem" width="6rem"></Skeleton>
                            <Skeleton height=".6rem" width="6rem"></Skeleton>
                        </div>

                    </div>
                    <Skeleton height="7rem" width="7rem" class="d-block mx-auto mt-4"></Skeleton>
                </div>

            </div>
        </div>

    </div>
</template>
  
<script setup>
/******************* Import *******************/
import { computed, onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import axios from 'axios';
import responseApi from '@/components/shared/ResponseApi.js';
import Skeleton from "primevue/skeleton";

/******************* Data *******************/

// success response
const { response } = responseApi();

// route
const route = useRoute();

// invoices
const invoice = ref({});

// Loading
const loading = ref(false);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getInvoice
const getInvoice = async () => {
    loading.value = true;
    await axios.get(`providers/invoice-details/${invoiceId.value}`, config).then(res => {
        if (response(res) == "success") {
            invoice.value = res.data.data;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

/******************* Computed *******************/
const invoiceId = computed(() => {
    return route.params.id
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getInvoice();
});

</script>
  
<style lang="scss"></style>