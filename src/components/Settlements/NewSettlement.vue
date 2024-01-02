<template>
    <OrderCards :requests="requests" v-if="!loading" />

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
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

const requests = ref([
    {
        "id": 4,
        "number": "20234",
        "created_at": "منذ 6 ساعات",
        "amount": 17600.92,
        "status": "انتظار الموافقة",
        "currency": "ر.س "
    },
    {
        "id": 4,
        "number": "20234",
        "created_at": "منذ 6 ساعات",
        "amount": 17600.92,
        "status": "انتظار الموافقة",
        "currency": "ر.س "
    },
]);

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
    // await getData();
});

</script>

<style lang="scss"></style>