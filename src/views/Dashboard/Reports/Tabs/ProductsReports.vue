<template>
    <!--***** Current Orders *****-->
    <div class="report_products mt-4">
        
        <!--***** Page Top *****  -->
        <div class="page_top">
            <h3 class="fs15 c-black">{{ $t('reports.products') }} ({{ productsCount }})</h3>

            <!--***** Filter Select *****-->
            <div class="main-input filter sm card-shadow">

                <Dropdown v-model="filter" @change="updateFilter" :placeholder="$t('table.filter.text')"
                    :options="filterOptions" optionLabel="name" class="input-me">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="selected">
                            <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="option">
                            <div>
                                {{ slotProps.option.name }}
                            </div>
                        </div>
                    </template>
                </Dropdown>

                <i class="pi pi-angle-down main-icon"></i>

            </div>

        </div>

        <!--***** DataTable *****-->
        <DataTable :columns="columns" :products="products" :pageLimit="pageLimit" :totalPage="totalPage" @paginateNum="onPaginate" :loading="loading" :routeTable="routeTable"
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
import Dropdown from 'primevue/dropdown';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Filter
const filter = ref('');
const filterOptions = ref([
    {
        id: 1,
        name: i18n.global.t('table.filter.3Dates'),
        number: "3",
    },
    {
        id: 1,
        name: i18n.global.t('table.filter.6Dates'),
        number: "6",
    },
    {
        id: 1,
        name: i18n.global.t('table.filter.9Dates'),
        number: "9",
    },
    {
        id: 1,
        name: i18n.global.t('table.filter.12Dates'),
        number: "12",
    }
]);

// Loading
const loading = ref(false);

// products
const products = ref([]);

// Paginator
const pageLimit = ref();
const totalPage = ref();

// productsCount
const productsCount = ref(0);

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
        field: ['image', 'name'].toString(),
        header: i18n.global.t('table.products.name')
    },
    {
        field: ['price_after_discount', 'price', 'currency'].toString(),
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
        field: ['total_selling', 'currency'].toString(),
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
const getData = async (date, count = 1) => {
    loading.value = true;

    let url = 'providers/most-selling-reports';
    if (date) {
        url += `?month=${date}`;
    }

    if (count) {
        url += `?page=${count}`;
    }

    await axios.get(url, config).then(res => {
        if (response(res) == "success") {
            products.value = res.data.data.data;
            productsCount.value = products.value.length;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// updateFilter
const updateFilter = async () => {
  await getData(filter.value.number);
}

// onPaginate
const onPaginate = async (value) => {
    await getData(filter.value.number , value);
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

onMounted(async () => {
    await getData();
});

</script>
  
<style></style>