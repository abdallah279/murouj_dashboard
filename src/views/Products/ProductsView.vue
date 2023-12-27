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

                <Dropdown v-model="filter" :placeholder="$t('table.filter.text')" :options="filterOptions"
                    optionLabel="name" class="input-me">
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
        <router-link to="/" class="main-btn up">{{ $t('table.products.btn') }}</router-link>

    </div>

    <!--***** DataTable *****-->
    <DataTable :columns="columns" :products="products" :filters="filters" :loading="loading" :routeTable="routeTable"
        :tableSkeleton="new Array(columns.length)">
    </DataTable>
</template>

<script setup>
/******************* Import *******************/
import { ref } from "vue";
import DataTable from "@/components/shared/DataTable.vue";
import responseApi from '@/components/shared/ResponseApi.js';
import Dropdown from 'primevue/dropdown';
import i18n from "@/i18n";
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
        id: 1
    },
    {
        name: i18n.global.t('table.filter.option2'),
        id: 2
    },
]);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

const columns = ref([
    {
        field: 'product_id',
        header: i18n.global.t('table.products.number')
    },
    {
        field: ['product_image', 'product_name'],
        header: i18n.global.t('table.products.name')
    },
    {
        field: ['product_price', 'product_price_after_discount', 'currency'],
        header: i18n.global.t('table.products.price')
    },
    {
        field: 'product_category',
        header: i18n.global.t('table.products.category')
    },
    {
        field: ['quantity', 'is_available', 'line'],
        header: i18n.global.t('table.products.quantity')
    }
]);

// products
const products = ref([
    {
        product_id: '1987',
        product_name: 'بيتزا للميكرويف ',
        product_image: require('@/assets/imgs/profile_img.jpg'),
        product_price: '2395',
        product_price_after_discount: '23',
        product_category: 'كرواسون',
        number: '2395',
        is_available: 'متوفر',
        quantity: '50',
        currency: 'ر.س'
    },
    {
        product_id: '107',
        product_name: 'بيتزا للميكرويف ',
        product_image: require('@/assets/imgs/profile.png'),
        product_price: '2395',
        product_price_after_discount: '23',
        product_category: 'كرواسون',
        number: '2395',
        is_available: 'متوفر',
        quantity: '50',
        currency: 'ر.س'
    },
    {
        product_id: '17',
        product_name: 'بيتزا للميكرويف ',
        product_image: require('@/assets/imgs/profile_img.jpg'),
        product_price: '2395',
        product_price_after_discount: '23',
        product_category: 'كرواسون',
        number: '2395',
        is_available: 'متوفر',
        quantity: '50',
        currency: 'ر.س'
    },
    {
        product_id: '87',
        product_name: 'بيتزا للميكرويف ',
        product_image: require('@/assets/imgs/profile.png'),
        product_price: '2395',
        product_price_after_discount: '23',
        product_category: 'كرواسون',
        number: '2395',
        is_available: 'متوفر',
        quantity: '50',
        currency: 'ر.س'
    },
]);

// route Table
const routeTable = ref({
    header: i18n.global.t('table.products.detailes'),
    path: 'productDetailes'
})
/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>