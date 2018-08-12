# vue2-hotel-datepicker

## Install

``` javascript
import HotelDatePicker from 'vue2-hotel-datepicker';

export default {
  // ...
  components: {
    HotelDatePicker
  }
  // ...
}

```

## Usage

``` html
<vue2-hotel-datepicker></vue2-hotel-datepicker>
```

``` html
<script>
    var date: new Date(2018, 9,  16)
</script>
<vue2-hotel-datepicker :value="date"></vue2-hotel-datepicker>
```

## Available props

| Prop                          | Type            | Default     | Description                                     |
|-------------------------------|-----------------|-------------|-------------------------------------------------|
| value                         | Date\|String    |             | Date value of the datepicker                    |
| price                         | Number          | 0           | Price for one night                             |
| label                         | String          |             | Display label above picker input                |
| MondayFirst                   | Boolean         | false       | Set up first day of week                        |
| format                        | String          | dd MMM yyyy | Date formatting string or function              |
| translation                   | Object          |             | See below for configuration                     |
| availableDates                | Object          |             | See below for configuration                     |
| totalVotes                    | Number          | 0           | Display total votes for hotel                   |
| rating                        | Number          | 0           | Show in stars hotel rating                      |
| startActiveColor              | String          | #388188     | Color for active star                           |
| startInactiveColor            | String          | #d8d8d8     | Star background color                           |
| updatedInfo                   | String          |             | Display infomation when calendar was updated    |
| extraInfo                     | String          |             | Display some extra information above extraInfo  |


## Events

| Event             | Output     | Description                               |
|-------------------|------------|-------------------------------------------|
| selected          | Object     | When check in and check out are selected  |
| input             | Date\|null | Input value has been modified             |

## Translations

| Key                  | Type           | Value                                                                                          |
|----------------------|----------------|------------------------------------------------------------------------------------------------|
| errorMsg             | String         | You could not select this dates range                                                          |
| placeholderCheckIn   | String         | Check In                                                                                       |
| placeholderCheckOut  | String         | Check Out                                                                                      |
| currency             | String         | zł                                                                                             |
| priceUnit            | String         | per night                                                                                      |
| days                 | Array          | ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']                                                     |
| months               | Array          | ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',         'October','November', 'December']        |                                                      |
| monthsAbbr           | Array          | ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']           |

## Date formatting

| Token | Desc                   | Example     |
|-------|------------------------|-------------|
| d     | day                    | 1           |
| dd    | 0 prefixed day         | 01          |
| D     | abbr day               | Mon         |
| M     | month number (1 based) | 1 (for Jan) |
| MM    | 0 prefixed month       | 01          |
| MMM   | abbreviated month name | Jan         |
| MMMM  | month name             | January     |
| yy    | two digit year         | 16          |
| yyyy  | four digit year        | 2016        |

## Available Dates

``` html
<script>
var availableDates: {
    dates: [ 
      new Date(2018, 7, 7),
      new Date(2018, 7, 8),
      new Date(2018, 7, 9)
    ],
    to: new Date(2018, 7, 3), 
    from: new Date(2018, 7, 10), 
    ranges: [{ 
      from: new Date(2018, 7, 28),
      to: new Date(2018, 7, 30)
    }, {
        from: new Date(2018, 7, 12),
        to: new Date(2018, 7, 25)
    }],
  }

</script>
<vue2-hotel-datepicker :availableDates="availableDates"></vue2-hotel-datepicker>
```

## Demo

``` bash
    npm install

    npm run serve
```

``` html
    http://localhost:3000
```