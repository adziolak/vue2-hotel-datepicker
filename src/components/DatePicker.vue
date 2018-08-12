<template>
    <div class="datepicker" v-clickoutside="close" :class="{ open: show }">
        <div class="input-control">
            <input type="text" readonly="true" @click="show = !show;resetStartDate()" :placeholder="placeholder" :value="formatDate(value, format, translation)" />
            <button class="clear-button" v-show="show && value !== null" @click="clearDate()">
                <svg viewPort="0 0 12 12" version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                    <line x1="1" y1="11" 
                            x2="11" y2="1" 
                            stroke="black" 
                            stroke-width="2"/>
                    <line x1="1" y1="1" 
                            x2="11" y2="11" 
                            stroke="black" 
                            stroke-width="2"/>
                </svg>
            </button>
        </div>
        <div class="calendar" v-show="show">
            <div class="header">
                <button @click="previousMonth()" class="nav prev">
                    <svg  viewBox="0 0 1000 1000"><path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"></path></svg>
                </button>
                <b class="current-month-year"> 
                    {{currentMonthName}} {{currentYearName}}
                </b>
                <button @click="nextMonth()" class="nav next">
                    <svg viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path></svg>                   
                </button>
            </div>

            <span class="cell day-header" v-for="d in daysOfWeek" :key="d.timestamp">{{ d }}</span>
            <span v-if="blankDays > 0" class="cell day blank" v-for="d in blankDays" :key="d.timestamp"></span>
            <span class="cell day"
                v-for="day in days"
                :key="day.timestamp"
                :class="dayClasses(day)"
                @click="onSelect(day)"
                >{{day.date}}</span>

            <div class="info" v-show="extraInfo || updatedInfo">
                <small v-show="extraInfo">{{extraInfo}}</small> <br />
                <small v-show="updatedInfo">{{updatedInfo}} </small>
            </div>
        </div>
    </div>
</template>

<script>
    import DateMixin from '../mixins/DateMixin'
    import clickoutside from '../directives/clickoutside'
    export default {
        directives: {
            clickoutside
        },
        props: {
            value: {
                validator: (val) => {
                    return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number'
                }
            },
            availableDates: Object,
            highlighted: Object,
            mondayFirst: {
                type: Boolean,
                default: false
            },
            translation: {
                type: Object,
                default: () => {
                    return {
                        days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        monthsAbbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    }
                }
            },
            format: {
                type: String,
                default: 'dd MMM yyyy'
            },
            updatedInfo: {
                type: String,
                default: ""
            },
            extraInfo: {
                type: String,
                default: ""
            },
            placeholder: {
                type: String,
                default: ""
            }
        },
        data () {
            const startDate = this.value ? new Date(this.value) : new Date()
            return {
                startDateTimestamp: startDate.setDate(1),
                show: false
            }
        },
        mixins: [DateMixin], 
        computed: {
            /**
             * Gets the name of the month the current page is on
             * @return {String}
             */
            currentMonthName () {
                let month = this.startDate.getMonth();
                return  this.translation.months[month]
            },
            /**
             * Get current year 
             * @return {String}
             */
            currentYearName () {
                return this.startDate.getFullYear();
            },
            startDate () {
                return new Date(this.startDateTimestamp)
            },
            /**
             * Returns the day number of the week less one for the first of the current month
             * Used to show amount of empty cells before the first in the day calendar layout
             * @return {Number}
             */
            blankDays () {
                const d = this.startDate
                let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
                
                if (this.mondayFirst) {
                    return dObj.getDay() > 0 ? dObj.getDay() - 1 : 6
                }
                return dObj.getDay(dObj)
            },
            /**
             * @return {Object[]}
             */
            days () {
                const d = this.startDate
                let days = []
                let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes())
                let daysInMonth = this.daysInMonth(dObj.getFullYear(), dObj.getMonth())
                for (let i = 0; i < daysInMonth; i++) {
                    days.push({
                        date: dObj.getDate(),
                        timestamp: dObj.getTime(),
                        isSelected: this.isSelectedDate(dObj),
                        isHighlighted: this.isHighlightedDate(dObj),
                        isAvailable: this.isAvailableDate(dObj)
                    })
                    dObj.setDate(dObj.getDate(dObj) + 1)
                }
                return days
            },
            /**
             * Returns an array of day names
             * @return {String[]}
             */
            daysOfWeek () {
                if (this.mondayFirst) {
                    const tempDays = this.translation.days.slice()
                    tempDays.push(tempDays.shift())
                    return tempDays
                }
                return this.translation.days
            }
        },
        methods: {
            /**
             * Change the page month
             * @param {Number} incrementBy
             */
            changeMonth (incrementBy) {
                let date = this.startDate
                date.setMonth(date.getMonth() + incrementBy);
                this.setStartDate(date);
            },
            /**
             * Decrement the page month
             */
            previousMonth () {
                this.changeMonth(-1)
            },
            /**
            * Increment the current page month
            */
            nextMonth () {
                this.changeMonth(1);
            },
            /**
             * Set start day
             * @param {Date} date 
             */
            setStartDate (date) {
                this.startDateTimestamp = date.setDate(1)
            },
            /**
             * Reset start day 
             */
            resetStartDate () {
                const startDate = this.value ? new Date(this.value) : new Date()
                this.startDateTimestamp = startDate.setDate(1);
            },
            /**
             * Whether a day is selected
             * @param {Date}
             * @return {Boolean}
             */
            isSelectedDate (dObj) {
                return this.value && this.compareDates(this.value, dObj)
            },
            /**
             * Return classes
             * @param {Object}
             * @return {Object}
             */
            dayClasses (day) {
                return {
                    'selected': day.isSelected,
                    'available': day.isAvailable,
                    'highlighted': day.isHighlighted,
                    'first': day.date == 1     
                }
            },
            /**
             * Close datepicker
             */
            close() {
                this.show = false;
            },
            /**
             * Open datepicker
             */            
            open() {
                this.show = true;
            },
            /**
             * Set the selected date
             * @param {Number} timestamp
            */
            setDate (timestamp) {
                const date = new Date(timestamp)                      
                this.$emit('selected', date)
                this.$emit('input', date)            
            },
            /**
             * Run when available day was clicked
             */
            onSelect(day) {
                if (!day.isAvailable) return;

                this.setDate(day.timestamp);
                this.close();
            },
            /**
            * Clear the selected date
            */
            clearDate () {
                this.$emit('selected', null)
                this.$emit('input', null)
                this.$emit('cleared')
            },
            /**
             * Check a day is highlighted 
             * @param {Date}
             * @return {Boolean}
             */
            isHighlightedDate (date) {
                let highlighted = false

                if (typeof this.highlighted === 'undefined') {
                    return false
                }

                if (this.highlighted.from !== null && this.highlighted.to !== null) {
                    const d = new Date(date.getTime())
                    const from = new Date(this.highlighted.from.getTime())
                    const to = new Date(this.highlighted.to.getTime())

                    d.setHours(0, 0, 0, 0)
                    from.setHours(0, 0, 0, 0)
                    to.setHours(0, 0, 0, 0)

                    highlighted = d >= from && d <= to
                }

                return highlighted
            }
        }
    }
