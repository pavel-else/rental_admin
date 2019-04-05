<template>
  <div id="myApp">
    <DraggableTree :data="items" draggable crossTree>
      <div slot-scope="{data, store, vm}">
        <template v-if="!data.isDragPlaceHolder">
          <b v-if="data.children && data.children.length" @click="store.toggleOpen(data)">{{data.open ? '-' : '+'}}&nbsp;</b>
          <span>{{data.text}}</span>
        </template>
      </div>
    </DraggableTree>
  </div>
</template>
<script>
  import { DraggableTree } from 'vue-draggable-nested-tree';
  export default {
    components: { DraggableTree },
    beforeCreate() {
      this.$store.dispatch('getCategories');
    },
    data: function () {
      return {
        items: [
          {text: 'node 1'},
          {text: 'node 2'},
          {text: 'node 3 undraggable', draggable: false},
          {text: 'node 4'},
          {text: 'node 4 undroppable', droppable: false},
          {text: 'node 5', children: [
            {text: 'node 1'},
            {text: 'node 2', children: [
              {text: 'node 3'},
              {text: 'node 4'},
            ]},
            {text: 'node 2 undroppable', droppable: false, children: [
              {text: 'node 3'},
              {text: 'node 4'},
            ]},
            {text: 'node 2', children: [
              {text: 'node 3'},
              {text: 'node 4 undroppable', droppable: false},
            ]},
            {text: 'node 3'},
            {text: 'node 4'},
            {text: 'node 3'},
            {text: 'node 4'},
            {text: 'node 3'},
            {text: 'node 4'},
            {text: 'node 3'},
            {text: 'node 4'},
          ]},
        ]
      }
    },
    methods: {
      onChange: function (moved, targetId, isAbove) {
        console.log('asdf',moved, targetId, isAbove)
        targetId = parseInt(targetId);
        if (isAbove) {
          moved = moved.reverse()
        }
        moved.forEach(itemId => {
          itemId = parseInt(itemId);
          let foundItem = this.items.find(item => item.id === itemId)
          if (foundItem) {
              let index = this.items.indexOf(foundItem);
              this.items.splice(index, 1)
              let targetIdIndex = this.items.findIndex(item => item.id === targetId);
              this.items.splice(targetIdIndex + (isAbove ? 0 : 1), 0, foundItem)
            }
        })
      }
    }
  }
</script>