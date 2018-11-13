import {  Component } from '@angular/core';


@Component({
  selector: 'app-angular-calendar',
  templateUrl: './angular-calendar.component.html',
  styleUrls: ['./angular-calendar.component.css']
})
export class AngularCalendarComponent {
  constructor() { }
}


$(function () {
  // first solution - use `setting` to add new language
  function onSelectHandler(date, context) {
    /**
     * @date is an array which be included dates(clicked date at first index)
     * @context is an object which stored calendar interal data.
     * @context.calendar is a root element reference.
     * @context.calendar is a calendar element reference.
     * @context.storage.activeDates is all toggled data, If you use toggle type calendar.
     * @context.storage.events is all events associated to this date
     */
    var $element = context.element;
    var $calendar = context.calendar;
    var $box = $element.siblings('.box').show();
    var text = 'You selected date ';
    if (date[0] !== null) {
      text += date[0].format('YYYY-MM-DD');
    }
    if (date[0] !== null && date[1] !== null) {
      text += ' ~ ';
    }
    else if (date[0] === null && date[1] == null) {
      text += 'nothing';
    }
    if (date[1] !== null) {
      text += date[1].format('YYYY-MM-DD');
    }
    $box.text(text);
  }

  // second solution - give weeks option
  $('.calender').pignoseCalendar({
    theme: 'blue',
    week: 1 ,        
    scheduleOptions: {
      colors: {
        holiday: '#2fabb7',
        seminar: '#5c6270',
        meetup: '#ef8080'
      }
    },
    schedules: [{
      name: 'holiday',
      date: '2017-08-08'
    }, {
      name: 'holiday',
      date: '2017-09-16'
    }, {
      name: 'holiday',
      date: '2017-10-01',
    }, {
      name: 'holiday',
      date: '2017-10-05'
    }, {
      name: 'holiday',
      date: '2017-10-18',
    }, {
      name: 'seminar',
      date: '2017-11-14'
    }, {
      name: 'seminar',
      date: '2017-12-01',
    }, {
      name: 'meetup',
      date: '2018-01-16'
    }, {
      name: 'meetup',
      date: '2018-02-01',
    }, {
      name: 'meetup',
      date: '2018-02-18'
    }, {
      name: 'meetup',
      date: '2018-03-04',
    }, {
      name: 'meetup',
      date: '2018-04-01'
    }, {
      name: 'meetup',
      date: '2018-11-19',
    }],
    select: function (date, context) {
      var message = `You selected ${(date[0] === null ? 'null' : date[0].format('YYYY-MM-DD'))}.
             <br />
             <br />
             <strong>Events for this date</strong>
             <br />
             <br />
             <div class="schedules-date"></div>`;
      var $target = context.calendar.parent().next().show().html(message);
      for (var idx in context.storage.schedules) {
        var schedule = context.storage.schedules[idx];
        if (typeof schedule !== 'object') {
          continue;
        }
        $target.find('.schedules-date').append('<span class="ui label default">' + schedule.name + '</span>');
      }
    }
  });
});