import axios from 'axios';
export default {  
  state: {
    icons: [
      {
        id: 1,
        viewBox: "0 0 1010 585.7407",
        d: "M309.8848,64.7134c-12.4971,0-23.9776-4.0542-33.4268-10.8008h-4.0635 c-12.645,0-22.9126,10.248-22.9126,22.9224c0,12.645,10.2676,22.893,22.9126,22.893h121.4761 c8.6401,0,18.8189-4.9419,18.8189-17.2314c0-11.8555-9.5967-17.7832-19.0064-17.7832H309.8848z M820.9512,207.6811 c-16.1758,0-31.7998,2.2784-46.8018,6.1153L697.7881,12.9111c-3.1865-8.4038-11.4522-13.3154-19.9932-12.7632 C677.3418,0.0986,676.8877,0,676.4043,0h-67.9678c-9.6172,0-17.4189,7.8022-17.4189,17.4185 c0,9.6069,7.8017,17.3989,17.4189,17.3989h54.8399l26.5714,69.9111H352.4844c-2.9986,0-5.8394,0.6904-8.3838,1.8936 c-3.5708,1.3711-6.707,3.8369-8.7984,7.3877l-65.354,112.0962c-24.5693-11.688-51.9204-18.4249-80.8984-18.4249 C84.8145,207.6811,0,292.4858,0,396.7114c0,104.2451,84.8145,189.0293,189.0498,189.0293 c98.376,0,179.3438-75.5224,188.1714-171.6113h39.019c7.5357,25.1318,30.5567,43.5371,58.1245,43.5371 c33.6734,0,60.9556-27.2627,60.9556-60.9355c0-11.4415-3.334-22.0049-8.789-31.1182l180.5976-215.3652l29.4902,77.5449 c-61.9609,31.0498-104.708,95.0029-104.708,168.9189c0,104.2451,84.7842,189.0293,189.0401,189.0293 c104.2343,0,189.0488-84.7842,189.0488-189.0293C1010,292.4858,925.1855,207.6811,820.9512,207.6811z M220.9473,379.2827 l61.3105-105.1328c32.6475,24.8652,55.1358,62.3262,59.9785,105.1328H220.9473z M299.9033,243.9189l51.2393-87.8818 l83.0097,195.2241c-8.4038,7.4073-14.5976,17.0332-17.9121,28.0215h-39.019C372.1123,323.6831,342.7588,275.0869,299.9033,243.9189z  M474.3647,335.7759c-1.0751,0-2.081,0.2666-3.1464,0.3154l-81.3521-191.3081h269.6026L495.8467,339.8589 C489.1299,337.3345,481.9497,335.7759,474.3647,335.7759z M189.0498,550.9233c-85.0415,0-154.2227-69.1905-154.2227-154.2119 s69.1812-154.1929,154.2227-154.1929c22.5869,0,43.9702,5.0005,63.3125,13.7593l-61.9316,106.208 c-0.4639,0-0.9175-0.1191-1.3809-0.1191c-18.977,0-34.3838,15.3574-34.3838,34.3643c0,18.9873,15.4068,34.3632,34.3838,34.3632 c12.605,0,23.4941-6.8545,29.501-16.9648h123.6855C333.5469,490.9741,268.2021,550.9233,189.0498,550.9233z M820.9512,550.9233 c-85.0616,0-154.2227-69.1905-154.2227-154.2119c0-59.0615,33.416-110.4199,82.2988-136.2812l44.1778,116.1699 c-4.1328,5.6611-6.628,12.5752-6.628,20.1309c0,18.9873,15.3868,34.3632,34.3741,34.3632c18.9961,0,34.3633-15.3759,34.3633-34.3632 c0-15.377-10.1104-28.2188-24.0274-32.6377l-44.71-117.5899c11.0967-2.5156,22.5381-3.9849,34.3741-3.9849 c85.0215,0,154.2217,69.1714,154.2217,154.1929S905.9727,550.9233,820.9512,550.9233z",
      },
      {
        id: 2,
        viewBox: "0 18 100 100",
        d: "M76.454,50.452c-0.786,0-1.552,0.082-2.301,0.213l-3.79-11.997h1.154c0.552,0,1.071-0.259,1.403-0.701  c0.331-0.441,0.436-1.013,0.282-1.542l-3.549-12.251c-0.218-0.75-0.904-1.267-1.686-1.267h-3.08c-0.969,0-1.755,0.786-1.755,1.755  s0.786,1.755,1.755,1.755h1.761l2.533,8.741h-1.214c-0.56,0-1.086,0.267-1.416,0.718s-0.427,1.033-0.258,1.566l1.042,3.299  l-25.845,7.105l-0.708-2.24l4.297-2.076c0.873-0.421,1.238-1.471,0.817-2.343c-0.422-0.873-1.471-1.239-2.344-0.817l-11.614,5.61  c-0.873,0.421-1.238,1.471-0.817,2.343c0.303,0.627,0.93,0.992,1.582,0.992c0.256,0,0.516-0.057,0.762-0.175l4.124-1.992  l0.706,2.235l-5.678,4.664c-2.381-2.224-5.567-3.596-9.075-3.596c-7.345,0-13.32,5.975-13.32,13.32s5.976,13.321,13.32,13.321  c7.001,0,12.746-5.432,13.27-12.301l2.753-0.153c0.789,1.846,2.621,3.144,4.752,3.144c2.849,0,5.165-2.317,5.165-5.166  c0-0.601-0.123-1.169-0.312-1.706l19.495-15.96l2.141,6.775c-4.526,2.13-7.674,6.722-7.674,12.047  c0,7.345,5.976,13.321,13.32,13.321c7.346,0,13.321-5.976,13.321-13.321S83.8,50.452,76.454,50.452z M41.189,58.535  c-0.846,0.651-1.476,1.552-1.792,2.598l-2.771,0.154c-0.311-1.636-0.925-3.162-1.776-4.528l4.588-3.769L41.189,58.535z   M32.113,59.005c0.429,0.769,0.752,1.602,0.963,2.479l-4.27,0.238L32.113,59.005z M23.545,73.583c-5.409,0-9.811-4.401-9.811-9.811  s4.401-9.811,9.811-9.811c2.416,0,4.626,0.881,6.338,2.334l-7.451,6.121c-0.587,0.481-0.797,1.286-0.521,1.993  c0.264,0.677,0.915,1.118,1.635,1.118c0.032,0,0.065-0.001,0.098-0.002l9.63-0.536C32.67,69.825,28.542,73.583,23.545,73.583z   M46.95,58.194c-0.714-0.427-1.534-0.686-2.416-0.723l-1.983-6.275l19.491-5.359L46.95,58.194z M76.454,73.583  c-5.409,0-9.811-4.401-9.811-9.811c0-3.756,2.124-7.021,5.231-8.669l2.906,9.199c0.236,0.748,0.928,1.227,1.673,1.227  c0.175,0,0.354-0.026,0.529-0.082c0.924-0.292,1.437-1.278,1.145-2.202l-2.906-9.197c0.405-0.051,0.814-0.086,1.232-0.086  c5.41,0,9.812,4.401,9.812,9.811S81.864,73.583,76.454,73.583z"
      },

    ]
  },
  getters: {
    icons(state) {
      return state.icons;
    }
  },
  // mutations: {
  //   categories(state, categories) {
  //     console.log('commit: categories', categories);
  //     state.categories = categories;
  //   },
  //   activeCategory(state, activeCategory) {
  //     console.log('commit: activeCategory', activeCategory);
  //     state.activeCategory = activeCategory;
  //   }
  // },
  // actions: {
  //   getCategories({ commit, getters }) {
  //     console.log('dispatch: getCategories');

  //     return new Promise((resolve, reject) => {
  //       const queue = [
  //         { cmd: 'getCategories'},
  //       ];
  //       const url = getters.url;
  //       const token = localStorage.getItem('user-token');

  //       axios({ 
  //         url,
  //         data: {
  //           queue,
  //           token
  //         },
  //         method: 'POST',
  //       })
  //       .then(r => {
  //         console.log(r);
  //         commit('categories', r.data.categories);
  //         resolve(true);                        
  //       }).
  //       catch(err => {
  //         console.log(err)
  //         reject(err);
  //       })
  //     });            
  //   },
  //   newCategory({ getters, commit }, category) {
  //     console.log('dispatch: newCategory');

  //     return new Promise((resolve, reject) => {
  //       const queue = [
  //         { cmd: 'newCategory', value: category },
  //         { cmd: 'getCategories' },
  //       ];

  //       const url = getters.url;
  //       const token = localStorage.getItem('user-token');

  //       axios({ 
  //         url,
  //         data: {
  //           queue,
  //           token
  //         },
  //         method: 'POST',
  //       })
  //       .then(r => {
  //         console.log(r);
  //         commit('categories', r.data.categories);
  //         resolve(true);                        
  //       }).
  //       catch(err => {
  //         console.log(err)
  //         reject(err);
  //       })
  //     }); 
  //   },
  //   changeCategoriesTree({ getters, commit }, tree) {
  //     console.log('dispatch: setCategories');

  //     // Для более удобной работы на сервере, и чтобы не передавать лишнюю информацию, 
  //     // преобразуем данные к виду плоского дерева: [{ pos, id_rent, parent }, { pos, id_rent, parent }, ...]
  //     const toModify = (tree) => {
  //       const result = [];

  //       const prepare = (position, node, parent_id) => {
  //         return {
  //           position,
  //           parent_id,
  //           id_rent: node.id_rent,
  //         };
  //       };

  //       const iter = (subTree, parent_id) => {
  //         for (let i = 0; i < subTree.length; i += 1) {
  //           const node = subTree[i];

  //           result.push(prepare(i, node, parent_id));

  //           iter(node.children, node.id_rent);
  //         }
  //       };

  //       iter(tree, null);
  //       return result;
  //     };

  //     return new Promise((resolve, reject) => {
  //       const categories = toModify(tree);
  //       const appId = getters.activeRentalPoint;

  //       const queue = [
  //         { cmd: 'changeCategoriesTree', value: { categories, appId } },
  //       ];
  //       const url = getters.url;
  //       const token = localStorage.getItem('user-token');

  //       axios({ 
  //         url,
  //         data: {
  //           queue,
  //           token
  //         },
  //         method: 'POST',
  //       })
  //       .then(r => {
  //         console.log(r);
  //         resolve(true);                        
  //       }).
  //       catch(err => {
  //         console.log(err)
  //         reject(err);
  //       })
  //     });  
  //   },
  //   updateCategory({ getters, commit }, category) {
  //     console.log('dispatch: updateCategory');

  //     return new Promise((resolve, reject) => {
  //       const appId = getters.activeRentalPoint;
  //       const queue = [
  //         { cmd: 'updateCategory', value: { category, appId } },
  //         { cmd: 'getCategories' },
  //       ];

  //       const url = getters.url;
  //       const token = localStorage.getItem('user-token');

  //       axios({ 
  //         url,
  //         data: {
  //           queue,
  //           token
  //         },
  //         method: 'POST',
  //       })
  //       .then(r => {
  //         console.log(r);
  //         commit('categories', r.data.categories);
  //         resolve(true);                        
  //       }).
  //       catch(err => {
  //         console.log(err)
  //         reject(err);
  //       })
  //     }); 
  //   },
  //   deleteCategory({ getters, commit }, category) {
  //     console.log('dispatch: deleteCategory');

  //     return new Promise((resolve, reject) => {
  //       const queue = [
  //         { cmd: 'deleteCategory', value: category },
  //         { cmd: 'getCategories' },
  //       ];

  //       const url = getters.url;
  //       const token = localStorage.getItem('user-token');

  //       axios({ 
  //         url,
  //         data: {
  //           queue,
  //           token
  //         },
  //         method: 'POST',
  //       })
  //       .then(r => {
  //         console.log(r);
  //         commit('categories', r.data.categories);
  //         resolve(true);                        
  //       }).
  //       catch(err => {
  //         console.log(err)
  //         reject(err);
  //       })
  //     }); 
  //   },
  // }
}