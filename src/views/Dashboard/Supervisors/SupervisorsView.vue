<template>
    <!--***** Page Top *****  -->
    <router-link to="addSupervisors" class="main-btn login up mb-4"> <i class="pi pi-plus"></i> {{
        $t('supervisors.addSupervisor') }}</router-link>

    <!--****** Card Style *****-->
    <div class="card_style py-lg-5 py-4 px-lg-4">

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
</template>

<script setup>
/******************* Import *******************/
import { onMounted, ref } from "vue";
import supervisorsSkeleton from '@/components/Supervisors/SupervisorsSkeleton.vue';
import AdminsCards from '@/components/Supervisors/SupervisorsCards.vue';
import axios from 'axios';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// admins
const admins = ref([]);

// Loading
const loading = ref(false);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
}

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
// getData
const getData = async () => {
    loading.value = true;
    await axios.get(`providers/provider-admins`, config).then(res => {
        if (response(res) == "success") {
            admins.value = res.data.data;
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