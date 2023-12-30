<template>
    <form action="" class="card_style py-4 px-lg-5" ref="changePhoneForm" @submit.prevent="changePhone">
        <div class="row">
            <div class="col-lg-8">

                <img src="@/assets/imgs/login_logo.png" alt="" class="login_logo sm mb-4 d-block">

                <div class="input-g">
                    <div class="main-input">
                        <input type="password" class="input-me validInputs" name="password"
                            :placeholder="$t('changePhoneForm.currentPassword.text')">
                        <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
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

                <button type="submit" class="main-btn login up lg mt-4" :disabled="loading">
                    <span v-if="!loading">
                        {{ $t('formBtns.save') }}
                    </span>
                    <div v-if="loading">
                        {{ $t('formBtns.saving') }}
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </div>
                </button>

            </div>
        </div>
    </form>
</template>

<script setup>
/******************* Import *******************/
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios'
import toastMsg from '@/components/shared/Toaster';
import i18n from "@/i18n";
import PageHeader from '@/components/shared/PageHeader.vue';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

const router = useRouter();

// Form
const changePhoneForm = ref(null);

// password
const passwordType = ref('password');
const password = ref('');

// loading
const loading = ref(false);

// errors
const errors = ref([]);

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
}

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};


// changePassword
const changePhone = async () => {
    router.push({
        name: 'profile'
    });
    // loading.value = true;
    // const fd = new FormData(changePhoneForm.value);

    // validate();

    // if (errors.value.length) {
    //     errorToast(errors.value[0]);
    //     loading.value = false;
    //     errors.value = [];
    // } else {
    //     await axios.post('check-current-password', fd, config).then(res => {
    //         if (response(res) == "success") {

    //             successToast(res.data.msg);
    // router.push({
    //     name: 'newPhone'
    // });

    //         } else {
    //             errorToast(res.data.msg);
    //         }
    //         loading.value = false;
    //     }).catch(err => console.log(err));
    // }
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style></style>