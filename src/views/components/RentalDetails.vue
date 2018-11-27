<template>
  <table class="table">
    <thead></thead>
    <tbody>
      <tr>
        <th scope="row">Название</th>
        <td>{{ name }}</td>
      </tr>
      <tr>
        <th scope="row">ID</th>
        <td>{{ id }}</td>
      </tr>
      <tr>
        <th scope="row">Город</th>
        <td>{{ city }}</td>
      </tr>
      <tr>
        <th scope="row">Адресс</th>
        <td>{{ address }}</td>
      </tr>
      <tr>
        <th scope="row">Открытие</th>
        <td>{{ timeOpen }}</td>
      </tr>
      <tr>
        <th scope="row">Закрытие</th>
        <td>{{ timeClose }}</td>
      </tr>
      <tr>
        <th scope="row">Статус</th>
        <td>{{ status }}</td>
      </tr>
    </tbody>
    
  </table>

</template>

<script>

export default {
  name: 'RentalDetails',
  props: {
    rental: Object,
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
    }
  },
  methods: {

  },
  computed: {
    name() {
      return this.rental && this.rental.name ? this.rental.name : '-';
    },
    id() {
      return this.rental && this.rental.id_rental ? this.rental.id_rental : '-';
    },
    city() {
      return this.rental && this.rental.city ? this.rental.city : '-';
    },
    address() {
      return this.rental && this.rental.address ? this.rental.address : '-';
    },
    timeOpen() {
      return this.rental && this.rental.time_open ? this.rental.time_open : '-';
    },
    timeClose() {
      return this.rental && this.rental.time_close ? this.rental.time_close : '-';
    },
    status() {
      return this.rental && this.rental.status ? this.rental.status : '-';
    },
  }
}
</script>
