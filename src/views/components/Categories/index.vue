<template>
    <b-card>
      <div slot="header">
        <strong>Категории</strong>
      </div>
      <b-row>
        <b-col>  
          <DraggableTree v-if="items && items.length" :data="items" draggable crossTree @change='changeTree($event)'>
            <div slot-scope="{data, store, vm}"  @click="selectCategory(data)">
              <template v-if="!data.isDragPlaceHolder">
                <b v-if="data.children && data.children.length" @click="store.toggleOpen(data)">{{data.open ? '-' : '+'}}&nbsp;</b>
                <span>{{data.text}}</span>
              </template>
            </div>
          </DraggableTree>
          <span v-else>Нет категорий</span>
        </b-col>
      </b-row>

      <b-row class="newCategory" v-if="showNewCategory">
        <b-col>
          <input class="form-control" placeholder="Новая категория" v-model="newCategoryName" ref="newCategory">
        </b-col>
      </b-row>

      
      <b-row class="btn-group">
        <b-col v-if="showNewCategory">
          <b-button class="btn" variant="outline-success" @click="save()">Сохранить</b-button>
        </b-col>
        <b-col v-if="showNewCategory">
          <b-button class="btn" variant="outline-danger" @click="showNewCategory = !showNewCategory">Отмена</b-button>
        </b-col>
        <b-col v-if="!showNewCategory">
          <b-button class="btn" variant="outline-success" @click="newCategory()">Добавить категорию</b-button>
        </b-col>
      </b-row>
    </b-card>
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
    data() {
      return {
        showNewCategory: false,
        newCategoryName: '',
      }
    },
    methods: {
      changeTree(node, targetTree) {
        //this.data = targetTree.getPureData()
      },
      selectCategory(category) {
        if (!category || !category.id_rent) {
          return false;
        }

        this.$store.commit('activeCategory', category.id_rent);
      },
      newCategory() {
        this.showNewCategory = !this.showNewCategory;
        this.$nextTick(() => this.$refs.newCategory.focus())
      },
      save() {
        this.$store.dispatch('newCategory', this.newCategoryName);
      },
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

        const allCategories = this.$store.getters.categories;
        const categoriesOfPoint = allCategories.filter(i => i.id_rental_org === this.$store.getters.activeRentalPoint);

        return makeTree(copy(categoriesOfPoint));
      }
    }
  }
</script>
<style lang="scss">
  #app {
    padding: 50px;
  }

  .he-tree {
    border: 1px solid #ccc;
    padding: 20px;
  }
  .tree-node {
  }
  .tree-node-inner {
    padding: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .draggable-placeholder {
  }
  .draggable-placeholder-inner {
    border: 1px dashed #0088F8;
    box-sizing: border-box;
    background: rgba(0, 136, 249, 0.09);
    color: #0088f9;
    text-align: center;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .newCategory {
    margin-top: 20px;
    display: flex;
    input {
      width: 100%;
    }
  }

  .btn-group {
    margin-top: 20px;
    display: flex;
    .col {
      display: flex;
      justify-content: center;
    }
    .btn {
      width: 100%;
    }
  }
</style>