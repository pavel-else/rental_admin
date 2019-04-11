import axios from 'axios';
export default {  
  state: {
    categories: [],
    activeCategory: null
  },
  getters: {
    categories(state) {
      return state.categories;
    },
    activeCategory(state) {
      return state.activeCategory;
    },
  },
  mutations: {
    categories(state, categories) {
      console.log('commit: categories', categories);
      state.categories = categories;
    },
    activeCategory(state, activeCategory) {
      console.log('commit: activeCategory', activeCategory);
      state.activeCategory = activeCategory;
    }
  },
  actions: {
    getCategories({ commit, getters }) {
      console.log('dispatch: getCategories');

      return new Promise((resolve, reject) => {
        const queue = [
          { cmd: 'getCategories'},
        ];
        const url = getters.url;
        const token = localStorage.getItem('user-token');

        axios({ 
          url,
          data: {
            queue,
            token
          },
          method: 'POST',
        })
        .then(r => {
          console.log(r);
          commit('categories', r.data.categories);
          resolve(true);                        
        }).
        catch(err => {
          console.log(err)
          reject(err);
        })
      });            
    },
    newCategory({ getters, commit }, category) {
      console.log('dispatch: newCategory');

      return new Promise((resolve, reject) => {
        const queue = [
          { cmd: 'newCategory', value: category },
          { cmd: 'getCategories' },
        ];

        const url = getters.url;
        const token = localStorage.getItem('user-token');

        axios({ 
          url,
          data: {
            queue,
            token
          },
          method: 'POST',
        })
        .then(r => {
          console.log(r);
          commit('categories', r.data.categories);
          resolve(true);                        
        }).
        catch(err => {
          console.log(err)
          reject(err);
        })
      }); 
    },
    changeCategoriesTree({ getters, commit }, tree) {
      console.log('dispatch: setCategories');

      // Для более удобной работы на сервере, и чтобы не передавать лишнюю информацию, 
      // преобразуем данные к виду плоского дерева: [{ pos, id_rent, parent }, { pos, id_rent, parent }, ...]
      const toModify = (tree) => {
        const result = [];

        const prepare = (position, node, parent_id) => {
          return {
            position,
            parent_id,
            id_rent: node.id_rent,
          };
        };

        const iter = (subTree, parent_id) => {
          for (let i = 0; i < subTree.length; i += 1) {
            const node = subTree[i];

            result.push(prepare(i, node, parent_id));

            iter(node.children, node.id_rent);
          }
        };

        iter(tree, null);
        return result;
      };

      return new Promise((resolve, reject) => {
        const categories = toModify(tree);
        const appId = getters.activeRentalPoint;

        const queue = [
          { cmd: 'changeCategoriesTree', value: { categories, appId } },
        ];
        const url = getters.url;
        const token = localStorage.getItem('user-token');

        axios({ 
          url,
          data: {
            queue,
            token
          },
          method: 'POST',
        })
        .then(r => {
          console.log(r);
          resolve(true);                        
        }).
        catch(err => {
          console.log(err)
          reject(err);
        })
      });  
    },
    deleteCategory({ getters, commit }, category) {
      console.log('dispatch: deleteCategory');

      return new Promise((resolve, reject) => {
        const queue = [
          { cmd: 'deleteCategory', value: category },
          { cmd: 'getCategories' },
        ];

        const url = getters.url;
        const token = localStorage.getItem('user-token');

        axios({ 
          url,
          data: {
            queue,
            token
          },
          method: 'POST',
        })
        .then(r => {
          console.log(r);
          commit('categories', r.data.categories);
          resolve(true);                        
        }).
        catch(err => {
          console.log(err)
          reject(err);
        })
      }); 
    },
    // setProduct({ commit, getters }, product) {
    //     console.log('dispatch: setProduct', product);

    //     return new Promise((resolve, reject) => {
    //         axios({
    //             method: 'post',
    //             url: getters.url,
    //             data: {
    //                 queue: [
    //                     { cmd: 'setProduct', value: product },
    //                     { cmd: 'getProducts'}
    //                 ],
    //                 token: localStorage.getItem('user-token')
    //             },                 
    //         })
    //         .then(r => {
    //             console.log(r);
    //             commit('products', r.data.products);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             reject(err);
    //         });
    //     });
    // },
    // deleteProduct({ commit, getters }, id_rent) {
    //     console.log('dispatch: deleteProduct', id_rent);

    //     return new Promise((resolve, reject) => {
    //         axios({
    //             method: 'post',
    //             url: getters.url,
    //             data: {
    //                 queue: [
    //                     { cmd: 'deleteProduct', value: id_rent },
    //                     { cmd: 'getProducts'},
    //                     { cmd: 'getTariffs'},
    //                     { cmd: 'getRentalPointInfo'},
    //                 ],
    //                 token: localStorage.getItem('user-token')
    //             },                 
    //         })
    //         .then(r => {
    //             console.log(r);
    //             commit('rentalPointInfo', r.data.rental_point_info);
    //             commit('tariffs', r.data.tariffs);
    //             commit('products', r.data.products);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             reject(err);
    //         });
    //     });
    // }
  }
}