<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 id="traffic" class="card-title mb-0">Статистика проката</h4>
        </b-col>
        <b-col sm="7" class="d-none d-md-block">
          <date-panel name="count" @setDate="setDate($event)"></date-panel>
        </b-col>
      </b-row>

      <div>Стартов проката</div>
      <div class="from-to-line"><small>{{rent.count.from}}</small><small>{{rent.count.to}}</small></div>
      <rent-count 
        chartId="main-chart-01"
        class="chart-wrapper" 
        style="height:150px;margin:10px 0 40px;"
        :type="rent.count.type"
        :from="rent.count.from"
        :to="rent.count.to"
      ></rent-count>

      <date-panel name="hours" @setDate="setDate($event)"></date-panel>
      <div>Часов проката в день</div>
      <rent-hours-chart 
        chartId="main-chart-02"
        class="chart-wrapper" 
        style="height:150px;margin:10px 0 40px;"  
        height="100" 
      ></rent-hours-chart>

      <div>Выручка в день</div>
      <rent-cash-proceed-chart 
        chartId="main-chart-03"
        class="chart-wrapper" 
        style="height:150px;margin:10px 0 40px;" 
        height="100" 
      ></rent-cash-proceed-chart>
      <div>Всего</div>
    </b-card>
  </div>
</template>

<script>
// import { Callout } from '@coreui/vue'
import RentCount from './dashboard/RentCount'
import RentHoursChart from './dashboard/RentHoursChart'
import RentCashProceedChart from './dashboard/RentCashProceedChart'
import DatePanel from './DatePanel'
import {writeLog} from '@/functions/logs'
import * as shortDate from '@/functions/date'

export default {
  name: 'dashboard',
  components: {
    // Callout,
    RentCount,
    RentHoursChart,
    RentCashProceedChart,
    DatePanel
  },
  mounted() {
    this.setDateOfMonth('count')
  },
  data() {
    return {
      rent: {
        count: {
          type: 'Month',
          from: '',
          to: ''
        },
        hours: {
          from: '',
          to: ''
        },
        cash: {
          from: '',
          to: ''
        }
      },
    }
  },
  methods: {
    setDate (e) {
      console.log(e)
      if (!this.rent[e.name]) {
        writeLog('Dashboard.vue, setDate', 'undefined name', {name: e.name})
      }

      switch (e.type) {
        case 'FromTo' :
          if (e.from && e.to) {
            this.rent[e.name].type = e.type
            this.rent[e.name].from = e.from
            this.rent[e.name].to = e.to
          }
        break
        case 'Day' :
          console.log('day')
          this.setDateOfDay(e.name)
        break
        case 'Month' :
          this.setDateOfMonth(e.name)
        break
        case 'Year' : 
          console.log('year')
        break
      }
    },
    setDateOfMonth(name) {      
      const to = shortDate.make(new Date().toString())
      const from = shortDate.getNextDay(to, -31)

      if (from && to) {
        this.rent[name].type = 'Month'
        this.rent[name].from = from
        this.rent[name].to = to
      }
    },
    setDateOfDay(name) {
      const to = shortDate.make(new Date().toString())
      if (to) {
        this.rent[name].type = 'Day'
        this.rent[name].from = to // all right, from === to
        this.rent[name].to = to
      }
    }
  },
}
</script>
<style scoped>
  .from-to-line {
    display: flex;
    justify-content: space-between;
  }
</style>