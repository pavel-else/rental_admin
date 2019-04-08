<template>
  <div class="animated fadeIn">
    <b-row v-if="!showDetails">
      <b-col sm="4">
        <Categories />
      </b-col>
      <b-col sm="8">
        <b-card>
          <div slot="header">
            <strong>{{ activeCategoryName }}</strong>
          </div>

            <b-list-group>
              <b-list-group-item
                class="pointer"
                v-for="item in products"
                @click="selectProduct(item)"
              >
                {{ item.name }}
              </b-list-group-item>
            </b-list-group>          
        </b-card>
      </b-col>
    </b-row>

    <!-- Детальная информация -->
    <b-row v-if="showDetails" class="d-flex justify-content-center">
      <b-col sm="8">
        <Details :_product="selectedProduct" @close="showDetails = false"></Details>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Details from './Details';
  import Categories from '@/views/components/Categories';
  export default {
    components: {
      Details,
      Categories
    },
    beforeCreate() {
      this.$store.dispatch('multiRequest', [
        { cmd: 'getProducts' },
      ])
      .then(() => {
        if (this.rentalPoints && this.rentalPoints.length > 0) {
          this.selectedPoint = this.rentalPoints[0];
        }
      });
    },
    data() {
      return {
        selectedProduct: {},
        showDetails: false
      }
    },
    methods: {
      selectRental(point) {
        this.selectedPoint = point;
      },
      selectProduct(product) {
        this.selectedProduct = product;
        this.showDetails = true;
      }
    },
    computed: {
      rentalPoints() {
        return this.$store.getters.rentalPoints;
      },
      activeCategory() {
        return this.$store.getters.activeCategory;
      },
      activeCategoryName() {
        if (!this.activeCategory) {
          return 'No category';
        }

        const category = this.$store.getters.categories.find(i => i.id_rent === this.activeCategory);

        return category ? category.name : '';
      },
      products() {
        const products = this.$store.getters.products;

        if (!products) {
          return [];
        }

        const rentalPointId = this.$store.getters.activeRentalPoint;

        if (!rentalPointId) {
          return [];
        }

        const productsOfPoint = products.filter(i => i.id_rental_org === rentalPointId);

        return productsOfPoint.filter(i => i.category === this.activeCategory);
      }
    }

  }
</script>
<style lang="scss" scoped>
  .category {
    margin-left: 10px;
  }
</style>