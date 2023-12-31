<template>
    <!--***** DataTable *****-->
    <DataTable :columns="columns" :products="orders" :loading="loading" :routeTable="routeTable"
        :tableSkeleton="new Array(columns.length)">
    </DataTable>
</template>

<script setup>
/******************* Import *******************/
import { onMounted, ref } from "vue";
import DataTable from "@/components/shared/DataTable.vue";
import axios from "axios";
import i18n from "@/i18n";
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { errorToast } = toastMsg();

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// loading
const loading = ref(false);

// columns
const columns = ref([
    {
        field: 'order_num',
        header: i18n.global.t('table.orders.number')
    },
    {
        field: 'user_name',
        header: i18n.global.t('table.orders.name')
    },
    {
        field: 'date_and_time',
        header: i18n.global.t('table.orders.time')
    },
    {
        field: ['final_total', 'currency'],
        header: i18n.global.t('table.orders.price')
    },
    {
        field: ['delivery_type', 'line'],
        header: i18n.global.t('table.orders.delivery')
    },
    {
        field: ['status_text', 'line'],
        header: i18n.global.t('table.orders.status')
    }
]);

// products
const orders = ref([]);

// route Table
const routeTable = ref({
    header: i18n.global.t('table.orders.detailes'),
    path: 'orderDetailes',
    id: 'id'
});

/******************* Provide && Inject *******************/

/******************* Props *******************/

const props = defineProps({
    ordersName: {
        type: String,
        required: true
    },
    showDelivery: {
        type: Boolean,
        default: true
    }
});

/******************* Methods *******************/

// getOrders
const getOrders = async () => {
    loading.value = true;
    await axios.get(`providers/${props.ordersName}`, config).then(res => {
        if (response(res) == "success") {
            orders.value = res.data.data.orders.data;
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// Show Delevery
const showDelivery = () => {
    !props.showDelivery ? columns.value.splice(4, 1) : false;
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getOrders();
    showDelivery();
});

</script>

<style lang="scss"></style>