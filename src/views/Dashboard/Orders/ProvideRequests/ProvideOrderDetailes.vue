<template>
    <div class="card_style py-4 px-lg-4">

        <!--*** الملاحظات ***-->
        <div class="detailes mb-4" v-if="!loading && order.refuse_reason">
            <h5 class="fs14 mb-2 c-dark4">{{ $t('orderDetailes.feedback') }}</h5>

            <p class="c-black">{{ order.refuse_reason }}</p>
        </div>

        <!--*** الملاحظات ***-->
        <div class="detailes mb-4" v-if="loading">
            <Skeleton width="6rem" height=".6rem" class="mb-3"></Skeleton>

            <Skeleton width="65%" height=".6rem"></Skeleton>
        </div>

        <!--*** المنتجات ***-->
        <div class="row align-items-center position-relative">
            <div class="col-xl-8 col-lg-10">

                <div v-if="!loading">
                    <!--**** Table ****-->
                    <div class="table_con" v-if="orderProducts.length">
                        <div class="product_table">
                            <div class="main-bb d-flex head">
                                <div class="item big_td">{{ $t('cart.table.product') }}</div>
                                <div class="item big_td text-center">{{ $t('cart.table.amount') }}</div>
                                <div class="item small_td">{{ $t('cart.table.amount') }}</div>
                            </div>

                            <div class="product_item" v-for="product in orderProducts" :key="product.id">

                                <div class="product_img_td big_td with_m">

                                    <!--**** Product Image ****-->
                                    <div class="p_img">
                                        <img :src="product.product_image" alt="" class="img">
                                    </div>

                                    <!--**** Product Name ****-->
                                    <div class="c-black ff-d">{{ product.product_name }}</div>

                                </div>

                                <!--**** Product Quantity Type ****-->
                                <div class="big_td text-center">
                                    <span class="c-black">{{ product.unit.name }}</span>
                                </div>

                                <!--**** Product Quantity ****-->
                                <div class="small_td">
                                    <span class="sm_btn mx-auto">{{ product.qty }}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="alert alert-danger text-center fs13 mt-3" role="alert" v-else>
                        {{ $t('noData.orderProduct') }}
                    </div>
                </div>

                <div class="table_con" v-if="loading">
                    <div class="product_table">
                        <div class="main-bb d-flex head">
                            <div class="item big_td">
                                <Skeleton width="6rem" height=".5rem"></Skeleton>
                            </div>
                            <div class="item big_td">
                                <Skeleton width="4rem" height=".5rem" class="mx-auto"></Skeleton>
                            </div>
                            <div class="item small_td">
                                <Skeleton width="4rem" height=".5rem" class="mx-auto"></Skeleton>
                            </div>
                        </div>

                        <div class="product_item" v-for="i in 2" :key="i">
                            <div class="product_img_td big_td with_m">
                                <div class="p_img without_after">
                                    <Skeleton class="img"></Skeleton>
                                </div>
                                <Skeleton width="8rem" height=".5rem"></Skeleton>
                            </div>
                            <div class="big_td">
                                <Skeleton width="4rem" height=".5rem" class="mx-auto"></Skeleton>
                            </div>
                            <div class="small_td">
                                <Skeleton shape="circle" size="2.3rem" class="mx-auto"></Skeleton>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
/******************* Import *******************/
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import axios from "axios";
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';
import Skeleton from 'primevue/skeleton';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { errorToast } = toastMsg();

const route = useRoute();

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// loading
const loading = ref(false);

// order
const order = ref({});

// orderProducts
const orderProducts = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getOrders
const getOrder = async () => {
    loading.value = true;
    await axios.get(`providers/product-request-details/${route.params.id}`, config).then(res => {
        if (response(res) == "success") {
            order.value = res.data.data;
            orderProducts.value = res.data.data.products;
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}
/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getOrder();
});

</script>

<style lang="scss"></style>