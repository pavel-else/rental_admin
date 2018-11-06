<script>
import { Line } from 'vue-chartjs'
import { Bar } from 'vue-chartjs'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import createPeriod from '@/functions/createPeriod'

export default {
  extends: Bar,

  props: {
    from: String,
    to: String,
  },
  data() {
    return {
      d1: []
    }
  },

  mounted() {
    this.render()
  },

  methods: {
    render() {
      const brandSuccess = getStyle('--success') || '#4dbd74'
      const brandInfo = getStyle('--info') || '#20a8d8'
      const brandDanger = getStyle('--danger') || '#f86c6b'   

      let elements = 29
      const statistics = this.$store.getters.statistics({cmd: 'getCount', from: this.from, to: this.to, id: '8800000001'})
  
      this.renderChart(
      {
        labels: this.period.map(i => {
          return i.slice(8, 12)
        }),
        datasets: [
          {
            label: 'Стартов проката в день:',
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: statistics 
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
              stepSize: Math.ceil(250 / 15),
              // max: 50
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
    },
    period() {
      if (!this.from || !this.to) {
        return []
      }
      console.log(this.to)
      return createPeriod(this.from, this.to)
    }
  },

  watch: {
    subOrders() {
      this.render()
    },
    to() {
      this.render()
    },
    from() {
      this.render()
    }
  }
}


</script>