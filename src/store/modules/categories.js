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
    newCategory({ getters, commit }, newCategoryName) {
      console.log('dispatch: newCategory');

      return new Promise((resolve, reject) => {
        const queue = [
          { cmd: 'newCategory', value: newCategoryName },
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
    }
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