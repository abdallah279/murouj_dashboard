<template>
    <form action="" ref="newPassForm" @submit.prevent="newPasswordFunc">
        <h3 class="form-title mb-2">{{ $t('restorePasswordForm.header') }}</h3>
        <p class="form-info mb-4">{{ $t('restorePasswordForm.desc2') }}</p>

        <div class="input-g">
            <div class="main-input">
                <input type="number" class="input-me validInputs" name="code"
                    :placeholder="$t('restorePasswordForm.code.text')">
            </div>
        </div>

        <div class="input-g">
            <div class="main-input">
                <input type="password" class="input-me validInputs" name="password" v-model="password"
                    :placeholder="$t('restorePasswordForm.newPassword.text')">
                <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
            </div>
        </div>

        <div class="input-g">
            <div class="main-input">
                <input type="password" class="input-me" name="password_confirmation" v-model="confirmPassword"
                    :placeholder="$t('restorePasswordForm.confirmNewPassword.text')">
                <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
            </div>
        </div>



        <div class="d-flex-c gap-3 mt-4">
            <button type="submit" class="main-btn login up" :disabled="loading">
                <span v-if="!loading">
                    {{ $t('formBtns.changePass') }}
                </span>
                <div v-if="loading">
                    {{ $t('formBtns.sendLoading') }}
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </div>
            </button>

            <button type="button" @click="returnFunc" class="main-btn dark_transparent">
                {{ $t('formBtns.return') }}
            </button>
        </div>

        <div class="d-flex gap-1 justify-content-center mt-4 c-light">
            {{ $t('codeForm.text') }}
            <button type="button" @click="resendCode" :disabled="disabledBtn"
                class="bg-transparent d-block text-decoration-underline c-main">
                {{ $t('formBtns.receiveCode') }}
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                    v-if="loadingResend"></span>
            </button>
        </div>

        <div class="mt-3 text-center">{{ counterText }}</div>
    </form>
</template>

<script setup>
/******************* Import *******************/
import { ref , onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios'
import toastMsg from '@/components/shared/Toaster';
import i18n from "@/i18n";
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

const newPassForm = ref(null);
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const errors = ref([]);

// loading
const loading = ref(false);
const loadingResend = ref(false);

let phone = ref(localStorage.getItem('phone'));
let country_code = ref(localStorage.getItem('country_code'));

// Toast
const { successToast, errorToast } = toastMsg();

// counter
const counterNum = ref(60);
const counterText = ref('');

// disabledBtn
const disabledBtn = ref(false);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// togglePassword
const togglePassword = (e) => {
    let icon = e.currentTarget;
    let input = icon.closest('.main-input').querySelector('input');
    input.type === 'password' ? input.setAttribute('type', 'text') : input.setAttribute('type', 'password');
    icon.classList.contains('pi-eye') ? icon.classList.replace('pi-eye', 'pi-eye-slash') : icon.classList.replace('pi-eye-slash', 'pi-eye');
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
}

// forgetPasswordCode Function
const newPasswordFunc = async () => {
    loading.value = true;
    const fd = new FormData(newPassForm.value);
    fd.append('phone', phone.value);
    fd.append('country_code', country_code.value);

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {

        await axios.post('providers/reset-password', fd).then(res => {
            if (response(res) == "success") {
                localStorage.removeItem("phone");
                localStorage.removeItem('country_code');
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
}

// resendCode Function
const resendCode = async () => {
    loadingResend.value = true;
    disabledBtn.value = true;
    const fd = new FormData();

    fd.append('phone', phone.value);
    fd.append('country_code', country_code.value);

    await axios.post('providers/forget-password-send-code', fd).then(res => {
        if (response(res) == "success") {

            successToast(res.data.msg);
            counterNum.value = 60;
            codeCounter();

        } else {
            errorToast(res.data.msg);
        }
        loadingResend.value = false;
    }).catch(err => console.log(err));
}

// returnFunc
const returnFunc = () => {
    router.go(-1);
    let lKeys = ['phone', 'country_code'];

    lKeys.forEach((key) => {
        localStorage.removeItem(key);
    });
}


let counter;
function codeCounter() {
    disabledBtn.value = true;

    counter = setInterval(function () {
        counterNum.value--;
        if (counterNum.value < 60) {
            counterText.value = `${counterNum.value} : 00`;
        }

        if (counterNum.value > 60) {
            counterText.value = `00 : ${counterNum.value}`;
        }

        if (counterNum.value < 10) {
            counterText.value = `0${counterNum.value} : 00`;
        }

        if (counterNum.value == 0) {
            clearInterval(counter);
            disabledBtn.value = false;
        }
    }, 1000);
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

onMounted(() => {
    codeCounter();
});

</script>

<style></style>