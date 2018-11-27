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
                v-for="item in rentalLocations"
                @click="selectRental(item)"
                :active="selectedRental.id_rental === item.id_rental"
              >
                {{ item.name }}
              </b-list-group-item>
            </b-list-group>
            <b-row class="btns align-items-center">
              <b-col class="d-flex justify-content-between" sm="12">
                <b-button variant="outline-primary">Добавить</b-button>
                <b-button variant="outline-secondary">Изменить</b-button>
                <b-button variant="outline-danger">Удалить</b-button>
              </b-col>
            </b-row>
          </b-card>
      </b-col>
      <b-col sm="8">
        <b-card>
          <div slot="header">
            <strong>Детальная информация</strong>
            <rental-details :rental="selectedRental"></rental-details>
          </div>          
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RentalDetails from '@/views/components/RentalDetails'
export default {
  name: 'RentalLocations',
  components: {
    RentalDetails
  },
  data () {
    return {
      selectedRental: {},
    }
  },
  methods: {
    selectRental(rental) {
      this.selectedRental = rental;
    },
    setActiveDefault() {
      this.selectedRental = this.rentalLocations ? this.rentalLocations[0] : {};
    }
  },
  computed: {
    rentalLocations() {
      return this.$store.getters.getRentalLocations;
    }
  },
  watch: {
    rentalLocations() {
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
</style>
