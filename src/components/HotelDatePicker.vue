<template>
    <div class="hotelpicker clearfix">
        <header> 
            <div><b class="price">{{price}} {{translation.currency}}</b> <small>{{translation.priceUnit}} </small> </div>
            <star-rating 
                :rating         = "rating" 
                :increment      = 0.5 
                :star-size      = 12 
                :total-votes    = "totalVotes" 
                :active-color   = "startActiveColor" 
                :inactive-color = "startInactiveColor"
            ></star-rating>
        </header>
        <label v-show="label">{{label}} </label>
        <div class="hotelpicker-input" :class="{ 'invalid': isInvalid }">
            <div class="check-in-picker">
                <date-picker 
                :extra-info      = "extraInfo"
                :updated-info    = "updatedInfo"
                :translation     = "translation" 
                :placeholder     = "translation.placeholderCheckIn"
                :available-dates = "availableDates" 
                :monday-first    = "mondayFirst"
                :format          = "format"
                :selected        = "onSelect()" 
                :cleared         = "setData()"
                :highlighted     = "getHighlightedRange()"
                v-model          = "value.start" 
                ref="startPicker"
                ></date-picker>
            </div><!-- check-in-picker --> 
            <div class="arrow-right-icon"><svg class="arrow-right-icon" viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path></svg></div>
            <div class="check-out-picker">
                <date-picker 
                :extra-info      = "extraInfo"
                :updated-info    = "updatedInfo"
                :translation     = "translation" 
                :placeholder     = "translation.placeholderCheckOut"  
                :available-dates = "availableDates"
                :monday-first    = "mondayFirst"
                :format          = "format"
                :selected        = "onSelect()" 
                :cleared         = "setData()"
                :highlighted     = "getHighlightedRange()"
                v-model          = "value.end"
                ref="endPicker" 
               ></date-picker>
            </div><!-- check-out-picker --> 
        </div><!-- hotelpicker-input -->
        <div v-show="isInvalid" class="invalid-feedback">
           {{translation.errorMsg}}
        </div>
    </div>
</template>

<script>
import DatePicker from './DatePicker.vue';
import StarRating from './StarRating.vue';
import DateMixin from '../mixins/DateMixin'
export default {
    name:'vue2-hotel-datepicker',
    mixins: [DateMixin], 
    components: {
        DatePicker,
        StarRating
    },
    props: {
        availableDates: Object,
        price: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: ""
        },
        translation: {
            type: Object,
            default: () => {
                return {
                    errorMsg: "You could not select this dates range",
                    placeholderCheckIn: "Check In",
                    placeholderCheckOut: "Check Out",
                    currency: "zł",
                    priceUnit: "per night",
                    days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    monthsAbbr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                }
            }
        },
        totalVotes: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        },
        startActiveColor: {
            type: String,
            default: '#388188'
        },
        startInactiveColor: {
            type: String,
            default: '#d8d8d8'
        },
        updatedInfo: {
            type: String,
            default: ""
        },
        extraInfo: {
            type: String,
            default: ""
        },
        mondayFirst: {
            type: Boolean,
            default: true
        },
        format: {
            type: String,
            default: 'dd MMM yyyy'
        },
        value: {
            type: Object,
            default: () => {
                return {
                    start: null,
                    end: null
                }
            }
        }
    },
    data() {
        return {
            isInvalid: false
        }
    },
    methods: {
        /**
         * Calculate days and total price and emit selected and input events
         */
        setData() {
            let days = this.isCorrectDateRange() ? 
                        this.getDaysDiff(this.value.start, this.value.end) : 0;

            let total = days * this.price;

            this.$emit('selected', {
                days: days,
                total: total
            })

            this.$emit('input', this.value)            
        },
        /**
         * Emit when after check in date or check out date change
         */
        onSelect() {
            if (this.$refs.endPicker && this.$refs.startPicker) {
                if (this.value.start !== null && this.value.end === null) {
                    this.$refs.endPicker.open();                    
                }

                if (this.value.start === null && this.value.end !== null) {
                    this.$refs.startPicker.open();
                }

                if (this.value.start !== null && this.value.end !== null) {
                    this.isInvalid = !this.isCorrectDateRange();
                }
            } 

            this.setData();
        },
        /**
         * Check selected date range
         */
        isCorrectDateRange() {
            return (this.value.start!==null && this.value.end!==null &&
                    !this.compareDates(this.value.start, this.value.end) && 
                    this.compareDates(this.value.start, this.value.end, '<') &&
                    this.isAllDaysAvailable(this.value.start, this.value.end))
        },
        /**
         * Get hightlighted range
         */
        getHighlightedRange() {
            return {
                from: this.value.start,
                to: this.value.end
            }
        }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700,800');

    .hotelpicker * {
        box-sizing: border-box;
    }

    .hotelpicker {
        text-align: left;
        font-family: 'Montserrat', sans-serif;
        color: #494949;
        margin-bottom:20px;
    }

    .hotelpicker header {
        border-bottom: solid 1px #e1e1e1;
        margin-bottom: 25px;
        padding-bottom: 15px;
        line-height: 23px;
    }

    .hotelpicker label {
        font-weight: bold;
        font-size:0.8rem;
        margin-bottom: 5px;
        display: block; 
    }

    .hotelpicker .price {
        font-size: 20px;
        margin-right: 5px;
    }

    .hotelpicker .invalid-feedback {
        color: #dc3545;
        font-size: 0.8rem;
        list-style: none;
        padding: 0;
        margin: 5px 0 0 0;
    }

    .hotelpicker-input {
        display: flex;
        justify-content: space-between;
        border: solid 1px #dcdcdc;
        padding:3px;
        position: relative;
        align-items: center
    }

    .hotelpicker-input.invalid {
        border-color: #dc3545;
    }

    .hotelpicker-input .datepicker {
        position: static;
    }

    .hotelpicker .check-out-picker .calendar:after {
        left: auto;
        right: 23px;
    }

    .hotelpicker .check-out-picker .calendar:before {
        left: auto;
        right: 22px;
    }

    .arrow-right-icon {
        margin: 0 5px;
    }
    
    .arrow-right-icon svg {
        height: 25px;
        width: 25px;
        fill: #4a4a4a;
    }

    .clearfix::after {
        content: "";
        clear: both;
        display: table;
    }

</style>