<template>
  <div>
    <b-card v-if="show === 'tree'" class="tree">
      <div slot="header">
        <strong>Категории</strong>
      </div>
      <b-row>
        <b-col>  
          <DraggableTree v-if="items && items.length" :data="items" draggable crossTree @change="changeTree">
            <div slot-scope="{ data, store, vm }">
              <template v-if="!data.isDragPlaceHolder">
                <div class="wrap">
                  <div class="text" @click="selectCategory(data)" @dblclick="changeCategory(data)">
                    <b v-if="data.children && data.children.length" @click="store.toggleOpen(data)">{{ data.open ? '-' : '+' }}&nbsp;</b>
                    <span>{{ data.text }}</span>
                  </div>
                  <div class="show-btns">
                    <i class="icon-note icons font-ml ml-1" @click="changeCategory(data)" title="Редактировать"></i>
                    <i class="icon-close icons font-ml ml-1" @click="deleteCategory(data)" title="Удалить"></i>                
                  </div>
                </div>

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

    <Details v-if="show === 'details'" :_category="categoryToDetails" @close="show = 'tree'" />
  </div>
</template>
<script>
  import { DraggableTree } from 'vue-draggable-nested-tree';
  import copy from '@/functions/copy';
  import Details from './details';

  export default {
    components: {
      DraggableTree,
      Details
    },
    beforeCreate() {
      this.$store.dispatch('getCategories');
    },
    data() {
      return {
        showNewCategory: false,
        newCategoryName: '',
        show: 'tree', // tree || details
        categoryToDetails: null,
      }
    },
    methods: {
      changeTree(node, targetTree) {
         console.log('tree', targetTree.getPureData());

        if (!targetTree) {
          return false;
        }

        this.$store.dispatch('changeCategoriesTree', targetTree.getPureData());
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
        const category = {
          name: this.newCategoryName,
          appId: this.$store.getters.activeRentalPoint
        };

        this.$store.dispatch('newCategory', category);
        this.showNewCategory = !this.showNewCategory;
      },
      deleteCategory(category) {
        // Категорию нельзя удалять, если к ней привязаны товары
        const products = this.$store.getters.products;
        const filter = products.filter(i => i.category === category.id_rent);

        if (filter && filter.length) {
          alert('К категории привязаны товары, удаление не возможно');
          return false;
        }

        this.$store.dispatch('deleteCategory', { idRent: category.id_rent, appId: this.$store.getters.activeRentalPoint });
      },
      changeCategory(category) {
        this.show = 'details';
        this.categoryToDetails = {
          name:    category.name,
          id_rent: category.id_rent,
        };
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

          const sortByPosition = (categories) => {
            return categories.sort((a, b) => a.position - b.position);
          };


          // Рекурсивное добавление дочерних категорий к родительским
          const addChildren = (list) => {
            list.map(i => {
              const children = getChildren(i);
              const sortChildren = sortByPosition(children);
              i.children = addChildren(sortChildren);

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

          const sortParent = sortByPosition(parentCategories);

          // Наращиваем на них детей
          const tree = addChildren(sortParent);

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
  .tree {
    .wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        width: 100%;
      }

      &:hover .icons {
        display: block;
      }
      .icons {
        display: none;
      }
      .show-btns {
        display: flex;
        align-items: center;
      }
    }
  }

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