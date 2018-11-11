<script>
import { Line } from 'vue-chartjs'
import { Bar } from 'vue-chartjs'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import * as shortDate from '@/functions/date'

export default {
  extends: Bar,

  props: {
    type: String,
    from: String,
    to: String,
  },
  data() {
    return {
      stat: [],
      labels: []
    }
  },

  mounted() {
    this.getStatAndRender()
  },

  methods: {
    getStatAndRender() {
      console.log({type: this.type, from: this.from, to: this.to});
    
      const makeStatDay = () => {
        this.labels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]; // day in hours

        this.stat = this.$store.getters.statistics({ cmd: 'getStartsPerDay', from: this.from, to: this.to, id: '8800000001' });

        this.render();
      };

      const makeStatMonth = () => {
        const period = shortDate.createPeriod(this.from, this.to);
        this.labels = period.map(i => i.slice(8, 12));
        this.stat = this.$store.getters.statistics({ cmd: 'getStarts', from: this.from, to: this.to, id: '8800000001' });

        this.render();
      };

      const makeStatYear = () => {};

      const makeStatFromTo = () => {
        const period = shortDate.createPeriod(this.from, this.to);
        this.labels = period.map(i => i.slice(8, 12));
        this.stat = this.$store.getters.statistics({ cmd: 'getStarts', from: this.from, to: this.to, id: '8800000001' });

        this.render();      
      };

      switch (this.type) {
        case 'Day': makeStatDay();
        break;
        case 'Month': makeStatMonth();
        break;
        case 'Year': makeStatYear();
        break;
        case 'FromTo': makeStatFromTo();
        break;
      }
    },  
      
    render() {
      const brandSuccess = getStyle('--success') || '#4dbd74'
      const brandInfo = getStyle('--info') || '#20a8d8'
      const brandDanger = getStyle('--danger') || '#f86c6b'

      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              label: 'Стартов проката в день:',
              backgroundColor: hexToRgba(brandInfo, 10),
              borderColor: brandInfo,
              pointHoverBackgroundColor: '#fff',
              borderWidth: 2,
              data: this.stat
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
        }
      );
    }
  },
  computed: {
    // Свойство необходимо для ререндеринга графика после прихода с сервера данных
    // Связано с watch - subOrders
    subOrders() {
      return this.$store.getters.subOrders
    }
  },
  

  watch: {
    to() {
      this.getStatAndRender()
    },
    from() {
      this.getStatAndRender()
    },
    subOrders() {
      this.getStatAndRender()
    }
  }
}


</script>