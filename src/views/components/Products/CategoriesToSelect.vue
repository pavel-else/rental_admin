<template>
  <ul class="list">
    <li class="item" v-for="category in categories" @click.stop="setCategory(category.id_rent)">
      {{ category.name }}
      <CategoriesToSelect v-if="categories && categories.length > 0" :categories="getChildren(category)" @setCategory="setCategory($event)"/>
    </li>
  </ul>
</template>
<script>
  import CategoriesToSelect from './CategoriesToSelect';
  export default {
    name: 'CategoriesToSelect',
    props: {
      categories: [Object, Array]
    },
    components: {
      CategoriesToSelect
    },
    methods: {
      getChildren(category) {
        const children = this.$store.getters.categories.filter(i => i.parent_id === category.id_rent);
        return children;
      },
      setCategory(categoryId) {
        this.$emit('setCategory', categoryId);
      }
    }
  }
</script>
<style>
  .item {
    margin-left: 15px;
    cursor: pointer;
  }
</style>