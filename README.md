# vue2-hotel-datepicker

## Available props

| Prop                          | Type            | Default                       | Description                                     |
|-------------------------------|-----------------|-------------------------------|-------------------------------------------------|
| value                         | Object          | { start: null, end: null }    | Value of the datepicker                    |
| price                         | Number          | 0                             | Price for one night                             |
| label                         | String          |                               | Display label above picker input                |
| monday-first                  | Boolean         | true                          | Set up first day of week                        |
| format                        | String          | dd MMM yyyy                   | Date formatting string                          |
| translation                   | Object          |                               | See below for configuration                     |
| available-dates               | Object          |                               | See below for configuration                     |
| total-votes                   | Number          | 0                             | Display total votes for hotel                   |
| rating                        | Number          | 0                             | Show hotel rating                               |
| start-active-color            | String          | #388188                       | Color for active star                           |
| start-inactive-color          | String          | #d8d8d8                       | Star background color                           |
| updated-info                  | String          |                               | Display infomation when calendar was updated    |
| extra-info                    | String          |                               | Display some extra information above extraInfo  |


## Events

| Event             | Output     | Description                               |
|-------------------|------------|-------------------------------------------|
| selected          | Object     | When check in and check out are selected  |
| input             | Object     | Input value has been modified             |

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
| yy    | two digit year         | 18          |
| yyyy  | four digit year        | 2018        |

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
<vue2-hotel-datepicker :available-dates="availableDates"></vue2-hotel-datepicker>
```

## Demo

``` bash
    npm install

    npm run serve
```

``` html
    http://localhost:3000
```