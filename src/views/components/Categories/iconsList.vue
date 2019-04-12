<template>
  <div>
    <div class="list">
      <i class="icon" v-for="item in list" @click="click(item.id)">
        <svg :viewBox="item.viewBox" :fill="color">
          <path :d="item.d"/>
        </svg>
      </i>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      iconId: [String, Number]
    },
    data() {
      return {
        color: 'black',
      }
    },
    methods: {
      click(type) {
        this.$emit('selectIcon', type);
      },
    },
    computed: {
      list() {
        return this.$store.getters.icons;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .list {
    display: flex;
    .icon {
      display: block;
      width: 50px;
      height: 50px;
      margin-left: 5px;
      cursor: pointer;
    }    
  }
</style>