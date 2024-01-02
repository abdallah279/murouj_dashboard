<template>
    <div class="row mb-4 gy-4">

        <!--***** Total Profit *****-->
        <div class="col-lg-4 col-sm-6">
            <HomeProfit :title="$t('profit.total')" :number="home.total_profit" :loading="loading" :currency="home.currency"
                :chart="require('@/assets/imgs/icons/bar_chart1.png')" />
        </div>

        <!--***** Today Profit *****-->
        <div class="col-lg-4 col-sm-6">
            <HomeProfit :title="$t('profit.today')" :number="home.today_profit" :loading="loading" :currency="home.currency"
                :chart="require('@/assets/imgs/icons/bar_chart2.png')" />
        </div>

    </div>

    <!--***** Chart *****-->
    <HomeChart />

    <!--***** Current Orders *****-->
    <div class="current_orders mt-4">
        <h3 class="fs15 c-black mb-4">الطلبات الحالية (30)</h3>
        <DataTable :columns="columns" :products="currentOrders" :loading="loading" :routeTable="routeTable"
            :tableSkeleton="new Array(columns.length)">
        </DataTable>
    </div>

    <!--***** Finished Orders *****-->
    <div class="finished_orders mt-4">
        <h3 class="fs15 c-black mb-4">الطلبات المنتهية (30)</h3>
        <DataTable :columns="columns" :products="finishedOrders" :loading="loading" :routeTable="routeTable"
            :tableSkeleton="new Array(columns.length)">
        </DataTable>
    </div>

    <!--***** Cancelled Orders *****-->
    <div class="cancelled_orders mt-4">
        <h3 class="fs15 c-black mb-4">الطلبات الملغاه (30)</h3>
        <DataTable :columns="newColumns" :products="cancelledOrders" :loading="loading" :routeTable="routeTable"
            :tableSkeleton="new Array(columns.length)">
        </DataTable>
    </div>

</template>

<script setup>

/******************* Import *******************/
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import i18n from "@/i18n";
import HomeProfit from '@/components/Home/HomeProfit.vue';
import HomeChart from '@/components/Home/HomeChart.vue';
import responseApi from '@/components/shared/ResponseApi.js';
import DataTable from "@/components/shared/DataTable.vue";

/******************* Data *******************/

// success response
const { response } = responseApi();

// Loading
const loading = ref(false);

// home
const home = ref({
    total_profit: 0,
    today_profit: 0,
    month_profit: [],
    currency: ''
});

// current
const currentOrders = ref([
    {
        "id": 8,
        "order_num": "20233",
        "user_name": "Lila Wehner",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 3106.9,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب ارجاع",
        "currency": "ر.س "
    },
    {
        "id": 10,
        "order_num": "20235",
        "user_name": "Lila Wehner",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 3005.28,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب شراء",
        "currency": "ر.س "
    },
    {
        "id": 9,
        "order_num": "20234",
        "user_name": "Vada Armstrong",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 7776.47,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب شراء",
        "currency": "ر.س "
    },
    {
        "id": 1,
        "order_num": "20231",
        "user_name": "Mrs. Lorna Moen DDS",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 7009.18,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب ارجاع",
        "currency": "ر.س "
    }
]);

// current
const finishedOrders = ref([
    {
        "id": 8,
        "order_num": "20233",
        "user_name": "Lila Wehner",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 3106.9,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب ارجاع",
        "currency": "ر.س "
    },
    {
        "id": 10,
        "order_num": "20235",
        "user_name": "Lila Wehner",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 3005.28,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب شراء",
        "currency": "ر.س "
    },
    {
        "id": 9,
        "order_num": "20234",
        "user_name": "Vada Armstrong",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 7776.47,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب شراء",
        "currency": "ر.س "
    },
    {
        "id": 1,
        "order_num": "20231",
        "user_name": "Mrs. Lorna Moen DDS",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 7009.18,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب ارجاع",
        "currency": "ر.س "
    }
]);

// current
const cancelledOrders = ref([
    {
        "id": 8,
        "order_num": "20233",
        "user_name": "Lila Wehner",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 3106.9,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب ارجاع",
        "currency": "ر.س "
    },
    {
        "id": 10,
        "order_num": "20235",
        "user_name": "Lila Wehner",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 3005.28,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب شراء",
        "currency": "ر.س "
    },
    {
        "id": 9,
        "order_num": "20234",
        "user_name": "Vada Armstrong",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 7776.47,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب شراء",
        "currency": "ر.س "
    },
    {
        "id": 1,
        "order_num": "20231",
        "user_name": "Mrs. Lorna Moen DDS",
        "date_and_time": "2023/11/07 - 02:20 am",
        "final_total": 7009.18,
        "status": 0,
        "status_text": "فى الانتظار",
        "order_type": "طلب ارجاع",
        "currency": "ر.س "
    }
]);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// columns
const columns = ref([
    {
        field: 'order_num',
        header: i18n.global.t('table.orders.number')
    },
    {
        field: ['order_type', 'line'],
        header: i18n.global.t('table.orders.type')
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
        field: ['status_text', 'line'],
        header: i18n.global.t('table.orders.status')
    }
]);

// route Table
const routeTable = ref({
    header: i18n.global.t('table.orders.detailes'),
    path: 'orderDetailes',
    id: 'id'
});

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get('providers/order-reports', config).then(res => {
        if (response(res) == "success") {
            home.total_profit = res.data.data.total_profit;
            home.today_profit = res.data.data.today_profit;
            home.month_profit = res.data.data.month_profit;
            currentOrders.value = res.data.data.current.data;
            finishedOrders.value = res.data.data.finished.data;
            cancelledOrders.value = res.data.data.cancelled.data;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

/******************* Computed *******************/
const newColumns = computed(() => {
    return columns.value.filter((column) => columns.value.indexOf(column) != 1);
});

/******************* Watch *******************/

/******************* Mounted *******************/

onMounted(async () => {
    // await getData();
    // console.log(columns.value.splice(2, 1));
});

</script>
  
<style></style>