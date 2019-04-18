import axios from 'axios';
export default {  
  actions: {
    initStore({ dispatch, commit, getters }) {
      console.log('dispatch: initStore');

      return new Promise((resolve, reject) => {
        const queue = [
          { cmd: 'getCategories' },
          { cmd: 'getProducts' },
          { cmd: 'getRentalPoints' },
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
          commit('products', r.data.products);
          commit('rentalPoints', r.data.rental_points);

          dispatch('setActiveRentalPointId', 0);

          resolve(true);                        
        }).
        catch(err => {
          console.log(err)
          reject(err);
        })
      });            
    },
  }
}