</script>


<style>
.datepicker * {
    box-sizing: border-box;
}

.datepicker {
    float: left;
    font-family: 'Montserrat', sans-serif;
    position: relative;
}

.datepicker input[type=text] {
    font-family: 'Montserrat', sans-serif;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    width: 125px;
    font-size: 0.9rem;
    cursor: pointer
}

.datepicker.open input[type=text] {
    background: #abeae6;
}

.datepicker.open input[type=text]::-webkit-input-placeholder { 
  color: #488d97;
}

.datepicker.open input[type=text]::-moz-placeholder { 
  color: #488d97;
}

.datepicker.open input[type=text]:-ms-input-placeholder { 
  color: #488d97;
}

.datepicker.open input[type=text]:-moz-placeholder { 
  color: #488d97;
}

.datepicker .header {
    display: flex;
    justify-content: space-between;
    align-items: center
}

.datepicker .cell {
    display: block;
    padding: 0 5px;
    width: 14.285714285714286%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid transparent;
    float: left;
    position: relative;
    font-size: 0.8rem;
}

.datepicker .day:not(.available) {
    text-decoration: line-through;
    color: #e2e5e5;
}

.datepicker .day.available {
    cursor: pointer;
}

.datepicker .day.available:hover,
.datepicker .day.available.selected,
.datepicker .day.available.highlighted {
    color: #fff;
    background: #ed6664;
}

.datepicker .day:not(.blank) {
    border-right: solid 1px #e2e5e5;
    border-top: solid 1px #e2e5e5;
}

.datepicker .day:not(.blank):nth-child(7n+2) {
    border-left: solid 1px #e2e5e5;
}

.datepicker .day:not(.blank):nth-last-child(-n+8) {
    box-shadow: 0px 1px 0px 0px #e2e5e5;
}

.datepicker .day.first {
    box-shadow: -1px 0px 0px 0px #e2e5e5;
}
  
.datepicker .nav {
    background: none;
    border: solid 1px #d7d7d7;
    cursor: pointer;
    width: 50px;
    height: 35px;
    border-radius: 4px;
    outline: 0
}

.datepicker .nav:hover {
    border-color: #ed6664;
    background: #ed6664;
}

.datepicker .nav:hover svg {
    fill: #fff;
}

.datepicker .nav svg {
    height: 19px;
    width: 19px;
    fill: #757575;
}

.datepicker .day-header {
    font-weight: bold;
    line-height: 45px;
}

.calendar {
    position: absolute;
    top:100%;
    left:0;
    border: solid 1px #d7d7d7;
    border-radius: 4px;
    padding: 20px;
    width: 100%;
    margin-top:10px;
    background: #fff;
    z-index:100;
}

.calendar:after,
.calendar:before {
    content: '';
    display: block;
    position: absolute;
    left: 100%;
    width: 0;
    height: 0;
    border-style: solid;
}

.calendar:after {
    top: -20px;
    left: 23px;
    border-color: transparent transparent #fff transparent ;
    border-width: 10px;
}

.calendar:before {
    top: -23px;
    left: 22px;
    border-color: transparent transparent #d7d7d7 transparent ;
    border-width: 11px;
}

.calendar .info {
    float: left;
    width: 100%;
    text-align: left;
    margin-top: 25px;
    font-weight: 600;
    font-size: 0.9rem;
    line-height: 1.3rem;
}

.input-control {
    position: relative;
}

.clear-button {
    background:none;
    border:none;
    cursor:pointer;
    position: absolute;
    right:0;
    top: 6px;
    outline: 0
}

.clear-button svg {
    width:15px;
    height:15px;
}
</style>