<template>
    <div class="settlement_card mb-4">

        <img src="@/assets/imgs/login_logo.png" class="settlement_img" title="settlement_img" alt="settlement_img">
        <div class="left-sec">

            <div class="left-item mb-2">

                <div class="main-item">
                    <span class="c-black">{{ $t('order.card.orderNum') }} :</span>
                    <span class="c-black">{{ request.number }}</span>
                </div>

                <span class="c-light4">{{ request.created_at }}</span>

            </div>

            <div class="left-item mb-3">

                <div class="main-item">
                    <span class="c-black">{{ $t('order.card.orderPrice') }} :</span>
                    <span class="c-light4">{{ request.amount }} {{ request.currency }}</span>
                </div>

            </div>

            <div class="d-flex-between settlement_footer">

                <div class="main-item">
                    <img src="@/assets/imgs/icons/noun_box.png" alt="" class="ic">
                    <span class="c-black">{{ $t('order.card.orderStatus') }} :</span>
                    <span class="c-sec">{{ request.status }}</span>
                </div>

                <router-link :to="{ name: 'settlementDetailes', params: { id: request.id } }" class="c-black d-flex aliign-items-center gap-1">
                    {{ $t('formBtns.more') }}
                    <i class="pi pi-angle-left c-sec"></i>
                </router-link>

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
    request: {
        type: Object
    }
});
/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>