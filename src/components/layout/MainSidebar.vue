<template>
    <!-- ************** Start Sidebar ************** -->
    <aside class="sidebar-m" id="sidebar">

        <router-link to="/" class="logo">
            <img src="@/assets/imgs/login_logo.png" alt="logo" class="img">
        </router-link>

        <div class='profile px-4'>
            <img :src="image" alt="" class="circle_img lg">
            <div class="left mt-2">
                <h5 class="fs15 c-dark c-side mb-1">{{ name }}</h5>
            </div>
        </div>

        <ul class="links">

            <router-link to="/" class="link sideLink" data-id="1">
                <img src="@/assets/imgs/icons/sidebar/home.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.home') }}</span>
            </router-link>

            <router-link to="/products" class="link sideLink" data-id="2">
                <img src="@/assets/imgs/icons/sidebar/products.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.products') }} <span class="c-light ff-m">( {{ productsCount }}
                        )</span></span>
            </router-link>

            <router-link to="/ourProducts" class="link sideLink" data-id="2">
                <img src="@/assets/imgs/icons/sidebar/products2.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.ourProducts') }}</span>
            </router-link>

            <router-link to="/orders" class="link sideLink" data-id="3">
                <img src="@/assets/imgs/icons/sidebar/orders.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.orders') }} <span class="c-light ff-m">( {{ ordersCount }} )</span>
                </span>
            </router-link>

            <router-link to="/ProvideOrders" class="link sideLink" data-id="3">
                <img src="@/assets/imgs/icons/sidebar/wishlist.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.wishlist') }} </span>
            </router-link>

            <div class="collapse_links sideLink" data-id="4">
                <a class="link collapse_head" data-bs-toggle="collapse" href="#collapseExample" role="button"
                    :aria-expanded="false" aria-controls="collapseExample">
                    <img src="@/assets/imgs/icons/sidebar/list.png" class="side-icon" alt="">
                    <span class="text">{{ $t('sidebar.wallet') }} </span>
                </a>
                <div class="links_collapse_content collapse" id="collapseExample">
                    <router-link to="/financial" class="link">
                        <i class="pi pi-money-bill side-icon"></i>
                        <span class="text">{{ $t('sidebar.financial') }}</span>
                        <i class="pi pi-angle-left sec_ic"></i>
                    </router-link>

                    <router-link to="/settlements" class="link">
                        <i class="pi pi-box side-icon"></i>
                        <span class="text">{{ $t('sidebar.settlement') }} </span>
                        <i class="pi pi-angle-left sec_ic"></i>
                    </router-link>
                </div>
            </div>

            <router-link to="/profile" class="link sideLink" data-id="5">
                <img src="@/assets/imgs/icons/sidebar/setting.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.profile') }} </span>
            </router-link>

            <router-link to="/supervisors" class="link sideLink" data-id="6">
                <img src="@/assets/imgs/icons/sidebar/users.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.supervisors') }} </span>
            </router-link>

            <router-link to="/contact" class="link ">
                <img src="@/assets/imgs/icons/sidebar/contact.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.contact') }} </span>
            </router-link>

            <router-link to="/reports" class="link sideLink" data-id="7">
                <img src="@/assets/imgs/icons/sidebar/reports.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.reports') }} </span>
            </router-link>

            <router-link to="/Invoices" class="link sideLink" data-id="8">
                <img src="@/assets/imgs/icons/sidebar/wallet.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.invoices') }} </span>
            </router-link>

            <button type="button" @click="logout" class="link">
                <img src="@/assets/imgs/icons/sidebar/logout.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.logout') }} </span>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loading"></span>
            </button>

        </ul>

    </aside>
    <!-- ************** End Sidebar ************** -->
</template>

<script setup>

/******************* Import *******************/
import { watch, ref, onMounted, computed } from 'vue';
import axios from 'axios';
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';
import { useRouter, useRoute } from 'vue-router';

/******************* Data *******************/

// success response
const { response } = responseApi();

// loading
const loading = ref(false);

// router
const router = useRouter();
const route = useRoute();

// Counts
const ordersCount = ref(0);
const productsCount = ref(0);

// image
const image = ref(localStorage.getItem("image"));
const name = ref(localStorage.getItem("providerName"));

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// Toast
const { successToast, errorToast } = toastMsg();

/******************* Props And Inject *******************/

/******************* Methods *******************/

// getData
const getData = async () => {
    await axios.get('providers/provider-all-counts', config).then(res => {
        if (response(res) == "success") {
            productsCount.value = res.data.data.provider_products_count;
            ordersCount.value = res.data.data.all_orders_count;
        }
    }).catch(err => console.log(err));
}

// logout
const logout = async () => {
    loading.value = true;

    await axios.delete('sign-out', config).then(res => {
        if (response(res) == "success" || response(res) == "blocked") {

            let lKeys = ['token', 'image', 'name', 'providerName', 'privileges'];

            lKeys.forEach((key) => {
                localStorage.removeItem(key);
            });

            successToast(res.data.msg);
            router.push({
                name: 'login'
            });

        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

const checkPermissions = () => {
    let allLinks = document.querySelectorAll('.links .sideLink')
    for (let j = 0; j < allLinks.length; j++) {

        if (!privileges.value.find(privilege => privilege.id == allLinks[j].getAttribute('data-id'))) {
            allLinks[j].remove();
        }

    }
}

/******************* Computed *******************/
const privileges = computed(() => {
    return JSON.parse(localStorage.getItem("privileges"));
});

/******************* Watch *******************/
watch(route, (newVal) => {
    image.value = localStorage.getItem("image");
    name.value = localStorage.getItem("providerName");
});

/******************* Mounted *******************/
onMounted(async () => {
    privileges.value.length ? checkPermissions() : '';
    await getData();
});

</script>

<style scoped></style>