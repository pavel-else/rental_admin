<template>
  <div class="animated fadeIn">
    <b-row v-if="!showDetails">
      <b-col sm="4">
        <Categories />
      </b-col>
      <b-col sm="8">
        <Products />
      </b-col>
    </b-row>

    <!-- Детальная информация -->
    <!-- <b-row v-if="showDetails" class="d-flex justify-content-center">
      <b-col sm="8">
        <Details :_product="selectedProduct" @close="showDetails = false"></Details>
      </b-col>
    </b-row> -->
  </div>
</template>

<script>
  import Products from '@/views/components/Products/Products';
  import Categories from '@/views/components/Categories/Categories';
  export default {
    components: {
      Products,
      Categories,
    }
  }
</script>