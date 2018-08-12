<template>
    <div class="booking">
        <h2>Booking hotel</h2>
        <div class="booking-form">   
            <div class="form-group">                   
                <vue2-hotel-datepicker 
                    v-model          = "value"
                    :price           = 298
                    :total-votes     = 123
                    :rating          = 4.5
                    :available-dates = "availableDates" 
                    :monday-first    = false
                    label            = "Dates"
                    extra-info       = "Minimum stay varies"
                    updated-info     = "Updated 23 days ago"
                    @selected        = "onSelected"                
                    ></vue2-hotel-datepicker>                
            </div>        
            <div class="form-group">
                <label>Persons</label>
                <select class="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </select>
            </div>
            <div class="form-group form-group--control">
                <div><span v-show="total"><b class="total-price">{{total}} zł</b> / <small>{{ days }} nights</small></span></div>
                <button @click="onReserve" class="btn" :disabled="!days">Reserve</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            total: 0,
            price: 298,
            days: 0,
            value: {
                start: null,
                end: null
            },
            availableDates: {
                ranges: [
                    { 
                        from: new Date(2018, 7, 28),
                        to: new Date(2018, 7, 30)
                    }, 
                    {
                        from: new Date(2018, 7, 14),
                        to: new Date(2018, 7, 25)
                    },
                    { 
                        from: new Date(2018, 8, 28),
                        to: new Date(2018, 8, 30)
                    }, 
                    {
                        from: new Date(2018, 8, 12),
                        to: new Date(2018, 8, 25)
                    },
                ]
            }
        }
    },
    methods: {
        onSelected(data) {
            this.total   = data.total;
            this.days    = data.days;
        },
        onReserve() {
            if (!this.days) return;

            alert("now you can reserve")
        }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700,800');
    
    .booking {
        width: 360px;
        margin: 0 auto;
        font-family: 'Montserrat', sans-serif;
        color: #494949
    }

    .booking-form {
        text-align: left;
        border: solid 1px #e4e4e4;
        padding: 20px;
        border-radius: 4px;
    }

    .booking-form .btn {
        border: solid 1px #ec6563;
        background: #ec6563;
        color: #fff;
        padding: 10px 20px;
        border-radius: 4px;
        font-size: 0.9rem;
        cursor: pointer;
        outline:0;
        transform: translate3d(0, 0, 0);
        overflow: hidden;
        font-family: 'Montserrat', sans-serif;
    }

    .booking-form .btn:hover:not(:disabled) {
        background-color: #c94d4b;
        border-color: #c94d4b;        
    }

    .booking-form .btn:after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10,10);
        opacity: 0;
        transition: transform .5s, opacity 1s;
    }

    .booking-form .btn:active:after {
        transform: scale(0,0);
        opacity: .2;
        transition: 0s;
    }

    .booking-form .btn:disabled,
    .booking-form .btn[disabled] {
        cursor: default;
        background: #8d8d8d;
        border-color: #8d8d8d;
    }

    .booking-form label {
        font-weight: bold;
        font-size:0.8rem;
        margin-bottom: 5px;
        display: block; 
    }

    .booking-form .form-group {
        margin-bottom:20px;
    }

    .booking-form .form-group.form-group--control {
        display: flex;
        justify-content: space-between;
        align-items: center
    }

    .booking-form .total-price {
        font-size: 1.5rem;
    }

    .booking-form .form-control {
        font-family: 'Montserrat', sans-serif;
        display: block;
        width: 100%;
        height: 39px;
        padding: 5px 17px;
        font-size: 0.9rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: solid 1px #dcdcdc;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        outline:0;
    }
</style>