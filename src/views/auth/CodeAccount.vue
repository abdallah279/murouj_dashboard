<template>
    <main class="codeAccount main-padding">
        <div class="container">
            <PageHeader :title="$t('sectionTitle.verificationCode')" margin="mb-5" :desc="$t('sectionDesc.codeForm')" />

            <div class="row justify-content-center">
                <div class="col-lg-6">

                    <form action="" @submit.prevent="verificationCode">

                        <v-otp-input ref="otpInput" v-model:value="bindModal" dir="ltr" class="justify-content-center mb-4"
                            input-classes="otp-input" separator="" :num-inputs="6" :should-auto-focus="true"
                            input-type="letter-numeric" />

                        <div class="d-flex gap-1 justify-content-center c-light">
                            {{ $t('codeForm.text') }}
                            <button type="button" @click="resendCode"
                                class="bg-transparent d-block text-decoration-underline c-main">
                                {{ $t('formBtns.receiveCode') }}
                            </button>
                        </div>

                        <button type="submit" class="main-btn up mx-auto lg mt-4" :disabled="loading">
                            <span v-if="!loading">
                                {{ $t('formBtns.activeCode') }}
                            </span>
                            <div v-if="loading">
                                {{ $t('formBtns.sendLoading') }}
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </div>
                        </button>

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
import VOtpInput from "vue3-otp-input";
import axios from 'axios';
import toastMsg from '@/components/shared/Toaster';
import PageHeader from '@/components/shared/PageHeader.vue';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

const loading = ref(false);
const otpInput = ref(null);
const bindModal = ref("");
const router = useRouter();

let phone = ref(JSON.parse(localStorage.getItem('user')).phone);
let country_code = ref(JSON.parse(localStorage.getItem('user')).country_code);

// Toast
const { successToast, errorToast } = toastMsg();

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

const verificationCode = async () => {
    loading.value = true;
    const fd = new FormData();
    fd.append('code', bindModal.value);
    phone.value ? fd.append('phone', phone.value) : '';
    country_code.value ? fd.append('country_code', country_code.value) : '';

    fd.append('device_id', 111);
    // fd.append('device_id', localStorage.getItem('notificationToken'));
    fd.append('device_type', 'web');

    await axios.post('activate?_method=patch', fd).then(res => {
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

<style lang="scss"></style>