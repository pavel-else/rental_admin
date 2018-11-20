<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 id="traffic" class="card-title mb-0">Статистика проката</h4>
        </b-col>
        <b-col sm="7" class="d-none d-md-block">
          <!-- <date-panel name="count" @setDate="setDate($event)"></date-panel> -->
        </b-col>
      </b-row>

<!--       <div>Стартов проката</div>
      <div class="from-to-line"><small>{{rent.count.from}}</small><small>{{rent.count.to}}</small></div>
      <rent-count 
        chartId="main-chart-01"
        class="chart-wrapper" 
        style="height:150px;margin:10px 0 40px;"
        :type="rent.count.type"
        :from="rent.count.from"
        :to="rent.count.to"
      ></rent-count>

      <div>Выручка в день</div>
      <date-panel name="cash" @setDate="setDate($event)"></date-panel>
      <rent-cash-proceed-chart 
        chartId="main-chart-03"
        class="chart-wrapper" 
        style="height:150px;margin:10px 0 40px;" 
        :type="rent.cash.type"
        :from="rent.cash.from"
        :to="rent.cash.to"
      ></rent-cash-proceed-chart>
      <div>Всего</div> -->

      <date-panel name="hours" @setDate="setDate($event)"></date-panel>
      <div>Часов проката в день</div>
      <rent-hours-chart 
        chartId="main-chart-02"
        class="chart-wrapper" 
        style="height:150px;margin:10px 0 40px;" 
        :type="rent.hours.type"
        :from="rent.hours.from"
        :to="rent.hours.to"
      ></rent-hours-chart>

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
  created() {
    this.setDateForMonth('count');
    this.setDateForMonth('cash');
    this.setDateForMonth('hours');
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
          type: 'Month',
          from: '',
          to: ''
        },
        cash: {
          type: 'Month',
          from: '',
          to: ''
        }
      },
    }
  },
  methods: {
    setDate (e) {
      if (!this.rent[e.name]) {
        writeLog('Dashboard.vue, setDate', 'undefined name', {name: e.name})
      }
      //console.log('e', e)

      switch (e.type) {
        case 'Day' :
          this.setDateForDay(e.name);
        break;
        case 'Month' :
          this.setDateForMonth(e.name, e.from, e.to);
        break;
        case 'Year' : 
          this.setDateForYear(e.name);
        break;
        case 'FromTo' :
          this.setDateForFromTo(e.name, e.from, e.to);
        break;
      }
    },
    setDateForDay(name) {
      this.rent[name].type = 'Day';
      const to = shortDate.makeDate(null, 'h');
      const from = shortDate.getNextDateAndHours(to, -23);

      this.rent[name].to = to;
      this.rent[name].from = from;
    },
    setDateForMonth(name) {
      const to = shortDate.makeDate();
      const from = shortDate.getNextDay(to, -31);

      if (from && to) {
        this.rent[name].type = 'Month';
        this.rent[name].from = from;
        this.rent[name].to = to;
      }
    },
    setDateForYear(name) {
      this.rent[name].type = 'Year';
      const to = shortDate.makeDate();
      const from = shortDate.getNextDay(to, -365);

      this.rent[name].to = to;
      this.rent[name].from = from;
    },
    setDateForFromTo(name, from, to) {
      if (from && to) {
        this.rent[name].type = 'FromTo'
        this.rent[name].from = from
        this.rent[name].to = to
      }
    },
  },
}
</script>
<style scoped>
  .from-to-line {
    display: flex;
    justify-content: space-between;
  }
</style>