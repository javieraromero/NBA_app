import { Component, OnInit, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  @Input() teamId: String;
  @Input() year: String;

  roster: Object[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getRoster(this.teamId, this.year);
  }

  getRoster(teamId: String, year: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + year + "/teams/" + teamId + "/roster.json")
      .subscribe(response => {
        var roster = response["league"]["standard"]["players"];

        for(var i = 0; i < roster.length; i++)
        {
          var playerId = roster[i]["personId"];

          this.roster.push({playerId: playerId});
        }
      });
  }
}
