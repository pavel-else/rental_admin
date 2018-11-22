 <template>
  <div class="stat animated fadeIn">
    <h3 class="stat__caption">Статистика проката</h3>
    <div class="stat__wrap row">
      <stat-nav class="stat__nav col-sm-2" @select="selectNavItem($event)"></stat-nav>

      <b-card class="stat__card col-sm-10">
        <div class="stat__charts">

          <div v-show="selected === 'rentals'">
            <h4>Стартов проката</h4>
            <date-panel name="count" @setDate="setDate($event)"></date-panel>
            <div class="from-to-line"><small>{{ rent.count.from }}</small><small>{{ rent.count.to }}</small></div>
            <rent-count 
              chartId="main-chart-01"
              class="chart-wrapper" 
              style="height:150px;margin:10px 0 40px;"
              :type="rent.count.type"
              :from="rent.count.from"
              :to="rent.count.to"
            ></rent-count>

            <h4>Выручка в день</h4>
            <date-panel name="cash" @setDate="setDate($event)"></date-panel>
            <div class="from-to-line"><small>{{ rent.cash.from }}</small><small>{{ rent.cash.to }}</small></div>
            <rent-cash-proceed-chart 
              chartId="main-chart-03"
              class="chart-wrapper" 
              style="height:150px;margin:10px 0 40px;" 
              :type="rent.cash.type"
              :from="rent.cash.from"
              :to="rent.cash.to"
            ></rent-cash-proceed-chart>
            <div>Всего</div>

            <h4>Часов проката в день</h4>
            <date-panel name="hours" @setDate="setDate($event)"></date-panel>
            <div class="from-to-line"><small>{{ rent.hours.from }}</small><small>{{ rent.hours.to }}</small></div>
            <rent-hours-chart 
              chartId="main-chart-02"
              class="chart-wrapper" 
              style="height:150px;margin:10px 0 40px;" 
              :type="rent.hours.type"
              :from="rent.hours.from"
              :to="rent.hours.to"
            ></rent-hours-chart>        
          </div>

          <div v-show="selected === 'products'">
            asdfasdfa
          </div>
        </div>
      </b-card>    
    </div>
  </div>
</template>

<script>
import RentCount from './dashboard/RentCount'
import RentHoursChart from './dashboard/RentHoursChart'
import RentCashProceedChart from './dashboard/RentCashProceedChart'
import DatePanel from './DatePanel'
import StatNav from './StatNav'
import {writeLog} from '@/functions/logs'
import * as shortDate from '@/functions/date'

export default {
  name: 'dashboard',
  components: {
    RentCount,
    RentHoursChart,
    RentCashProceedChart,
    DatePanel,
    StatNav
  },
  created() {
    this.setDateForMonth('count');
    this.setDateForMonth('cash');
    this.setDateForMonth('hours');
  },
  data() {
    return {
      selected: 'rentals',
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
    selectNavItem(e) {
      this.selected = e;
    },
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

  .stat__wrap {
    display: flex;
    justify-content: space-between;
  }
  .stat__nav {

  }
  .stat__card {
    flex-grow: 1;
  }
  .stat__caption {
    flex-basis: 100%;
  }
  .no-gutters {
    
  }
</style>