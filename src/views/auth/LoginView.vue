<template>
    <main class="login main-padding">
        <div class="container">
            <PageHeader :title="$t('sectionTitle.login')" margin="mb-5" />

            <div class="row align-items-center position-relative">

                <div class="col-lg-6">
                    <form action="" ref="loginForm" @submit.prevent="login">
                        <h3 class="form-title mb-2">{{ $t('loginForm.customers') }}</h3>
                        <p class="form-info mb-4">{{ $t('loginForm.signAddress') }}</p>
                        <div class="input-g">
                            <div class="main-input">
                                <input type="number" class="input-me validInputs" valid="phone" name="phone"
                                    v-model="account" :placeholder="$t('loginForm.phone.placeholder')">

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
                                            <img v-if="slotProps.option.image" alt=""
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
                                <input :type="passwordType" class="input-me validInputs" valid="password" name="password"
                                    v-model="password" :placeholder="$t('loginForm.password.placeholder')">
                                <i class="pi main-icon ic" :class="classPassword" @click="togglePassword"></i>
                            </div>
                        </div>

                        <div class="form-pass ">
                            <router-link to="/forget-password" class="link h-main">
                                {{ $t('loginForm.forgetPassword') }}
                            </router-link>
                        </div>

                        <div class="buttons mt-4 justify-content-center">
                            <button type="submit" class="main-btn up lg" :disabled="loading">
                                {{ $t('formBtns.login') }}
                                <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                                    aria-hidden="true"></span>
                            </button>
                        </div>

                        <div class="mt-3 text-center">
                            {{ $t('loginForm.haveAccount') }}
                        </div>

                        <div class="buttons mt-3 justify-content-center">
                            <router-link to="/create-account" class="main-btn transparent lg">
                                {{ $t('loginForm.createAccount') }}
                            </router-link>
                        </div>
                    </form>
                </div>

                <div class="col-lg-6">
                    <img src="@/assets/imgs/login_logo.png" alt="" class="login_logo res d-block mx-auto">
                </div>

            </div>

        </div>
    </main>
</template>

<script setup>
/******************* Import *******************/
import PageHeader from '@/components/shared/PageHeader.vue';
import { ref, computed, onMounted } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'
import i18n from "@/i18n";
import Dropdown from 'primevue/dropdown';
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

const account = ref('');
const loginForm = ref(null);
const password = ref('');
const passwordType = ref('password');
const loading = ref(false);
const router = useRouter();
const errors = ref([]);

// countries
const selectedCountry = ref({})
const countries = ref([]);

const { successToast, errorToast } = toastMsg();

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// togglePassword
const togglePassword = () => {
    passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
}

// Get All countries
const getCountries = async () => {
    await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            for (let i = 0; i < countries.value.length; i++) {
                if (countries.value[i].id == 1) {
                    selectedCountry.value = countries.value[i];
                }
            }
        }
    }).catch(err => console.log(err));
}

// validation Function
function validate() {
    let allInputs = document.querySelectorAll('.validInputs');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(i18n.global.t(`validation.${allInputs[i].getAttribute('valid')}`));
        }
    }
}

// login Function
const login = async () => {
    loading.value = true;
    const fd = new FormData(loginForm.value);
    fd.append('country_code', selectedCountry.value.key);
    // fd.append('device_id', localStorage.getItem('notificationToken'));
    fd.append('device_id', 111);
    fd.append('device_type', 'web');

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        await axios.post('sign-in?count_notifications', fd).then(res => {
            if (response(res) == "success") {
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.data));
                successToast(res.data.msg);

                router.push({
                    name: 'home'
                });

            } else {
                errorToast(res.data.msg);
            }
            loading.value = false;
        }).catch(err => console.log(err));
    }
}

/******************* Computed *******************/
const classPassword = computed(() => ({
    'pi-eye-slash': passwordType.value === 'text',
    'pi-eye': passwordType.value === 'password'
}))

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getCountries();
})
</script>

<style></style>