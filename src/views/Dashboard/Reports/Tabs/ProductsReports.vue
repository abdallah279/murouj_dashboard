<template>
    <!--***** Current Orders *****-->
    <div class="report_products mt-4">
        <h3 class="fs15 c-black mb-4">المنتجات الأكثر مبيعا (30)</h3>
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
import DataTable from "@/components/shared/DataTable.vue";

/******************* Data *******************/

// success response
const { response } = responseApi();

// Loading
const loading = ref(false);

// products
const products = ref([
    {
        "id": 2,
        "name": "فطاير جبن",
        "image": require('@/assets/imgs/product_img.png'),
        "category": "معجنات",
        "price": 15,
        "price_after_discount": 13,
        "has_discount": true,
        "currency": "ر.س ",
        "count_selling": 2,
        "total_selling": 80
    },
    {
        "id": 1,
        "name": "بيتزا",
        "image": require('@/assets/imgs/product_img.png'),
        "category": "معجنات",
        "price": 20,
        "price_after_discount": 0,
        "has_discount": true,
        "currency": "ر.س ",
        "count_selling": 0,
        "total_selling": 0
    }
]);

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
        header: 'عدد مرات البيع'
    },
    {
        field: ['total_selling', 'currency'],
        header: 'اجمالي بيع المنتج'
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
    // await getData();
});

</script>
  
<style></style>