<template>
  <div class="row mb-4 gy-4">

    <!--***** Total Profit *****-->
    <div class="col-lg-4 col-sm-6">
      <HomeProfit :title="$t('profit.total')" :number="total_profit" :loading="loading" :currency="currency"
        :chart="require('@/assets/imgs/icons/bar_chart1.png')" />
    </div>

    <!--***** Today Profit *****-->
    <div class="col-lg-4 col-sm-6">
      <HomeProfit :title="$t('profit.today')" :number="today_profit" :loading="loading" :currency="currency"
        :chart="require('@/assets/imgs/icons/bar_chart2.png')" />
    </div>

  </div>

  <!--***** Chart *****-->
  <HomeChart :chartData="month_profit" :loading="loading" @updateFilter="updateFilter" />
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

// Data
const total_profit = ref(0);
const today_profit = ref(0);
const currency = ref('');

// month_profit
const month_profit = ref([]);

// config
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async (date) => {
  loading.value = true;

  let url = 'providers/home';
  if (date) {
    url += `?month=${date}`;
  }

  await axios.get(url, config).then(res => {
    if (response(res) == "success") {
      total_profit.value = res.data.data.total_profit;
      today_profit.value = res.data.data.today_profit;
      currency.value = res.data.data.currency;
      month_profit.value = res.data.data.month_profit;
    }
    loading.value = false;
  }).catch(err => console.log(err));
}

// updateFilter
const updateFilter = async (date) => {
  await getData(date);
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

onMounted(async () => {
  await getData();
});

</script>

<style></style>