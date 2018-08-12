export default {
    methods: {
        /**
         * Check if date1 is equivalent, more or less to date2, without comparing the time
         * @see https://stackoverflow.com/a/6202196/4455925
         * @param {Date} date1
         * @param {Date} date2
         * @param {String} op
         */
        compareDates (date1, date2, op = "=") {
            if (!date1 || !date2) return false;

            const d1 = new Date(date1.getTime())
            const d2 = new Date(date2.getTime())

            d1.setHours(0, 0, 0, 0)
            d2.setHours(0, 0, 0, 0)

            let result = false;

            switch (op) {
                case ">":
                  result = d1.getTime() > d2.getTime()
                  break;
                case "<":
                  result = d1.getTime() < d2.getTime()
                  break;
                default:
                    result = d1.getTime() === d2.getTime()
            }

            return result;          
        },
        /**
         * Validates a date object
         * @param {Date} date - an object instantiated with the new Date constructor
         * @return {Boolean}
         */
        isValidDate (date) {
            if (Object.prototype.toString.call(date) !== '[object Date]') {
            return false
            }
            return !isNaN(date.getTime())
        },
        /**
         * Formats date object
         * @param {Date} date
         * @param {String} format
         * @param {Object} translation
         * @return {String}
         */
        formatDate (date, format, translation) {
            if (!this.isValidDate(date)) {
                return;
            }

            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let str = format
            .replace(/dd/, ('0' + day).slice(-2))
            .replace(/d/, day)
            .replace(/yyyy/, year)
            .replace(/yy/, String(year).slice(2))
            .replace(/MMMM/, translation.months[date.getMonth()])
            .replace(/MMM/, translation.monthsAbbr[date.getMonth()])
            .replace(/MM/, ('0' + month).slice(-2))
            .replace(/M(?!a|ä|e)/, month)
            return str
        },
        /**
         * Get diff in days between two dates
         * @param {Date}
         * @param {Date}
         * @return {Number}
         */
        getDaysDiff(date1, date2) {
            let dt1 = new Date(date1);
            let dt2 = new Date(date2);
            return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));    
        },
        /**
         * Get total number of days in month
         * @param {Number} year
         * @param {Number} m
         * @return {Number}
         */
        daysInMonth (year, month) {
            //return new Date(year, month, 0).getDate();
            return /8|3|5|10/.test(month) ? 30 : month === 1 ? (!(year % 4) && year % 100) || !(year % 400) ? 29 : 28 : 31
        },
        /**
         * Check is day available
         * @param {Date}
         * @return {Boolean}
         */
        isAvailableDate (date) {
            let availableDates = false

            if (typeof this.availableDates === 'undefined') {
                return false
            }

            if (typeof this.availableDates.dates !== 'undefined') {
                this.availableDates.dates.forEach((d) => {
                    if (this.compareDates(date, d)) {
                        availableDates = true
                        return true
                    }
                })
            }
            if (typeof this.availableDates.to !== 'undefined' && this.availableDates.to && date <= this.availableDates.to) {
                availableDates = true
            }
            if (typeof this.availableDates.from !== 'undefined' && this.availableDates.from && date >= this.availableDates.from) {
                availableDates = true
            }
            
            if (typeof this.availableDates.ranges !== 'undefined') {
                this.availableDates.ranges.forEach((range) => {
                    if (typeof range.from !== 'undefined' && range.from && typeof range.to !== 'undefined' && range.to) {
                        if (date <= range.to && date >= range.from) {
                            availableDates = true
                            return true
                        }
                    }
                })
            }

            return availableDates
        },
        /**
         * Check is all days available in range
         * @param {Date} date1
         * @param {Date} date2
         * @return {Boolean}
         */
        isAllDaysAvailable(date1, date2) {
            let d1 = new Date(date1);
            let d2 = new Date(date2);
            let flag = true;

            for (let d = d1; d <= d2; d.setDate(d.getDate() + 1)) {
                if (!this.isAvailableDate(d)) flag = false;
            }

            return flag;            
        }
    }
}