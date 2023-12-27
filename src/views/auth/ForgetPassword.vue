<template>
    <main class="password main-padding">
        <div class="container">
            <PageHeader :title="$t('sectionTitle.restorePassword')" margin="mb-5"
                :desc="$t('sectionDesc.restorePassword')" />

            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <form action="" ref="forgetPassword" @submit.prevent="forgetPasswordFunc">

                        <div class="input-g">
                            <div class="main-input">
                                <input type="number" class="input-me validInputs" name="phone" v-model="phone"
                                    :placeholder="$t('restorePasswordForm.phone.placeholder')">
                                <Dropdown v-model="selectedCountry" @change="log" :options="countries" optionLabel="name"
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
                                            <img v-if="slotProps.option.image" :alt="slotProps.option.key"
                                                class="option-img" :src="slotProps.option.image" />
                                            <div>
                                                {{ slotProps.option.key }}
                                            </div>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <button type="submit" class="main-btn up mt-4 mx-auto" :disabled="loading">
                            <span v-if="!loading">
                                {{ $t('formBtns.send') }}
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios'
import toastMsg from '@/components/shared/Toaster';
import i18n from "@/i18n";
import PageHeader from '@/components/shared/PageHeader.vue';
import Dropdown from 'primevue/dropdown';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

const forgetPassword = ref(null);
const phone = ref('');
const loading = ref(false);
const router = useRouter();
const errors = ref([]);

// countries
const selectedCountry = ref({});
const countries = ref([]);

// Toast
const { successToast, errorToast } = toastMsg();

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/
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

// validate Func
function validate() {
    let allInputs = document.querySelectorAll('.validInputs');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(i18n.global.t(`validation.${allInputs[i].name}`));
        }
    }
}

// forgetPassword Function
const forgetPasswordFunc = async () => {
    loading.value = true;
    const fd = new FormData(forgetPassword.value);
    fd.append('country_code', selectedCountry.value.key);

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {

        await axios.post('forget-password-send-code', fd).then(res => {
            if (response(res) == "success") {
                localStorage.setItem('country_code', selectedCountry.value.key);
                localStorage.setItem('phone', phone.value);

                successToast(res.data.msg);

                router.push({
                    name: 'new-password'
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
onMounted(async () =>{
    await getCountries();
})
</script>

<style></style>