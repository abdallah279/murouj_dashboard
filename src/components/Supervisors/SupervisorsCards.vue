<template>
    <div class="admins_cards">
        <SupervisorCard :admin="admin" v-for="admin in admins" :key="admin.id" />
    </div>
</template>
  
<script setup>
/******************* Import *******************/
import SupervisorCard from '@/components/Supervisors/SupervisorCard.vue';

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    admins: {
        type: Array,
        default: [],
    },
});

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>
  
<style lang="scss"></style>