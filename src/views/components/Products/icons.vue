<template>
  <ul class="list">
    <li v-for="icon in icons">
      <i class="icon" :style="activeStyle(icon)">
        <svg :viewBox="icon.viewBox" :fill="color">
          <path :d="icon.d"/>
        </svg>
      </i>
    </li>
  </ul>
</template>

<script>
  import copy from '@/functions/copy';

  export default  {
    props: {
      iconId: [String, Number],
      categoryId: [String, Number],
      color: String,
    },
    methods: {
      activeStyle(icon) {
        if (icon.id_rent == this.iconId) {
          return { "border-bottom": "3px solid " +  this.color };
        }
      }
    },
    computed: {
      icons() {
        const icons = this.$store.getters.icons;
        const category = this.$store.getters.categories.find(i => i.id_rent == this.categoryId);

        if (!category || !category.icons_id) {
          return [];
        }

        const validIconsId = category.icons_id.split(',');

        const validIcons = validIconsId.map(id => icons.find(icon => icon.id_rent == id));

        return validIcons;
      },
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