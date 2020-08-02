import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { TeamInfo } from '../../assets/team_info';

@Component({
  selector: 'app-division-standings',
  templateUrl: './division-standings.component.html',
  styleUrls: ['./division-standings.component.css']
})
export class DivisionStandingsComponent implements OnInit {

  southeast_standings: Object[] = [];
  atlantic_standings: Object[] = [];
  central_standings: Object[] = [];
  southwest_standings: Object[] = [];
  pacific_standings: Object[] = [];
  northwest_standings: Object[] = [];
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
    return this.http.get("http://data.nba.net/10s/prod/v1/current/standings_division.json")
      .subscribe(response => {

        this.seasonStageId = response["league"]["standard"]["seasonStageId"];
        this.seasonYear = response["league"]["standard"]["seasonYear"];

        var east = response["league"]["standard"]["conference"]["east"];
        var west = response["league"]["standard"]["conference"]["west"];

        var southeast = east["southeast"];
        var atlantic = east["atlantic"];
        var central = east["central"];
        var southwest = west["southwest"];
        var pacific = west["pacific"];
        var northwest = west["northwest"];

        for(var i = 0; i < 5; i++)
        {
          var southeast_team = southeast[i];
          var southeast_team_data = southeast_team["teamSitesOnly"];

          var southeast_teamId = southeast_team["teamId"];

          var southeast_team_attributes = this.getTeamAttributes(southeast_teamId);

          const southeast_team_stats = {
            teamId: southeast_team["teamId"],
            //teamName: southeast_team_attributes["teamName"],
            //teamNickname: southeast_team_attributes["teamNickname"],
            teamTricode: southeast_team_attributes["teamTricode"],
            teamLogoLocation: southeast_team_attributes["teamSecondaryLogoLocation"],
            win: southeast_team["win"],
            loss: southeast_team["loss"],
            winPct: southeast_team["winPct"],
            gamesBehind: southeast_team["gamesBehind"],
            divGamesBehind: southeast_team["divGamesBehind"],
            clinchedPlayoffsCode: southeast_team["clinchedPlayoffsCodeV2"],
            divRank: southeast_team["divRank"],
            divWin: southeast_team["divWin"],
            divLoss: southeast_team["divLoss"],
            homeWin: southeast_team["homeWin"],
            homeLoss: southeast_team["homeLoss"],
            awayWin: southeast_team["awayWin"],
            awayLoss: southeast_team["awayLosss"],
            lastTenWin: southeast_team["lastTenWin"],
            lastTenLoss: southeast_team["lastTenLoss"],
            streakText: southeast_team_data["streakText"],
          }

          this.southeast_standings.push(southeast_team_stats);

          var atlantic_team = atlantic[i];
          var atlantic_team_data = atlantic_team["teamSitesOnly"];

          var atlantic_teamId = atlantic_team["teamId"];

          var atlantic_team_attributes = this.getTeamAttributes(atlantic_teamId);

          const atlantic_team_stats = {
            teamId: atlantic_team["teamId"],
            //teamName: atlantic_team_attributes["teamName"],
            //teamNickname: atlantic_team_attributes["teamNickname"],
            teamTricode: atlantic_team_attributes["teamTricode"],
            teamLogoLocation: atlantic_team_attributes["teamSecondaryLogoLocation"],
            win: atlantic_team["win"],
            loss: atlantic_team["loss"],
            winPct: atlantic_team["winPct"],
            gamesBehind: atlantic_team["gamesBehind"],
            divGamesBehind: atlantic_team["divGamesBehind"],
            clinchedPlayoffsCode: atlantic_team["clinchedPlayoffsCodeV2"],
            divRank: atlantic_team["divRank"],
            divWin: atlantic_team["divWin"],
            divLoss: atlantic_team["divLoss"],
            homeWin: atlantic_team["homeWin"],
            homeLoss: atlantic_team["homeLoss"],
            awayWin: atlantic_team["awayWin"],
            awayLoss: atlantic_team["awayLosss"],
            lastTenWin: atlantic_team["lastTenWin"],
            lastTenLoss: atlantic_team["lastTenLoss"],
            streakText: atlantic_team_data["streakText"],
          }

          this.atlantic_standings.push(atlantic_team_stats);

          var central_team = central[i];
          var central_team_data = central_team["teamSitesOnly"];

          var central_teamId = central_team["teamId"];

          var central_team_attributes = this.getTeamAttributes(central_teamId);

          const central_team_stats = {
            teamId: central_team["teamId"],
            //teamName: central_team_attributes["teamName"],
            //teamNickname: central_team_attributes["teamNickname"],
            teamTricode: central_team_attributes["teamTricode"],
            teamLogoLocation: central_team_attributes["teamSecondaryLogoLocation"],
            win: central_team["win"],
            loss: central_team["loss"],
            winPct: central_team["winPct"],
            gamesBehind: central_team["gamesBehind"],
            divGamesBehind: central_team["divGamesBehind"],
            clinchedPlayoffsCode: central_team["clinchedPlayoffsCodeV2"],
            divRank: central_team["divRank"],
            divWin: central_team["divWin"],
            divLoss: central_team["divLoss"],
            homeWin: central_team["homeWin"],
            homeLoss: central_team["homeLoss"],
            awayWin: central_team["awayWin"],
            awayLoss: central_team["awayLosss"],
            lastTenWin: central_team["lastTenWin"],
            lastTenLoss: central_team["lastTenLoss"],
            streakText: central_team_data["streakText"],
          }

          this.central_standings.push(central_team_stats);

          var southwest_team = southwest[i];
          var southwest_team_data = southwest_team["teamSitesOnly"];

          var southwest_teamId = southwest_team["teamId"];

          var southwest_team_attributes = this.getTeamAttributes(southwest_teamId);

          const southwest_team_stats = {
            teamId: southwest_team["teamId"],
            //teamName: southwest_team_attributes["teamName"],
            //teamNickname: southwest_team_attributes["teamNickname"],
            teamTricode: southwest_team_attributes["teamTricode"],
            teamLogoLocation: southwest_team_attributes["teamSecondaryLogoLocation"],
            win: southwest_team["win"],
            loss: southwest_team["loss"],
            winPct: southwest_team["winPct"],
            gamesBehind: southwest_team["gamesBehind"],
            divGamesBehind: southwest_team["divGamesBehind"],
            clinchedPlayoffsCode: southwest_team["clinchedPlayoffsCodeV2"],
            divRank: southwest_team["divRank"],
            divWin: southwest_team["divWin"],
            divLoss: southwest_team["divLoss"],
            homeWin: southwest_team["homeWin"],
            homeLoss: southwest_team["homeLoss"],
            awayWin: southwest_team["awayWin"],
            awayLoss: southwest_team["awayLosss"],
            lastTenWin: southwest_team["lastTenWin"],
            lastTenLoss: southwest_team["lastTenLoss"],
            streakText: southwest_team_data["streakText"],
          }

          this.southwest_standings.push(southwest_team_stats);

          var pacific_team = pacific[i];
          var pacific_team_data = pacific_team["teamSitesOnly"];

          var pacific_teamId = pacific_team["teamId"];

          var pacific_team_attributes = this.getTeamAttributes(pacific_teamId);

          const pacific_team_stats = {
            teamId: pacific_team["teamId"],
            //teamName: pacific_team_attributes["teamName"],
            //teamNickname: pacific_team_attributes["teamNickname"],
            teamTricode: pacific_team_attributes["teamTricode"],
            teamLogoLocation: pacific_team_attributes["teamSecondaryLogoLocation"],
            win: pacific_team["win"],
            loss: pacific_team["loss"],
            winPct: pacific_team["winPct"],
            gamesBehind: pacific_team["gamesBehind"],
            divGamesBehind: pacific_team["divGamesBehind"],
            clinchedPlayoffsCode: pacific_team["clinchedPlayoffsCodeV2"],
            divRank: pacific_team["divRank"],
            divWin: pacific_team["divWin"],
            divLoss: pacific_team["divLoss"],
            homeWin: pacific_team["homeWin"],
            homeLoss: pacific_team["homeLoss"],
            awayWin: pacific_team["awayWin"],
            awayLoss: pacific_team["awayLosss"],
            lastTenWin: pacific_team["lastTenWin"],
            lastTenLoss: pacific_team["lastTenLoss"],
            streakText: pacific_team_data["streakText"],
          }

          this.pacific_standings.push(pacific_team_stats);

          var northwest_team = northwest[i];
          var northwest_team_data = northwest_team["teamSitesOnly"];

          var northwest_teamId = northwest_team["teamId"];

          var northwest_team_attributes = this.getTeamAttributes(northwest_teamId);

          const northwest_team_stats = {
            teamId: northwest_team["teamId"],
            //teamName: northwest_team_attributes["teamName"],
            //teamNickname: northwest_team_attributes["teamNickname"],
            teamTricode: northwest_team_attributes["teamTricode"],
            teamLogoLocation: northwest_team_attributes["teamSecondaryLogoLocation"],
            win: northwest_team["win"],
            loss: northwest_team["loss"],
            winPct: northwest_team["winPct"],
            gamesBehind: northwest_team["gamesBehind"],
            divGamesBehind: northwest_team["divGamesBehind"],
            clinchedPlayoffsCode: northwest_team["clinchedPlayoffsCodeV2"],
            divRank: northwest_team["divRank"],
            divWin: northwest_team["divWin"],
            divLoss: northwest_team["divLoss"],
            homeWin: northwest_team["homeWin"],
            homeLoss: northwest_team["homeLoss"],
            awayWin: northwest_team["awayWin"],
            awayLoss: northwest_team["awayLosss"],
            lastTenWin: northwest_team["lastTenWin"],
            lastTenLoss: northwest_team["lastTenLoss"],
            streakText: northwest_team_data["streakText"],
          }

          this.northwest_standings.push(northwest_team_stats);
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
