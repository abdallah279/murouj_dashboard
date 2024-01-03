<template>
    <!--***** Current Orders *****-->
    <div class="report_products mt-4">
        <h3 class="fs15 c-black mb-4">{{ $t('reports.clients') }} (30)</h3>
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
const clients = ref([]);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// columns
const columns = ref([
    {
        field: 'id',
        header: i18n.global.t('table.clients.number')
    },
    {
        field: ['image', 'name'],
        header: i18n.global.t('table.clients.name')
    },
    {
        field: ['total', 'currency'],
        header: i18n.global.t('table.clients.total')
    },
    {
        field: 'selling_count',
        header: i18n.global.t('table.clients.selling_count')
    },
    {
        field: 'full_phone',
        header: i18n.global.t('table.clients.full_phone')
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
    await getData();
});

</script>
  
<style></style>