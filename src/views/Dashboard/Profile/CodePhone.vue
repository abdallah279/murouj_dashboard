<template>
    <form action="" class="card_style py-4 px-lg-5" ref="verificationCodeForm" @submit.prevent="verificationCode">
        <div class="row">
            <div class="col-lg-8">

                <img src="@/assets/imgs/login_logo.png" alt="" class="login_logo sm mb-4 d-block">

                <div class="d-flex gap-1 c-side ff-d mb-4">
                    {{ $t('sectionDesc.codePhone') }}
                    <span class="bg-transparent d-block text-decoration-underline c-sec">
                        {{ newPhone }}
                    </span>
                </div>

                <div class="input-g">
                    <label for="" class="main-label">{{ $t('codeForm.code') }}</label>
                    <div class="main-input">
                        <input type="number" class="input-me validInputs" name="code"
                            :placeholder="$t('restorePasswordForm.code.text')">
                    </div>
                </div>

                <button type="submit" class="main-btn up lg mt-4 login" :disabled="loading">
                    <span v-if="!loading">
                        {{ $t('formBtns.save') }}
                    </span>
                    <div v-if="loading">
                        {{ $t('formBtns.saveLoading') }}
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </div>
                </button>

                <div class="d-flex gap-1 c-light mt-3">
                    {{ $t('codeForm.text') }}
                    <button type="button" @click="resendCode"
                        class="bg-transparent d-block text-decoration-underline c-sec">
                        {{ $t('formBtns.receiveCode') }}
                    </button>
                </div>

            </div>
        </div>
    </form>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img src="@/assets/imgs/right_img.gif" alt="" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.changePhone') }}</p>
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
import { ref } from "vue";
import axios from 'axios'
import toastMsg from '@/components/shared/Toaster';
import Dialog from 'primevue/dialog';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

const loading = ref(false);

// verificationCodeForm
const verificationCodeForm = ref(null);

// Modal
const done = ref(false);

// let phone = ref(JSON.parse(localStorage.getItem('user')).phone);
let newPhone = ref(localStorage.getItem('newPhone'));
// let country_code = ref(JSON.parse(localStorage.getItem('user')).country_code);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// newPhone Function
const verificationCode = async () => {
    loading.value = true;
    const fd = new FormData(verificationCodeForm.value);

    await axios.post("providers/change-phone-check-code", fd, config).then(res => {
        if (response(res) == "success") {
            done.value = true;
            localStorage.getItem('newPhone') ? localStorage.removeItem('newPhone') : '';
        } else {
            errorToast(res.data.msg)
        }
        loading.value = false;
    }).catch(err => console.log(err));
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