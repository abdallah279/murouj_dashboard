<template>
    <form action="" class="card_style py-5 px-lg-5" ref="editSupervisorForm" @submit.prevent="editSupervisor">

        <!-- Title -->
        <h3 class="fs15 c-dark mb-4">{{ $t('supervisors.title') }}</h3>

        <!-- Photo -->
        <div class="input-g">
            <div class="user-img">
                <div class="profile-img">
                    <img :src="image" class="img" alt="">
                </div>
                <input type="file" name="image" @change="uploadImage" id="profileImg" accept="image/*"
                    class="hidden-input">
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
                    <UploadImages @update="updatedImages" :images="images" />
                </div>

                <!-- password -->
                <div class="input-g">
                    <label for="" class="main-label">{{ $t('loginForm.password.text') }}</label>
                    <div class="main-input">
                        <input type="password" class="input-me validInputs" name="password" v-model="password"
                            :placeholder="$t('restorePasswordForm.newPassword.text')">
                        <i class="pi pi-eye main-icon ic" @click="togglePassword"></i>
                    </div>
                </div>

                <!-- confirm password -->
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
                            <div class="col-6" v-for="(privilege, index) in privileges" :key="privilege.id">
                                <div class="check-box blue">
                                    <input type="checkbox" :checked="myPrivilegesChecked.includes(privilege.id)"
                                        v-model="privilegesChecked['privilege' + index]" :id="`privilege${privilege.id}`">
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

                    <button type="button" class="main-btn red up lg" @click="deleteSupervisor" :disabled="loading">
                        <span v-if="!loadingDelete">
                            {{ $t('supervisors.form.deleteBtn') }}
                        </span>
                        <div v-if="loadingDelete">
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

import { onMounted, ref } from "vue";
import { useRoute , useRouter } from "vue-router";
import axios from 'axios';
import i18n from "@/i18n";
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

// Router
const router = useRouter();
const route = useRoute();

// Forms Ref
const editSupervisorForm = ref(null);

// loading
const loading = ref(false);
const loadingDelete = ref(false);

// errors
const errors = ref([]);

// images
const images = ref([]);

// Profile data
const image = ref(require('@/assets/imgs/profile.png'));
const profileImage = ref(null);
const name = ref('');
const phone = ref('');

// Change Password
const password = ref('');
const confirmPassword = ref('');
const done = ref(false);

// privileges
const privileges = ref([]);
const privilegesChecked = ref({});
const myPrivilegesChecked = ref([]);

// countries
const countries = ref([]);
const selectedCountry = ref({});
const country_code = ref('');

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

// uploadedImages
const updatedImages = (data) => {
    images.value = data;
    // console.log(images.value);
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
                if (countries.value[i].key == country_code.value) {
                    selectedCountry.value = countries.value[i];
                }
            }
        }
    }).catch(err => console.log(err));
}

// Edit Supervisor Function
const editSupervisor = async () => {
    loading.value = true;
    const fd = new FormData(editSupervisorForm.value);
    fd.append('country_code', selectedCountry.value.key);
    if(images.value[0]){
        if(images.value[0].file){
            fd.append('id_image', images.value[0].file);
        }
    }

    for (let i = 0; i < privileges.value.length; i++) {
        if (privilegesChecked.value['privilege' + i] || (myPrivilegesChecked.value.includes(privileges.value[i].id) && privilegesChecked.value['privilege' + i] == undefined)) {
            fd.append(`privilege_ids[]`, `${i + 1}`);
        }
    }

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        await axios.post(`providers/update-provider-admin/${route.params.id}?_method=patch`, fd, config).then(res => {
            if (response(res) == "success") {
                done.value = true;
            } else {
                errorToast(res.data.msg);
            }
            loading.value = false;
        }).catch(err => console.log(err));
    }

}

// supervisor
const getSupervisor = async () => {
    loading.value = true;
    await axios.get(`providers/provider-admin-details/${route.params.id}`, config).then(res => {
        if (response(res) == "success") {
            image.value = res.data.data.image;
            name.value = res.data.data.name;
            phone.value = res.data.data.phone;
            country_code.value = res.data.data.country_code;
            images.value.push({
                previewUrl: res.data.data.id_image
            });
            password.value = res.data.data.password;
            confirmPassword.value = res.data.data.password;

            for (let i = 0; i < res.data.data.privileges.length; i++) {
                myPrivilegesChecked.value.push(res.data.data.privileges[i].id);
            }
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

// Delete Supervisor Function
const deleteSupervisor = async () => {
    loadingDelete.value = true;
    await axios.delete(`providers/delete-provider-admin/${route.params.id}`, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            router.push({ name: 'supervisors' });
        } else {
            errorToast(res.data.msg);
        }
        loadingDelete.value = false;
    }).catch(err => console.log(err));
}

// privileges
const getPrivileges = async () => {
    await axios.get('providers/privileges').then(res => {
        if (response(res) == "success") {
            privileges.value = res.data.data;
        }
    }).catch(err => console.log(err));
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getSupervisor();
    await getCountries();
    await getPrivileges();
})

</script>

<style></style>