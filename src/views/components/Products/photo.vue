<template>
  <div class="photo__wrap">
    <div class="photo__text">no photo</div>
    <div class="photo__img" :style="backgroundImage"></div> 
  </div>
</template>

<script>
  export default {
    props: {
      product: Object,
      refresh: Boolean
    },
    computed: {
      url() {
        if (!this.product || !this.product.id_rent) {
          return false;
        }

        const appID = this.$store.getters.activeRentalPointId;
        const ext = this.product.img;
        const rand = this.refresh ? '?' + Math.floor(Math.random() * 1000000) : '';
        const url = `https://rentix.biz/user_uploads/${ appID }_${ this.product.id_rent }_${ ext }${ rand }`;

        return url ;
      },
      backgroundImage() {
        return {
          backgroundImage: this.product.img ? 'url(' + this.url + ')' : 'none',
        }
      }            
    }
  }    
</script>

<style scoped>
  .photo__wrap {
    outline: 1px solid lightgray;
    position: absolute;
  }
  .photo__text {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 50;
  }
  .photo__img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    background-size: cover;
    background-position: center center;
  }
</style>