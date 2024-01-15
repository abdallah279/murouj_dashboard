<template>
    <div class="row">
        <div class="col-xl-8 col-lg-10" v-for="i in 2" :key="i">
            <div class="admin_card">
                <div class="admin_top">

                    <div class="right">
                        <Skeleton size="4.6rem" shape="circle"></Skeleton>
                        <div class="admin_info">
                            <Skeleton width="6rem" height=".7rem" class="mb-3"></Skeleton>
                            <Skeleton width="6rem" height=".7rem"></Skeleton>
                        </div>
                    </div>

                    <Skeleton height="2.8rem" width="7rem"></Skeleton>

                </div>
                <div class="admin_bottom">
                    <Skeleton height=".6rem" width="6rem" class="mb-3"></Skeleton>
                    <div class="permissions">
                        <Skeleton height="2.5rem" width="5rem" v-for="i in 3" :key="i"></Skeleton>
                    </div>
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