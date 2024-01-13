<template>
    <!--***** Page Top *****  -->
    <div class="page_top">
        <div class="page_filter">

            <!--***** Filter Products *****-->
            <!-- <div class="main-input w300">

                <MultiSelect v-model="productSelected" :options="products" filter optionLabel="product_name"
                    :placeholder="$t('table.filter.product')" display="chip" class="w-100 h50" />
                <i class="pi pi-angle-down main-icon"></i>

            </div> -->

            <!--***** Search Input *****-->
            <div class="main-input w300">
                <input type="text" class="input-me" v-model="filters['global'].value" :placeholder="$t('table.search')">
                <i class="pi pi-search main-icon"></i>
            </div>
        </div>

    </div>

    <!--***** DataTable *****-->
    <DataTable @updateType="updateType" @updateProduct="updateProductQuantity" :columns="columns" :filters="filters"
        :products="products" :loading="loading" :selectTable="selectTable" :quantity="true"
        :tableSkeleton="new Array(columns.length)">
    </DataTable>

    <button class="main-btn up login lg mt-4" @click="setProducts">{{ $t('formBtns.confirm') }}</button>
</template>

<script setup>
/******************* Import *******************/
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import DataTable from "@/components/shared/DataTable/DataTable.vue";
import responseApi from '@/components/shared/ResponseApi.js';
import MultiSelect from 'primevue/multiselect';
import i18n from "@/i18n";
import axios from "axios";
import { FilterMatchMode } from 'primevue/api';
import toastMsg from '@/components/shared/Toaster';

/******************* Data *******************/
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
    }
]);

// products
const productSelected = ref([]);
const products = ref([]);

// choosed product
const choosedProducts = ref([]);

// finished products
const finishedProducts = ref([]);

// select Table
const selectTable = ref({
    header: i18n.global.t('table.products.select'),
    id: 'id'
});

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
    // finishedProducts.value = [];
    // productSelected.value.forEach(productS => {
    //     let founded = choosedProducts.value.find(product => product.id == productS.product_id);
    //     if (founded) {
    //         finishedProducts.value.push(founded)
    //     }
    // })
    if (choosedProducts.value.length == 0) {
        errorToast(i18n.global.t('order.noProductSelected'));
    } else{
        localStorage.setItem('products', JSON.stringify(choosedProducts.value));
        router.push({ name: 'createProvideOrders' });
    }
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});

</script>

<style lang="scss"></style>