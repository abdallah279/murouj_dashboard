<template>
  <main class="home">

    <div class="row mb-4 gy-4">

      <!--***** Total Profit *****-->
      <div class="col-lg-4 col-sm-6">
        <HomeProfit :title="$t('profit.total')" :number="home.total_profit"
          :chart="require('@/assets/imgs/icons/bar_chart1.png')" />
      </div>

      <!--***** Today Profit *****-->
      <div class="col-lg-4 col-sm-6">
        <HomeProfit :title="$t('profit.today')" :number="home.today_profit"
          :chart="require('@/assets/imgs/icons/bar_chart2.png')" />
      </div>

    </div>

    <!--***** Chart *****-->
    <HomeChart />

  </main>
</template>


<script setup>

/******************* Import *******************/
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import i18n from "@/i18n";
import HomeProfit from '@/components/Home/HomeProfit.vue';
import HomeChart from '@/components/Home/HomeChart.vue';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Route
const route = useRoute();

// authed
const authed = ref(false);

// Loading
const loading = ref(false);

// home
const home = ref({
  total_profit: 39.000,
  today_profit: 39.000,
});

// config
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// checkAuth
const checkAuth = () => {
  localStorage.getItem('token') ? authed.value = true : authed.value = false;
}

// getData
const getData = async () => {
  loading.value = true;
  await axios.get('providers/home', config).then(res => {
    if (response(res) == "success") {
      home.value = res.data.data;
    }
    loading.value = false;
  }).catch(err => console.log(err));
}

/******************* Computed *******************/

// const config = computed(() => {
//   return localStorage.getItem('token') ? {
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//   } : {}
// });

/******************* Watch *******************/

// watch(route, () => {
//   checkAuth();
// });

/******************* Mounted *******************/

// onMounted(async () => {
//   await getData();
// });

</script>

<style></style>