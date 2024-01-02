<template>
    <div class="card_style py-5">
        <div class="d-flex justify-content-center mb-4 gap-4">
            <router-link :to="{ name: 'orderReports' }" class="main-btn light order_tab flex-grow-1">
                الطلبات
            </router-link>
            <router-link :to="{ name: 'productsReports' }" class="main-btn order_tab light flex-grow-1">
                المنتجات
            </router-link>
            <router-link :to="{ name: 'clientsReports' }" class="main-btn light order_tab flex-grow-1">
                العملاء 
            </router-link>
            <router-link :to="{ name: 'supervisorsReports' }" class="main-btn order_tab light flex-grow-1">
                المشرفين
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