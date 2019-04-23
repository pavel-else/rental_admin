import axios from 'axios';
export default {  
  state: {
    products: []
  },
  getters: {
    products(state) {
      return state.products;
    },
  },
  mutations: {
    products(state, products) {
      console.log('commit: products', products);
      state.products = products;
    }
  },
  actions: {
    getProducts({ commit, getters }) {
      console.log('dispatch: getProducts');

      return new Promise((resolve, reject) => {
        const queue = [
          { cmd: 'getProducts'},
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
          commit('products', r.data.products);
          resolve(true);                        
        }).
        catch(err => {
          console.log(err)
          reject(err);
        })
      });            
    },
    updateProduct({ commit, getters }, product) {
      console.log('dispatch: updateProduct', product);

      const appId = getters.activeRentalPointId;

      const queue = [
        { cmd: 'updateProduct', value: { product, appId } },
        { cmd: 'getProducts' },
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
        commit('products', r.data.products);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    },
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