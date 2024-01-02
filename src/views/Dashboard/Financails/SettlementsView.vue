<template>
    <p class="fs12 mt-2 mb-4">{{ $t('financails.financails') }}</p>

    <div class="d-flex justify-content-center mb-4 gap-2">
        <router-link :to="{ name: 'newSettlement' }" class="main-btn white_red order_tab flex-grow-1">
            {{ $t('order.tabs.newSettlement') }}
        </router-link>
        <router-link :to="{ name: 'finshedSettlement' }" class="main-btn order_tab white_red flex-grow-1">
            {{ $t('order.tabs.finshedSettlement') }}
        </router-link>
    </div>
    <router-view />
</template>

<script setup>
/******************* Import *******************/

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>