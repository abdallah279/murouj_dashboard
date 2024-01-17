<template>
    <div class="product_item">

        <div class="product_img_td big_td with_m">

            <!--**** Product Image ****-->
            <div class="p_img">
                <img :src="product.product_image" alt="" class="img">
            </div>

            <!--**** Product Name ****-->
            <div class="c-black ff-d">{{ product.product_name }}</div>

        </div>

        <!--**** Product Price ****-->
        <div class="price_con small_td lg justify-content-center">
            <p class="price ff-m fs13" v-if="Number(product.price_after_discount)">
                {{ product.price_after_discount }} {{ currency }}
            </p>
            <p class="price ff-m fs13" :class="{ 'old c-dark4': Number(product.price_after_discount) }">
                {{ product.price || product.total }} {{ currency }}
            </p>
        </div>
        
        <!--**** Product Quantity ****-->
        <div class="small_td">
            <span class="sm_btn mx-auto">{{ product.quantity }}</span>
        </div>
        
        <!--**** Product Total Price ****-->
        <div class="small_td c-blue">
            <span>
                {{ product.total }} {{ currency }}
            </span>
        </div>
        
        <!--**** Product Delete Btn ****-->
        <button type="button" class="delete_btn px-3" v-if="deleteBtn" @click="deleteFromCart">
            <i class="pi pi-trash" v-if="!loading"></i>
            <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
        </button>

    </div>
</template>

<script setup>
/******************* Import *******************/
import { ref } from "vue";
import axios from "axios";
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';
import i18n from '@/i18n';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('muroujDashToken')}` }
};

// loading
const loading = ref(false);
const loadingCartPlus = ref(false);
const loadingCartMinus = ref(false);

// return quantity
const returnQuantity = ref(1);

/******************* Provide && Inject *******************/

/******************* Emits *******************/
const emit = defineEmits(['updateProduct']);

/******************* Props *******************/
const props = defineProps({
    product: {
        type: Object
    },
    showCount: {
        type: Boolean
    },
    returnPro: {
        type: Boolean
    },
    deleteBtn: {
        type: Boolean
    },
    currency:{
        type: String
    }
})

/******************* Methods *******************/

// Add To Cart
const addToCart = async (calc) => {
    let toastMsg = '';

    if (calc == 'plus') {
        props.product.quantity++;
        loadingCartPlus.value = true;
        toastMsg = i18n.global.t("products.increasedQuantity");
    } else {
        props.product.quantity > 1 ? props.product.quantity-- : false;
        loadingCartMinus.value = true;
        toastMsg = i18n.global.t("products.decreasedQuantity");
    }

    const fd = new FormData();
    if (props.product.offer_id) {
        fd.append('offer_id', props.product.offer_id);
    } else {
        fd.append('product_id', props.product.product_id);
    }
    fd.append('quantity', props.product.quantity);

    await axios.post(`carts`, fd, config).then(res => {
        if (response(res) == "success") {
            successToast(toastMsg);
            emit('updateProduct');
        } else {
            errorToast(res.data.msg);
            if (calc == 'plus') {
                props.product.quantity--;
            } else {
                props.product.quantity > 1 ? props.product.quantity++ : false;
            }
        }
        loadingCartPlus.value = false;
        loadingCartMinus.value = false;
    }).catch(err => {
        console.error(err);
    });

}

// delete Product From Cart
const deleteFromCart = async () => {
    loading.value = true;

    await axios.delete(`carts/${props.product.id}`, config).then(res => {
        if (response(res) == "success") {
            successToast(i18n.global.t("products.removedFromCart"));
            emit('updateProduct');
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

</script>

<style lang="scss"></style>