<template>
  <nav class="stat__nav">
    <ul class="ul">
      <li class="li" @click="select('rentals')">Пункты проката</li>
      <li class="li" @click="select('employers')">Сотрудники</li>
      <li class="li" @click="select('products')">Товары</li>
    </ul>
  </nav>  
</template>

<script>

export default {
  name: 'StatNav',

  data() {
    return {
      selected: 'rentals',
    }
  },
  methods: {
    select(msg) {
      this.selected = msg;
      this.$emit('select', msg);
    }
  }

}
</script>
<style scoped>
  .stat__nav {
    outline: 1px solid lightgray;
  }
  .stat__nav .ul {
    margin: 0 30px 0 0;
    padding: 0;
    list-style: none;
  }
  .stat__nav .li {
    margin: 5px 0;
  }
  .stat__nav .li:hover {
    cursor: pointer;
  }
  .stat__card {
    flex-grow: 1;
  }
</style>