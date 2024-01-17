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
import { computed, onMounted, ref } from "vue";
import InvoiceCards from "@/components/Invoices/InvoiceCards.vue";
import InvoiceSkeleton from "@/components/Invoices/InvoiceSkeleton.vue";
import axios from 'axios';
import Paginator from 'primevue/paginator';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// invoices
const invoices = ref([]);

// Loading
const loading = ref(false);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('muroujDashToken')}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get(`providers/invoices?page=${currentPage.value}`, config).then(res => {
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

let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});

</script>
  
<style lang="scss"></style>