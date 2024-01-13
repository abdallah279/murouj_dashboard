<template>
    <div class="main-input filter sm">

        <Dropdown v-model="quantityType" @change="updateType" :placeholder="$t('table.filter.type')"
            :options="quantityTypes" optionLabel="name" class="input-me">
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
</template>

<script setup>
/******************* Import *******************/
import Dropdown from 'primevue/dropdown';
import { onMounted, onUnmounted, onUpdated, ref } from 'vue';
import responseApi from '@/components/shared/ResponseApi.js';
import axios from 'axios';

/******************* Data *******************/

// success response
const { response } = responseApi();

// Quantity Type
const quantityType = ref('');
const quantityTypes = ref([]);

/******************* Provide && Inject *******************/

/******************* Emits *******************/
const emit = defineEmits(['updateType']);

/******************* Props *******************/
const props = defineProps({
    productId: {
        type: Number
    }
});

/******************* Methods *******************/

// get units
const getUnits = async () => {
    await axios.get('units').then(res => {
        if (response(res) == "success") {
            quantityTypes.value = res.data.data;
        }
    }).catch(err => console.log(err));
}

// updateType
const updateType = () => {
    emit('updateType', {
        unit_id: quantityType.value.id,
        id: props.productId
    });
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getUnits();
});

onUpdated(() => {
    console.log('updated');
});

onUnmounted(() => {
    console.log('unmounted');
    quantityType.value = '';
});

</script>

<style lang="scss"></style>