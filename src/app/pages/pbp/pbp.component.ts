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

  private routeSub: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async ngOnInit() {
    if(this.statusNum == 2)
    {
      while(this.statusNum == 2)
      {
        console.log("refreshing pbp for gameId: " + this.gameId);
        this.getPBP(this.date, this.gameId);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
    else if(this.statusNum == 3)
    {
      this.getPBP(this.date, this.gameId);
    }

    this.routeSub = this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.ngOnDestroy();
      }
    });
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
}
