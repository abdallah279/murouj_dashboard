<template>
    <div class="dir">

        <div v-if="images.length">
            <Galleria :value="images" :responsiveOptions="responsiveOptions"
                :numVisible="images.length < 4 ? images.length : 4" :circular="true" :autoPlay="true"
                :transitionInterval="3000">
                <template #item="slotProps">
                    <img class="galleria_img" :src="slotProps.item.file" alt="product image"
                        style="width: 100%; display: block" />
                    <Image :src="slotProps.item.file" alt="Image" class="fancyImg" preview />
                </template>
                <template #thumbnail="slotProps">
                    <img class="thumbnail_img" :src="slotProps.item.file" alt="thumbnail" style="display: block" />
                </template>
            </Galleria>
        </div>

        <div class="no-data bg-light lg d-flex align-items-center justify-content-center flex-column" v-else>
            <img src="@/assets/imgs/no_data.png" alt="" class="no-data-img mb-3">
            <div class="no-data-text">{{ $t('noData.imgs') }}</div>
        </div>
    </div>
</template>

<script setup>
/******************* Import *******************/
import { ref } from "vue";
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';

/******************* Data *******************/
const responsiveOptions = ref([
    {
        breakpoint: '991px',
        numVisible: 4
    },
    {
        breakpoint: '767px',
        numVisible: 3
    },
    {
        breakpoint: '575px',
        numVisible: 2
    }
]);

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    images: {
        type: Array
    }
});
/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>