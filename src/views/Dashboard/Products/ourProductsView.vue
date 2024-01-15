<template>
  <!--***** Page Top *****  -->
  <div class="page_top">
    <div class="page_filter">

      <!--***** Search Input *****-->
      <div class="main-input search">
        <input type="text" class="input-me" @keyup="searchProducts" v-model="searchText" :placeholder="$t('table.search')">
        <i class="pi pi-search main-icon"></i>
      </div>

      <span class="c-dark4">{{ $t('table.filter.text') }}</span>

      <!--***** Filter Select *****-->
      <div class="main-input filter">

        <Dropdown v-model="filter" @change="filterProducts" :placeholder="$t('table.filter.text')" :options="filterOptions" optionLabel="name"
          class="input-me">
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

  <!--****** Card Style *****-->
  <div class="card_style with_head">

    <PageHeader :title="$t('pagesTitle.ourProducts')" />

    <div class="p-4 pt-0">

      <!--***** Products *****-->
      <div v-if="!loading">
        <ProductCards :products="products" v-if="products.length" />
        <div class="no-data" v-else>
          <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
          <div class="no-data-text">{{ $t('noData.products') }}</div>
        </div>
      </div>

      <!--***** Skeleton *****-->
      <ProductSkeleton v-if="loading" />

    </div>

  </div>

  <!--***** Paginator *****-->
  <div v-if="showPaginate">
    <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4" dir="ltr" />
  </div>
</template>

<script setup>
/******************* Import *******************/
import { computed, onMounted, provide, ref } from "vue";
import PageHeader from '@/components/shared/PageHeader.vue';
import ProductCards from '@/components/Products/ProductsCards.vue';
import ProductSkeleton from '@/components/Products/ProductSkeleton.vue';
import i18n from "@/i18n";
import axios from 'axios';
import Paginator from 'primevue/paginator';
import Dropdown from 'primevue/dropdown';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Filter
const filter = ref('');
const filterOptions = ref([
  {
    id: 1,
    name: i18n.global.t('table.filter.option1'),
    text: "desc",
  },
  {
    id: 2,
    name: i18n.global.t('table.filter.option2'),
    text: "asc",
  },
]);

// Products
const products = ref([]);

// Loading
const loading = ref(false);

// searchText
const searchText = ref('');

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

// config
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

/******************* Provide && Inject *******************/
provide('view', true);

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
  loading.value = true;
  await axios.get(`providers/products?page=${currentPage.value}`, config).then(res => {
    if (response(res) == "success") {
      products.value = res.data.data.data;
      totalPage.value = res.data.data.pagination.total_items;
      pageLimit.value = res.data.data.pagination.per_page;
    }
    loading.value = false;
  }).catch(err => console.log(err));
}

// search Function
const searchProducts = async () => {
  // loading.value = true;
  await axios.get(`providers/filter-products?name=${searchText.value}`, config).then(res => {
    if (response(res) == "success") {
      products.value = res.data.data.data;
    }
    // loading.value = false;
  }).catch(err => console.log(err));
}

// Filter Function
const filterProducts = async () => {
  loading.value = true;
  await axios.get(`providers/filter-products?arrangemant=${filter.value.text}`, config).then(res => {
    if (response(res) == "success") {
      products.value = res.data.data.data;
    }
    loading.value = false;
  }).catch(err => console.log(err));
}

// Paginate Function
const onPaginate = (e) => {
  loading.value = true;
  currentPage.value = e.page + 1;
  window.scrollTo(0, 0);
  getData();
};

/******************* Computed *******************/

let showPaginate = computed(() => {
  return totalPage.value > pageLimit.value
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
  await getData();
});

</script>

<style lang="scss"></style>