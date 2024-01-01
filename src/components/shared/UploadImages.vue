<template>
    <!-- Images -->
    <div class="d-flex gap-3 flex-wrap align-items-end">
        <label class="upload-label main">
            <input type="file" :multiple="multiple" accept="image/*" class="hidden-input"
                @change="uploadImgs">
            <i class="pi pi-image"></i>
        </label>

        <div class='hidden-img' v-for="(img, i) in images" :key="img">
            <img :src='img.previewUrl' :class="`img${i}`" :alt="img.name" />

            <span class='remove-img' @click="removeImage(i)">
                <i class="pi pi-times"></i>
            </span>
        </div>

    </div>
</template>

<script setup>
/******************* Import *******************/
import { onMounted, ref } from "vue";

/******************* Data *******************/
// images
const images = ref([]);

/******************* Provide && Inject *******************/
/******************* Emits *******************/
const emit = defineEmits(['update']);

/******************* Props *******************/
const props = defineProps({
    multiple: {
        type: Boolean,
        default: false
    },
    images: {
        type: Array,
        default: () => { return []; }
    }
});

/******************* Methods *******************/

// Upload Imgs
const uploadImgs = (event) => {
    if(!props.multiple) {
        images.value = [];
    }

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
            images.value.push({
                file: files[i],
                previewUrl: e.target.result
            });
        };
        reader.readAsDataURL(files[i]);
    }

    emit('update', images.value);
}

// Remove Img
function removeImage(index) {
    images.value.splice(index, 1);
    emit('update', images.value);
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(() => {
    images.value = props.images;
    emit('update', images.value);
});

</script>

<style></style>