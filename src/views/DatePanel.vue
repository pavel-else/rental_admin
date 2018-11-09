<template>
  <b-button-toolbar class="float-right date-panel" aria-label="Toolbar with buttons group" >
    <b-form-radio-group class="mr-3" v-model="selected" buttons button-variant="outline-secondary" name="radiosBtn">
      <b-form-radio class="mx-0" value="Day">День</b-form-radio>
      <b-form-radio class="mx-0" value="Month">Месяц</b-form-radio>
      <b-form-radio class="mx-0" value="Year">Год</b-form-radio>
      <b-form-radio class="mx-0" value="FromTo">Произвольно</b-form-radio>
    </b-form-radio-group>
    <div class="from-to" v-show="selected==='FromTo'">      
        <input 
          class="from-to__input" 
          type="date" 
          v-model="from"
          :max="to"
        >
        <input
          class="from-to__input" 
          type="date"
          v-model="to"
          :min="from"
        >
    </div>
  </b-button-toolbar>  
</template>
<script>
  import * as shortDate from '@/functions/date'
  export default {
    props: {
      name: String
    },
    data() {
      return {
        selected: 'Month',
        from: '',
        to: shortDate.makeDate(new Date().toString())
      }
    },
    methods: {
      setDate() {
        this.$emit('setDate', {name: this.name, type: this.selected, from: this.from, to: this.to})
      }
    },
    watch: {
      selected() {
        this.setDate()
      },
      from() {
        this.setDate()
      },
      to() {
        this.setDate()
      }
    }
  }
</script>
<style scoped>
  .date-panel {
    display: inline-flex;
    flex-wrap: nowrap;
  }
  .from-to {
    display: inline-flex;
  }
  .from-to__input {
    margin-right: 5px;
  }
</style>       