<template>
    <form action="" class="card_style py-5 px-lg-5" ref="editAccountForm" @submit.prevent="editAccount">

        <!-- Photo -->
        <div class="input-g">
            <div class="user-img">
                <div class="profile-img">
                    <img :src="image" class="img" alt="">
                </div>
                <input type="file" name="image" @change="uploadImage" id="profileImg" accept="image/*"
                    class="hidden-input validInputs">
                <label for="profileImg" class="user-camera">
                    <i class="pi pi-images"></i>
                </label>
                <span class="c-dark3 d-block mt-3">{{ $t('profile.image') }}</span>
            </div>
        </div>

        <div class="row align-items-center position-relative gy-4 mt-5">
            <div class="col-lg-8">

                <!-- Name -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('profile.form.name.text') }}</label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" name="name" v-model="name"
                            :placeholder="$t('profile.form.name.placeholder')">
                        <i class="pi main-icon pi-user-edit"></i>
                    </div>
                </div>

                <!-- Phone -->
                <div class="input-g disabled">
                    <label for="" class="main-label">{{ $t('loginForm.phone.text') }}</label>
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

                <!-- Change Phone -->
                <div class="form-pass mb-4">
                    <router-link to="/change-phone" class="link c-sec h-main">
                        {{ $t('createAccountForm.changePhone') }}
                    </router-link>
                </div>

                <!-- Country -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('createAccountForm.country.text') }}</label>
                    <div class="main-input">

                        <Dropdown v-model="country" @change="getCities"
                            :placeholder="$t('createAccountForm.country.placeholder')" :options="countries"
                            optionLabel="name" class="input-me">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="selected">
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="option">
                                    <div>
                                        {{ slotProps.option.name }}
                                    </div>
                                </div>
                            </template>
                        </Dropdown>

                        <i class="pi pi-angle-down main-icon"></i>

                    </div>
                </div>

                <!-- City -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('createAccountForm.city.text') }}</label>
                    <div class="main-input">

                        <Dropdown v-model="city" :placeholder="$t('createAccountForm.city.placeholder')" :options="cities"
                            optionLabel="name" class="input-me">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="selected">
                                    {{ slotProps.value.name }}
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="option">
                                    {{ slotProps.option.name }}
                                </div>
                            </template>
                        </Dropdown>

                        <i class="pi pi-angle-down main-icon"></i>

                    </div>
                </div>

                <!-- Tax Number -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('profile.form.taxNumber.text') }}</label>
                    <div class="main-input">
                        <input type="number" class="input-me validInputs" name="tax_number" v-model="tax_number"
                            :placeholder="$t('profile.form.taxNumber.placeholder')">
                    </div>
                </div>

                <!-- Address -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('profile.form.address.text') }}</label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" name="address" @click="mapModal = true"
                            v-model="address" :placeholder="$t('profile.form.address.placeholder')">
                        <i class="pi pi-map-marker main-icon"></i>
                    </div>
                </div>

                <!-- Images -->
                <div class="d-flex gap-4 input-g">

                    <div class="input_image">
                        <label for="" class="main-label">{{ $t('profile.nationalId') }}</label>
                        <UploadImages @update="updatedImages" />
                    </div>

                    <div class="input_image">
                        <label for="" class="main-label">{{ $t('profile.commercial') }}</label>
                        <UploadImages @update="updatedImages2" />
                    </div>

                </div>

                <!-- Bank Account Data -->
                <div class="input-g">
                    <span class="c-black fs14 ff-d">{{ $t('profile.banckAccount') }}</span>
                </div>

                <!-- Account Number -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('profile.form.accountNumber.text') }} </label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" v-model="bank_account_number"
                            name="bank_account_number" :placeholder="$t('profile.form.accountNumber.placeholder')">
                    </div>
                </div>

                <!-- Bank Name -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('profile.form.bankName.text') }} </label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" v-model="bank_name" name="bank_name"
                            :placeholder="$t('profile.form.bankName.placeholder')">
                    </div>
                </div>

                <!-- Iban -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('profile.form.iban.text') }} </label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" v-model="iban_number" name="iban_number"
                            :placeholder="$t('profile.form.iban.placeholder')">
                    </div>
                </div>

                <div class="buttons mt-4">
                    <router-link to="/change-password" class="main-btn text-decoration-underline transparent lg">
                        {{ $t('formBtns.changePass') }}
                    </router-link>
                </div>

                <button type="submit" class="main-btn mt-3 login up lg" :disabled="loading">
                    <span v-if="!loading">
                        {{ $t('formBtns.sendToServer') }}
                    </span>
                    <div v-if="loading">
                        {{ $t('formBtns.sendLoading') }}
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </div>
                </button>
            </div>
        </div>
    </form>

    <!-- Address Modal -->
    <Dialog id="map" class="xl address" :header="$t('modals.address.header')" v-model:visible="mapModal" modal>
        <div class="modal-form position-relative">
            <div class="address_text"><i class="pi pi-map-marker"></i> {{ address }} </div>
            <Googlemap apiKey="AIzaSyBNLoYGrbnQI_GMqHt6m0PSN9yA7Zvq7gA" language="ar" @change-address="changeAddress"
                height="360px" />
            <button type="button" @click="mapModal = false" class="main-btn modal_btn up">
                {{ $t('modals.address.btn') }}
            </button>
        </div>
    </Dialog>

    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img src="@/assets/imgs/right_img.gif" alt="" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.editAccount') }}</p>
                    <div class="buttons justify-content-center">
                        <router-link to="/" class="main-btn modal_btn up rounded-0">
                            {{ $t('modals.done.btn') }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
/******************* Import *******************/

import { onMounted, ref } from "vue";
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import toastMsg from '@/components/shared/Toaster';
import Dialog from 'primevue/dialog';
import responseApi from '@/components/shared/ResponseApi.js';
import UploadImages from "@/components/shared/UploadImages.vue";

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Forms Ref
const editAccountForm = ref(null);

const loading = ref(false);

// images
const images = ref([]);
const images2 = ref([]);

// Profile data
const image = ref(require('@/assets/imgs/profile.png'));
const name = ref('');
const phone = ref('');
const tax_number = ref('');
const bank_account_number = ref('');
const bank_name = ref('');
const iban_number = ref('');

// Modal
const done = ref(false);

// Country
const country = ref(null);
const country_id = ref(null);
const countries = ref([]);
const selectedCountry = ref({});

// City
const city = ref(null);
const cities = ref([]);

// map
const mapModal = ref(false);
const address = ref('');
const addressLat = ref('');
const addressLng = ref('');

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// uploadedImages
const updatedImages = (data) => {
    images.value = data;
    console.log(images.value);
}

// uploadedImages2
const updatedImages2 = (data) => {
    images2.value = data;
    console.log(images2.value);
}

// uploadImage Function
function uploadImage(e) {
    const userImage = e.target.files[0];
    const reader = new FileReader();
    if (userImage) {
        reader.readAsDataURL(userImage);
        reader.onload = e => {
            image.value = e.target.result;
        };
    } else {
        image.value = require('@/assets/imgs/profile.png');
    }
}

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

// Get All countries
const getCountries = async () => {
    await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            for (let i = 0; i < countries.value.length; i++) {
                if (countries.value[i].id == country_id.value) {
                    country.value = countries.value[i];
                    selectedCountry.value = countries.value[i];
                }
            }
        }
    }).catch(err => console.log(err));
}

