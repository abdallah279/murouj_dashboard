<template>
    <div class="not-item">
        <div class="right">
            <img src="@/assets/imgs/favicon.png" alt="" class="logo">
            <div class="not_body">
                <div class="time">
                    <i class="pi pi-clock"></i>
                    {{ notItem.created_at }}
                </div>
                <p class="mt-2 c-side fs13 ff-d">{{ notItem.body }}</p>
            </div>
        </div>
        <button class="delete_btn" @click="deleteNotification">
            <i class="pi pi-trash" v-if="!deleteLoading"></i>
            <span class="spinner-border spinner-border-sm" v-if="deleteLoading" role="status" aria-hidden="true"></span>
        </button>
    </div>
</template>

<script setup>
/******************* Import *******************/
import { ref } from "vue";
import axios from "axios";
import toastMsg from '@/components/shared/Toaster';
import responseApi from '@/components/shared/ResponseApi.js';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// loading
const deleteLoading = ref(false);

// config
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('muroujDashToken')}` }
};

/******************* Provide && Inject *******************/

/******************* Emits *******************/
const emit = defineEmits(['removeNotId']);

/******************* Props *******************/

const props = defineProps({
    notItem: {
        type: Object
    }
})

/******************* Methods *******************/

// Get notifications
const deleteNotification = async () => {
    deleteLoading.value = true;
    await axios.delete(`delete-notification/${props.notItem.id}`, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            emit('removeNotId', props.notItem.id);
        } else {
            errorToast(res.data.msg);
        }
        deleteLoading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>