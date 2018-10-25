<script>
import { Bar } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        labels: ['GT Laguna [Black]', 'Jamis Nemesis 650', 'Mongoose Fireball', 'Merida Matts 80', 'Centurion BlackFire', 'Centurion BlackFire', 'Stels 530'],
        datasets: [
          {
            label: 'часов проката',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39]
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].backgroundColor }
            }
          }
        }
      }
    )
  }
}
</script>