// Get All Cities
const getCities = async (first) => {
    await axios.get(`country/${country.value.id}/cities`).then(res => {
        if (response(res) == "success") {
            if(first){
                city.value = null;
            }  
            cities.value = res.data.data;
        }
    }).catch(err => console.log(err));
}

// changeAddress
const changeAddress = (evt) => {
    address.value = evt.address;
    addressLat.value = evt.info.geometry.location.lat();
    addressLng.value = evt.info.geometry.location.lng();
}

// profile Function
const getProfile = async () => {
    await axios.get('providers/profile', config).then(res => {
        image.value = res.data.data.image;
        name.value = res.data.data.name;
        phone.value = res.data.data.phone;
        address.value = res.data.data.map_desc;
        bank_account_number.value = res.data.data.bank_account_number;
        bank_name.value = res.data.data.bank_name;
        iban_number.value = res.data.data.iban_number;
        country.value = res.data.data.country;
        city.value = res.data.data.city;
    }).catch(err => console.log(err));
}

// editAccount Function
const editAccount = async () => {
    done.value = true;
    loading.value = true;
    const fd = new FormData(editAccountForm.value);
    fd.append('country_code', selectedCountry.value.key);
    fd.append('country_id', country.value.id);
    fd.append('city_id', city.value.id);

    await axios.post('providers/update-profile?_method=put', fd, config).then(res => {
        if (response(res) == "success") {
            localStorage.setItem('user', JSON.stringify(res.data.data));
            successToast(res.data.msg);
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => console.log(err));

}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getCountries();
    await getProfile();
    if(country.value) await getCities();
});

</script>

<style></style>