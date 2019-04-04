<template>
  <div id="myApp">
    <span> Look at my sortable list below </span>
    <sortable :items="items" @change="onChange">
      <template slot-scope="{item}">
          {{ item.label }}
      </template>
    </sortable>
  </div>
</template>
<script>
  import sortable from "vue-multi-sortable";
  export default {
    components: { sortable },
    data: function () {
      return {
        items: [
          { id: 1, label: "Real Madrid" },
          { id: 2, label: "NeReal Madrid" },
          { id: 2, label: "NeReal NeMadrid" },
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