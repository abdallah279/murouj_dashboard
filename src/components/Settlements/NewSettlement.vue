<template>
    <div v-if="!loading">
        <OrderCards :requests="requests" v-if="requests.length" />

        <div class="no-data" v-if="!requests.length">
            <img src="@/assets/imgs/no_data.png" alt="" class="no-data-img">
            <div class="no-data-text">{{ $t('noData.requests') }}</div>
        </div>
    </div>


    <OrderCardSkeleton v-if="loading" />
</template>

<script setup>
/******************* Import *******************/
import { onMounted, ref } from "vue";
import axios from "axios";
import responseApi from '@/components/shared/ResponseApi.js';
import OrderCards from "@/components/Settlements/OrderCards.vue";
import OrderCardSkeleton from "@/components/Settlements/OrderCardSkeleton.vue";

/******************* Data *******************/

// success response
const { response } = responseApi();

// loading
const loading = ref(false);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('muroujDashToken')}` }
};

const requests = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
const getData = async () => {
    loading.value = true;
    await axios.get('providers/new-settlements', config).then(res => {
        if (response(res) == "success") {
            requests.value = res.data.data;
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