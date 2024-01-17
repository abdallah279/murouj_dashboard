<template>

    <div class="main_table">
        <!--*********** Data Table ***********-->
        <DataTable :class="styleTable" v-if="!loading" :value="products" removableSort :filters="filters"
            :sortOrder="-1" :rows="8">
    
            <!--*********** Empty Table Message ***********-->
            <template #empty>
                {{ $t("table.noData") }}
            </template>
    
            <Column :field="col.field" :header="col.header" :sortable="true" v-for="col of columns" :key="col.field">
    
                <!--*********** If Field Is Array ***********-->
                <template #body="slotProps" v-if="typeof col.field.split(',') == 'object'">
                    <div class="d-flex-c gap-3">
                        <div v-for="(fieldItem, i) of col.field.split(',')" :key="fieldItem" class="col_div"
                            :class="{ old_price: slotProps.data['has_discount'] && (col.field.split(',')[i - 1] == 'product_price_after_discount' || col.field.split(',')[i - 1] == 'price_after_discount') }">
    
                            <!--*********** If Field Item Is Image ***********-->
                            <img alt="image" :src="slotProps.data[fieldItem]"
                                v-if="fieldItem == 'product_image' || fieldItem == 'image'" class="circle_img md" />
    
                            <!--*********** If Field Item Is Text ***********-->
                            <span v-if="fieldItem !== 'product_image' && fieldItem !== 'image' && fieldItem !== 'currency'"
                                :class="{ line: col.field.split(',')[i + 1] == 'line', currency: col.field.split(',')[i + 1] == 'currency' }">
                                {{ slotProps.data[fieldItem] }}
                            </span>
                            <span v-if="col.field.split(',').includes('currency') && slotProps.data[fieldItem]" class="me-1">
                                <b></b> {{ slotProps.data.currency }}
                            </span>
                        </div>
                    </div>
                </template>
    
            </Column>
    
            <!--*********** Route To Details ***********-->
            <Column :field="routeTable.header" :header="routeTable.header" v-if="routeTable">
                <template #body="slotProps">
                    <router-link :to="routeTable.path + '/' + slotProps.data[routeTable.id]" class="table_link">
                        {{ routeTable.header }}
                    </router-link>
                </template>
            </Column>
    
            <!--*********** Select ***********-->
            <Column :header="selectTable.header" v-if="selectTable">
                <template #body="slotProps">
                    <DataTableSelect class="mx-auto" :productId="slotProps.data['product_id']" @updateType="updateType" />
                </template>
            </Column>
    
            <!--*********** quantity ***********-->
            <Column v-if="quantity">
                <template #body="slotProps">
                    <DataTableQuantity class="mx-auto" :productId="slotProps.data['product_id']"
                        @updateProduct="updateProductQuantity" />
                </template>
            </Column>
    
        </DataTable>
    
        <!--*********** Data Table Skeleton ***********-->
        <DataTable :value="tableSkeleton" v-if="loading">
    
            <Column v-for="col in tableSkeleton" :key="col" :header="$t('table.loading')">
                <template #body>
                    <Skeleton height=".5rem"></Skeleton>
                </template>
            </Column>
    
        </DataTable>
    
        <div class="p-2" v-if="paginator">
            <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" dir="ltr" />
        </div>
    </div>
</template>

<script setup>
/******************* Import *******************/
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import DataTableSelect from '@/components/shared/DataTable/DataTableSelect.vue';
import DataTableQuantity from '@/components/shared/DataTable/DataTableQuantity.vue';
import { ref } from 'vue';
import Paginator from 'primevue/paginator';

/******************* Data *******************/

// Paginator
const currentPage = ref(1);

/******************* Provide && Inject *******************/

/******************* Emits *******************/
const emit = defineEmits(['updateProduct', 'updateType', 'paginateNum']);

/******************* Props *******************/
const props = defineProps({
    styleTable: {
        type: String,
        default: ''
    },
    columns: {
        type: Object,
    },
    products: {
        type: Object,
    },
    filters: {
        type: Object,
    },
    loading: {
        type: Boolean,
    },
    routeTable: {
        type: Object,
    },
    selectTable: {
        type: Object,
    },
    quantity: {
        type: Boolean,
        default: false
    },
    paginator: {
        type: Boolean,
        default: true
    },
    pageLimit: {
        type: Number,
        default: 0
    },
    totalPage: {
        type: Number,
        default: 0
    },
    tableSkeleton: {
        type: Array,
        required: true,
    },
});

/******************* Methods *******************/

const updateProductQuantity = (data) => {
    emit('updateProduct', data);
}

const updateType = (data) => {
    emit('updateType', data);
}

// Paginate Function
const onPaginate = (e) => {
  currentPage.value = e.page + 1;
  window.scrollTo(0, 0);
  emit('paginateNum', currentPage.value);
};

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
</script>

<style lang="scss"></style>