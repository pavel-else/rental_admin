<template>
  <b-card>
    <div slot="header" class="d-flex justify-content-between">
      <strong>Детальная информация</strong>
      <b-button class="category" variant="outline-danger" @click="close()">X</b-button>
    </div>

    <table class="table">
      <tbody>
        <tr>
          <th scope="row">Категория</th>
          <td>{{ product.category }}</td>
        </tr>
        <tr>
          <th scope="row">Название</th>
          <td><input class="form-control" v-model="product.name"></td>
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
export default {
  name: 'Details',
  props: {
    _product: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      product: copy(this._product),
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.$store.dispatch('setProduct', this.product);
      this.close();
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
