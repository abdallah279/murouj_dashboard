<template>
    <!--***** Page Top *****  -->
    <router-link to="/" class="main-btn login up mb-4"> <i class="pi pi-plus"></i> {{ $t('supervisors.addSupervisor') }}</router-link>

    <!--****** Card Style *****-->
    <div class="card_style py-5 px-lg-4">

        <!--***** supervisors *****-->
        <div v-if="!loading">
            <div class="row" v-if="admins.length">
                <div class="col-xl-8 col-lg-10">

                    <!--***** admins cards *****-->
                    <AdminsCards :admins="admins" />

                </div>
            </div>
            <div class="no-data" v-else>
                <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
                <div class="no-data-text">{{ $t('noData.supervisors') }}</div>
            </div>
        </div>

        <!--***** Skeleton *****-->
        <supervisorsSkeleton v-if="loading" />

    </div>

    <!--***** Paginator *****-->
    <div v-if="showPaginate">
        <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4" dir="ltr" />
    </div>
</template>
  
<script setup>
/******************* Import *******************/
import { computed, ref } from "vue";
import supervisorsSkeleton from '@/components/Supervisors/SupervisorsSkeleton.vue';
import AdminsCards from '@/components/Supervisors/SupervisorsCards.vue';
import axios from 'axios';
import Paginator from 'primevue/paginator';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// admins
const admins = ref([
    {
        id: 38,
        image: require('@/assets/imgs/profile.png'),
        name: "احمد عثمان احمد",
        phone: "0123456789",
        country_code: "966",
        permissions: [
            {
                id: 1,
                name: "الرئيسية",
            },
            {
                id: 2,
                name: "الطلبات",
            },
            {
                id: 3,
                name: "منتجات",
            },
            {
                id: 4,
                name: "الحسابات المالية",
            }
        ]
    },
    {
        id: 38,
        image: require('@/assets/imgs/profile.png'),
        name: "احمد عثمان احمد",
        phone: "0123456789",
        country_code: "966",
        permissions: [
            {
                id: 1,
                name: "الرئيسية",
            },
            {
                id: 2,
                name: "الطلبات",
            },
            {
                id: 3,
                name: "منتجات",
            },
            {
                id: 4,
                name: "الحسابات المالية",
            },
            {
                id: 5,
                name: "بيانات الحساب",
            },
            {
                id: 6,
                name: "المشرفين",
            },
        ]
    },
    {
        id: 38,
        image: require('@/assets/imgs/profile.png'),
        name: "احمد عثمان احمد",
        phone: "0123456789",
        country_code: "966",
        permissions: [
            {
                id: 1,
                name: "الرئيسية",
            },
            {
                id: 2,
                name: "الطلبات",
            },
            {
                id: 3,
                name: "منتجات",
            },
        ]
    },
]);

// Loading
const loading = ref(false);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get(`providers/provider-admins?page=${currentPage.value}`, config.value).then(res => {
        if (response(res) == "success") {
            admins.value = res.data.data.data;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// Paginate Function
const onPaginate = (e) => {
    loading.value = true;
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    getData();
};

/******************* Computed *******************/
const config = computed(() => {
    return localStorage.getItem('token') ? {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    } : {}
});

let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});

/******************* Watch *******************/

/******************* Mounted *******************/
// onMounted(async () => {
//     await getData();
// });

</script>
  
<style lang="scss"></style>