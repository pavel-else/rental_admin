<template>
  <b-card>
    <div slot="header">
      <strong>{{ activeCategoryName }}</strong>
    </div>
      <b-list-group>
        <b-list-group-item
          class="pointer"
          v-for="item in tariffs"
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
    computed: {
      activeCategoryName() {
        const categoryId = this.$store.getters.activeCategory;

        const category = categoryId ? this.$store.getters.categories.find(i => i.id_rent === categoryId) : false;

        return category ? category.name : 'Категория не выбрана';
      },
      tariffs() {
        return [];
      }
    }

  }
</script>