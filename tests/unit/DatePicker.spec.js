import DatePicker from '@/components/DatePicker.vue'
import { shallowMount } from '@vue/test-utils'

describe('Datepicker mounted', () => {
  let wrapper
  let date
  beforeEach(() => {
    date = new Date(2018, 7, 25)
    wrapper = shallowMount(DatePicker, {
      propsData: {
            format: 'yyyy-MM-dd',
            value: date
          }
      })
  })

  it('correctly sets the value when created', () => {
      expect(wrapper.vm.value).toEqual(date)
  })

  it('sets the date', () => {
    const date = new Date(2018, 8, 18)
    const wrapper = shallowMount(DatePicker, {
      propsData: {
          format: 'yyyy-MM-dd',
          value: date
        }
    })
    wrapper.vm.setDate(date.getTime())
    expect(wrapper.vm.value.getTime()).toEqual(date.getTime())
  })

  it('should open and close the calendar', () => {
    wrapper.vm.close()
    expect(wrapper.vm.show).toEqual(false)
        
    wrapper.vm.open()
    expect(wrapper.vm.show).toEqual(true)
  })
})