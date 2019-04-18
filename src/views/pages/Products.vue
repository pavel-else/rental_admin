<template>
  <div class="animated fadeIn">
    <b-row v-if="show === 'main'">
      <b-col sm="4">
        <Categories />
      </b-col>
      <b-col sm="8">
        <Products @select="selectProduct($event)"/>
      </b-col>
    </b-row>

    <!-- Детальная информация -->
    <b-row v-if="show === 'details'" class="d-flex justify-content-center">
      <b-col sm="8">
        <Details :_product="selectedProduct" @close="show = 'main'"></Details>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Products from '@/views/components/Products/Products';
  import Categories from '@/views/components/Categories/Categories';
  import Details from '@/views/components/Products/Details';

  export default {
    components: {
      Products,
      Categories,
      Details,
    },
    data() {
      return {
        show: 'main', // main || details
        selectedProduct: null,
      };
    },
    methods: {
      selectProduct(product) {
        this.selectedProduct = product;
        this.show = 'details';
      }
    }
  }
</script>