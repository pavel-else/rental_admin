<template>
  <div class="r-details">    
    <table class="table r-details__table">
      <thead></thead>
      <tbody>
        <tr>
          <th scope="row">Название</th>
          <td>
            <input class="r-details__input" v-if="mod === 'add' || mod === 'upd'" v-model="rental.name" placeholder="Название пункта проката">
            <template v-else>{{ rental.name }}</template>
          </td>
        </tr>
        <tr>
          <th scope="row">ID</th>
          <td>{{ rental.id_rent }}</td>
        </tr>
        <tr>
          <th scope="row">Город</th>
          <td>
            <input class="r-details__input" v-if="mod === 'add' || mod === 'upd'" v-model="rental.city" placeholder="Название города">
            <template v-else>
              {{ rental.city }}
            </template>
          </td>
        </tr>
        <tr>
          <th scope="row">Адресс</th>
          <td>
            <input class="r-details__input" v-if="mod === 'add' || mod === 'upd'" v-model="rental.address" placeholder="Улица, номер дома">
            <template v-else>
              {{ rental.address }}
            </template>
          </td>
        </tr>
        <tr>
          <th scope="row">Открытие</th>
          <td>
            <input class="r-details__input" v-if="mod === 'add' || mod === 'upd'" v-model="rental.time_open" type="time">
            <template v-else>
              {{ rental.time_open }}
            </template>
          </td>
        </tr>
        <tr>
          <th scope="row">Закрытие</th>
          <td>
            <input class="r-details__input" v-if="mod === 'add' || mod === 'upd'" v-model="rental.time_close" type="time">
            <template v-else>
              {{ rental.time_close }}
            </template>
          </td>
        </tr>
        <tr>
          <th scope="row">Статус</th>
          <td>
            <input class="r-details__input" v-if="mod === 'add' || mod === 'upd'" v-model="rental.status">
            <template v-else>
              {{ rental.status }}
            </template>
          </td>
        </tr>
      </tbody>    
    </table>
      <b-row class="btns align-items-center" v-if="mod === 'add' || mod === 'upd'">
        <b-col class="d-flex justify-content-around" sm="12">
          <b-button class="r-lock__btn" @click="save()" variant="outline-primary">Сохранить</b-button>
          <b-button class="r-lock__btn" @click="cancel()" variant="outline-secondary">Отменить</b-button>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import copy from 'copy_obj'

export default {
  name: 'RentalDetails',
  props: {
    selectedRental: Object,
    mod: String,
  },
  data() {
    return {
      rental: {}
    }
  },
  methods: {
    setRental(rental) {
      this.rental = copy(rental);
    },
    save() {
      //console.log(this.rental)
      this.$emit('save', this.rental);
    },
    cancel() {
      this.$emit('cancel');
    }
  },

  watch: {
    selectedRental() {
      this.setRental(this.selectedRental);
    }
  }
}
</script>
<style scoped>
  .r-details__input {
    box-sizing: border-box;
    width: 100%;
  }
</style>
