<template> 
  <div class="palette">        
    <ul class="colors">
      <li 
        class="color" 
        :style="{ backgroundColor: color }" 
        v-for="color in palette"
        :key="color"
        @click="onClick(color)"
      >                    
      </li>            
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        palette: [
          '#ff0000', // красный 
          '#0600ff', // синий
          '#397a00', // зеленый
          '#78ff00', // салатовый
          '#ff9c00', // оранжевый
          '#b6b6b6', // серый
          '#3c3c3b', // черный
          '#6f00a2', // фиолетовый
          '#efefef', // белый
          '#fcff00', // желтый
          '#00deff', // голубой
        ]
      }
    },
    methods: {
      onClick(color) {
        this.$emit('setColor', color);
      },
    }
  }
</script>

<style scoped>
  .palette {
    display: flex;
    /*height: 25px;*/
    /*width: 230px;*/
  }
  .colors {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;

    /*width: 220px;*/
  }
  .color {
    display: block;
    box-sizing: border-box;
    margin: 10px 2px;
    padding: 0;
    width: 24px;
    height: 24px;
    border: 2px solid gray;
    border-radius: 3px;
  }
  .color:hover {
    cursor: pointer;
  }

</style>