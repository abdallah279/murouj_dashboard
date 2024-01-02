<template>
  <div class="row mb-4 gy-4">

    <!--***** Total Profit *****-->
    <div class="col-lg-4 col-sm-6">
      <HomeProfit :title="$t('profit.total')" :number="home.total_profit" :loading="loading" :currency="home.currency"
        :chart="require('@/assets/imgs/icons/bar_chart1.png')" />
    </div>

    <!--***** Today Profit *****-->
    <div class="col-lg-4 col-sm-6">
      <HomeProfit :title="$t('profit.today')" :number="home.today_profit" :loading="loading" :currency="home.currency"
        :chart="require('@/assets/imgs/icons/bar_chart2.png')" />
    </div>

  </div>

  <!--***** Chart *****-->
  <HomeChart />
</template>


<script setup>

/******************* Import *******************/
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import HomeProfit from '@/components/Home/HomeProfit.vue';
import HomeChart from '@/components/Home/HomeChart.vue';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Loading
const loading = ref(false);

// home
const home = ref({
  total_profit: 0,
  today_profit: 0,
  month_profit:[],
  currency: ''
});

// config
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
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

/******************* Watch *******************/

/******************* Mounted *******************/

onMounted(async () => {
  await getData();
});

</script>

<style></style>