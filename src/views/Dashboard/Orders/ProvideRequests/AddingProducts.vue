<template>
    <!--***** Page Top *****  -->
    <div class="page_top">
        <div class="page_filter">

            <!--***** Search Input *****-->
            <div class="main-input w300">
                <input type="text" class="input-me" v-model="filters['global'].value" :placeholder="$t('table.search')">
                <i class="pi pi-search main-icon"></i>
            </div>
        </div>

    </div>

    <!--***** DataTable *****-->
    <DataTable :pageLimit="pageLimit" :totalPage="totalPage" @paginateNum="onPaginate" @updateType="updateType" @updateProduct="updateProductQuantity" :columns="columns" :filters="filters"
        :products="products" :loading="loading" :selectTable="selectTable" :quantity="true"
        :tableSkeleton="new Array(columns.length)">
    </DataTable>

    <button class="main-btn up login lg mt-4" @click="setProducts">{{ $t('formBtns.confirm') }}</button>
</template>

<script setup>
/******************* Import *******************/
import { computed, onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import DataTable from "@/components/shared/DataTable/DataTable.vue";
import responseApi from '@/components/shared/ResponseApi.js';
import i18n from "@/i18n";
import axios from "axios";
import { FilterMatchMode } from 'primevue/api';
import toastMsg from '@/components/shared/Toaster';
import { useStore } from 'vuex';


/******************* Data *******************/

// Store
const store = useStore();

// Filter
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// success response
const { response } = responseApi();

// Toast
const { errorToast } = toastMsg();

// loading
const loading = ref(false);

// router
const router = useRouter();

// Paginator
const pageLimit = ref();
const totalPage = ref();


// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('muroujDashToken')}` }
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
        field: ['product_price_after_discount', 'product_price', 'currency'].toString(),
        header: i18n.global.t('table.products.price')
    },
    {
        field: 'product_category',
        header: i18n.global.t('table.products.category')
    }
]);

// products
const products = ref([]);

// choosed product
const choosedProducts = ref([]);

// select Table
const selectTable = ref({
    header: i18n.global.t('table.products.select'),
    id: 'id'
});

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getData
const getData = async (count = 1) => {
    loading.value = true;
    await axios.get(`providers/products?sub_category_id=${sub_category.value}&page=${count}`, config).then(res => {
        if (response(res) == "success") {
            products.value = res.data.data.data;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// updateProductQuantity
const updateProductQuantity = (data) => {
    let product = choosedProducts.value.find(product => product.id == data.id);
    if (product) {
        choosedProducts.value[choosedProducts.value.indexOf(product)].qty = data.qty
    } else {
        choosedProducts.value.push({ ...data, unit_id: 1 })
    }
}

// updateType
const updateType = (data) => {
    let product = choosedProducts.value.find(product => product.id == data.id);
    if (product) {
        choosedProducts.value[choosedProducts.value.indexOf(product)].unit_id = data.unit_id
    } else {
        choosedProducts.value.push({ ...data, qty: 1 })
    }
}

// setProducts
const setProducts = () => {
    if (choosedProducts.value.length == 0) {
        errorToast(i18n.global.t('order.noProductSelected'));
    } else{
        localStorage.setItem('products', JSON.stringify(choosedProducts.value));
        router.push({ name: 'createProvideOrders' });
    }
}

// onPaginate
const onPaginate = async (value) => {
    await getData(value);
}

/******************* Computed *******************/
const sub_category = computed(() => {
    if(store.state.proSubCategory){
        return store.state.proSubCategory.id
    } else{
        return ''
    }
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});

</script>

<style lang="scss"></style>