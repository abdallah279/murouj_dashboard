<template>
    <form action="" ref="loginForm" @submit.prevent="login">
        <h3 class="form-title mb-2">{{ $t('loginForm.login') }}</h3>
        <p class="form-info mb-4">{{ $t('loginForm.hello') }}</p>

        <div class="input-g">
            <label for="" class="main-label">{{ $t('loginForm.phone.text') }}</label>
            <div class="main-input">
                <input type="number" class="input-me validInputs" valid="phone" name="phone"
                    :placeholder="$t('loginForm.phone.placeholder')">

                <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name"
                    class="main-icon selectedCountry">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="selected">
                            <img v-if="slotProps.value.image" :alt="slotProps.value.label" :src="slotProps.value.image"
                                class="option-img" />
                            <div>{{ slotProps.value.key }}</div>
                            <i class="pi pi-angle-down ic"></i>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="option">
                            <img v-if="slotProps.option.image" alt="" class="option-img" :src="slotProps.option.image" />
                            <div>
                                {{ slotProps.option.key }}
                            </div>
                        </div>
                    </template>
                </Dropdown>
            </div>
        </div>

        <div class="input-g">
            <label for="" class="main-label">{{ $t('loginForm.password.text') }}</label>
            <div class="main-input">
                <input :type="passwordType" class="input-me validInputs" valid="password" name="password"
                    :placeholder="$t('loginForm.password.placeholder')">
                <i class="pi main-icon ic" :class="classPassword" @click="togglePassword"></i>
            </div>
        </div>

        <div class="d-flex-between">
            <div class="check-box form-check-m">
                <input type="checkbox" name="remember" id="remember" v-model="remember">
                <label class="check" for="remember"></label>
                <label class="check-anchor fs13 c-black" for="remember">
                    {{ $t('loginForm.remember') }}
                </label>
            </div>
            <div class="form-pass ">
                <router-link to="/forget-password" class="link h-main">
                    {{ $t('loginForm.forgetPassword') }}
                </router-link>
            </div>
        </div>

        <div class="buttons mt-4 justify-content-center">
            <button type="submit" class="main-btn login up lg" :disabled="loading">
                {{ $t('formBtns.login') }}
                <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
            </button>
        </div>

    </form>
</template>

<script setup>
/******************* Import *******************/
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

const loginForm = ref(null);
const passwordType = ref('password');
const loading = ref(false);
const router = useRouter();
const errors = ref([]);

// remember
const remember = ref(false);

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
        await axios.post('providers/sign-in?count_notifications', fd).then(res => {
            if (response(res) == "success") {
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('image', res.data.data.image);
                localStorage.setItem('name', res.data.data.name);
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