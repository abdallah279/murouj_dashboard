<template>
    <div class="card_style py-4 px-lg-5">

        <img src="@/assets/imgs/login_logo.png" alt="" class="login_logo sm mb-5 mx-auto d-block">
    
        <!-- ***** Contact Top ***** -->
        <div class="row justify-content-between mb-4">
    
            <!-- ***** Contact Info ***** -->
            <div class="col-lg-4">
    
                <div class="contact-box">
                    <div class="ic">
                        <i class="pi pi-map-marker"></i>
                    </div>
                    <div class="box-content">
                        <span class="name">الرياض ، الحسينية ، شارع 2</span>
                    </div>
                </div>
    
                <div class="contact-box">
                    <div class="ic">
                        <i class="pi pi-envelope"></i>
                    </div>
                    <a href="mailto:example.info@gmail.com" target="_blank" class="box-content">
                        <span class="name">example.info@gmail.com</span>
                    </a>
                </div>
    
                <div class="contact-box">
                    <div class="ic">
                        <i class="pi pi-phone"></i>
                    </div>
                    <a href="tel:+966 556521565" target="_blank" class="box-content">
                        <span class="name">+966 556521565</span>
                    </a>
                </div>
    
            </div>
    
            <!-- ***** Contact Social ***** -->
            <div class="col-lg-4">
                <span class="c-dark3 text-center d-block">او عبر التواصل الاجتماعي</span>
                <div class="socials mt-4">
                    <a :href="social.url" v-for="social in socials" :key="social.id" target="_blank">
                        <img :src="social.icon" class="ic" alt="">
                    </a>
                </div>
            </div>

        </div>

        <!-- ***** Contact Form ***** -->
        <form action="" ref="contactForm" @submit.prevent="contactUs">

            <div class="row mt-5">
                <div class="col-lg-8">

                    <div class="c-dark3 fs13 mb-4">او عبر ارسال رسالة</div>
                    <div class="input-g">
                        <div class="main-input">
                            <input type="text" class="input-me validInputs" valid="name" name="name" v-model="name"
                                :placeholder="$t('contactForm.name')">
                        </div>
                    </div>

                    <div class="input-g">
                        <div class="main-input">
                            <input type="number" class="input-me validInputs" valid="phone" name="phone" v-model="phone"
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

                    <div class="input-g">
                        <div class="main-input">
                            <textarea class="input-me text-area validInputs" valid="message" name="content"
                                v-model="message" :placeholder="$t('contactForm.message')">
                        </textarea>
                        </div>
                    </div>

                    <button type="submit" class="main-btn up login lg mt-4" :disabled="loading">
                        <span v-if="!loading">
                            {{ $t('formBtns.send') }}
                        </span>
                        <div v-if="loading">
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
import PageHeader from '@/components/shared/PageHeader.vue';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import axios from "axios";
import i18n from "@/i18n";
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { errorToast } = toastMsg();

// Form
const contactForm = ref(null);

// Name
const name = ref('');

// Phone
const phone = ref('');

// Title
const title = ref('');

// Mesage
const message = ref('');

// Loading
const loading = ref(false);

// errors
const errors = ref([]);

// Modal
const done = ref(false);

// countries
const selectedCountry = ref({})
const countries = ref([]);

// socials
const socials = ref([
    {
        id: 1,
        url: 'https://wa.me/',
        icon: require('@/assets/imgs/icons/whatsapp.png')
    },
    {
        id: 2,
        url: 'https://wa.me/',
        icon: require('@/assets/imgs/icons/telegram.png')
    },
    {
        id: 3,
        url: 'https://wa.me/',
        icon: require('@/assets/imgs/icons/youtube.png')
    },
    {
        id: 4,
        url: 'https://wa.me/',
        icon: require('@/assets/imgs/icons/twitter.png')
    },
    {
        id: 5,
        url: 'https://wa.me/',
        icon: require('@/assets/imgs/icons/facebook.png')
    },

]);

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

// contactUs Function
const contactUs = async () => {
    loading.value = true;
    const fd = new FormData(contactForm.value);
    fd.append('country_code', selectedCountry.value.key);

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        await axios.post('contact-us', fd, config).then(res => {
            if (response(res) == "success") {

                done.value = true

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

<style lang="scss"></style>