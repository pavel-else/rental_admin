<template>
  <select class="custom-select" v-model="selected">
    <option v-for="item in rentalPoints" :value="item.id_rent">{{ item.name }}</option>
  </select>
</template>
<script>
  export default {
    data() {
      return {
        selected: this.$store.getters.activeRentalPoints,
      }
    },
    computed: {
      rentalPoints() {
        console.log('this.$store.getters.rentalPoints',this.$store.getters.activeRentalPoints)
        return this.$store.getters.rentalPoints;
      },
      activePoint() {
        return this.$store.getters.activeRentalPoints;
      }
    }

  }
</script>
<style lang="scss" scoped>
  .custom-select {
    flex-basis: 300px;
  }
</style>