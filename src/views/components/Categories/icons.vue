<template>
  <div>
    <div class="list">
      <i class="icon" v-for="item in list" @click="click(item.id)">
        <svg :viewBox="item.viewBox" :fill="color">
          <path :d="item.d"/>
        </svg>
      </i>
      <i class="icon-plus icons font-ml ml-1 pointer" title="Добавить"></i>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      category: Object,
    },
    data() {
      return {
        ids: this.makeIds(),
        color: 'black',
      }
    },
    methods: {
      makeIds() {
        if (!this.category || !this.category.icons_id) {
          return [];
        }

        const arr = this.category.icons_id.split(',');
        return arr;
      },
      click(type) {
        this.$emit('selectIcon', type);
      },
    },
    computed: {
      list() {
        const list = this.ids.map(i => {
          const icon = this.$store.getters.icons.find(icon => icon.id == i);
          return icon;
        });

        return list;
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