<template>
    <div class="row mb-4 gy-4">

        <!--***** Total Profit *****-->
        <div class="col-lg-4 col-sm-6">
            <HomeProfit :title="$t('profit.total')" :number="total_profit" :loading="loading" :currency="currency"
                :chart="require('@/assets/imgs/icons/bar_chart1.png')" />
        </div>

        <!--***** Today Profit *****-->
        <div class="col-lg-4 col-sm-6">
            <HomeProfit :title="$t('profit.today')" :number="today_profit" :loading="loading" :currency="currency"
                :chart="require('@/assets/imgs/icons/bar_chart2.png')" />
        </div>

    </div>

    <!--***** Chart *****-->
    <HomeChart :chartData="month_profit" :loading="loading" @updateFilter="updateFilter" />

    <!--***** Current Orders *****-->
    <div class="current_orders mt-4">
        <h3 class="fs15 c-black mb-4">{{ $t('reports.orders.current') }} ({{ currentCount }})</h3>
        <DataTable :columns="columns" :paginator="false" :products="currentOrders" :loading="loading" :routeTable="routeTable"
            :tableSkeleton="new Array(columns.length)">
        </DataTable>
    </div>

    <!--***** Finished Orders *****-->
    <div class="finished_orders mt-5">
        <h3 class="fs15 c-black mb-4">{{ $t('reports.orders.finished') }} ({{ finishedCount }})</h3>
        <DataTable :columns="columns" :paginator="false" :products="finishedOrders" :loading="loading" :routeTable="routeTable"
            :tableSkeleton="new Array(columns.length)">
        </DataTable>
    </div>

    <!--***** Cancelled Orders *****-->
    <div class="cancelled_orders mt-5">
        <h3 class="fs15 c-black mb-4">{{ $t('reports.orders.canceled') }} ({{ cancelledCount }})</h3>
        <DataTable :columns="newColumns" :paginator="false" :products="cancelledOrders" :loading="loading" :routeTable="routeTable"
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
import DataTable from "@/components/shared/DataTable/DataTable.vue";

/******************* Data *******************/

// success response
const { response } = responseApi();

// Loading
const loading = ref(false);

// home
const total_profit = ref(0);
const today_profit = ref(0);
const month_profit = ref([]);
const currency = ref('');


// current
const currentOrders = ref([]);
const currentCount = ref(0);

// finished
const finishedOrders = ref([]);
const finishedCount = ref(0);

// cancelled
const cancelledOrders = ref([]);
const cancelledCount = ref(0);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('muroujDashToken')}` }
};

// columns
const columns = ref([
    {
        field: 'order_num',
        header: i18n.global.t('table.orders.number')
    },
    {
        field: ['order_type', 'line'].toString(),
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
        field: ['final_total', 'currency'].toString(),
        header: i18n.global.t('table.orders.price')
    },
    {
        field: ['status_text', 'line'].toString(),
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
const getData = async (date) => {
    loading.value = true;

    let url = 'providers/order-reports';
    if (date) {
        url += `?month=${date}`;
    }

    await axios.get(url, config).then(res => {
        if (response(res) == "success") {
            total_profit.value = res.data.data.total_profit;
            today_profit.value = res.data.data.today_profit;
            month_profit.value = res.data.data.month_profit;
            currency.value = res.data.data.currency;

            currentOrders.value = res.data.data.current.data;
            currentCount.value = currentOrders.value.length;

            finishedOrders.value = res.data.data.finished.data;
            finishedCount.value = finishedOrders.value.length;

            cancelledOrders.value = res.data.data.cancelled.data;
            cancelledCount.value = cancelledOrders.value.length;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// updateFilter
const updateFilter = async (date) => {
  await getData(date);
}

/******************* Computed *******************/
const newColumns = computed(() => {
    return columns.value.filter((column) => columns.value.indexOf(column) != 1);
});

/******************* Watch *******************/

/******************* Mounted *******************/

onMounted(async () => {
    await getData();
});

</script>
  
<style></style>