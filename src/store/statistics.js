export default {
  state: {
    statistics: {
      dates: ['2018-09-01', '2018-09-02', '2018-09-03'],
      rentCount: {
        8800000001: [20, 22, 8],
        9900000002: [0, 0, 0]
      },
      rentHours: {
        8800000001: [17.6, 22.4, 11.1],
        9900000002: [0, 0, 0]
      },
      rentCash: {
        8800000001: [2200, 3220, 1540],
        9900000002: [0, 0, 0]
      }
    }
  },
  mutations: {

  },
  getters: {
    statistics: state => ({ cmd, from, to, id }) => {
      switch (cmd) {
        case 'cash' : return getCash(state.statistics, from, to, id)
      }
    }
  }
  // this.$store.getters.statistics('cashTotal', '2018-09-01 00:00', '2018-09-30 23:59', 8800000001) // 15890 
}

const getCash = (statistics, from, to, id) => {
  return 'statistics'
}