<template>
    <div class="card_style py-5">
        <div class="d-flex justify-content-center mb-4 gap-4">
            <router-link :to="{ name: 'orderReports' }" class="main-btn light order_tab flex-grow-1">
                {{ $t('reports.tabs.orders') }}
            </router-link>
            <router-link :to="{ name: 'productsReports' }" class="main-btn order_tab light flex-grow-1">
                {{ $t('reports.tabs.products') }}
            </router-link>
            <router-link :to="{ name: 'clientsReports' }" class="main-btn light order_tab flex-grow-1">
                {{ $t('reports.tabs.clients') }} 
            </router-link>
            <router-link :to="{ name: 'supervisorsReports' }" class="main-btn order_tab light flex-grow-1">
                {{ $t('reports.tabs.supervisors') }}
            </router-link>
        </div>
        <router-view />
    </div>
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