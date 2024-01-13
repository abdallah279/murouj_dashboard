<template>
    <!--***** Current Orders *****-->
    <div class="report_products mt-4">
        <h3 class="fs15 c-black mb-4">{{ $t('reports.products') }} (30)</h3>
        <DataTable :columns="columns" :products="products" :loading="loading" :routeTable="routeTable"
            :tableSkeleton="new Array(columns.length)">
        </DataTable>
    </div>
</template>

<script setup>

/******************* Import *******************/
import { onMounted, ref } from 'vue';
import axios from 'axios';
import i18n from "@/i18n";
import responseApi from '@/components/shared/ResponseApi.js';
import DataTable from "@/components/shared/DataTable/DataTable.vue";

/******************* Data *******************/

// success response
const { response } = responseApi();

// Loading
const loading = ref(false);

// products
const products = ref([]);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// columns
const columns = ref([
    {
        field: 'id',
        header: i18n.global.t('table.products.number')
    },
    {
        field: ['image', 'name'],
        header: i18n.global.t('table.products.name')
    },
    {
        field: ['price_after_discount', 'price', 'currency'],
        header: i18n.global.t('table.products.price')
    },
    {
        field: 'category',
        header: i18n.global.t('table.products.category')
    },
    {
        field: 'count_selling',
        header: i18n.global.t('table.products.count_selling')
    },
    {
        field: ['total_selling', 'currency'],
        header: i18n.global.t('table.products.total_selling')
    }
]);

// route Table
const routeTable = ref({
    header: i18n.global.t('table.products.detailes'),
    path: 'productDetailes',
    id: 'id'
})

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get('providers/most-selling-reports', config).then(res => {
        if (response(res) == "success") {
            products.value = res.data.data.data;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

onMounted(async () => {
    await getData();
});

</script>
  
<style></style>