<template>
  <nav class="stat-nav">
    <ul class="stat-nav__list">
      <li class="stat-nav__item" @click="select('rentals')">
        <h5 class="nav-stat__capt" :class="{ active: selected == 'rentals' }">Пункты проката</h5>
        <div class="btn-show">show</div>

        <ul class="stat-nav--sub__list sub-nav">
          <li class="sub-nav__item">Луначарского, 222</li>
          <li class="sub-nav__item">Неизвестная, 57</li>
        </ul>
      </li>
      <li class="stat-nav__item" :class="{ active: selected == 'employers' }"  @click="select('employers')">
        <h5 class="nav-stat__capt">Сотрудники</h5>
      </li>
      <li class="stat-nav__item" :class="{ active: selected == 'products' }"  @click="select('products')">
        <h5 class="nav-stat__capt">Товары</h5>
      </li>
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
  .stat-nav {}

  .stat-nav__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .stat-nav__item {
    margin: 0;
    padding: 0;
    position: relative;
  }
  .stat-nav__item:hover {
    cursor: pointer;
    /*background-color: #20a8d8;*/
    /*color: #fff;*/
  }
  .active {
    outline: 1px solid gray;
  }
  .btn-show {
    position: absolute;
    display: none;
  }
  .sub-nav__item {
    padding-left: 5px;
  }
</style>