<template>
    <div class="card_style py-5">

        <div class="row">
            <div class="col-xl-11 mx-auto">

                <div v-if="!loading">

                    <!--*** تفاصيل الطلب ***-->
                    <div class="detailes mb-4">
                        <h5 class="fs14 ff-d mb-3 c-white2">
                            <span v-if="order.type == 1">{{ $t('orderDetailes.returnDetailes') }} </span>
                            <span v-if="order.type == 0">{{ $t('orderDetailes.detailes') }} </span>
                            #{{ order.order_num }}
                        </h5>

                        <div class="d-flex-between gap-2 flex-wrap mb-3">
                            <span class="c-dark3">{{ $t('orderDetailes.orderAddress') }} :</span>
                            <span class="c-black">{{ order.map_desc }}</span>
                        </div>

                        <div class="d-flex-between gap-2 flex-wrap mb-3">
                            <span class="c-dark3">{{ $t('orderDetailes.status') }} :</span>
                            <span class="c-blue">{{ order.status_text }}</span>
                        </div>

                        <div class="d-flex-between gap-2 flex-wrap mb-3">
                            <span class="c-dark3">{{ $t('orderDetailes.ordertimeDate') }} :</span>
                            <span class="c-black">{{ order.date }}</span>
                        </div>

                        <div class="d-flex-between gap-2 flex-wrap mb-3">
                            <span class="c-dark3">{{ $t('orderDetailes.payWay') }} :</span>
                            <span class="c-black">{{ order.pay_type_text }}</span>
                        </div>

                        <div class="d-flex-between gap-2 flex-wrap">
                            <span class="c-dark3">{{ $t('orderDetailes.deliveryWay') }} :</span>
                            <span class="c-black">{{ order.delivery_type }}</span>
                        </div>
                    </div>

                    <!--*** تفاصيل الدفع ***-->
                    <div class="detailes mb-4">
                        <h5 class="fs14 ff-d mb-3 c-white2">{{ $t('orderDetailes.paymentInfo') }}</h5>

                        <div class="d-flex-between gap-2 flex-wrap mb-3">
                            <span class="c-dark3">{{ $t('orderDetailes.discountPrice') }} :</span>
                            <span class="c-blue">{{ order.discount_amount }} {{ order.currency }}</span>
                        </div>

                        <div class="d-flex-between gap-2 flex-wrap mb-3">
                            <span class="c-dark3">{{ $t('orderDetailes.shippingPrice') }} :</span>
                            <span class="c-blue">{{ order.shipping_price }} {{ order.currency }}</span>
                        </div>

                        <div class="d-flex-between gap-2 flex-wrap mb-3">
                            <span class="c-dark3">{{ $t('orderDetailes.taxPrice') }} :</span>
                            <span class="c-blue">{{ order.vat_amount }} {{ order.currency }}</span>
                        </div>

                        <div class="d-flex-between gap-2 flex-wrap mb-2 pb-2 main-bb">
                            <span class="c-dark3">{{ $t('orderDetailes.productsPrice') }} :</span>
                            <span class="c-blue">{{ order.products_price }} {{ order.currency }}</span>
                        </div>

                        <div class="d-flex-between gap-2 flex-wrap">
                            <span class="c-dark3">{{ $t('orderDetailes.totalPrice') }} :</span>
                            <span class="c-blue">{{ order.final_total }} {{ order.currency }}</span>
                        </div>
                    </div>

                    <!--*** تم الالغاء ***-->
                    <h5 class="fs14 ff-d mb-4 c-red text-decoration-underline" v-if="order.status == 7">
                        {{ $t('orderDetailes.Cancelled') }}
                    </h5>

                    <!--*** سبب الالغاء ***-->
                    <div class="detailes mb-4" v-if="order.cancel_reason && order.status == 7">
                        <h5 class="fs14 mb-2 c-dark4">{{ $t('orderDetailes.cancelledReason') }}</h5>

                        <p class="c-black">{{ order.cancel_reason }}</p>
                    </div>

                    <!--*** صور الارجاع ***-->
                    <div class="detailes mb-4" v-if="order.type == 1">
                        <h5 class="fs14 mb-3 c-white2">{{ $t('orderDetailes.photoReturnOrder') }}</h5>

                        <div class="d-flex gap-3 flex-wrap">
                            <div class='hidden-img border' v-for="img in order.attachments" :key="img.id">
                                <Image :src="img.file" alt="Image" class="fancyImg" preview />
                            </div>
                        </div>
                    </div>

                    <!--*** سبب الارجاع ***-->
                    <div class="detailes mb-4" v-if="order.type">
                        <h5 class="fs14 mb-2 c-dark4">{{ $t('orderDetailes.reasonReturn') }}</h5>

                        <p class="c-black">{{ order.notes }}</p>
                    </div>

                    <!--*** سبب الرفض ***-->
                    <div class="detailes mb-4" v-if="order.type == 1 && order.refuse_comment">
                        <h5 class="fs14 mb-2 c-dark4">{{ $t('orderDetailes.rejectReturn') }}</h5>

                        <p class="c-black">{{ order.refuse_comment }}</p>
                    </div>

                    <!--*** الملاحظات ***-->
                    <div class="detailes mb-4" v-if="order.notes">
                        <h5 class="fs14 mb-2 c-dark4">{{ $t('orderDetailes.feedback') }}</h5>

                        <p class="c-black">{{ order.notes }}</p>
                    </div>

                    <!--*** صورة الحوالة ***-->
                    <div class="detailes mb-4" v-if="order.bank_transfer_image && order.pay_type == 3">
                        <h5 class="fs14 mb-3 c-white2">{{ $t('orderDetailes.bankTransfer') }}</h5>

                        <div class="d-flex gap-3 flex-wrap">
                            <div class='hidden-img border'>
                                <Image :src="order.bank_transfer_image" alt="Image" class="fancyImg" preview />
                            </div>
                        </div>
                    </div>

                    <!--*** المنتجات ***-->
                    <div class="row align-items-center position-relative">
                        <div class="col-xl-9 col-lg-10">
                            <div class="table_con" v-if="orderProducts.length">
                                <div class="product_table">
                                    <div class="main-bb d-flex head">
                                        <div class="item big_td">{{ $t('cart.table.product') }}</div>
                                        <div class="item small_td lg">{{ $t('cart.table.price') }}</div>
                                        <div class="item small_td">{{ $t('cart.table.amount') }}</div>
                                        <div class="item small_td">{{ $t('cart.table.totalPrice') }}</div>
                                    </div>
                                    <OrderCard v-for="product in orderProducts" :product="product"
                                        :currency="order.currency" :key="product.id" />
                                </div>
                            </div>

                            <div class="alert alert-danger text-center fs13 mt-3" role="alert" v-else>
                                {{ $t('noData.orderProduct') }}
                            </div>
                        </div>
                    </div>

                    <!-- *** العمليات لطلب الارجاع *** -->
                    <div class="buttons" v-if="order.type == 1">

                        <!-- *** الموافقة على الطلب *** -->
                        <button type="button" class="main-btn login up lg mt-4" @click="acceptFunc" v-if="order.status === 4">
                            {{ $t('orderDetailes.buttons.accept') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingBtn" role="status"
                                aria-hidden="true"></span>
                        </button>

                        <!-- *** رفض الطلب *** -->
                        <button type="button" class="main-btn up red lg mt-4" @click="refuseModal = true"
                            v-if="order.status === 4">
                            {{ $t('orderDetailes.buttons.cancel') }}
                        </button>

                        <!-- *** فى الطريق *** -->
                        <button type="button" class="main-btn login up lg mt-4" v-if="order.status === 5"
                            @click="changeStauts(11)">
                            {{ $t('orderDetailes.buttons.inWay') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingBtn" role="status"
                                aria-hidden="true"></span>
                        </button>

                        <!-- *** تم استلام الطلب *** -->
                        <button type="button" class="main-btn login up lg mt-4" v-if="order.status === 11"
                            @click="changeStauts(14)">
                            {{ $t('orderDetailes.buttons.received') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingBtn" role="status"
                                aria-hidden="true"></span>
                        </button>
                    </div>


                    <!-- *** العمليات لطلب الشراء *** -->
                    <div class="buttons" v-if="order.type == 0">

                        <!-- *** تاكيد وبدء التجيز *** -->
                        <button type="button" class="main-btn up login lg mt-4"
                            v-if="order.status === 2 && order.pay_status === 2" @click="changeStauts(8)">
                            {{ $t('orderDetailes.buttons.confirm') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingBtn" role="status"
                                aria-hidden="true"></span>
                        </button>

                        <!-- تم تجهيز الطلب -->
                        <button type="button" class="main-btn up login lg mt-4" @click="changeStauts(9)"
                            v-if="order.status === 8">
                            {{ $t('orderDetailes.buttons.prepared') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingBtn" role="status"
                                aria-hidden="true"></span>
                        </button>

                        <!-- جارى الشحن -->
                        <button type="button" class="main-btn up login lg mt-4" v-if="order.status === 9"
                            @click="changeStauts(10)">
                            {{ $t('orderDetailes.buttons.Shipping') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingBtn" role="status"
                                aria-hidden="true"></span>
                        </button>

                        <!-- تم التسليم -->
                        <button type="button" class="main-btn up login lg mt-4" v-if="order.status === 10"
                            @click="changeStauts(14)">
                            {{ $t('orderDetailes.buttons.delivered') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingBtn" role="status"
                                aria-hidden="true"></span>
                        </button>
                    </div>
                </div>

                <!--******** Skeleton ********-->
                <div v-if="loading">
                    <div class="product_detailes">
                        <div class="main-items">

                            <div v-for="i in 3" :key="i">
                                <div class="fs13 d-flex my-3">
                                    <Skeleton height=".5rem" width="8rem"></Skeleton>
                                </div>

                                <div class="d-flex justify-content-between gap-3 flex-wrap mb-3" v-for="i in 4" :key="i">
                                    <Skeleton height=".5rem" width="6rem"></Skeleton>
                                    <Skeleton height=".5rem" width="6rem"></Skeleton>
                                </div>
                            </div>

                            <div class="row align-items-center position-relative mb-5">
                                <div class="col-xl-9 col-lg-10 ">
                                    <OrderProductSkeleton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Cancel Order Modal -->
    <Dialog id="cancelOrder" class="xl" :header="$t('modals.refuse.header')" v-model:visible="refuseModal" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <form action="" class="modal-form" ref="cancelForm" @submit.prevent="rejectFunc">
                    <div class="input-g mt-4">
                        <div class="main-input">
                            <textarea name="refuse_reason" class="input-me text-area light sm"
                                :placeholder="$t('modals.refuse.text')"></textarea>
                        </div>
                    </div>
                    <div class="buttons justify-content-center pt-3">
                        <button type="submit" class="main-btn modal_btn red up">
                            {{ $t('orderDetailes.buttons.cancel') }}
                            <span class="spinner-border spinner-border-sm" v-if="loadingImg" role="status"
                                aria-hidden="true"></span>
                        </button>
                        <button type="button" @click="refuseModal = false" class="main-btn modal_btn up">
                            {{ $t('modals.refuse.btn') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Dialog>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img src="@/assets/imgs/right_img.gif" alt="" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.refuseDone') }}</p>
                    <div class="buttons justify-content-center">
                        <router-link to="/" class="main-btn modal_btn up">{{ $t('modals.done.btn') }}</router-link>
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
import OrderCard from "@/components/Orders/OrderProduct.vue";
import OrderProductSkeleton from "@/components/Orders/OrderProductSkeleton.vue";
import Image from 'primevue/image';
import Dialog from 'primevue/dialog';
import axios from "axios";
import Skeleton from 'primevue/skeleton';
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

const route = useRoute();

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('muroujDashToken')}` }
};

// cancelForm
const cancelForm = ref(null);
const refuseModal = ref(false);
// const cancelledReason = ref(0);
// const loadingImg = ref(false);

// loading
const loading = ref(false);
const loadingBtn = ref(false);
const loadingImg = ref(false);

// done
const done = ref(false);

// Order Detailes
const order = ref({});
const orderProducts = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// getOrders
const getOrderDetailes = async (load) => {
    load ? loading.value = true : loading.value = false;
    await axios.get(`providers/orders/${orderId.value}/show`, config).then(res => {
        if (response(res) == "success") {
            order.value = res.data.data;
            orderProducts.value = res.data.data.items;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// changeStauts
const changeStauts = async (status) => {
    loadingBtn.value = true;
    const fd = new FormData();
    fd.append('order_id', orderId.value);
    fd.append('status', status);
    await axios.post(`providers/change-order-status`, fd, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            getOrderDetailes();
        } else {
            errorToast(res.data.msg);
        }
        loadingBtn.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// reject Order
const rejectFunc = async () => {
    loadingImg.value = true;
    const fd = new FormData(cancelForm.value);
    fd.append('order_id', orderId.value);

    await axios.post(`providers/refuse-retrieval-order`, fd, config).then(res => {
        if (response(res) == "success") {
            refuseModal.value = false;
            done.value = true;
            getOrderDetailes();
        } else {
            errorToast(res.data.msg);
        }
        loadingImg.value = false;
    }).catch(err => {
        console.error(err);
    });
}

const acceptFunc = async () => {
    loadingBtn.value = true;
    const fd = new FormData();
    fd.append('order_id', orderId.value);
    await axios.post(`providers/accept-retrieval-order`, fd, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            getOrderDetailes();
        } else {
            errorToast(res.data.msg);
        }
        loadingBtn.value = false;
    }).catch(err => {
        console.error(err);
    });
}

/******************* Computed *******************/
const orderId = computed(() => {
    return route.params.id
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getOrderDetailes(true);
});

</script>

<style lang="scss"></style>