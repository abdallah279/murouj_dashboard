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
                        <input type="number" class="input-me validInputs" name="tax_number"
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
                        <div class="d-flex gap-3 flex-wrap align-items-end">
                            <label for="uploadImgs" class="upload-label main">
                                <input id="uploadImgs" name="bank_transfer_image" type="file" accept="image/*"
                                    class="hidden-input" @change="uploadImgs">
                                <i class="pi pi-image"></i>
                            </label>

                            <div class='hidden-img' v-for="(img, i) in images" :key="img.name">
                                <img src='' :class="`img${i}`" :alt="img.name" />

                                <span class='remove-img' @click="removeImage(i)">
                                    <i class="pi pi-times"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="input_image">
                        <label for="" class="main-label">{{ $t('profile.commercial') }}</label>
                        <div class="d-flex gap-3 flex-wrap align-items-end">
                            <label for="uploadImgs1" class="upload-label main">
                                <input id="uploadImgs1" name="bank_transfer_image" type="file" accept="image/*"
                                    class="hidden-input" @change="uploadImgs">
                                <i class="pi pi-image"></i>
                            </label>

                            <div class='hidden-img' v-for="(img, i) in images" :key="img.name">
                                <img src='' :class="`img${i}`" :alt="img.name" />

                                <span class='remove-img' @click="removeImage(i)">
                                    <i class="pi pi-times"></i>
                                </span>
                            </div>
                        </div>
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
                        <input type="text" class="input-me validInputs" name="account_number"
                            :placeholder="$t('profile.form.accountNumber.placeholder')">
                    </div>
                </div>

                <!-- Account Name -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('profile.form.bankName.text') }} </label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" name="account_name"
                            :placeholder="$t('profile.form.bankName.placeholder')">
                    </div>
                </div>

                <!-- Iban -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('profile.form.iban.text') }} </label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" name="account_name"
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
                        <router-link to="/" class="main-btn modal_btn up rounded-0">{{ $t('modals.done.btn') }}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
/******************* Import *******************/

import { computed, onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import axios from 'axios';
import i18n from "@/i18n";
import Dropdown from 'primevue/dropdown';
import toastMsg from '@/components/shared/Toaster';
import Dialog from 'primevue/dialog';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Router
const router = useRouter();

// Forms Ref
const editAccountForm = ref(null);
const changePasswordForm = ref(null);

const loading = ref(false);
const errors = ref([]);

// images
const images = ref([]);

// Profile data
const image = ref(require('@/assets/imgs/profile.png'));
const name = ref('');
const phone = ref('');
const email = ref('');

// Modal
const deleteAcc = ref(false);

// Change Password
const passwordModal = ref(false);
const oldPassword = ref('');
const password = ref('');
const confirmPassword = ref('');
const done = ref(false);

// Country
const country = ref(null);
const country_id = ref(null);

// City
const city = ref(null);
const city_id = ref(null);
const cities = ref([]);

// countries
const countries = ref([]);
const selectedCountry = ref({});

// map
const mapModal = ref(false);
const address = ref('');
const addressLat = ref('');
const addressLng = ref('');

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// Upload Imgs
const uploadImgs = (e) => {
    images.value = [];
    var selectedImgs = e.target.files;
    for (let i = 0; i < selectedImgs.length; i++) {
        images.value.push(selectedImgs[i]);
    }

    for (let i = 0; i < images.value.length; i++) {
        let reader = new FileReader();
        reader.addEventListener('load', function () {
            document.querySelector(`.img${i}`).src = reader.result
        }.bind(this), false);

        reader.readAsDataURL(images.value[i]);
    }
}

// Remove Img
function removeImage(index) {
    images.value.splice(index, 1);
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

// Validation Function
function validate() {
    let allInputs = document.querySelectorAll('.validInputsPassword');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(i18n.global.t(`validation.${allInputs[i].name}`));
        }
    }

    if (password.value !== confirmPassword.value) {
        errors.value.push(i18n.global.t(`validation.confirmPassword`));
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
const getCities = async () => {
    await axios.get(`country/${country.value.id}/cities`).then(res => {
        if (response(res) == "success") {
            cities.value = res.data.data;
            city.value = null;
            for (let i = 0; i < cities.value.length; i++) {
                if (cities.value[i].id == city_id.value) {
                    city.value = cities.value[i];
                }
            }
        }
    }).catch(err => console.log(err));
}

// changeAddress
const changeAddress = (evt) => {
    address.value = evt.address;
    addressLat.value = evt.info.geometry.location.lat();
    addressLng.value = evt.info.geometry.location.lng();
}

// saveLocation
const saveLocation = (country, city) => {
    for (let i = 0; i < countries.value.length; i++) {
        if (countries.value[i].id == country) {
            localStorage.setItem('country', JSON.stringify(countries.value[i]));
        }
    }

    for (let i = 0; i < cities.value.length; i++) {
        if (cities.value[i].id == city) {
            localStorage.setItem('city', JSON.stringify(cities.value[i]));
        }
    }
}

// profile Function
const profile = async () => {
    await axios.get('profile', config).then(res => {
        image.value = res.data.data.image;
        name.value = res.data.data.name;
        phone.value = res.data.data.phone;
        email.value = res.data.data.email;
        country_id.value = res.data.data.country_id;
        city_id.value = res.data.data.city_id;
    }).catch(err => console.log(err));
}

// editAccount Function
const editAccount = async () => {
    done.value = true;
    // loading.value = true;
    // const fd = new FormData(editAccountForm.value);
    // fd.append('country_code', selectedCountry.value.key);
    // fd.append('country_id', country.value.id);
    // fd.append('city_id', city.value.id);

    // await axios.post('update-profile?_method=put', fd, config).then(res => {
    //     if (response(res) == "success") {
    //         localStorage.setItem('user', JSON.stringify(res.data.data));
    //         // document.querySelector('.drop-text.profile').innerHTML = res.data.data.name;

    //         saveLocation(res.data.data.country_id, res.data.data.city_id);
    //         successToast(res.data.msg);
    //     } else {
    //         errorToast(res.data.msg);
    //     }
    //     loading.value = false;
    // }).catch(err => console.log(err));

}

// Delete Account
const deleteAccount = async () => {
    loading.value = true;
    await axios.delete('delete-account', config).then(res => {
        deleteAcc.value = false;
        if (response(res) == "success") {

            let lKeys = ['token', 'user', 'country', 'city'];

            lKeys.forEach((key) => {
                localStorage.removeItem(key);
            });

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

// changePassword
const changePassword = async () => {
    loading.value = true;
    const fd = new FormData(changePasswordForm.value);

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        await axios.post('update-passward?_method=patch', fd, config).then(res => {
            if (response(res) == "success") {

                passwordModal.value = false;
                done.value = true;
                oldPassword.value = '';
                password.value = '';
                confirmPassword.value = '';

            } else {
                errorToast(res.data.msg);
            }
            loading.value = false;
        }).catch(err => console.log(err));
    }
}

/******************* Computed *******************/

const lang = computed(() => {
    return localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ar'
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    // await profile();
    await getCountries();
    // if(country.value.id){
    //     await getCities();
    // }
})

</script>

<style></style>