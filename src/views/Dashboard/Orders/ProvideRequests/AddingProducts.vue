<template>
    <!--***** Page Top *****  -->
    <div class="page_top">
        <div class="page_filter">

            <!--***** Filter Products *****-->
            <div class="main-input w350">

                <MultiSelect v-model="productSelected" :options="products" filter optionLabel="product_name"
                    :placeholder="$t('table.filter.text')" display="chip" class="w-100 h50" />
                <i class="pi pi-angle-down main-icon"></i>

            </div>
        </div>

    </div>

    <!--***** DataTable *****-->
    <DataTable :columns="columns" :products="productSelected" :loading="loading" :selectTable="selectTable"
        :tableSkeleton="new Array(columns.length)">
    </DataTable>
</template>

<script setup>
/******************* Import *******************/
import { onMounted, ref } from "vue";
import DataTable from "@/components/shared/DataTable.vue";
import responseApi from '@/components/shared/ResponseApi.js';
import MultiSelect from 'primevue/multiselect';
import i18n from "@/i18n";
import axios from "axios";

/******************* Data *******************/
// success response
const { response } = responseApi();

// loading
const loading = ref(false);

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
        field: ['product_image', 'product_name'],
        header: i18n.global.t('table.products.name')
    },
    {
        field: ['product_price_after_discount', 'product_price', 'currency'],
        header: i18n.global.t('table.products.price')
    },
    {
        field: 'product_category',
        header: i18n.global.t('table.products.category')
    }
]);

// products
const productSelected = ref([]);
const products = ref([]);

// route Table
const selectTable = ref({
    header: 'نوع الكمية',
    path: 'productDetailes',
    id: 'product_id'
})
/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get('providers/provider-products', config).then(res => {
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

<style lang="scss"></style>