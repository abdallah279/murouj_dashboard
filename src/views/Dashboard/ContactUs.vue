<template>
    <div class="card_style py-4 px-lg-5">

        <img src="@/assets/imgs/login_logo.png" alt="" class="login_logo sm mb-5 mx-auto d-block">

        <!-- ***** Contact Top ***** -->
        <div class="row justify-content-between mb-4 gy-4" v-if="!loading">

            <!-- ***** Contact Info ***** -->
            <div class="col-lg-4">

                <div class="contact-box">
                    <div class="ic">
                        <i class="pi pi-map-marker"></i>
                    </div>
                    <div class="box-content">
                        <span class="name">{{ contactAddress }}</span>
                    </div>
                </div>

                <div class="contact-box">
                    <div class="ic">
                        <i class="pi pi-envelope"></i>
                    </div>
                    <a :href="`mailto:${contactEmail}`" target="_blank" class="box-content">
                        <span class="name">{{ contactEmail }}</span>
                    </a>
                </div>

                <div class="contact-box">
                    <div class="ic">
                        <i class="pi pi-phone"></i>
                    </div>
                    <a :href="`tel:${contactPhone}`" class="box-content">
                        <span class="name">{{ contactPhone }}</span>
                    </a>
                </div>

            </div>

            <!-- ***** Contact Social ***** -->
            <div class="col-lg-4">
                <span class="c-dark3 text-center d-block">{{ $t('contactForm.or') }}</span>
                <div class="socials mt-4">
                    <a :href="social.link" v-for="social in contactSocials" :key="social.name" target="_blank">
                        <img :src="social.icon" class="ic" alt="">
                    </a>
                </div>
            </div>

        </div>

        <!-- ***** Skeleton ***** -->
        <div class="row justify-content-between mb-4 gy-4" v-if="loading">

            <!-- ***** Contact Info ***** -->
            <div class="col-lg-4">

                <div class="contact-box">
                    <div class="ic">
                        <i class="pi pi-map-marker"></i>
                    </div>
                    <div class="box-content">
                        <Skeleton height=".6rem" width="9rem"></Skeleton>
                    </div>
                </div>

                <div class="contact-box">
                    <div class="ic">
                        <i class="pi pi-envelope"></i>
                    </div>
                    <div class="box-content">
                        <Skeleton height=".6rem" width="9rem"></Skeleton>
                    </div>
                </div>

                <div class="contact-box">
                    <div class="ic">
                        <i class="pi pi-phone"></i>
                    </div>
                    <div class="box-content">
                        <Skeleton height=".6rem" width="9rem"></Skeleton>
                    </div>
                </div>

            </div>

            <!-- ***** Contact Social ***** -->
            <div class="col-lg-4">
                <span class="c-dark3 text-center d-block">{{ $t('contactForm.or') }}</span>
                <div class="socials mt-4">
                    <div v-for="i in 5" :key="i">
                        <Skeleton shape="circle" size="1.6rem"></Skeleton>
                    </div>
                </div>
            </div>

        </div>

        <!-- ***** Contact Form ***** -->
        <form action="" ref="contactForm" @submit.prevent="contactUs">

            <div class="row mt-5">
                <div class="col-lg-8">

                    <div class="c-dark3 fs13 mb-4">{{ $t('contactForm.or2') }}</div>

                    <!-- Name -->
                    <div class="input-g">
                        <div class="main-input">
                            <input type="text" class="input-me validInputs" valid="name" name="name"
                                :placeholder="$t('contactForm.name')">
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="input-g">
                        <div class="main-input">
                            <input type="number" class="input-me validInputs" valid="phone" name="phone"
                                :placeholder="$t('contactForm.phone')">

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

                    <!-- Title -->
                    <div class="input-g">
                        <div class="main-input">
                            <input type="text" class="input-me validInputs" valid="title" name="title"
                                :placeholder="$t('contactForm.title')">
                        </div>
                    </div>

                    <!-- Message -->
                    <div class="input-g">
                        <div class="main-input">
                            <textarea class="input-me text-area validInputs" valid="message" name="content"
                                :placeholder="$t('contactForm.message')"></textarea>
                        </div>
                    </div>

                    <button type="submit" class="main-btn up login lg mt-4" :disabled="loading">
                        <span v-if="!loadingBtn">
                            {{ $t('formBtns.send') }}
                        </span>
                        <div v-if="loadingBtn">
                            {{ $t('formBtns.sendLoading') }}
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </div>
                    </button>

                </div>
            </div>

        </form>

    </div>


    <!-- Done Modal -->
    <Dialog id="done" class="xl" v-model:visible="done" modal>
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="right_sec">
                    <img src="@/assets/imgs/right_img.gif" alt="" class="right_img mx-auto">
                    <p class="fs14 c-black text-center mb-4">{{ $t('modals.done.text') }}</p>
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
import { ref, onMounted } from "vue";
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import axios from "axios";
import i18n from "@/i18n";
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';
import Skeleton from 'primevue/skeleton';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { errorToast } = toastMsg();

// Form
const contactForm = ref(null);

// Contact Info
const contactAddress = ref('');
const contactPhone = ref('');
const contactEmail = ref('');
const contactSocials = ref([]);

// Loading
const loading = ref(false);
const loadingBtn = ref(false);

// errors
const errors = ref([]);

// Modal
const done = ref(false);

// countries
const selectedCountry = ref({})
const countries = ref([]);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('muroujDashToken')}` }
};

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

// contactUs Function
const contactUs = async () => {
    loadingBtn.value = true;
    const fd = new FormData(contactForm.value);
    fd.append('country_code', selectedCountry.value.key);

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loadingBtn.value = false;
        errors.value = [];
    } else {
        await axios.post('contact-us', fd, config).then(res => {
            if (response(res) == "success") {

                done.value = true;
                contactForm.value.reset();

            } else {
                errorToast(res.data.msg);
            }
            loadingBtn.value = false;
        }).catch(err => console.log(err));
    }
}

const getContactInfo = async () => {
    loading.value = true;
    await axios.get('providers/contact-data').then(res => {
        if (response(res) == "success") {
            contactAddress.value = res.data.data.address;
            contactEmail.value = res.data.data.email;
            contactPhone.value = res.data.data.phone;
            contactSocials.value = res.data.data.socials;
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getContactInfo();
    await getCountries();
})

</script>

<style lang="scss"></style>