<template>
  <div class="animated fadeIn">
    <b-row v-if="show === 'main'">
      <b-col sm="4">
        <Categories />
      </b-col>
      <b-col sm="8">
        <Tariffs />
      </b-col>
    </b-row>

    <!-- Детальная информация -->
<!--     <b-row v-if="show === 'details'" class="d-flex justify-content-center">
      <b-col sm="8">
        <Details :_product="selectedProduct" @close="show = 'main'"></Details>
      </b-col>
    </b-row> -->
  </div>
</template>

<script>
  import Categories from '@/views/components/Categories/Categories';
  import Tariffs from '@/views/components/Tariffs/Tariffs';

  export default {
    components: {
      Categories,
      Tariffs,
    },
    data() {
      return {
        show: 'main', // main || details
        selectedProduct: null,
      };
    },
  }
</script>