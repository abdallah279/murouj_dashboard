<template>
    <!--***** Current Orders *****-->
    <div class="report_products mt-4">
        <h3 class="fs15 c-black mb-4">المشرفين (30)</h3>
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
import DataTable from "@/components/shared/DataTable.vue";

/******************* Data *******************/

// success response
const { response } = responseApi();

// Loading
const loading = ref(false);

// supervisors
const supervisors = ref([
    {
        "id": 3,
        "admin_name": "mohamed",
        "operation": "المةافقة على طلب الارجاع رقم 1234",
        "date_and_time": "2023/11/06 - 02:16 am"
    },
    {
        "id": 4,
        "admin_name": "osama",
        "operation": "تغيير حالة الطلب رقم 12345",
        "date_and_time": "2023/10/08 - 02:16 am"
    },
    {
        "id": 2,
        "admin_name": "admed",
        "operation": "رفض طلب الارجاع رقم 1234",
        "date_and_time": "2023/08/06 - 02:16 am"
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
        field: ['image', 'admin_name'],
        header: 'اسم المشرف'
    },
    {
        field: 'date_and_time',
        header: 'الوقت'
    },
    {
        field: 'operation',
        header: 'العملية'
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
    // await getData();
});

</script>
  
<style></style>