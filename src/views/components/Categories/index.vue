<template>
  <div id="myApp">
    <DraggableTree :data="items" draggable crossTree>
      <div slot-scope="{data, store, vm}">
        <template v-if="!data.isDragPlaceHolder">
          <b v-if="data.children && data.children.length" @click="store.toggleOpen(data)">{{data.open ? '-' : '+'}}&nbsp;</b>
          <span>{{data.text}}</span>
        </template>
      </div>
    </DraggableTree>
  </div>
</template>
<script>
  import { DraggableTree } from 'vue-draggable-nested-tree';
  import copy from '@/functions/copy';
  export default {
    components: { DraggableTree },
    beforeCreate() {
      this.$store.dispatch('getCategories');
    },
    data: function () {
      return {
        _items: [
          {text: 'node 1'},
          {text: 'node 2'},
          {text: 'node 3 undraggable', draggable: false},
          {text: 'node 4'},
          {text: 'node 4 undroppable', droppable: false},
          {text: 'node 5', children: [
            {text: 'node 1'},
            {text: 'node 2', children: [
              {text: 'node 3'},
              {text: 'node 4'},
            ]},
            {text: 'node 2 undroppable', droppable: false, children: [
              {text: 'node 3'},
              {text: 'node 4'},
            ]},
            {text: 'node 2', children: [
              {text: 'node 3'},
              {text: 'node 4 undroppable', droppable: false},
            ]},
            {text: 'node 3'},
            {text: 'node 4'},
            {text: 'node 3'},
            {text: 'node 4'},
            {text: 'node 3'},
            {text: 'node 4'},
            {text: 'node 3'},
            {text: 'node 4'},
          ]},
        ]
      }
    },
    computed: {
      items() {
        const makeTree = (categories) => {
          if (!categories || !categories.map) {
            return [];
          }

          // Вспомогательная функция, возращает список потомков
          const getChildren = (category) => categories.filter(i => i.parent_id === category.id_rent);

          // Рекурсивное добавление дочерних категорий к родительским
          const addChildren = (list) => {
            list.map(i => {
              const children = getChildren(i);
              i.children = addChildren(children);

              return i;
            });

            return list;
          };

          // Подгоняеm поле Text для отображения
          const modify = categories.map(i => {
            i.text = i.name;

            return i;
          });

          // Отбираем родительские категории
          const parentCategories = modify.filter(i => !i.parent_id);

          // Наращиваем на них детей
          const tree = addChildren(parentCategories);
          
          return tree;
        };

        const categories = this.$store.getters.categories;

        return makeTree(copy(categories));
      }
    }
  }
</script>