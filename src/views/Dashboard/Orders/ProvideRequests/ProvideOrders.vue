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
        <router-link to="/createProvideOrders" class="main-btn up">{{ $t('table.provideProducts.btn') }}</router-link>

    </div>

    <!--***** DataTable *****-->
    <DataTable :columns="columns" :products="orders" :paginator="false" :filters="filters" :loading="loading" :routeTable="routeTable"
        :tableSkeleton="new Array(columns.length + 1)">
    </DataTable>
</template>

<script setup>
/******************* Import *******************/
import { onMounted, ref } from "vue";
import DataTable from "@/components/shared/DataTable/DataTable.vue";
import axios from "axios";
import Dropdown from 'primevue/dropdown';
import i18n from "@/i18n";
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';
import { FilterMatchMode } from 'primevue/api';

/******************* Data *******************/
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// success response
const { response } = responseApi();

// Toast
const { errorToast } = toastMsg();

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

// loading
const loading = ref(false);

// columns
const columns = ref([
    {
        field: 'id',
        header: i18n.global.t('table.provideProducts.number')
    },
    {
        field: 'product_request_type',
        header: i18n.global.t('table.provideProducts.type')
    },
    {
        field: 'sub_category',
        header: i18n.global.t('table.provideProducts.sub_category')
    },
    {
        field: 'status_text',
        header: i18n.global.t('table.provideProducts.status_text')
    },
]);

// products
const orders = ref([]);

// Paginator
const pageLimit = ref();
const totalPage = ref();


// route Table
const routeTable = ref({
    header: i18n.global.t('table.orders.detailes'),
    path: 'provideOrdersDetailes',
    id: 'id'
});

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getOrders
const getOrders = async () => {
    loading.value = true;
    await axios.get(`providers/provider-product-requests`, config).then(res => {
        if (response(res) == "success") {
            orders.value = res.data.data;
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}
/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getOrders();
});

</script>

<style lang="scss"></style>