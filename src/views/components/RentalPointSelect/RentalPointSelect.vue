<template> 
  <select class="custom-select" v-model="selected" @change="setActivePoint()">
    <option v-for="item in rentalPoints" :value="item.id_rent">{{ item.name }}</option>
  </select>
</template>
<script>
  export default {
    data() {
      return {
        selected: false,
      }
    },
    methods: {
      setActivePoint() {
        const rentalPointId = event.target.value;

        if (!rentalPointId) {
          return false;
        }

        this.$store.commit('activeRentalPointId', rentalPointId);
      }
    },
    computed: {
      activeRentalPointId() {
        return this.$store.getters.activeRentalPointId;
      },
      rentalPoints() {
        return this.$store.getters.rentalPoints;
      }
    },
    watch: {
      activeRentalPointId() {
        this.selected = this.activeRentalPointId;
      }
    }

  }
</script>
<style lang="scss" scoped>
  .custom-select {
    flex-basis: 300px;
  }
</style>