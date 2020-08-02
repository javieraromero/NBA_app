import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { TeamInfo } from '../../assets/team_info';

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
    private teamInfo: TeamInfo
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

          var teamId = team["teamId"];

          var team_attributes = this.getTeamAttributes(teamId);

          const team_info = 
          {
            teamId: teamId,
            teamName: team_attributes["teamName"],
            teamNickname: teamInfo["teamNickname"],
            teamTricode: team_attributes["tricode"],
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
            streak: teamInfo["streakText"]
          }

          this.eastern_standings.push(team_info);
        }

        for(var i = 0; i < west.length; i++)
        {
          var team = west[i];

          var teamInfo = team["teamSitesOnly"];

          var teamId = team["teamId"];

          var team_attributes = this.getTeamAttributes(teamId);

          const team_info = 
          {
            teamId: teamId,
            teamName: team_attributes["teamName"],
            teamNickname: teamInfo["teamNickname"],
            teamTricode: team_attributes["tricode"],
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
            streak: teamInfo["streakText"]
          }

          this.western_standings.push(team_info);
        }
      });
  }

  getTeamAttributes(teamId: String)
  {
    var team_list = this.teamInfo.teams;

    var teamId_int = Number(teamId);

    var teamName;
    var tricode;
    //var teamPrimaryColor;
    //var teamSecondaryColor;
    var teamSecondaryLogoLocation;

    for(let i in team_list)
    {
      var team = team_list[i];
      if(team["teamId"] == teamId_int)
      {
        teamName = team["teamName"];
        tricode = team["tricode"];
        //teamPrimaryColor = team["primaryColor"];
        //teamSecondaryColor = team["secondaryColor"];
        teamSecondaryLogoLocation = team["secondaryLogoLocation"];
        break;
      }
    }

    const team_attributes = {
      teamName: teamName,
      tricode: tricode,
      //teamPrimaryColor: teamPrimaryColor,
      //teamSecondaryColor: teamSecondaryColor,
      teamSecondaryLogoLocation: teamSecondaryLogoLocation
    }

    return team_attributes;
  }
}
