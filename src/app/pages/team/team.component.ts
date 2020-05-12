import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { TeamInfo } from '../../assets/team_info';
import { PlayersList } from '../../assets/players_list';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamId: String;
  teamName: String;
  list_of_games: Object[] = [];
  roster: Object[] = [];
  lastGamePlayedIndex;
  teamPrimaryLogoLocation;
  teamSecondaryLogoLocation;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private teamInfo: TeamInfo,
    private players: PlayersList
  ) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.getRoster(this.teamId);
    this.getSchedule(this.teamId);
    var teamAttributes = this.getTeamAttributes(this.teamId);
    this.teamName = teamAttributes["teamName"];
    this.teamPrimaryLogoLocation = teamAttributes["teamPrimaryLogoLocation"];
    this.teamSecondaryLogoLocation = teamAttributes["teamSecondaryLogoLocation"];
    var primaryColor = teamAttributes["teamPrimaryColor"];
    var secondaryColor = teamAttributes["teamSecondaryColor"];
    document.documentElement.style.setProperty('--team_primary', primaryColor);
    document.documentElement.style.setProperty('--team_secondary', secondaryColor);
  }

  getRoster(teamId: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/2019/teams/" + teamId + "/roster.json")
      .subscribe(response => {
        var roster = response["league"]["standard"]["players"];

        for(var i = 0; i < roster.length; i++)
        {
          var playerId = roster[i]["personId"];
          
          var players_list = this.players.players;

          var first_name = "";
          var last_name = "";

          for(let i in players_list)
          {
            var player = players_list[i];
            if(String(player["playerId"]) == playerId)
            {
              first_name = player["firstName"];
              last_name = player["lastName"];
            }
          }

          const player_info = {
            playerId: playerId,
            firstName: first_name,
            lastName: last_name
          }

          this.roster.push(player_info);
        }
      });
  }

  getSchedule(teamId: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/2019/teams/" + teamId + "/schedule.json")
      .subscribe(response => {
        var leagueData = response["league"];
        this.lastGamePlayedIndex = leagueData["lastStandardGamePlayedIndex"];
        var games = leagueData["standard"];

        for(var i = 0; i < games.length; i++)
        {
          var game = games[i];

          var vTeamId = game["vTeam"]["teamId"];
          var hTeamId = game["hTeam"]["teamId"];

          const game_info = {
            seasonStageId: game["seasonStageId"],
            gameId: game["gameId"],
            startTimeEastern: game["startTimeEastern"],
            startDateEastern: game["startDateEastern"],
            longDate: this.getLongDate(game["startDateEastern"]),
            vTeamId: vTeamId,
            vTeamName: vTeamId == this.teamId ? this.teamName : this.getTeamAttributes(vTeamId)["teamName"],
            vTeamLogoLocation: vTeamId == this.teamId ? this.teamSecondaryLogoLocation : this.getTeamAttributes(vTeamId)["teamSecondaryLogoLocation"],
            vTeamScore: game["vTeam"]["score"],
            hTeamId: hTeamId,
            hTeamName: hTeamId == this.teamId ? this.teamName : this.getTeamAttributes(hTeamId)["teamName"],
            hTeamLogoLocation: hTeamId == this.teamId ? this.teamSecondaryLogoLocation : this.getTeamAttributes(hTeamId)["teamSecondaryLogoLocation"],
            hTeamScore: game["hTeam"]["score"]
          }

          this.list_of_games.push(game_info);
        }
      });
  }

  getTeamAttributes(teamId: String)
  {
    var team_list = this.teamInfo.teams;

    var teamId_int = Number(teamId);

    var teamName;
    var teamPrimaryColor;
    var teamSecondaryColor;
    var teamPrimaryLogoLocation;
    var teamSecondaryLogoLocation;

    for(let i in team_list)
    {
      var team = team_list[i];
      if(team["teamId"] == teamId_int)
      {
        teamName = team["teamName"];
        teamPrimaryColor = team["primaryColor"];
        teamSecondaryColor = team["secondaryColor"];
        teamPrimaryLogoLocation = team["primaryLogoLocation"];
        teamSecondaryLogoLocation = team["secondaryLogoLocation"];
        break;
      }
    }

    const team_attributes = {
      teamName: teamName,
      teamPrimaryColor: teamPrimaryColor,
      teamSecondaryColor: teamSecondaryColor,
      teamPrimaryLogoLocation: teamPrimaryLogoLocation,
      teamSecondaryLogoLocation: teamSecondaryLogoLocation
    }

    return team_attributes;
  }

  getLongDate(date: String)
  {
    var year = Number(date.slice(0, 4));
    var month = Number(date.slice(4, 6)) - 1;
    var day = Number(date.slice(6, ));

    var newDate = new Date(year, month, day);

    return newDate.toDateString();
  }
}
