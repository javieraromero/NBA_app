import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conference-standings',
  templateUrl: './conference-standings.component.html',
  styleUrls: ['./conference-standings.component.css']
})
export class ConferenceStandingsComponent implements OnInit {

  eastern_standings: Object[] = [];
  western_standings: Object[] = [];
  seasonStageId;
  seasonYear;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getStandings();
  }

  getStandings()
  {
    return this.http.get("http://data.nba.net/prod/v1/current/standings_conference.json")
      .subscribe(response => {

        this.seasonStageId = response["league"]["standard"]["seasonStageId"];
        this.seasonYear = response["league"]["standard"]["seasonYear"];

        var east = response["league"]["standard"]["conference"]["east"];
        var west = response["league"]["standard"]["conference"]["west"];

        for(var i = 0; i < east.length; i++)
        {
          var team = east[i];

          var teamInfo = team["teamSitesOnly"];

          const team_info = 
          {
            teamId: team["teamId"],
            teamName: teamInfo["teamName"],
            teamNickname: teamInfo["teamNickname"],
            teamTricode: teamInfo["teamTricode"],
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
            streak: teamInfo["streakText"]
          }

          this.eastern_standings.push(team_info);
        }

        for(var i = 0; i < west.length; i++)
        {
          var team = west[i];

          var teamInfo = team["teamSitesOnly"];

          const team_info = 
          {
            teamId: team["teamId"],
            teamName: teamInfo["teamName"],
            teamNickname: teamInfo["teamNickname"],
            teamTricode: teamInfo["teamTricode"],
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
            streak: teamInfo["streakText"]
          }

          this.western_standings.push(team_info);
        }
      });
  }
}
