<template>
  <div>
    <table class="table">
      <tbody>
        <tr>
          <th scope="row">Категория</th>
          <td>{{ product.category }}</td>
        </tr>
        <tr>
          <th scope="row">Название</th>
          <td>{{ product.name }}</td>
        </tr>
        <tr>
          <th scope="row">Стоимость</th>
          <td>{{ product.cost }}</td>
        </tr>
        <tr>
          <th scope="row">Статус</th>
          <td>{{ product.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
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
  }
}
</script>
