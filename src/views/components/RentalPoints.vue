<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="4">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Список точек проката </strong><small><!-- active items --></small>
            </div>
            <b-list-group>
              <b-list-group-item
                v-for="item in rentalPoints"
                @click="selectRental(item)"
                @dblclick="wrapToChange(item)"
                :active="selected.id_rent === item.id_rent"
              >
                {{ item.name }}
              </b-list-group-item>
            </b-list-group>
            <b-row class="btns align-items-center">
              <b-col class="d-flex justify-content-between" sm="12">
                <b-button class="r-lock__btn" @click="add()" :disabled="mod === 'add'" variant="outline-primary">Добавить</b-button>
                <b-button class="r-lock__btn" @click="change()" :disabled="mod !== 'view'" variant="outline-secondary">Изменить</b-button>
                <b-button class="r-lock__btn" @click="remove()" :disabled="!(mod !== 'view' || mod !== 'add')" variant="outline-danger">Удалить</b-button>
              </b-col>
            </b-row>
          </b-card>
      </b-col>
      <b-col sm="8">
        <b-card>
          <div slot="header">
            <strong>{{ caption }}</strong>
            <rental-details 
              :selectedRental="selected" 
              :mod="mod" 
              @save="detailsSave($event)" 
              @cancel="detailsCancel()"
            ></rental-details>
          </div>          
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import RentalDetails from '@/views/components/RentalDetails'
  import { writeLog } from '@/functions/logs'
  export default {
    name: 'RentalPoints',
    components: {
      RentalDetails
    },
    beforeCreate() {
      this.$store.dispatch('getRentalPoints');
    },
    data () {
      return {
        selected: {},
        mod: 'view', // view || add || upd
        caption: 'Детальная информация',
      }
    },
    methods: {
      selectRental(rental) {
        this.selected = rental;
        this.mod = 'view';
        this.caption = 'Детальная информация';
      },
      setActiveDefault() {
        this.selected = this.rentalPoints ? this.rentalPoints[0] : {};
      },
      add() {
        this.mod = 'add';
        this.caption = 'Добавить точку проката';
        this.selected = {};
      },
      change() {
        this.mod = 'upd';
        this.caption = 'Обновить информацию';
      },
      remove() {
        if (!this.selected.id_rent) {
          writeLog('RentalPoints.vue, remove', 'id_rent is not defined', { id_rent: this.selected.id_rent })
        }
        if (confirm('Вы действительно хотите удалить выбранный пункт проката?')) {
          this.$store.dispatch('removeRentalPoint', this.selected.id_rent);
        }
      },
      detailsSave(rental) {
        if (this.mod === 'add') {
          this.$store.dispatch('createRentalPoint', rental);
        }
        if (this.mod === 'upd') {
          this.$store.dispatch('updateRentalPoint', rental);
        }
      },
      detailsCancel() {
        this.mod = 'view';
        this.caption = 'Детальная информация';
      },
      wrapToChange(rental) {
        this.selectRental(rental);
        this.change();
      }
    },
    computed: {
      rentalPoints() {
        return this.$store.getters.rentalPoints;
      }
    },
    watch: {
      rentalPoints() {
        this.setActiveDefault();
      }
    },
    created(){
      this.setActiveDefault();
    }
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .btns {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .r-lock__btn {
    display: block;
    flex-grow: 1;
    margin: 0 5px;
  }

</style>
