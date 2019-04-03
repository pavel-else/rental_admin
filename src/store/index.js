import Vue   from 'vue';
import Vuex  from 'vuex';
import axios from 'axios';


import auth          from './modules/auth';
import multiRequest  from './modules/multiRequest';
import settings      from './modules/settings';
import rentalPoints  from './modules/rentalPoints';
import products      from './modules/products';products

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    multiRequest,
    settings,
    rentalPoints,
    products
  }
});

export default store;