<template>
    <main class="password main-padding">
        <div class="container">
            <PageHeader :title="$t('sectionTitle.restorePassword')" margin="mb-5" :desc="$t('sectionDesc.codeForm')" />

            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <form action="" ref="newPassForm" @submit.prevent="newPasswordFunc">

                        <div class="input-g">
                            <div class="main-input">
                                <input type="number" class="input-me validInputs" name="code" v-model="code"
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
                                <input type="password" class="input-me" v-model="confirmPassword"
                                    :placeholder="$t('restorePasswordForm.confirmNewPassword.text')">
                                <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
                            </div>
                        </div>

                        <button type="submit" class="main-btn up mt-4 mx-auto" :disabled="loading">
                            <span v-if="!loading">
                                {{ $t('formBtns.save') }}
                            </span>
                            <div v-if="loading">
                                {{ $t('formBtns.saveLoading') }}
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </div>
                        </button>

                        <div class="d-flex gap-1 justify-content-center mt-4 c-light">
                            {{ $t('codeForm.text') }}
                            <button type="button" @click="resendCode"
                                class="bg-transparent d-block text-decoration-underline c-main">
                                {{ $t('formBtns.receiveCode') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
/******************* Import *******************/
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios'
import toastMsg from '@/components/shared/Toaster';
import i18n from "@/i18n";
import PageHeader from '@/components/shared/PageHeader.vue';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

const newPassForm = ref(null);
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const router = useRouter();
const errors = ref([]);

// Toast
const { successToast, errorToast } = toastMsg();

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

let phone = ref(localStorage.getItem('phone'));
let country_code = ref(localStorage.getItem('country_code'));

// forgetPasswordCode Function
const newPasswordFunc = async () => {
    loading.value = true;
    const fd = new FormData(newPassForm.value);
    fd.append('phone', phone.value);
    fd.append('confirmPassword', confirmPassword.value);
    fd.append('country_code', country_code.value);

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {

        await axios.post('reset-password', fd).then(res => {
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
    await axios.get(`resend-code?country_code=${country_code.value}&phone=${phone.value}`).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
        } else {
            errorToast(res.data.msg);
        }
    }).catch(err => console.log(err));
}
/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style></style>