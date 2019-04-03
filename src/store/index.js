import Vue   from 'vue';
import Vuex  from 'vuex';
import axios from 'axios';


import auth          from './modules/auth';
import multiRequest  from './modules/multiRequest';
import settings      from './modules/settings';
import rentalPoints  from './modules/rentalPoints';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    multiRequest,
    settings,
    rentalPoints,
  }
});

export default store;