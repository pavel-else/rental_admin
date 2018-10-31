<script>
import { Line } from 'vue-chartjs'
import { Bar } from 'vue-chartjs'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import { getRentCount, getRentHours } from '@/functions/statistics.js'

export default {
  extends: Bar,
  props: ['height'],

  mounted() {
    this.render()
  },

  methods: {
    render() {
      const brandSuccess = getStyle('--success') || '#4dbd74'
      const brandInfo = '#f86c6b'
      const brandDanger = getStyle('--danger') || '#f86c6b'   

      let elements = 29
      const data1 = []

      this.renderChart(
      {
        labels: [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        datasets: [
          {
            label: 'Часов проката в день:',
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            // data: data1
            data: getRentHours(this.subOrders)
          }
        ]
      }, 
      {
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
            }
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 10),
              max: 75
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      })
    }
  },
  
  computed: {
      subOrders() {
        return this.$store.getters.subOrders
      }
  },

  watch: {
    subOrders() {
      this.render()
    }
  }
}
</script>