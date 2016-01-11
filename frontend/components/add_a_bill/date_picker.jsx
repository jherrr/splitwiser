var React = require('react');

var DatePicker = React.createClass({
  _getFormattedDateStr: function (date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var date = new Date(date);

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  },
  handleDatePickerChange: function (eventArgs){
      eventArgs.preventDefault();

       console.log("handleDatePickerChange-onChangeTextBox:" + eventArgs.target.value );
       var formattedDateStr = this._getFormattedDateStr(eventArgs.target.value);
       this.props.dateCallback( formattedDateStr );
   },
   componentDidMount: function () {
           var textBoxId = "TextBox";
          //  var minDate = new Date();

           var dateComponent = this;

           //set initial date state of add_a_bill component
           var date = new Date();
           var month = date.getMonth() + 1;
           var formattedDateStr = this._getFormattedDateStr(month + '/' +
            date.getDate() + '/' + date.getFullYear());
           this.props.dateCallback(formattedDateStr);

           $("#" + textBoxId).datepicker({
               onSelect: function(date){
                   console.log("onSelectDatePicker date:"+date);

                   var formattedDateStr = dateComponent._getFormattedDateStr(date);
                   dateComponent.props.dateCallback( formattedDateStr );
           },
           showOn: 'button',
           buttonText: 'Show Date',
           buttonImageOnly: true,
           buttonImage: 'http://i1375.photobucket.com/albums/ag446/eowyn_g/Work/icon_calendar_zpse819d8d4.gif'
          // , minDate: minDate
       });
       $(".ui-datepicker-trigger").each(function (index){
           $(this).insertBefore( $(this).prev('input') );
       });
       $("#" + textBoxId).datepicker('setDate',  new Date());
   },
   render: function() {
       console.log("render datepicker");
       return (
           <div >
               <input type='text' id="TextBox" onBlur={this.handleDatePickerChange}/>
           </div>
           );
   }
});

module.exports = DatePicker;
