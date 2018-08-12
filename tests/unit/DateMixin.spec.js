import  DateMixin from '@/mixins/DateMixin'

let translation = {
    days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsAbbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}

describe('DateMixin', () => {
    
    it('should compare two dates', () => {
        expect(DateMixin.methods.compareDates(null, null)).toEqual(false)
        expect(DateMixin.methods.compareDates(new Date(), null)).toEqual(false)
        expect(DateMixin.methods.compareDates(null, new Date())).toEqual(false)
        expect(DateMixin.methods.compareDates(new Date(2018, 8, 11), new Date(2018, 8, 15), ">")).toEqual(false)
        expect(DateMixin.methods.compareDates(new Date(2018, 8, 15), new Date(2018, 8, 12), "<")).toEqual(false)
        expect(DateMixin.methods.compareDates(new Date(2018, 8, 15), new Date(2018, 8, 12))).toEqual(false)
        expect(DateMixin.methods.compareDates(new Date(), new Date())).toEqual(true)
        expect(DateMixin.methods.compareDates(new Date(2018, 8, 12), new Date(2018, 8, 11), ">")).toEqual(true)
        expect(DateMixin.methods.compareDates(new Date(2018, 8, 10), new Date(2018, 8, 12), "<")).toEqual(true)
    });

    it('should detect invalid date', () => {
        expect(DateMixin.methods.isValidDate({})).toEqual(false)
        expect(DateMixin.methods.isValidDate([])).toEqual(false)        
        expect(DateMixin.methods.isValidDate(123)).toEqual(false)
        expect(DateMixin.methods.isValidDate('abc')).toEqual(false)
        expect(DateMixin.methods.isValidDate(null)).toEqual(false)
        expect(DateMixin.methods.isValidDate(undefined)).toEqual(false)
        expect(DateMixin.methods.isValidDate(new Date())).toEqual(true)
    })

    it('should format date strings correctly in English', () => {
        expect(DateMixin.methods.formatDate(new Date(2018, 5, 15), 'dd MMM yy', translation)).toEqual('15 Jun 18')
        expect(DateMixin.methods.formatDate(new Date(2018, 5, 15), 'd MMMM yyyy', translation)).toEqual('15 June 2018')
        expect(DateMixin.methods.formatDate(new Date(2018, 5, 15), 'dd MMM yyyy', translation)).toEqual('15 Jun 2018')
        expect(DateMixin.methods.formatDate(new Date(2018, 5, 15), 'MM-dd-yyyy', translation)).toEqual('06-15-2018')
        expect(DateMixin.methods.formatDate(new Date(2018, 5, 15), 'MMMM yyyy dd', translation)).toEqual('June 2018 15')
    });

    it('should get different in days between two dates', () => {
        expect(DateMixin.methods.getDaysDiff(new Date(2018, 5, 15), new Date(2018, 5, 15))).toEqual(0)
        expect(DateMixin.methods.getDaysDiff(new Date(2018, 5, 15), new Date(2018, 5, 20))).toEqual(5)
        expect(DateMixin.methods.getDaysDiff(new Date(2018, 5, 20), new Date(2018, 5, 15))).toEqual(-5)
        expect(DateMixin.methods.getDaysDiff(new Date(2018, 4, 10), new Date(2018, 5, 10))).toEqual(31)
    });

    it('should give correct days in a month', () => {
        expect(DateMixin.methods.daysInMonth(2018, 0)).toEqual(31)
        expect(DateMixin.methods.daysInMonth(2018, 1)).toEqual(28)
        expect(DateMixin.methods.daysInMonth(2018, 2)).toEqual(31)
        expect(DateMixin.methods.daysInMonth(2018, 3)).toEqual(30)
        expect(DateMixin.methods.daysInMonth(2018, 4)).toEqual(31)
        expect(DateMixin.methods.daysInMonth(2018, 5)).toEqual(30)
        expect(DateMixin.methods.daysInMonth(2018, 6)).toEqual(31)
        expect(DateMixin.methods.daysInMonth(2018, 7)).toEqual(31)
        expect(DateMixin.methods.daysInMonth(2018, 8)).toEqual(30)
        expect(DateMixin.methods.daysInMonth(2018, 9)).toEqual(31)
        expect(DateMixin.methods.daysInMonth(2018, 10)).toEqual(30)
        expect(DateMixin.methods.daysInMonth(2018, 11)).toEqual(31)
    });

})