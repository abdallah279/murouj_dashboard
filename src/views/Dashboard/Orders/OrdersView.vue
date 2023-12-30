<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="d-flex justify-content-center mb-3 gap-2">
                <router-link :to="{ name: 'purchaseOrders' }" class="main-btn light order_tab flex-grow-1">
                    {{ $t('order.tabs.purchaseOrders') }}
                </router-link>
                <router-link :to="{ name: 'returnOrders' }" class="main-btn order_tab light flex-grow-1">
                    {{ $t('order.tabs.returnOrders') }}
                </router-link>
            </div>
        </div>
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