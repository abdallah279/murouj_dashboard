<template>
    <div class="card_style ">
        <h3 class="fs15 c-black mb-4">{{ $t('chart.title') }}</h3>
        <apexchart width="100%" height="380" type="area" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
  
  
<script setup>

/******************* Import *******************/
import { ref } from 'vue';

/******************* Data *******************/

// chartOptions
const chartOptions = ref({
    chart: {
        id: 'vuechart-example',
        toolbar: {
            show: false
        }
    },
    xaxis: {
        categories: ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
        name: 'Vue Chart',
        data: [45, 52, 38, 45, 19, 23]
    }
])

/******************* Provide && Inject *******************/

/******************* Props *******************/
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
});

/******************* Methods *******************/

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/

</script>
  
<style></style>