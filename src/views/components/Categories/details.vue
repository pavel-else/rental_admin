<template>
  <b-card class="tree">
    <div slot="header">
      <strong>Редактировать категорию</strong>
    </div>
    
    <table class="table">
      <tbody>
        <tr>
          <th scope="row">ID</th>
          <td><input class="form-control" v-model="category.id_rent" disabled></td>
        </tr>
        <tr>
          <th scope="row">Название</th>
          <td><input class="form-control" v-model="category.name"></td>
        </tr>
        <tr>
          <th scope="row">Иконка</th>
          <td><input class="form-control"></td>
        </tr>
        <!-- <tr>
          <th scope="row">Статус</th>
          <td>{{ product.status }}</td>
        </tr> -->
      </tbody>
    </table>
    
    <b-row class="btn-group">
      <b-col>
        <b-button class="btn" variant="outline-success" @click="save()">Сохранить</b-button>
      </b-col>
      <b-col>
        <b-button class="btn" variant="outline-danger" @click="$emit('close')">Отмена</b-button>
      </b-col>
    </b-row>
  </b-card> 
</template>
<script>
  import copy from '@/functions/copy';
  export default {
    props: {
      _category: Object,
    },
    data() {
      return {
        category: copy(this._category),
      }
    },
    methods: {
      save() {
        this.$store.dispatch('updateCategory', this.category);
        this.$emit('close');
      }
    }
  }
</script>