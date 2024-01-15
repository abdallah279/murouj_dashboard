<template>
    <form action="" class="card_style py-4 px-lg-4" ref="requestForm" @submit.prevent="createRequest">

        <div class="row align-items-center position-relative gy-4">
            <div class="col-lg-8">

                <!-- Products -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('addProvideProducts.form.products.text') }}</label>
                    <div class="main-input">
                        <router-link to="/addingProducts" class="input-me d-flex align-items-center fs13">
                            {{ $t('addProvideProducts.form.products.placeholder') }}
                        </router-link>
                        <i class="pi pi-angle-left main-icon"></i>
                    </div>
                </div>

                <!-- Type -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('addProvideProducts.form.type.text') }}</label>
                    <div class="main-input">

                        <Dropdown v-model="requestType" :placeholder="$t('addProvideProducts.form.type.placeholder')"
                            :options="requestTypes" optionLabel="name" class="input-me">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="selected">
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="option">
                                    <div>
                                        {{ slotProps.option.name }}
                                    </div>
                                </div>
                            </template>
                        </Dropdown>

                        <i class="pi pi-angle-down main-icon"></i>

                    </div>
                </div>

                <!-- Sub Category -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('addProvideProducts.form.sub_category.text') }}</label>
                    <div class="main-input">

                        <Dropdown v-model="subCategory"
                            :placeholder="$t('addProvideProducts.form.sub_category.placeholder')" :options="subCategories"
                            optionLabel="name" class="input-me">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="selected">
                                    {{ slotProps.value.name }}
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="option">
                                    {{ slotProps.option.name }}
                                </div>
                            </template>
                        </Dropdown>

                        <i class="pi pi-angle-down main-icon"></i>

                    </div>
                </div>

                <!-- Duration -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('addProvideProducts.form.duration.text') }}</label>
                    <div class="main-input">

                        <Dropdown v-model="duration" :placeholder="$t('addProvideProducts.form.duration.placeholder')"
                            :options="durations" optionLabel="name" class="input-me">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="selected">
                                    {{ slotProps.value.hours_duration }} {{ $t('addProvideProducts.form.duration.hours')
                                    }}
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="option">
                                    {{ slotProps.option.hours_duration }} {{
                                        $t('addProvideProducts.form.duration.hours') }}
                                </div>
                            </template>
                        </Dropdown>

                        <i class="pi pi-angle-down main-icon"></i>

                    </div>
                </div>

                <!-- Received Time -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('addProvideProducts.form.receving_time.text') }} </label>
                    <div class="main-input">
                        <Calendar v-model="date" hourFormat="12" showTime dateFormat="dd-mm-yy "
                            :placeholder="$t('addProvideProducts.form.receving_time.placeholder')" class="input-me" />
                        <i class="pi pi-clock main-icon"></i>
                    </div>
                </div>

                <button type="submit" class="main-btn mt-3 light_op up lg" :disabled="loading">
                    <span v-if="!loading">
                        {{ $t('addProvideProducts.form.btn') }}
                    </span>
                    <div v-if="loading">
                        {{ $t('formBtns.sendLoading') }}
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </div>
                </button>

            </div>
        </div>
    </form>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img src="@/assets/imgs/right_img.gif" alt="" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ doneText }}</p>
                    <div class="buttons justify-content-center">
                        <router-link to="/ProvideOrders" class="main-btn modal_btn up rounded-0">
                            {{ $t('pagesTitle.ProvideOrders') }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
/******************* Import *******************/

import { onMounted, ref } from "vue";
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import toastMsg from '@/components/shared/Toaster';
import Dialog from 'primevue/dialog';
import responseApi from '@/components/shared/ResponseApi.js';
import Calendar from 'primevue/calendar';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Forms Ref
const requestForm = ref(null);

// requestType
const requestType = ref('');
const requestTypes = ref([]);

// subCategory
const subCategory = ref('');
const subCategories = ref([]);

// duration
const duration = ref('');
const durations = ref([]);

// Date
const date = ref('');

// loading
const loading = ref(false);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// Modal
const done = ref(false);
const doneText = ref('');

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// get Types
const getTypes = async () => {
    await axios.get('product-request-types').then(res => {
        if (response(res) == "success") {
            requestTypes.value = res.data.data;
        }
    }).catch(err => console.log(err));
}

// get Durations
const getDurations = async () => {
    await axios.get('product-request-durations').then(res => {
        if (response(res) == "success") {
            durations.value = res.data.data;
        }
    }).catch(err => console.log(err));
}

// get Sub Categories
const getSubCategories = async () => {
    await axios.get('sub-categories').then(res => {
        if (response(res) == "success") {
            subCategories.value = res.data.data;
        }
    }).catch(err => console.log(err));
}

// Formate Date Function
const formateDate = () => {
    let myDate = new Date(date.value);
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let hours = myDate.getHours();
    let minutes = myDate.getMinutes();
    let seconds = myDate.getSeconds();

    day < 10 ? day = `0${day}` : false;
    month < 10 ? month = `0${month}` : false;
    hours < 10 ? hours = `0${hours}` : false;
    minutes < 10 ? minutes = `0${minutes}` : false;
    seconds < 10 ? seconds = `0${seconds}` : false;

    let occasion_date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return occasion_date;
}

// createRequest Function
const createRequest = async () => {
    loading.value = true;
    const fd = new FormData(requestForm.value);
    fd.append('product_request_type_id', requestType.value.id);
    fd.append('sub_category_id', subCategory.value.id);
    fd.append('product_request_duration_id', duration.value.id);
    fd.append('receipt_date_time', formateDate());
    fd.append('products', localStorage.getItem('products') ? localStorage.getItem('products') : '');

    await axios.post('providers/create-product-request', fd, config).then(res => {
        if (response(res) == "success") {
            done.value = true;
            doneText.value = res.data.msg;
            requestForm.value.reset();
            duration.value = '';
            requestType.value = '';
            subCategory.value = '';
            localStorage.removeItem('products');
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => console.log(err));

}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getTypes();
    await getSubCategories();
    await getDurations();
});

</script>

<style></style>