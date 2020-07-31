import { Component, OnInit, Input } from '@angular/core';

import { DateCalculator, MyDate } from 'src/app/assets/date_calculator';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() date: string;
  
  month_and_year;
  current_month;
  current_day;
  current_year;
  current: MyDate;

  num_of_games;

  temp_month;
  temp_day;
  temp_year;
  temp: MyDate;

  constructor(
    private dateCalculator: DateCalculator,
    private http: HttpClient,
  ) { }

  calendar: Object[][];

  ngOnInit() {
    var year = this.date.substring(0, 4);
    var month = this.date.substring(4, 6);
    var day = this.date.substring(6, );

    this.current = new MyDate(Number(month), Number(day), Number(year));
    this.current_month = this.current.getMonth();
    this.current_day = this.current.getDay();
    this.current_year = this.current.getYear();

    this.month_and_year = this.current.getMonthName() + " " + year;

    this.calendar = this.dateCalculator.buildCalendar(this.current);

    this.temp = this.current;
    this.temp_month = this.current_month;
    this.temp_day = this.current_day;
    this.temp_year = this.current_year;

    this.getNumOfGames();
  }

  previousMonth()
  {
    this.temp = this.dateCalculator.previousMonth(this.temp);
    this.temp_month = this.temp.getMonth();
    this.temp_day = this.temp.getDay();
    this.temp_year = this.temp.getYear();
    this.month_and_year = this.temp.getMonthName() + " " + this.temp.getYear();
    this.calendar = this.dateCalculator.buildCalendar(this.temp);
  }

  nextMonth()
  {
    this.temp = this.dateCalculator.nextMonth(this.temp);
    this.temp_month = this.temp.getMonth();
    this.temp_day = this.temp.getDay();
    this.temp_year = this.temp.getYear();
    this.month_and_year = this.temp.getMonthName() + " " + this.temp.getYear();
    this.calendar = this.dateCalculator.buildCalendar(this.temp);
  }

  getNumOfGames()
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/calendar.json")
      .subscribe(response => {
        this.num_of_games = response;
      });
  }
}
