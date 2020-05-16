import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-overall-standings',
  templateUrl: './overall-standings.component.html',
  styleUrls: ['./overall-standings.component.css']
})
export class OverallStandingsComponent implements OnInit {

  overall_standings: Object[] = [];
  seasonStageId;
  seasonYear;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getStandings();
  }

  getStandings()
  {
    return this.http.get("http://data.nba.net/prod/v1/current/standings_all.json")
      .subscribe(response => {

        this.seasonStageId = response["league"]["standard"]["seasonStageId"];
        this.seasonYear = response["league"]["standard"]["seasonYear"];

        var teams = response["league"]["standard"]["teams"];

        for(var i = 0; i < teams.length; i++)
        {
          var team = teams[i];

          var team_attributes = team["teamSitesOnly"];

          const team_data = {
            teamId: team["teamId"],
            teamName: team_attributes["teamName"],
            teamNickname: team_attributes["teamNickname"],
            teamTricode: team_attributes["teamTricode"],
            win: team["win"],
            loss: team["loss"],
            winPct: team["winPct"],
            gamesBehind: team["gamesBehind"],
            clinchedPlayoffsCode: team["clinchedPlayoffsCodeV2"],
            confRank: team["confRank"],
            confWin: team["confWin"],
            confLoss: team["confLoss"],
            divWin: team["divWin"],
            divLoss: team["divLoss"],
            homeWin: team["homeWin"],
            homeLoss: team["homeLoss"],
            awayWin: team["awayWin"],
            awayLoss: team["awayLoss"],
            lastTenWin: team["lastTenWin"],
            lastTenLoss: team["lastTenLoss"],
            streakText: team_attributes["streakText"],
          }

          this.overall_standings.push(team_data);
        }
      });
  }

}
