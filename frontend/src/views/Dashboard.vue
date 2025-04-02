<template>
  <div>
    <canvas ref="chartCanvas" width="400" height="200"></canvas>
  </div>
</template>

<script>
import {inject, onMounted, ref} from 'vue';
import { Chart } from 'chart.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LineController  
);

export default {
  name: 'DynamicChart',
  setup() {
    const axios = inject("axios");
    const chartCanvas = ref(null);
    let chartInstance = null;

    const fetchData = async () => {
      try {
        const response = await axios.get('/pip/data/peru');
        const data = response.data;

        const labels = data.map(item => item.reporting_year);
        const values = data.map(item => item.cpi); 

        updateChart(labels, values);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    const updateChart = (labels, values) => {
      if (chartInstance) {
        chartInstance.destroy(); 
      }


      chartInstance = new Chart(chartCanvas.value, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Datos PIP - Perú',
              data: values,
              borderColor: '#42A5F5',
              backgroundColor: 'rgba(66, 165, 245, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    onMounted(() => {
      fetchData();
    });

    return {
      chartCanvas,
    };
  },
};
</script>

<style scoped>
/* Agrega estilo si es necesario */
</style>
