<template>
    <div class="admin_card">
        <div class="admin_top">

            <div class="right">
                <img :src="admin.image" alt="" class="admin_img">
                <div class="admin_info">
                    <p class="c-black mb-1">{{ admin.name }}</p>
                    <p class="c-black">
                        {{ admin.phone }}
                        <span class="country_code">{{ admin.country_code }}</span>
                    </p>
                </div>
            </div>

            <router-link :to="{ name: 'editSupervisors', params: { id: admin.id }}" class="main-btn sm up blue">{{ $t('supervisors.editSupervisor') }}</router-link>

        </div>
        <div class="admin_bottom">
            <h5 class="c-black ff-d fs13 mb-3">{{ $t('supervisors.permissions') }}</h5>
            <div class="permissions">
                <span class="permission_item" v-for="permission in admin.privileges" :key="permission.id">
                    {{ permission.name }}
                </span>
            </div>
        </div>
    </div>
</template>
  
<script setup>
/******************* Import *******************/

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    admin: {
        type: Object,
        default: {},
    },
});

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>
  
<style lang="scss"></style>