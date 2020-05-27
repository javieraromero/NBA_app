import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pbp',
  templateUrl: './pbp.component.html',
  styleUrls: ['./pbp.component.css']
})
export class PbpComponent implements OnInit {

  pbp: Object[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    const date = this.route.snapshot.paramMap.get('date');
    const gameId = this.route.snapshot.paramMap.get('gameId');
    this.getPBP(date, gameId);
  }

  getPBP(date: String, gameId: String)
  {
    return this.http.get("http://data.nba.net/data/10s/json/cms/noseason/game/" + date + "/" + gameId + "/pbp_all.json")
    .subscribe(response => {

      var plays = response["sports_content"]["game"]["play"];

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

        this.pbp.push(pbp_play);
      }

      this.pbp.reverse();
    });
  }

}
