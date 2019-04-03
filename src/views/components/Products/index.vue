<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="4">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Точки проката </strong><small><!-- active items --></small>
            </div>
            <b-list-group>
              <b-list-group-item
                class="pointer"
                v-for="item in rentalPoints"
                @click="selectRental(item)"
                :active="selected.id_rent === item.id_rent"
              >
                {{ item.name }} {{ item.id_rent }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
      </b-col>
      <b-col sm="8">
        <b-card>
          <div slot="header">
            <strong>Товары</strong>
            <b-button class="category" variant="outline-primary">Велосипеды</b-button>
            <b-button class="category" variant="outline-secondary">Ролики</b-button>
            <b-button class="category" variant="outline-secondary">Лыжи</b-button>
          </div>

            <b-list-group>
              <b-list-group-item
                class="pointer"
                v-for="item in products"
              >
                {{ item.name }}
              </b-list-group-item>
            </b-list-group>          
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      this.$store.dispatch('multiRequest', [
        { cmd: 'getRentalPoints' },
        { cmd: 'getAllProducts' },
      ])
      .then(() => {
        if (this.rentalPoints && this.rentalPoints.length > 0) {
          this.selected = this.rentalPoints[0];
        }
      });
    },
    data() {
      return {
        selected: {}
      }
    },
    methods: {
      selectRental(point) {
        this.selected = point;
      }
    },
    computed: {
      rentalPoints() {
        return this.$store.getters.rentalPoints;
      },
      products() {
        const products = this.$store.getters.products;

        if (!products) {
          return [];
        }

        const rentalPointId = this.selected ? this.selected.id_rent : false;

        if (!rentalPointId) {
          return [];
        }

        return products.filter(i => i.id_rental_org === rentalPointId);
      }
    }

  }
</script>
<style lang="scss" scoped>
  .category {
    margin-left: 10px;
  }
</style>