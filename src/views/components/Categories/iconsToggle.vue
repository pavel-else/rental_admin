<template>
  <div>
    <div v-if="show === 'item'" @click="toggle()">
      <Item :iconId="iconId" />      
    </div>
    <List v-if="show === 'list'" @select="selectIcon($event)"/>
  </div>
</template>
<script>
  import List from './iconsList';
  import Item from './icons';
  export default {
    components: {
      List, Item
    },
    props: {
      iconId: [String, Number]
    },
    data() {
      return {
        color: 'black',
        show: 'item', //item || list
      }
    },
    methods: {
      toggle(type) {
        this.show = this.show === 'item' ? 'list' : 'item';
      },
      selectIcon(iconId) {
        console.log('select', iconId)
        this.$emit('selectIcon', iconId);
      }
    },
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