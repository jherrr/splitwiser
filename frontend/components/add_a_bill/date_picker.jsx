var React = require('react');

var DatePicker = React.createClass({
  handleDatePickerChange: function (eventArgs){
       console.log("handleDatePickerChange-onChangeTextBox:" + eventArgs.target.value );
   },
   componentDidMount: function () {
           var textBoxId = "TextBox";
           var minDate = new Date();
           $("#" + textBoxId).datepicker({
               onSelect: function(date){
                   console.log("onSelectDatePicker date:"+date);
           },
           showOn: 'button',
           buttonText: 'Show Date',
           buttonImageOnly: true,
           buttonImage: 'http://i1375.photobucket.com/albums/ag446/eowyn_g/Work/icon_calendar_zpse819d8d4.gif',
           minDate: minDate
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
               <input type='text' id="TextBox" onChange={this.handleDatePickerChange}/>
           </div>
           );
   }
});

module.exports = DatePicker;
