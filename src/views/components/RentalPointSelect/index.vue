<template> 
  <select class="custom-select" v-model="selected" @change="setActivePoint()">
    <option v-for="item in rentalPoints" :value="item.id_rent">{{ item.name }}</option>
  </select>
</template>
<script>
  export default {
    beforeCreate() {
      this.$store.dispatch('getRentalPoints')
      .then(() => {
        this.selected = this.$store.getters.activeRentalPoint;
      })
    },
    data() {
      return {
        selected: false,
      }
    },
    methods: {
      setActivePoint() {
        this.$store.commit('activeRentalPoint', this.selected);
      }
    },
    computed: {
      rentalPoints() {
        return this.$store.getters.rentalPoints;
      },
      activePoint() {
        return this.$store.getters.activeRentalPoint;
      }
    }

  }
</script>
<style lang="scss" scoped>
  .custom-select {
    flex-basis: 300px;
  }
</style>