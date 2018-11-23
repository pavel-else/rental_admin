<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="4">
        <b-card>
          <div slot="header">
            <strong>Список точек проката</strong>
          </div>
          
          <ul>
            <li v-for="item in rentalLocations">{{ item.name }}</li>
          </ul>
        </b-card>
      </b-col>
      <b-col sm="8">
        <b-card>
          <div slot="header">
            <strong>Детальная информация</strong>
            <rental-details :rental="selectedRental"></rental-details>
          </div>          
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="2">
        <b-card>
          <div slot="header">
            <strong>Credit Card </strong> <small>Form</small>
          </div>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="name">Name</label>
                <b-form-input type="text" id="name" placeholder="Enter your name"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <label for="ccnumber">Credit Card Number</label>
                <b-form-input type="text" id="ccnumber" placeholder="0000 0000 0000 0000"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="4">
              <b-form-group >
                <label for="month1">Month</label>
                <b-form-select id="month1"
                  :plain="true"
                  :options="[1,2,3,4,5,6,7,8,9,10,11,12]">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="year1">Year</label>
                <b-form-select id="year1"
                  :plain="true"
                  :options="[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="cvv">CVV/CVC</label>
                <b-form-input type="text" id="cvv" placeholder="123"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col sm="10">
        <b-card>
          <div slot="header">
            <strong>Company </strong><small>Form</small>
          </div>
          <b-form-group>
            <label for="company">Company</label>
            <b-form-input type="text" id="company" placeholder="Enter your company name"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label for="vat">VAT</label>
            <b-form-input type="text" id="vat" placeholder="PL1234567890"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label for="street">Street</label>
            <b-form-input type="text" id="street" placeholder="Enter street name"></b-form-input>
          </b-form-group>
          <b-row>
            <b-col sm="8">
              <b-form-group>
                <label for="city">City</label>
                <b-form-input type="text" id="city" placeholder="Enter your city"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="postal-code">Postal Code</label>
                <b-form-input type="text" id="postal-code" placeholder="Postal Code"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group>
            <label for="country">Country</label>
            <b-form-input type="text" id="country" placeholder="Country name"></b-form-input>
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RentalDetails from '@/views/components/RentalDetails'
export default {
  name: 'RentalLocations',
  components: {
    RentalDetails
  },
  data () {
    return {
      selected: [], // Must be an array reference!
      show: true
    }
  },
  methods: {
    click () {
      // do nothing
    }
  },
  computed: {
    rentalLocations() {
      return this.$store.getters.getRentalLocations;
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
