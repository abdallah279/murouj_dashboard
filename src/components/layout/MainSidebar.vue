<template>
    <!-- ************** Start Sidebar ************** -->
    <aside class="sidebar-m" id="sidebar">

        <router-link to="/" class="logo">
            <img src="@/assets/imgs/login_logo.png" alt="logo" class="img">
        </router-link>

        <div class='profile px-4'>
            <img src="@/assets/imgs/profile.png" alt="" class="circle_img lg">
            <div class="left mt-2">
                <h5 class="fs15 c-dark c-side mb-1">اسم مقدم الخدمة</h5>
            </div>
        </div>

        <ul class="links">

            <router-link to="/" class="link">
                <img src="@/assets/imgs/icons/sidebar/home.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.home') }}</span>
            </router-link>

            <router-link to="/products" class="link">
                <img src="@/assets/imgs/icons/sidebar/products.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.products') }} <span class="c-light ff-m">( 58 )</span></span>
            </router-link>

            <router-link to="/ourProducts" class="link">
                <img src="@/assets/imgs/icons/sidebar/products2.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.ourProducts') }}</span>
            </router-link>

            <router-link to="/orders" class="link">
                <img src="@/assets/imgs/icons/sidebar/orders.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.orders') }} <span class="c-light ff-m">( 58 )</span> </span>
            </router-link>

            <router-link to="/orders" class="link">
                <img src="@/assets/imgs/icons/sidebar/wishlist.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.wishlist') }} </span>
            </router-link>

            <router-link to="/wallet" class="link">
                <img src="@/assets/imgs/icons/sidebar/list.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.wallet') }} </span>
            </router-link>

            <router-link to="/profile" class="link">
                <img src="@/assets/imgs/icons/sidebar/setting.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.profile') }} </span>
            </router-link>

            <router-link to="/supervisors" class="link">
                <img src="@/assets/imgs/icons/sidebar/users.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.supervisors') }} </span>
            </router-link>

            <router-link to="/contact" class="link">
                <img src="@/assets/imgs/icons/sidebar/contact.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.contact') }} </span>
            </router-link>

            <router-link to="/reports" class="link">
                <img src="@/assets/imgs/icons/sidebar/reports.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.reports') }} </span>
            </router-link>

            <router-link to="/Invoices" class="link">
                <img src="@/assets/imgs/icons/sidebar/wallet.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.invoices') }} </span>
            </router-link>

            <button type="button" class="link">
                <img src="@/assets/imgs/icons/sidebar/logout.png" class="side-icon" alt="">
                <span class="text">{{ $t('sidebar.logout') }} </span>
            </button>

        </ul>

    </aside>
    <!-- ************** End Sidebar ************** -->
</template>

<script setup>

/******************* Import *******************/
import { ref } from 'vue';
import axios from 'axios';
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// loading
const loading = ref(false);

// Toast
const { successToast, errorToast } = toastMsg();

/******************* Props And Inject *******************/

/******************* Methods *******************/

// logout
const logout = async () => {

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    await axios.delete('sign-out', config).then(res => {
        if (response(res) == "success" || response(res) == "blocked") {

            let lKeys = ['token', 'user', 'country', 'city'];

            lKeys.forEach((key) => {
                localStorage.removeItem(key);
            });

            successToast(res.data.msg);
            checkAuth();
            router.push({
                name: 'home'
            });

        } else {
            errorToast(res.data.msg);
        }
    }).catch(err => console.log(err));
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style scoped></style>