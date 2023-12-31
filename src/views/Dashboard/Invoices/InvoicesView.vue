<template>
    <!--****** Card Style *****-->
    <div class="card_style py-5 px-lg-5">

        <div class="row">
            <div class="col-xl-11 mx-auto">

                <!--***** Invoices *****-->
                <div v-if="!loading">

                    <!--***** Invoice Cards *****-->
                    <InvoiceCards :invoices="invoices" v-if="invoices.length" />

                    <div class="no-data" v-else>
                        <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
                        <div class="no-data-text">{{ $t('noData.invoices') }}</div>
                    </div>
                </div>

                <!--***** Skeleton *****-->
                <InvoiceSkeleton v-if="loading" />

            </div>
        </div>

    </div>

    <!--***** Paginator *****-->
    <div v-if="showPaginate">
        <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4" dir="ltr" />
    </div>
</template>
  
<script setup>
/******************* Import *******************/
import { computed, ref } from "vue";
import InvoiceCards from "@/components/Invoices/InvoiceCards.vue";
import InvoiceSkeleton from "@/components/Invoices/InvoiceSkeleton.vue";
import axios from 'axios';
import Paginator from 'primevue/paginator';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// invoices
const invoices = ref([

    {
        "id": 38,
        "invoice_num": "20233838",
        "order_num": "202338",
        "date": "30/12/2023",
        "vat_amount": "0.00",
        "final_total": "2354.00",
        "currency": "ر.س "
    },
    {
        "id": 36,
        "invoice_num": "20233636",
        "order_num": "202336",
        "date": "30/12/2023",
        "vat_amount": "369.60",
        "final_total": "2843.60",
        "currency": "ر.س "
    },
    {
        "id": 32,
        "invoice_num": "20233232",
        "order_num": "202332",
        "date": "30/12/2023",
        "vat_amount": "462.00",
        "final_total": "3552.00",
        "currency": "ر.س "
    },
    {
        "id": 28,
        "invoice_num": "20232828",
        "order_num": "202328",
        "date": "30/12/2023",
        "vat_amount": "84.90",
        "final_total": "660.90",
        "currency": "ر.س "
    },
    {
        "id": 22,
        "invoice_num": "20232222",
        "order_num": "202322",
        "date": "30/12/2023",
        "vat_amount": "92.40",
        "final_total": "718.40",
        "currency": "ر.س "
    }
]);

// Loading
const loading = ref(false);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get(`providers/invoices?page=${currentPage.value}`, config.value).then(res => {
        if (response(res) == "success") {
            invoices.value = res.data.data.data;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// Paginate Function
const onPaginate = (e) => {
    loading.value = true;
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    getData();
};

/******************* Computed *******************/
const config = computed(() => {
    return localStorage.getItem('token') ? {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    } : {}
});

let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});

/******************* Watch *******************/

/******************* Mounted *******************/
// onMounted(async () => {
//     await getData();
// });

</script>
  
<style lang="scss"></style>