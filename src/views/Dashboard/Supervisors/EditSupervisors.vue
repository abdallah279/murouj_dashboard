<template>
    <form action="" class="card_style py-5 px-lg-5" ref="addSupervisorForm" @submit.prevent="addSupervisor">

        <!-- Title -->
        <h3 class="fs15 c-dark mb-4">{{ $t('supervisors.title') }}</h3>

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
                    <label for="" class="main-label">{{ $t('supervisors.form.name.text') }}</label>
                    <div class="main-input">
                        <input type="text" class="input-me validInputs" name="name" v-model="name"
                            :placeholder="$t('supervisors.form.name.placeholder')">
                        <i class="pi main-icon pi-user-edit"></i>
                    </div>
                </div>

                <!-- Phone -->
                <div class="input-g">
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

                <!-- Images -->
                <div class="input-g">
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

                <div class="input-g">
                    <label for="" class="main-label">{{ $t('loginForm.password.text') }}</label>
                    <div class="main-input">
                        <input type="password" class="input-me validInputs" name="password" v-model="password"
                            :placeholder="$t('restorePasswordForm.newPassword.text')">
                        <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
                    </div>
                </div>

                <div class="input-g">
                    <label for="" class="main-label">{{ $t('loginForm.password.text') }}</label>
                    <div class="main-input">
                        <input type="password" class="input-me" v-model="confirmPassword"
                            :placeholder="$t('restorePasswordForm.confirmNewPassword.text')">
                        <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xl-8 col-lg-10">
                        <p class="fs14 c-black mb-3">{{ $t('supervisors.form.privileges.text') }}</p>

                        <div class="row gy-3">
                            <div class="col-6" v-for="privilege in privileges" :key="privilege.id">
                                <div class="check-box blue">
                                    <input type="checkbox" name="privilege" :id="`privilege${privilege.id}`">
                                    <label class="check" :for="`privilege${privilege.id}`"></label>
                                    <label class="check-anchor fs13 c-black" :for="`privilege${privilege.id}`">
                                        {{ privilege.name }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="buttons mt-5">

                    <button type="submit" class="main-btn login up lg" :disabled="loading">
                        <span v-if="!loading">
                            {{ $t('supervisors.form.editBtn') }}
                        </span>
                        <div v-if="loading">
                            {{ $t('formBtns.sendLoading') }}
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </div>
                    </button>

                    <button type="submit" class="main-btn red up lg" :disabled="loading">
                        <span v-if="!loading">
                            {{ $t('supervisors.form.deleteBtn') }}
                        </span>
                        <div v-if="loading">
                            {{ $t('formBtns.delteLoading') }}
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </div>
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
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.editSupervisor') }}</p>
                    <div class="buttons justify-content-center">
                        <router-link to="/supervisors" class="main-btn modal_btn up rounded-0">
                            {{ $t('modals.done.supervisors') }}
                        </router-link>
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
const addSupervisorForm = ref(null);

const loading = ref(false);
const errors = ref([]);

// images
const images = ref([]);

// Profile data
const image = ref(require('@/assets/imgs/profile.png'));
const name = ref('');
const phone = ref('');
const email = ref('');

// Change Password
const password = ref('');
const confirmPassword = ref('');
const done = ref(false);

// privileges
const privileges = ref([
    {
        "id": 1,
        "name": "الرئيسية"
    },
    {
        "id": 2,
        "name": "المنتجات"
    },
    {
        "id": 3,
        "name": "الطلبات"
    },
    {
        "id": 4,
        "name": "الحسابات المالية"
    },
    {
        "id": 5,
        "name": "بيانات الحساب"
    },
    {
        "id": 6,
        "name": "المشرفين"
    },
    {
        "id": 7,
        "name": "التقارير"
    },
    {
        "id": 8,
        "name": "الفواتير"
    }
]);

// Country
const country = ref(null);
const country_id = ref(null);

// countries
const countries = ref([]);
const selectedCountry = ref({});

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

// addSupervisor Function
const addSupervisor = async () => {
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
/******************* Computed *******************/

const lang = computed(() => {
    return localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ar'
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    // await profile();
    await getCountries();
})

</script>

<style></style>