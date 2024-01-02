<template>
    <!--***** Current Orders *****-->
    <div class="report_products mt-4">
        <h3 class="fs15 c-black mb-4">العملاء (30)</h3>
        <DataTable :columns="columns" :products="clients" :loading="loading"
            :tableSkeleton="new Array(columns.length)">
        </DataTable>
    </div>
</template>

<script setup>

/******************* Import *******************/
import { onMounted, ref } from 'vue';
import axios from 'axios';
import i18n from "@/i18n";
import responseApi from '@/components/shared/ResponseApi.js';
import DataTable from "@/components/shared/DataTable.vue";

/******************* Data *******************/

// success response
const { response } = responseApi();

// Loading
const loading = ref(false);

// clients
const clients = ref([
    {
        "id": 44,
        "name": "Lila Wehner",
        "full_phone": "CK5111111143",
        "selling_count": 2,
        "total": 6112.18,
        "currency": "ر.س "
    },
    {
        "id": 61,
        "name": "Vada Armstrong",
        "full_phone": "SH5111111160",
        "selling_count": 1,
        "total": 7776.47,
        "currency": "ر.س "
    },
    {
        "id": 99,
        "name": "Mrs. Lorna Moen DDS",
        "full_phone": "HU5111111198",
        "selling_count": 1,
        "total": 7009.18,
        "currency": "ر.س "
    }
]);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// columns
const columns = ref([
    {
        field: 'id',
        header: i18n.global.t('table.products.number')
    },
    {
        field: ['image', 'name'],
        header: 'اسم العميل'
    },
    {
        field: ['total', 'currency'],
        header: 'اجمالي المبلغ'
    },
    {
        field: 'selling_count',
        header: 'عدد مرات الشراء'
    },
    {
        field: 'full_phone',
        header: 'رقم الجوال'
    }
]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get('providers/clients-reports?month=1', config).then(res => {
        if (response(res) == "success") {
            clients.value = res.data.data.data;
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
  
<style></style>