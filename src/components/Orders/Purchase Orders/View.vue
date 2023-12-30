<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="d-flex justify-content-center mb-4 flex-sm-nowrap flex-wrap gap-2">
                <router-link :to="{ name: 'purchaseCurrent' }" class="main-btn order_tab light flex-grow-1">
                    {{ $t('order.tabs.currentOrders') }}
                </router-link>
                <router-link :to="{ name: 'purchaseFinished' }" class="main-btn order_tab light flex-grow-1">
                    {{ $t('order.tabs.finishedOrders') }}
                </router-link>
                <router-link :to="{ name: 'purchaseCanceled' }" class="main-btn order_tab light flex-grow-1">
                    {{ $t('order.tabs.canceledOrders') }}
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