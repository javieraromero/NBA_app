import { Component, OnInit, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-pbp',
  templateUrl: './pbp.component.html',
  styleUrls: ['./pbp.component.css']
})
export class PbpComponent implements OnInit {

  @Input() date: String;
  @Input() gameId: String;
  @Input() statusNum: number;

  pbp: Object[] = [];

  private routeSub = this.router.events.subscribe((event) => {
    if(event instanceof NavigationStart) {
      this.ngOnDestroy();
    }
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async ngOnInit() {
    var is_today_current_date = this.compareDates(this.date);
    if(this.statusNum == 1)
    {
      //this.getPBP(this.date, this.gameId);
      while(this.statusNum == 1 && is_today_current_date)
      {
        console.log("pbp is checking statusNum");
        await new Promise(r => setTimeout(r, 15000));
      }
      console.log("pbp has detected a statusNum change. statusNum is now " + this.statusNum);
    }

    if(this.statusNum == 3)
    {
      this.getPBP(this.date, this.gameId);
    }
    else if(this.statusNum == 2)
    {
      while(this.statusNum == 2)
      {
        console.log("refreshing pbp for gameId: " + this.gameId);
        this.getPBP(this.date, this.gameId);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getPBP(date: String, gameId: String)
  {
    return this.http.get("http://data.nba.net/data/10s/json/cms/noseason/game/" + date + "/" + gameId + "/pbp_all.json")
    .subscribe(response => {

      var plays = response["sports_content"]["game"]["play"];

      var temp: Object[] = [];

      for(var i = 0; i < plays.length; i++)
      {
        var play = plays[i];

        var period = Number(play["period"]);
        var period_label = period > 4 ? (period > 5 ? period - 4 + "OT" : "OT") : period;

        const pbp_play = {
          clock: play["clock"],
          description: play["description"],
          personId: play["person_id"],
          home_score: play["home_score"],
          visitor_score: play["visitor_score"],
          period: period_label
        }

        temp.push(pbp_play);
      }

      this.pbp = temp;

      this.pbp.reverse();
    });
  }

  compareDates(date: String)
  {
    var currentDate = new Date();
    var currentYear = String(currentDate.getFullYear());
    var currentMonth = currentDate.getMonth() + 1;
    var currentMonthFormatted = currentMonth <= 9? "0" + String(currentMonth) : String(currentMonth);
    var currentDay = currentDate.getDate()
    var currentDayFormatted = currentDay <= 9? "0" + String(currentDay) : String(currentDay);
    var formattedDate = currentYear + currentMonthFormatted + currentDayFormatted;

    return date == formattedDate;
  }
}
