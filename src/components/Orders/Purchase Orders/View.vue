<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="d-flex justify-content-center mb-4 flex-sm-nowrap flex-wrap gap-2">
                <router-link :to="{ name: 'purchaseCurrent' }" class="main-btn order_tab light flex-grow-1">
                    {{ $t('order.tabs.currentOrders') }} ({{ currentCount }})
                </router-link>
                <router-link :to="{ name: 'purchaseFinished' }" class="main-btn order_tab light flex-grow-1">
                    {{ $t('order.tabs.finishedOrders') }} ({{ finishedCount }})
                </router-link>
                <router-link :to="{ name: 'purchaseCanceled' }" class="main-btn order_tab light flex-grow-1">
                    {{ $t('order.tabs.canceledOrders') }} ({{ cancelledCount }})
                </router-link>
            </div>
        </div>
    </div>
    <router-view />
</template>

<script setup>
/******************* Import *******************/
import axios from "axios";
import { onMounted, ref } from "vue";
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// current
const currentCount = ref(0);

// finished
const finishedCount = ref(0);

// cancelled
const cancelledCount = ref(0);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getData
const getData = async () => {
    await axios.get('providers/provider-all-counts', config).then(res => {
        if (response(res) == "success") {
            currentCount.value = res.data.data.current_orders_count;
            
            finishedCount.value = res.data.data.finished_orders_count;
            
            cancelledCount.value = res.data.data.cancelled_orders_count;
        }
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