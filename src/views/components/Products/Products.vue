<template>
  <b-card>
    <div slot="header">
      <strong>{{ activeCategoryName }}</strong>
    </div>
      <b-list-group>
        <b-list-group-item
          class="pointer"
          v-for="item in products"
          :key="item.id_rent"
          @click="selectProduct(item)"
        >
          {{ item.name }}
        </b-list-group-item>
      </b-list-group>          
  </b-card>
</template>

<script>
  export default {
    methods: {
      selectProduct(product) {
        this.$emit('select', product);
      }
    },
    computed: {

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

        const rentalPointId = this.$store.getters.activeRentalPointId;

        if (!rentalPointId) {
          return [];
        }

        // Filters
        const activePoint = (product) => product.id_rental_org === rentalPointId;
        const notDeleted = (product) => product.status !== 'deleted';
        const activeCategory = (product) => product.category === this.activeCategory;

        return products.filter(i => activePoint(i) && notDeleted(i) && activeCategory(i));
      }
    }
  }
</script>