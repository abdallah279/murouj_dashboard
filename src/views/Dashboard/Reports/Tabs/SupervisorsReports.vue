<template>
    <!--***** Current Orders *****-->
    <div class="report_products mt-4">
        <h3 class="fs15 c-black mb-4">{{ $t('reports.tabs.supervisors') }} (30)</h3>
        <DataTable :columns="columns" :products="supervisors" :loading="loading" :tableSkeleton="new Array(columns.length)">
        </DataTable>
    </div>
</template>

<script setup>

/******************* Import *******************/
import { onMounted, ref } from 'vue';
import axios from 'axios';
import i18n from "@/i18n";
import responseApi from '@/components/shared/ResponseApi.js';
import DataTable from "@/components/shared/DataTable/DataTable.vue";

/******************* Data *******************/

// success response
const { response } = responseApi();

// Loading
const loading = ref(false);

// supervisors
const supervisors = ref([]);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// columns
const columns = ref([
    {
        field: 'id',
        header: i18n.global.t('table.supervisors.number')
    },
    {
        field: ['image', 'admin_name'],
        header: i18n.global.t('table.supervisors.name')
    },
    {
        field: 'date_and_time',
        header: i18n.global.t('table.supervisors.time')
    },
    {
        field: 'operation',
        header: i18n.global.t('table.supervisors.operation')
    }
]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get('providers/provider-admins-reports', config).then(res => {
        if (response(res) == "success") {
            supervisors.value = res.data.data.data;
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