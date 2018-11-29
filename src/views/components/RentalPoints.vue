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
                :active="selected.id_rental === item.id_rental"
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
export default {
  name: 'RentalPoints',
  components: {
    RentalDetails
  },
  data () {
    return {
      selected: {},
      mod: 'view', // view || add || edit
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
      this.mod = 'edit';
      this.caption = 'Обновить информацию';
    },
    remove() {
    },
    detailsSave(rental) {
      this.$store.dispatch('saveRentalPoint', rental);
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
      return this.$store.getters.getRentalPoints;
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
