<template>
    <!-- ***** Wallet ***** -->
    <div class="row mb-4 gy-4 align-items-center">
        <div class="col-lg-6">

            <div class="main-shadow rounded-3 bg-white pt-4" v-if="!loading">
                <img src="@/assets/imgs/login_logo.png" alt="" class="login_logo d-block mx-auto sm mb-2">

                <div class="invoice_item px-3 px-md-4 py-4">

                    <div class="d-flex-between gap-3 mb-2">
                        <p class="c-black">{{ $t('financails.totalOrders') }} :</p>
                        <p class="c-black"> {{ total_orders }} {{ orders[0] ? orders[0].currency : '' }}</p>
                    </div>

                    <div class="d-flex-between gap-3 mb-2">
                        <p class="c-black">{{ $t('financails.totalCommission') }} :</p>
                        <p class="c-black"> {{ total_commission }} {{ orders[0] ? orders[0].currency : '' }}</p>
                    </div>

                    <div class="d-flex-between gap-3">
                        <p class="c-black">{{ $t('financails.totalVat') }} :</p>
                        <p class="c-black"> {{ total_vat }} {{ orders[0] ? orders[0].currency : '' }}</p>
                    </div>

                </div>

                <div class="invoice_item px-3 px-md-4 mb-0 py-3 d-flex align-items-center gap-2">
                    <p class="c-black">{{ $t('financails.financialDues') }} :</p>
                    <p class="c-sec"> {{ financial_dues }} {{ orders[0] ? orders[0].currency : '' }}</p>
                </div>

            </div>

            <!-- **** Skeleton **** -->
            <div class="main-shadow rounded-3 bg-white pt-4" v-if="loading">
                <Skeleton shape="circle" size="7rem" class="d-block mx-auto mb-4"></Skeleton>
                <div class="invoice_item px-3 px-lg-5m px-md-4 py-4">

                    <div class="d-flex-between gap-3" :class="{ 'mb-3': i != 4 }" v-for="i in 4" :key="i">
                        <Skeleton height=".6rem" width="6rem"></Skeleton>
                        <Skeleton height=".6rem" width="6rem"></Skeleton>
                    </div>

                </div>
                <div class="invoice_item px-3 px-md-4 mb-0 py-4">
                    <Skeleton height=".6rem" width="12rem"></Skeleton>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <img src="@/assets/imgs/wallet.png" alt="" class="wallet_img d-block mx-auto">
        </div>
    </div>

    <!-- ***** Settlement Request ***** -->
    <button type="button" class="main-btn lg up mb-4 mx-auto" @click="settlementRequest"
        v-if="!loading && !('settlementDetailes').includes(route.name)">
        {{ $t('financails.settlementRequest') }}
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loadingBtn"></span>
    </button>

    <!-- ***** Skeleton Btn ***** -->
    <Skeleton height="3.2rem" width="10rem" class="mx-auto mb-4" v-if="loading"></Skeleton>

    <!--***** DataTable *****-->
    <DataTable :columns="columns" styleTable="table_main" :products="orders" :loading="loading"
        :tableSkeleton="new Array(columns.length)">
    </DataTable>
</template>

<script setup>
/******************* Import *******************/
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import Skeleton from 'primevue/skeleton';
import i18n from "@/i18n";
import axios from "axios";
import DataTable from "@/components/shared/DataTable/DataTable.vue";
import responseApi from '@/components/shared/ResponseApi.js';
import toastMsg from '@/components/shared/Toaster';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

const route = useRoute();

// loading
const loading = ref(false);

// loadingBtn
const loadingBtn = ref(false);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// columns
const columns = ref([
    {
        field: 'id',
        header: i18n.global.t('table.financials.number')
    },
    {
        field: 'order_num',
        header: i18n.global.t('table.orders.number')
    },
    {
        field: ['products_price', 'currency'],
        header: i18n.global.t('table.financials.purchases')
    },
    {
        field: ['admin_commission', 'currency'],
        header: i18n.global.t('table.financials.commission')
    },
    {
        field: ['vat_amount', 'currency'],
        header: i18n.global.t('table.financials.vat')
    },
    {
        field: ['final_total', 'currency'],
        header: i18n.global.t('table.financials.total')
    },
    {
        field: 'date',
        header: i18n.global.t('table.financials.date')
    }
]);

// orders
const orders = ref([]);

const total_orders = ref(0);
const total_commission = ref(0);
const total_vat = ref(0);
const financial_dues = ref(0);
/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    routeName: {
        type: String,
    }
});

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get(`${props.routeName}`, config).then(res => {
        if (response(res) == "success") {
            orders.value = res.data.data.orders.data;
            total_orders.value = res.data.data.total_orders;
            total_commission.value = res.data.data.total_commission;
            total_vat.value = res.data.data.total_vat;
            financial_dues.value = res.data.data.financial_dues;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// settlementRequest
const settlementRequest = async () => {
    loadingBtn.value = true;
    await axios.get('providers/settlement-request', config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
        } else{
            errorToast(res.data.msg);
        }
        loadingBtn.value = false;
    }).catch(err => console.log(err));
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});

</script>

<style lang="scss"></style>