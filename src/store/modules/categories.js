import axios from 'axios';
export default {  
    state: {
        categories: []
    },
    getters: {
        categories(state) {
            return state.categories;
        },
    },
    mutations: {
        categories(state, categories) {
            console.log('commit: categories', categories);
            state.categories = categories;
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