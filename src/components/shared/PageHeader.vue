<template>
    <div :class="margin" class="page_header">
        <h3 class="text text-center">{{ title }}</h3>
    </div>
</template>


<script setup>
/******************* Import *******************/

/******************* Data *******************/

/******************* Props *******************/
const props = defineProps({
    margin: {
        type: String,
        default: 'mb-4',
    },
    title: {
        type: String,
        required: true,
    },
});


/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style></style>