import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-lead-tracker',
  templateUrl: './lead-tracker.component.html',
  styleUrls: ['./lead-tracker.component.css']
})
export class LeadTrackerComponent implements OnInit {

  tracker: Object[] = [];

  private routeSub = this.router.events.subscribe((event) => {
    if(event instanceof NavigationStart) {
      this.ngOnDestroy();
    }
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getLeadTracker(date: String, gameId: String, period: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + date + "/" + gameId + "_lead_tracker_" + period + ".json")
      .subscribe(response => {

        var plays = response["plays"];

        var temp: Object[] = [];

        for(var i = 0; i < plays.length; i++)
        {
          var play = plays[i];

          const tracker_play = {
            clock: play["clock"],
            leadTeamId: play["leadTeamId"],
            points: play["points"]
          }

          temp.push(tracker_play);
        }

        this.tracker = temp;

        this.tracker.reverse();
      });
  }
}
