<template>
    <div v-if="!loading">
        <div class="notification-items" v-if="notifications.length">
            <NotificationItem @removeNotId="removeNotification" v-for="notItem in notifications" :key="notItem.id"
                :notItem="notItem" />
        </div>

        <div class="no-data" v-if="!notifications.length">
            <img src="@/assets/imgs/no_data.png" alt="" class="no-data-img">
            <div class="no-data-text">{{ $t('noData.notifications') }}</div>
        </div>
    </div>

    <!--********** Skeleton **********-->
    <div v-if="loading">
        <div class="notification-items">

            <div class="not-item" v-for="i in 5" :key="i">
                <div class="right">
                    <Skeleton shape="circle" size="4rem"></Skeleton>
                    <div class="not_body">
                        <div class="time mb-3">
                            <Skeleton height=".6rem" width="4rem"></Skeleton>
                        </div>
                        <Skeleton height=".6rem" width="14rem"></Skeleton>
                    </div>
                </div>
                <Skeleton height="1.2rem" width=".8rem"></Skeleton>
            </div>

        </div>
    </div>

    <div v-if="showPaginate">
        <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4" dir="ltr" />
    </div>
</template>

<script setup>
/******************* Import *******************/
import { computed, onMounted, ref } from "vue";
import NotificationItem from '@/components/Notifications/NotificationItem.vue';
import Skeleton from 'primevue/skeleton';
import axios from "axios";
import Paginator from 'primevue/paginator';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// loading
const loading = ref(false);

// notifications
const notifications = ref([]);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// Get notifications
const getNotifications = async () => {
    loading.value = true;
    await axios.get(`notifications?page=${currentPage.value}`, config).then(res => {
        if (response(res) == "success") {
            notifications.value = res.data.data.notifications.data;
            totalPage.value = res.data.data.notifications.pagination.total_items;
            pageLimit.value = res.data.data.notifications.pagination.per_page;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// Paginate Function
const onPaginate = (e) => {
    loading.value = true;
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    getNotifications();
};

// Remove notification Item From notifications Array
const removeNotification = (id) => {
    const IdIndex = notifications.value.findIndex((not) => not.id === id);
    notifications.value.splice(IdIndex, 1);
}

/******************* Computed *******************/
let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});


/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getNotifications();
});

</script>

<style lang="scss"></style>