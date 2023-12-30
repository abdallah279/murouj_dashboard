<template>
  <!--***** Page Top *****  -->
  <div class="page_top">
    <div class="page_filter">

      <!--***** Search Input *****-->
      <div class="main-input search">
        <input type="text" class="input-me" :placeholder="$t('table.search')">
        <i class="pi pi-search main-icon"></i>
      </div>

      <span class="c-dark4">{{ $t('table.filter.text') }}</span>

      <!--***** Filter Select *****-->
      <div class="main-input filter">

        <Dropdown v-model="filter" :placeholder="$t('table.filter.text')" :options="filterOptions" optionLabel="name"
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
    <router-link to="/" class="main-btn up">{{ $t('table.products.btn') }}</router-link>

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
    name: i18n.global.t('table.filter.option1'),
    id: 1
  },
  {
    name: i18n.global.t('table.filter.option2'),
    id: 2
  },
]);

// Products
const products = ref([
  {
    id: 1,
    product_name: 'test',
    product_image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 1,
    product_name: 'photos',
    product_image: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 1,
    product_name: 'pexels',
    product_image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 1,
    product_name: 'compress',
    product_image: 'https://images.pexels.com/photos/3373740/pexels-photo-3373740.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 1,
    product_name: 'pexels',
    product_image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 1,
    product_name: 'compress',
    product_image: 'https://images.pexels.com/photos/3373740/pexels-photo-3373740.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 1,
    product_name: 'test',
    product_image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 1,
    product_name: 'photos',
    product_image: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]);

// Loading
const loading = ref(false);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

/******************* Provide && Inject *******************/
provide('view', true);

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
  loading.value = true;
  await axios.get(`providers/provider-products?page=${currentPage.value}`, config.value).then(res => {
    if (response(res) == "success") {
      products.value = res.data.data.data;
      totalPage.value = res.data.data.pagination.total_items;
      pageLimit.value = res.data.data.pagination.per_page;
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
const config = computed(() => {
  return localStorage.getItem('token') ? {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  } : {}
});

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