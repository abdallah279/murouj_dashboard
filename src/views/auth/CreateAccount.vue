<template>
    <main class="login main-padding">
        <div class="container">
            <PageHeader :title="$t('pagesTitle.createAccount')" margin="mb-5" />

            <form action="" ref="signUpForm" @submit.prevent="signUp">

                <!-- Photo -->
                <div class="input-g mb-5">
                    <div class="user-photo-con">
                        <div class="user-img">
                            <div class="profile-img">
                                <img :src="image" class="img" alt="">
                            </div>
                            <input type="file" name="image" @change="uploadImage" id="profileImg" accept="image/*"
                                class="hidden-input validInputs">
                            <label for="profileImg" class="user-camera">
                                <i class="pi pi-images"></i>
                            </label>
                        </div>

                    </div>
                </div>

                <div class="row align-items-center position-relative">
                    <div class="col-lg-6">

                        <div class="input-g">
                            <div class="main-input">
                                <input type="number" class="input-me validInputs" valid="phone" name="phone" v-model="phone"
                                    :placeholder="$t('loginForm.phone.placeholder')">

                                <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name"
                                    class="main-icon selectedCountry">
                                    <template #value="slotProps">
                                        <div v-if="slotProps.value" class="selected">
                                            <img v-if="slotProps.value.image" :alt="slotProps.value.label"
                                                :src="slotProps.value.image" class="option-img" />
                                            <div>{{ slotProps.value.key }}</div>
                                            <i class="pi pi-angle-down ic"></i>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="option">
                                            <img v-if="slotProps.option.image" :alt="slotProps.option.number"
                                                class="option-img" :src="slotProps.option.image" />
                                            <div>
                                                {{ slotProps.option.key }}
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="main-input">
                                <input type="text" class="input-me validInputs" name="name" v-model="name"
                                    :placeholder="$t('createAccountForm.name.placeholder')">
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="main-input">
                                <input type="email" class="input-me validInputs" name="email" v-model="email"
                                    :placeholder="$t('createAccountForm.email.placeholder')">
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="main-input">

                                <Dropdown v-model="country" @change="getCities"
                                    :placeholder="$t('createAccountForm.country.placeholder')" :options="countries"
                                    optionLabel="name" class="input-me">
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

                        <div class="input-g">
                            <div class="main-input">

                                <Dropdown v-model="city" :placeholder="$t('createAccountForm.city.placeholder')"
                                    :options="cities" optionLabel="name" class="input-me">
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

                        <div class="input-g">
                            <div class="main-input">
                                <input type="password" class="input-me validInputs" name="password" v-model="password"
                                    :placeholder="$t('createAccountForm.password.placeholder')">
                                <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="main-input">
                                <input type="password" class="input-me" v-model="confirmPassword"
                                    :placeholder="$t('createAccountForm.confirmPassword.placeholder')">
                                <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
                            </div>
                        </div>

                        <div class="input-g">
                            <div class="check-box form-check-m">
                                <input type="checkbox" name="conditions" id="conditions" v-model="terms">
                                <label class="check" for="conditions"></label>
                                <label class="check-anchor fs13 c-light2" for="conditions">
                                    {{ $t('createAccountForm.agree') }}
                                    <router-link to="/terms" class="text-decoration-underline c-main">
                                        {{ $t('createAccountForm.terms') }}
                                    </router-link>
                                </label>
                            </div>
                        </div>

                        <button type="submit" class="main-btn mt-4 w-100 up up-xl" :disabled="loading">
                            {{ $t('formBtns.create') }}
                            <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                                aria-hidden="true"></span>
                        </button>

                        <div class="create-acc mt-3 text-center c-light2">
                            {{ $t('createAccountForm.haveAccount') }}
                            <router-link :to="{ name: 'login' }" class="link text-decoration-underline c-main">
                                {{ $t('createAccountForm.login') }}
                            </router-link>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <img src="@/assets/imgs/login_logo.png" alt="" class="login_logo res d-block mx-auto">
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<script setup>
/******************* Import *******************/

import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';
import i18n from "@/i18n";
import PageHeader from '@/components/shared/PageHeader.vue';
import Dropdown from 'primevue/dropdown';
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

const router = useRouter();

const signUpForm = ref(null);
const loading = ref(false);

const image = ref(require('@/assets/imgs/profile.png'));
const name = ref('');
const phone = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const terms = ref(false);
const errors = ref([]);
const country = ref('');
const city = ref('');

// countries
const selectedCountry = ref({});

const countries = ref([]);

const cities = ref([]);

// Toast
const { successToast, errorToast } = toastMsg();

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// uploadImage Function
function uploadImage(e) {
    const userImage = e.target.files[0];
    const reader = new FileReader();
    if (userImage) {
        reader.readAsDataURL(userImage);
        reader.onload = e => {
            image.value = e.target.result;
        };
    } else {
        image.value = require('@/assets/imgs/profile.png');
    }
}

// togglePassword
const togglePassword = (e) => {
    let icon = e.currentTarget;
    let input = icon.closest('.main-input').querySelector('input');
    input.type === 'password' ? input.setAttribute('type', 'text') : input.setAttribute('type', 'password');
    icon.classList.contains('pi-eye') ? icon.classList.replace('pi-eye', 'pi-eye-slash') : icon.classList.replace('pi-eye-slash', 'pi-eye');
}

// Get All countries
const getCountries = async () => {
    await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            for(let i = 0; i < countries.value.length; i++){
                if(countries.value[i].id == 1){
                    selectedCountry.value = countries.value[i];
                }
            }
        }
    }).catch(err => console.log(err));
}

// Get All Cities
const getCities = async () => {
    await axios.get(`country/${country.value.id}/cities`).then(res => {
        if (response(res) == "success") {
            cities.value = res.data.data;
        }
    }).catch(err => console.log(err));
}

// Validation Function
function validate() {
    let allInputs = document.querySelectorAll('.validInputs');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(i18n.global.t(`validation.${allInputs[i].name}`));
        }
    }

    if (password.value !== confirmPassword.value) {
        errors.value.push(i18n.global.t(`validation.confirmPassword`));
    }

    if (!terms.value) {
        errors.value.push(i18n.global.t(`validation.conditions`));
    }
}

// signUp Function
const signUp = async () => {
    const fd = new FormData(signUpForm.value);
    fd.append('country_code', selectedCountry.value.key);
    fd.append('country_id', country.value.id);
    fd.append('city_id', city.value.id);
    fd.append('terms', terms.value);

    validate();
    
    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        loading.value = true;
        await axios.post('sign-up', fd).then(res => {
            if (response(res) == "success") {

                localStorage.setItem('user', JSON.stringify(res.data.data));
                successToast(res.data.msg);
                router.push({
                    name: 'code-account'
                });

            } else {
                errorToast(res.data.msg);
            }
            loading.value = false;
        }).catch(err => console.log(err));
    }
}


/******************* Computed *******************/
const lang = computed(() => {
    return localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ar'
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getCountries();
})
</script>

<style></style>