import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { TeamInfo } from '../../assets/team_info';

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
    private http: HttpClient,
    private teamInfo: TeamInfo
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

          var team_info = team["teamSitesOnly"];

          var teamId = team["teamId"];

          var team_attributes = this.getTeamAttributes(teamId);

          const team_data = {
            teamId: team["teamId"],
            //teamName: team_attributes["teamName"],
            //teamNickname: team_attributes["teamNickname"],
            teamTricode: team_attributes["teamTricode"],
            teamLogoLocation: team_attributes["teamSecondaryLogoLocation"],
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
            streakText: team_info["streakText"],
          }

          this.overall_standings.push(team_data);
        }
      });
  }

  getTeamAttributes(teamId: String)
  {
    var team_list = this.teamInfo.teams;

    var teamId_int = Number(teamId);

    var teamName;
    var teamTricode;
    //var teamPrimaryColor;
    //var teamSecondaryColor;
    var teamSecondaryLogoLocation;

    for(let i in team_list)
    {
      var team = team_list[i];
      if(team["teamId"] == teamId_int)
      {
        teamName = team["teamName"];
        teamTricode = team["tricode"];
        //teamPrimaryColor = team["primaryColor"];
        //teamSecondaryColor = team["secondaryColor"];
        teamSecondaryLogoLocation = team["secondaryLogoLocation"];
        break;
      }
    }

    const team_attributes = {
      teamName: teamName,
      teamTricode: teamTricode,
      //teamPrimaryColor: teamPrimaryColor,
      //teamSecondaryColor: teamSecondaryColor,
      teamSecondaryLogoLocation: teamSecondaryLogoLocation
    }

    return team_attributes;
  }
}
