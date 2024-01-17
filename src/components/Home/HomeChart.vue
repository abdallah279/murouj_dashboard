<template>
    <div class="card_style" v-if="!loading">

        <!--***** Top *****  -->
        <div class="page_top align-items-center align-items-lg-start">
            <h3 class="fs15 c-black">{{ $t('chart.title') }}</h3>

            <!--***** Filter Select *****-->
            <div class="main-input filter sm card-shadow">

                <Dropdown v-model="filter" :placeholder="$t('table.filter.text')" @change="updateFilter"
                    :options="filterOptions" optionLabel="name" class="input-me">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="selected">
                            <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="option">
                            <div>
                                {{ slotProps.option.name }}
                            </div>
                        </div>
                    </template>
                </Dropdown>

                <i class="pi pi-angle-down main-icon"></i>

            </div>

        </div>

        <!--***** Chart *****-->
        <apexchart width="100%" height="380" type="area" :options="chartOptions" :series="series"></apexchart>
    </div>

    <!--********** Skeleton **********-->
    <div class="card_style h490" v-if="loading">
        <div class="page_top align-items-start">
            <Skeleton class="profit_name" height=".6rem" width="8rem"></Skeleton>
            <Skeleton height="2.5rem" width="7rem"></Skeleton>
        </div>
    </div>
</template>
  
  
<script setup>

/******************* Import *******************/
import { ref, computed } from 'vue';
import i18n from '@/i18n';
import Skeleton from 'primevue/skeleton';
import Dropdown from 'primevue/dropdown';

/******************* Computed *******************/

// allMonths
const allMonths = computed(() => {
    return props.chartData.map(item => item.month);
});

// allNumbers
const allNumbers = computed(() => {
    return props.chartData.map(item => item.sums);
});

/******************* Data *******************/
// Filter
const filter = ref('');
const filterOptions = ref([
    {
        id: 1,
        name: i18n.global.t('table.filter.3Dates'),
        number: "3",
    },
    {
        id: 1,
        name: i18n.global.t('table.filter.6Dates'),
        number: "6",
    },
    {
        id: 1,
        name: i18n.global.t('table.filter.9Dates'),
        number: "9",
    },
    {
        id: 1,
        name: i18n.global.t('table.filter.12Dates'),
        number: "12",
    }
]);

// chartOptions
const chartOptions = ref({
    chart: {
        id: 'vuechart-example',
        toolbar: {
            show: false
        }
    },
    xaxis: {
        categories: [...allMonths.value],
    },
    stroke: {
        curve: 'smooth',
        colors: ['#EA7400'],
        width: 1,
        dataLabels: {
            enabled: false
        },
    },
    fill: {
        type: "gradient",
        colors: ['#F1A31D'],
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
        }
    },
    dataLabels: {
        enabled: true,
        textAnchor: 'middle',
        offsetX: 0,
        offsetY: 1,
        style: {
            colors: ['#fff'],
            opacity: 1,
        },
        background: {
            enabled: true,
            foreColor: 'transparent',
            padding: 0,
            borderRadius: '50%',
            borderWidth: 1,
            borderColor: '#F1A31D',
            // opacity: 0.9,
        }
    },
    grid: {
        show: true,
        borderColor: '#f9f9f9',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        },
    }
});

const series = ref([
    {
        name: i18n.global.t('chart.title'),
        data: [...allNumbers.value]
    }
])

/******************* Emits *******************/
const emit = defineEmits(['updateFilter']);

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    chartData: {
        type: Array,
        default: () => { return []; }
    }
});

/******************* Methods *******************/

// updateFilter
const updateFilter = () => {
    emit('updateFilter', filter.value.number);
}

/******************* Watch *******************/

/******************* Mounted *******************/
</script>
  
<style></style>