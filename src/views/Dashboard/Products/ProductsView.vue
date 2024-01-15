<template>
    <!--***** Page Top *****  -->
    <div class="page_top">
        <div class="page_filter">

            <!--***** Search Input *****-->
            <div class="main-input search">
                <input type="text" class="input-me" v-model="filters['global'].value" :placeholder="$t('table.search')">
                <i class="pi pi-search main-icon"></i>
            </div>

            <span class="c-dark4">{{ $t('table.filter.text') }}</span>

            <!--***** Filter Select *****-->
            <div class="main-input filter">

                <Dropdown v-model="filter" :placeholder="$t('table.filter.text')" @change="filterProducts"
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
        <router-link to="/createProvideOrders" class="main-btn up">{{ $t('table.products.btn') }}</router-link>

    </div>

    <!--***** DataTable *****-->
    <DataTable :columns="columns" :pageLimit="pageLimit" :totalPage="totalPage" @paginateNum="onPaginate" :products="products" :filters="filters" :loading="loading" :routeTable="routeTable"
        :tableSkeleton="new Array(columns.length)">
    </DataTable>
</template>

<script setup>
/******************* Import *******************/
import { onMounted, ref } from "vue";
import DataTable from "@/components/shared/DataTable/DataTable.vue";
import responseApi from '@/components/shared/ResponseApi.js';
import Dropdown from 'primevue/dropdown';
import i18n from "@/i18n";
import axios from "axios";
import { FilterMatchMode } from 'primevue/api';

/******************* Data *******************/
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// success response
const { response } = responseApi();

// loading
const loading = ref(false);

// Filter
const filter = ref('');
const filterOptions = ref([
    {
        name: i18n.global.t('table.filter.option1'),
        id: 1,
        text: "desc"
    },
    {
        name: i18n.global.t('table.filter.option2'),
        id: 2,
        text: "asc"
    },
]);

// Paginator
const pageLimit = ref();
const totalPage = ref();

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// columns
const columns = ref([
    {
        field: 'product_id',
        header: i18n.global.t('table.products.number')
    },
    {
        field: ['product_image', 'product_name'].toString(),
        header: i18n.global.t('table.products.name')
    },
    {
        field: ['product_price_after_discount', 'product_price', 'currency'].toString(),
        header: i18n.global.t('table.products.price')
    },
    {
        field: 'product_category',
        header: i18n.global.t('table.products.category')
    },
    {
        field: ['quantity', 'is_available_text', 'line'].toString(),
        header: i18n.global.t('table.products.quantity')
    }
]);

// products
const products = ref([]);

// route Table
const routeTable = ref({
    header: i18n.global.t('table.products.detailes'),
    path: 'productDetailes',
    id: 'product_id'
})
/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async (count = 1) => {
    loading.value = true;
    await axios.get(`providers/provider-products?page=${count}`, config).then(res => {
        if (response(res) == "success") {
            products.value = res.data.data.data;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// filterProducts
const filterProducts = async () => {
    loading.value = true;
    await axios.get(`providers/provider-products?arrangemant=${filter.value.text}`, config).then(res => {
        if (response(res) == "success") {
            products.value = res.data.data.data;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// onPaginate
const onPaginate = async (value) => {
    await getData(value);
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});

</script>

<style lang="scss"></style>