<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app',
  beforeCreate() {
    if (!localStorage.getItem('user-token')) {
      this.$router.push('/Pages/Login');
    } else {
      this.$store.dispatch('initStore');
    }
  }
}
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  // @import '~font-awesome/css/font-awesome.css';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';

// TODO : make import for normalize.css
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .pointer {
    cursor: pointer;
  }
</style>
