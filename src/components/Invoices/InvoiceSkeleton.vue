<template>
    <div class="row gy-5">
        <div class="col-md-6" v-for="i in 2" :key="i">
            <div class="invoice_card">
                <div class="invoice_card_header">
                    <Skeleton height="2rem" width="2rem"></Skeleton>
                    <Skeleton height=".6rem" width="6rem"></Skeleton>
                </div>
                <div class="invoice_card_body">

                    <div class="d-flex-between gap-3" :class="{ 'mb-3': i != 4 }" v-for="i in 4" :key="i">
                        <Skeleton height=".6rem" width="6rem"></Skeleton>
                        <Skeleton height=".6rem" width="6rem"></Skeleton>
                    </div>

                </div>
                <div class="invoice_card_footer">
                    <Skeleton height="3.3rem" class="rounded-0"></Skeleton>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
/******************* Import *******************/
import Skeleton from 'primevue/skeleton';

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>
  
<style lang="scss"></style>