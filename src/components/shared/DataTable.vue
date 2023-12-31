<template>
    <!--*********** Data Table ***********-->
    <DataTable v-if="!loading" :value="products" removableSort :filters="filters" :paginator="paginator" :sortOrder="-1"
        :rows="8">

        <!--*********** Empty Table Message ***********-->
        <template #empty>
            {{ $t("table.noData") }}
        </template>

        <Column :field="col.field" :header="col.header" :sortable="true" v-for="col of columns" :key="col.field">

            <!--*********** If Field Is Array ***********-->
            <template #body="slotProps" v-if="typeof col.field == 'object'">
                <div class="d-flex-c gap-3">
                    <div v-for="(fieldItem, i) of col.field" :key="fieldItem" class="col_div"
                        :class="{ old_price: col.field[i - 1] == 'product_price_after_discount' }">

                        <!--*********** If Field Item Is Image ***********-->
                        <img alt="image" :src="slotProps.data[fieldItem]" v-if="fieldItem == 'product_image'"
                            class="circle_img md" />

                        <!--*********** If Field Item Is Text ***********-->
                        <span v-if="fieldItem !== 'product_image' && fieldItem !== 'currency'"
                            :class="{ line: col.field[i + 1] == 'line', currency: col.field[i + 1] == 'currency' }">
                            {{ slotProps.data[fieldItem] }}
                        </span>
                        <span v-if="col.field.includes('currency')" class="me-1"> {{ slotProps.data.currency }} </span>
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

    </DataTable>

    <!--*********** Data Table Skeleton ***********-->
    <DataTable :value="tableSkeleton" v-if="loading">

        <Column v-for="col in tableSkeleton" :key="col" :header="$t('table.loading')">
            <template #body>
                <Skeleton height=".7rem"></Skeleton>
            </template>
        </Column>

    </DataTable>
</template>

<script setup>
/******************* Import *******************/
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';

/******************* Data *******************/

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
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
    paginator: {
        type: Boolean,
        default: true
    },
    tableSkeleton: {
        type: Array,
        required: true,
    },
});

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>

<style lang="scss"></style>