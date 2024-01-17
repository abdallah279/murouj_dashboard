<template>
    <div class="card_style p-lg-4">

        <div v-if="!loading">

            <div class="row gy-5">

                <div class="col-lg-6">
                    <div class="product_detailes">
                        <div class="text mb-2 c-black" v-if="product.is_available">{{ $t('products.available') }}
                        </div>
                        <div class="text mb-2 ff-d fs16 c-black">{{ product.name }}</div>
                        <div class="d-flex align-items-center mb-2 gap-3 c-dark3">
                            <Rating v-model="product.avg_rate" class="small gap-1" readonly :cancel="false" />
                            ( {{ product.avg_rate }} )
                            {{ product.rates_count }}
                        </div>
                        <div class="main-items">
                            <div class="d-flex justify-content-between gap-3 flex-wrap mb-3">
                                <span class="fs13 c-black">{{ $t('products.calories') }} :</span>
                                <span class="fs13 c-black ff-d">{{ product.calories }}
                                    {{ $t('products.unit') }}</span>
                            </div>
                            <div class="d-flex justify-content-between gap-3 flex-wrap mb-3">
                                <span class="fs13 c-black">{{ $t('products.weight') }} :</span>
                                <span class="fs13 c-black ff-d">{{ product.weight }} {{ $t('products.unit')
                                }}</span>
                            </div>
                            <div class="d-flex justify-content-between gap-3 flex-wrap mb-3">
                                <span class="fs13 c-black">{{ $t('products.brand') }} :</span>
                                <span class="fs13 c-black ff-d">{{ product.brand }}</span>
                            </div>

                            <div class="fs13 d-flex justify-content-end my-3">{{ $t('products.dailyValue') }} %
                            </div>

                            <div class="d-flex justify-content-between gap-3 flex-wrap mb-3"
                                v-for="item in product.nutrition_values" :key="item.id">
                                <span class="fs13 c-black">{{ item.attribute }} {{ item.weight_value }}
                                    {{ $t('products.unit') }}</span>
                                <span class="fs13 c-black ff-d">{{ item.daily_percentage }} %</span>
                            </div>

                            <div class="mt-4">
                                <span class="fs13 c-black d-block mb-2">{{ $t('products.desc') }} :</span>
                                <span class="fs13 c-black ff-d">{{ product.description }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <ProductsGalleria :images="product.images" />

                    <div class="d-flex mt-4 gap-2 gap-sm-3 flex-wrap align-items-center">
                        <div class="price_con">
                            <p class="price" v-if="product.has_discount">{{ product.product_price_after_discount }} {{ product.currency }}</p>
                            <p class="price" :class="{ 'old': product.has_discount }">{{ product.product_price }} {{ product.currency }}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <!--******** Skeleton ********-->
        <div v-if="loading">

            <div class="row gy-5">
                <div class="col-lg-6">
                    <div class="product_detailes">
                        <Skeleton height=".5rem" width="6rem" class=" mb-3"></Skeleton>
                        <Skeleton height=".5rem" width="10rem" class=" mb-3"></Skeleton>
                        <div class="d-flex align-items-center mb-3 gap-3 c-dark3 cu-pointer" @click="rateModal = true">
                            <Skeleton height=".5rem" width="6rem"></Skeleton>
                            <Skeleton height=".5rem" width="2rem"></Skeleton>
                            <Skeleton height=".5rem" width="2rem"></Skeleton>
                        </div>
                        <div class="main-items">
                            <div class="d-flex justify-content-between gap-3 flex-wrap mb-3" v-for="i in 3" :key="i">
                                <Skeleton height=".5rem" width="6rem"></Skeleton>
                                <Skeleton height=".5rem" width="6rem"></Skeleton>
                            </div>

                            <div class="fs13 d-flex justify-content-end my-3">
                                <Skeleton height=".5rem" width="8rem"></Skeleton>
                            </div>

                            <div class="d-flex justify-content-between gap-3 flex-wrap mb-3" v-for="i in 8" :key="i">
                                <Skeleton height=".5rem" width="6rem"></Skeleton>
                                <Skeleton height=".5rem" width="6rem"></Skeleton>
                            </div>

                            <div class="mt-4">
                                <Skeleton height=".5rem" width="6rem" class=" mb-3"></Skeleton>
                                <Skeleton height=".5rem" width="100%" class=" mb-2"></Skeleton>
                                <Skeleton height=".5rem" width="100%" class=" mb-2"></Skeleton>
                                <Skeleton height=".5rem" width="100%" class=" mb-2"></Skeleton>
                                <Skeleton height=".5rem" width="80%" class=" mb-2"></Skeleton>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <Skeleton height="450px" width="100%"></Skeleton>
                </div>
            </div>
        </div>

    </div>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img src="@/assets/imgs/right_img.gif" alt="" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4 ff-d">{{ $t('modals.done.addDone') }}</p>
                    <div class="buttons justify-content-center">
                        <router-link to="/cart" class="main-btn modal_btn up">{{ $t('modals.done.orderBtn') }}</router-link>
                        <button type="button" class="main-btn modal_btn transparent" @click="done = false">
                            {{ $t('modals.done.scrollBtn') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
/******************* Import *******************/
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Rating from 'primevue/rating';
import Dialog from 'primevue/dialog';
import ProductsGalleria from "@/components/Products/ProductsGalleria.vue";
import Skeleton from 'primevue/skeleton';
import axios from "axios";
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Route
const route = useRoute();

// Modal
const done = ref(false);
const rateModal = ref(false);

// loading
const loading = ref(false);

// Product Detailes
const product = ref({
    id: 6,
    name: "",
    is_available: false,
    avg_rate: 0,
    calories: "",
    weight: "",
    brand: "",
    description: '',
    images: [],
    nutrition_values: [],
    product_price: "",
    product_price_after_discount:'',
    has_discount: '',
    currency: ''
});

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('muroujDashToken')}` }
};

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getData
const getData = async () => {
    loading.value = true;
    await axios.get(`providers/product-details/${productId.value}`, config).then(res => {
        if (response(res) == "success") {
            product.value.is_available = res.data.data.is_available;
            product.value.name = res.data.data.name;
            product.value.avg_rate = res.data.data.avg_rate;
            product.value.rates_count = res.data.data.rates_count;
            product.value.calories = res.data.data.calories;
            product.value.weight = res.data.data.weight;
            product.value.brand = res.data.data.brand;
            product.value.nutrition_values = res.data.data.nutrition_values;
            product.value.description = res.data.data.description;
            product.value.product_price = res.data.data.product_price;
            product.value.product_price_after_discount = res.data.data.product_price_after_discount;
            product.value.has_discount = res.data.data.has_discount;
            product.value.currency = res.data.data.currency;
            product.value.images = res.data.data.images;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

/******************* Computed *******************/
const productId = computed(() => {
    return route.params.id
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
});

</script>

<style lang="scss"></style>