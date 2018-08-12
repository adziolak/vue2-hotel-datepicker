import Vue from 'vue'
import BookingForm from './BookingForm.vue'
import HotelDatePicker from '../src'

Vue.use(HotelDatePicker)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(BookingForm)
})