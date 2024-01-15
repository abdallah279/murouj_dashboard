<template>
    <form action="" class="card_style py-4 px-lg-5" ref="newPhoneForm" @submit.prevent="newPhone">
        <div class="row ">
            <div class="col-lg-8">

                <img src="@/assets/imgs/login_logo.png" alt="" class="login_logo sm mb-4 d-block">
                <p class="form-title fs13 mb-2 text-end">{{ $t('sectionDesc.newPhone') }}</p>


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
                                    <img v-if="slotProps.option.image" :alt="slotProps.option.number" class="option-img"
                                        :src="slotProps.option.image" />
                                    <div>
                                        {{ slotProps.option.key }}
                                    </div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                </div>

                <button type="submit" class="main-btn up lg mt-4 login" :disabled="loading">
                    <span v-if="!loading">
                        {{ $t('formBtns.confirm') }}
                    </span>
                    <div v-if="loading">
                        {{ $t('formBtns.confirming') }}
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </div>
                </button>

            </div>
        </div>
    </form>
</template>

<script setup>
/******************* Import *******************/
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios'
import toastMsg from '@/components/shared/Toaster';
import i18n from "@/i18n";
import Dropdown from 'primevue/dropdown';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();
const newPhoneForm = ref(null);
const phone = ref('');
const loading = ref(false);
const router = useRouter();
const errors = ref([]);

// countries
const countries = ref([]);
const selectedCountry = ref({});

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

// newPhone Function
const newPhone = async () => {
    loading.value = true;
    const fd = new FormData(newPhoneForm.value);
    fd.append('country_code', selectedCountry.value.key);

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        await axios.post('providers/change-phone-send-code', fd, config).then(res => {
            if (response(res) == "success") {

                localStorage.setItem('newPhone', phone.value);
                localStorage.setItem('newKey', selectedCountry.value.key);

                successToast(res.data.msg);
                router.push({
                    name: 'code-phone'
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
onMounted(async () => {
    await getCountries();
})
</script>

<style></style>