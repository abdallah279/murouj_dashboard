<template>
    <div class="settlement_card mb-4" v-for="i in 2" :key="i">

        <Skeleton shape="circle" size="6rem" class="d-block flex-shrink-0 mb-2"></Skeleton>
        <div class="left-sec">

            <div class="left-item mb-2">

                <div class="main-item">
                    <Skeleton height=".6rem" width="6rem"></Skeleton>
                </div>

                <Skeleton height=".6rem" width="6rem"></Skeleton>

            </div>

            <div class="left-item mb-3">

                <Skeleton height=".6rem" width="6rem"></Skeleton>

            </div>

            <div class="d-flex-between settlement_footer">

                <Skeleton height=".6rem" width="6rem"></Skeleton>
                <Skeleton height=".6rem" width="6rem"></Skeleton>

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