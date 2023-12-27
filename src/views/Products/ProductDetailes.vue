<template>
    <div class="card_style p-lg-4">

        <div v-if="!loading">

            <div class="row gy-5">

                <div class="col-lg-6">
                    <div class="product_detailes">
                        <div class="text mb-2 c-black" v-if="product.is_available">{{ $t('products.available') }}
                        </div>
                        <div class="text mb-2 ff-d fs16 c-black">{{ product.name }}</div>
                        <div class="d-flex align-items-center mb-2 gap-3 c-dark3 cu-pointer" @click="rateModal = true">
                            <Rating v-model="product.avg_rate" class="small gap-1 cu-pointer" readonly :cancel="false" />
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

    <!-- Rate Modal -->
    <Dialog id="rateModal" class="xl" v-model:visible="rateModal" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <p class="fs16 mt-sm-0 mt-3 c-black mb-4 ff-d">{{ $t('modals.rateModal.header') }}</p>

                    <div v-if="productRating.length">
                        <div class="rate_item mb-4" v-for="rateItem in productRating" :key="rateItem.id">
                            <div class="d-flex align-items-center gap-3 mb-2">
                                <div class="d-flex gap-1">
                                    <p class="c-dark3 fs13"> {{ $t('modals.rateModal.text') }}</p>
                                    <p class="c-black fs13">{{ rateItem.user_name }}</p>
                                </div>
                                <div class="c-black fs13">{{ rateItem.date }}</div>
                            </div>
                            <div class="d-flex gap-3 mb-2">
                                <span class="c-dark3 fs13"> {{ $t('modals.rateModal.value') }}</span>
                                <Rating v-model="rateItem.stars" class="small gap-1 cu-pointer" readonly :cancel="false" />
                            </div>
                            <p class="fs14 c-black">{{ rateItem.comment }}</p>
                        </div>
                    </div>

                    <div class="no-data sm" v-else>
                        <img src="@/assets/imgs/no_data.avif" alt="" class="no-data-img">
                        <div class="no-data-text">{{ $t('noData.productRate') }}</div>
                    </div>

                    <div class="buttons justify-content-center mt-5">
                        <button type="button" class="main-btn modal_btn transparent" @click="rateModal = false">
                            {{ $t('modals.rateModal.btn') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>

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
    "id": 6,
    "name": "Quinn Barker",
    "is_available": true,
    "avg_rate": 4,
    "calories": "74",
    "weight": "26",
    "brand": "سينابون",
    "description": "Aute quis corporis d",
    "images": [
        {
            "id": 5,
            "file": "https://murouj.com/public/storage/images/attachments/1702548471_5492.png"
        },
        {
            "id": 6,
            "file": "https://murouj.com/public/storage/images/attachments/1702548471_9182.png"
        },
        {
            "id": 7,
            "file": "https://murouj.com/public/storage/images/attachments/1702548471_8322.png"
        },
        {
            "id": 8,
            "file": "https://murouj.com/public/storage/images/attachments/1702548471_5848.png"
        },
        {
            "id": 9,
            "file": "https://murouj.com/public/storage/images/attachments/1702548471_3466.png"
        }
    ],
    "nutrition_values": [
        {
            "id": 46,
            "attribute": "دهون مشبعة",
            "weight_value": "92",
            "daily_percentage": "9"
        },
        {
            "id": 47,
            "attribute": "دهون متحولة",
            "weight_value": "66",
            "daily_percentage": "75"
        },
        {
            "id": 48,
            "attribute": "كوليسترول",
            "weight_value": "34",
            "daily_percentage": "45"
        },
        {
            "id": 49,
            "attribute": "صوديوم",
            "weight_value": "75",
            "daily_percentage": "3"
        },
        {
            "id": 50,
            "attribute": "كربوهيدرات",
            "weight_value": "36",
            "daily_percentage": "45"
        },
        {
            "id": 51,
            "attribute": "الألياف الغذائية",
            "weight_value": "37",
            "daily_percentage": "91"
        },
        {
            "id": 52,
            "attribute": "سكريات كلية",
            "weight_value": "28",
            "daily_percentage": "7"
        },
        {
            "id": 53,
            "attribute": "يتضمن سكر مضاف",
            "weight_value": "73",
            "daily_percentage": "5"
        },
        {
            "id": 54,
            "attribute": "بروتين",
            "weight_value": "47",
            "daily_percentage": "99"
        }
    ],
    "product_price": "609.00",
    "product_price_after_discount": "566.00",
    "has_discount": true,
    "currency": "ر.س "
});

// Product Rating
const productRating = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getData
const getData = async () => {
    loading.value = true;
    await axios.get(`providers/product-details/${productId.value}`, config.value).then(res => {
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

// get Order
const getProductRate = async () => {
    await axios.get(`get-product-rates/${productId.value}`, config.value).then(res => {
        if (response(res) == "success") {
            productRating.value = res.data.data.data;
        }
    }).catch(err => {
        console.error(err);
    });
}


/******************* Computed *******************/
const productId = computed(() => {
    return route.params.id
});

const config = computed(() => {
    return localStorage.getItem('token') ? {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    } : {}
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getData();
    await getProductRate();
});

</script>

<style lang="scss"></style>