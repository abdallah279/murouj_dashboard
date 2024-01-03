<template>
    <form action="" ref="codeForm" @submit.prevent="activeAccount">
        <h3 class="form-title mb-2">{{ $t('pagesTitle.activeAccount') }}</h3>
        <p class="form-info mb-4">{{ $t('sectionDesc.codeForm') }}</p>

        <div class="input-g">
            <!-- <label for="" class="main-label">{{ $t('restorePasswordForm.code.text') }}</label> -->
            <div class="main-input">
                <input type="number" class="input-me validInputs" valid="code" name="code"
                    :placeholder="$t('restorePasswordForm.code.text')">
            </div>
        </div>

        <div class="buttons mt-4 justify-content-center">
            <button type="submit" class="main-btn login up lg" :disabled="loading">
                {{ $t('formBtns.confirm') }}
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
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

const codeForm = ref(null);
const loading = ref(false);
const router = useRouter();
const errors = ref([]);

const { successToast, errorToast } = toastMsg();

let phone = ref(localStorage.getItem('activePhone'));
let country_code = ref(localStorage.getItem('activeCountry_code'));

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

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
const activeAccount = async () => {
    loading.value = true;
    const fd = new FormData(codeForm.value);
    fd.append('phone', phone.value);
    fd.append('country_code', country_code.value);
    // fd.append('country_code', selectedCountry.value.key);
    // fd.append('device_id', localStorage.getItem('notificationToken'));
    // fd.append('device_id', 111);
    // fd.append('device_type', 'web');

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        await axios.post('providers/reset-password', fd).then(res => {
            if (response(res) == "success") {
                successToast(res.data.msg);

                let lKeys = ['activePhone', 'activeCountry_code'];

                lKeys.forEach((key) => {
                    localStorage.removeItem(key);
                });

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

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style></style>