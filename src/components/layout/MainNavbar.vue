<template>
    <!-- ************** Start Navbar ************** -->
    <nav class="navbar-m nav_style main-padding-right">
        <div class="container ">
            <div class="navbar-content">

                <div class="left-sec">

                    <router-link to="/notifications" class="not_link">
                        <font-awesome-icon :icon="['fas', 'bell']" class="ic" />
                        <span class='count'></span>
                    </router-link>

                    <router-link to="/profile" class="profile-drop">
                        <img src="@/assets/imgs/profile_img.jpg" class="profile-img" alt="">
                        <span class="profile-name">{{ $t('sidebar.hi') }}</span>
                    </router-link>

                    <div class="not_link side-open" @click="activeFun">
                        <i class="pi pi-align-left ic"></i>
                    </div>

                    <div class="dropdown">
                        <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="pi pi-globe drop-ic"></i>
                            <span class="lang drop-text">{{ $t('sidebar.lang') }}</span>
                            <i class="pi pi-angle-down drop-ic"></i>
                        </button>

                        <ul class="dropdown-menu left drop-lang">
                            <li>
                                <a href="#" class="profile-item" @click="toggleLang('ar')">العربية</a>
                            </li>
                            <li>
                                <a href="#" class="profile-item" @click="toggleLang('en')">English</a>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>

    </nav>
    <!-- ************** End Navbar ************** -->

    <div class="nav-overlay" :class="{ active: active }" @click="activeFun"></div>
</template>

<script setup>

/******************* Import *******************/
import { onMounted, ref, watch } from 'vue';
import i18n from "@/i18n/index";
import toastMsg from '@/components/shared/Toaster';
import { useRouter, useRoute } from 'vue-router';

/******************* Data *******************/

// Active Sidebar
const active = ref(false);

// Toast
const { errorToast } = toastMsg();


// loading
const loading = ref(false);

// Router
const router = useRouter();

// Route
const route = useRoute();

// notifications
const notCount = ref(0);

/******************* Methods *******************/

// getLocal
function getLocal() {
    const localLang = localStorage.getItem("lang");
    if (localLang) {
        i18n.global.locale = localLang;
        document.querySelector("html").setAttribute("lang", localLang);
    }
}

// toggleLang
function toggleLang(lang) {
    localStorage.setItem("lang", lang);
    window.location.reload();
}


// Toggle Sidebar
function activeFun() {
    active.value = !active.value;
    document.getElementById("sidebar").classList.toggle("active");
}

/******************* Computed *******************/

/******************* Watch *******************/

watch(route, (newVal) => {
    if(active.value) activeFun();
    newVal.name == 'notifications' ? notCount.value = 0 : '';
});

/******************* Mounted *******************/
onMounted(() => {
    getLocal();
});

</script>

<style ></style>