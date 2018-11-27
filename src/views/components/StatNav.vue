<template>
    <b-col>
    <b-card
      header-tag="header"
      footer-tag="footer"
      class="no-gutters">
      <div slot="header">
        <i class="fa fa-align-justify"></i><strong> List group </strong><small>actionable items</small>
      </div>
      <b-list-group>
        <b-list-group-item href="#"  @click="select('rentals')" :active="selected === 'rentals'">Пункты проката</b-list-group-item>
        <b-list-group-item href="#"  @click="select('employers')" :active="selected === 'employers'">Сотрудники</b-list-group-item>
        <b-list-group-item href="#"  @click="select('products')" :active="selected === 'products'">Товары</b-list-group-item>
      </b-list-group>
    </b-card>
  </b-col>
<!--   <nav class="stat-nav">
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
  </nav>   -->
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

</style>