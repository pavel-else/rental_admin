<template>
  <b-card>
    <div slot="header" class="d-flex justify-content-between">
      <strong>Детальная информация</strong>
      <b-button class="category" variant="outline-danger" @click="close()">X</b-button>
    </div>

    <table class="table">
      <tbody>
        <tr>
          <th scope="row">Название</th>
          <td><input class="form-control" v-model="product.name"></td>
        </tr>
        <tr>
          <th scope="row">Категория</th>
          <td>
            <span v-if="!showCategoriesList" class="pointer" @click="showCategoriesList = true">{{ category.name }}</span>
            <CategoriesToSelect v-else :categories="parentCategories" @setCategory="setCategory($event)" />
          </td>
        </tr>
        <tr>
          <th scope="row">Иконка</th>
          <td>
            <Icons 
              :iconId="product.icon_id"
              :categoryId="product.category"
              :color="product.color"
              @setIcon="setIcon($event)"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">Цвет</th>
          <td>
            <Palette @setColor="setColor($event)"/>
          </td>
        </tr>
        <tr>
          <th scope="row">Стоимость</th>
          <td><input class="form-control" v-model="product.cost"></td>
        </tr>
        <tr>
          <th scope="row">Статус</th>
          <td>{{ product.status }}</td>
        </tr>
      </tbody>
    </table>
    <b-row>
      <b-col class="btn-group">
        <b-button class="btn" variant="outline-success" @click="save()">Сохранить</b-button>
        <b-button class="btn" variant="outline-danger">Удалить</b-button>
      </b-col>
    </b-row>
  </b-card>  
</template>

<script>
import copy from '@/functions/copy';
import Icons from './icons';
import Palette from './palette';
import CategoriesToSelect from './categoriesToSelect';

export default {
  name: 'Details',
  components: {
    Icons,
    Palette,
    CategoriesToSelect
  },
  props: {
    _product: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      product: copy(this._product),
      showCategoriesList: false,
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.$store.dispatch('updateProduct', this.product);
      this.close();
    },
    setIcon(iconId) {
      this.product.icon_id = iconId;
    },
    setColor(color) {
      this.product.color = color;
    },
    setCategory(categoryId) {
      this.product.category = categoryId;
      this.showCategoriesList = false;
    }
  },
  computed: {
    category() {
      if (!this.product || !this.product.category) {
        return false;
      }

      const category = this.$store.getters.categories.find(i => i.id_rent === this.product.category);
      return category;
    },
    parentCategories() {
      return this.$store.getters.categories.filter(i => i.id_rental_org === this.$store.getters.activeRentalPoint && i.parent_id === null);
    }
  }
}
</script>
<style lang="scss" scoped>
  .btn-group {
    margin-top: 50px;

    .btn {
      margin: 0 10px;
    }
  }
</style>
