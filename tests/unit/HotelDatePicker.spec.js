import HotelDatePicker from '@/components/HotelDatePicker.vue'
import { shallowMount } from '@vue/test-utils'

let availableDates = {
    ranges: [
        { 
                from: new Date(2018, 7, 28),
                to: new Date(2018, 7, 30)
            }, 
            {
                from: new Date(2018, 7, 12),
                to: new Date(2018, 7, 25)
            }
    ]
}

describe('Hotel Datepicker mounted', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(HotelDatePicker, {
        propsData: {
          price: 298,
          totalVotes: 123,
          rating: 4.5
        }
      })
    })

    it('set the same check in and check out date', () => {
        const wrapper = shallowMount(HotelDatePicker, {
          propsData: {
            value: {
                start: new Date(2018, 7, 13),
                end: new Date(2018, 7, 13)
            },
            availableDates: availableDates
          }
        })
        expect(wrapper.vm.isCorrectDateRange()).toEqual(false)
    })

    it('set the check in date bigger then check out date', () => {
        const wrapper = shallowMount(HotelDatePicker, {
          propsData: {
            value: {
                start: new Date(2018, 7, 14),
                end: new Date(2018, 7, 13)
            },
            availableDates: availableDates
          }
        })
        expect(wrapper.vm.isCorrectDateRange()).toEqual(false)
    })

    it('set date range with not all days available', () => {
        const wrapper = shallowMount(HotelDatePicker, {
          propsData: {
            value: {
                start: new Date(2018, 7, 24),
                end: new Date(2018, 7, 29)
            },
            availableDates: availableDates
          }
        })
        expect(wrapper.vm.isCorrectDateRange()).toEqual(false)
    })

    it('set correct date range', () => {
        const wrapper = shallowMount(HotelDatePicker, {
          propsData: {
            value: {
                start: new Date(2018, 7, 13),
                end: new Date(2018, 7, 14)
            },
            availableDates: availableDates
          }
        })
        expect(wrapper.vm.isCorrectDateRange()).toEqual(true)
    })

});