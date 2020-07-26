import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TeamInfo } from '../../assets/team_info';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  @Input() useSecondaryLogos: boolean;
  @Input() date: String;
  @Input() gameId: String;
  @Input() statusNum: number;

  game_data;

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo
  ) { }

  async ngOnInit() {
    //if(this.statusNum == 2)
    //{
    //  while(this.statusNum == 2)
    //  {
        //console.log("refreshing scoreboard");
        this.getGameData(this.date, this.gameId);
    //    await new Promise(r => setTimeout(r, 5000));
    //  }
    //}
    //else if(this.statusNum == 3)
    //{
    //  this.getGameData(this.date, this.gameId);
    //}
  }

  getGameData(date: String, gameId: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + date + "/" + gameId + "_boxscore.json")
      .subscribe(response => {

        var team_list = this.teamInfo.teams;

        var basicGameData = response["basicGameData"];

        var statusNum = basicGameData["statusNum"];

        var visiting_team = undefined;
        var home_team = undefined;

        var visiting_team_id = basicGameData["vTeam"]["teamId"];
        var home_team_id = basicGameData["hTeam"]["teamId"];

        var visiting_logo_location;
        var home_logo_location;

        for(let i in team_list)
        {
          var team = team_list[i];
          if(team["teamId"] == visiting_team_id)
          {
            visiting_team = team["teamName"];
            if(this.useSecondaryLogos)
              visiting_logo_location = team["secondaryLogoLocation"];
            else
              visiting_logo_location = team["primaryLogoLocation"];
          }
          if(team["teamId"] == home_team_id)
          {
            home_team = team["teamName"];
            if(this.useSecondaryLogos)
              home_logo_location = team["secondaryLogoLocation"];
            else
              home_logo_location = team["primaryLogoLocation"];
          }
          if(visiting_team && home_team)
            break;
        }

        var top_label, bottom_label;

        if(statusNum == 1)
        {
          top_label = basicGameData["startTimeEastern"];
          bottom_label = "";
        }
        else if(statusNum == 2)
        {
          var quarters_elapsed = basicGameData["period"]["current"];
          var clock = basicGameData["clock"];
          var is_halftime = basicGameData["period"]["isHalftime"];
          var is_end_of_period = basicGameData["period"]["isEndOfPeriod"];
          if(is_halftime)
          {
            top_label = "Halftime";
          }
          else if(is_end_of_period)
          {
            if(quarters_elapsed > 4)
              top_label = "End of " + (quarters_elapsed > 5 ? String(quarters_elapsed - 4) : "") + "OT";
            else
              top_label = "End of Q" + quarters_elapsed;
          }
          else
          {
            if(quarters_elapsed > 4)
              top_label = (quarters_elapsed > 5 ? String(quarters_elapsed - 4) : "") + "OT " + clock;
            else
              top_label = "Q" + quarters_elapsed + " " + clock;
          }
          bottom_label = basicGameData["vTeam"]["score"] + "-" + basicGameData["hTeam"]["score"];
        }
        else if(statusNum == 3)
        {
          top_label = "Final";
          var quarters_elapsed = basicGameData["period"]["current"];
          if(quarters_elapsed > 4)
            top_label += " (" + (quarters_elapsed > 5 ? String(quarters_elapsed - 4) : "") + "OT)";
          bottom_label = basicGameData["vTeam"]["score"] + " - " + basicGameData["hTeam"]["score"];
        }

        this.game_data = {
          seasonYear: basicGameData["seasonYear"],
          vTeamId: visiting_team_id,
          vTeamName: visiting_team,
          vTeamLogoLocation: visiting_logo_location,
          vTeamRecord: "(" + basicGameData["vTeam"]["win"] + " - " + basicGameData["vTeam"]["loss"] + ")",
          hTeamId: home_team_id,
          hTeamName: home_team,
          hTeamLogoLocation: home_logo_location,
          hTeamRecord: "(" + basicGameData["hTeam"]["win"] + " - " + basicGameData["hTeam"]["loss"] + ")",
          nugget: basicGameData["nugget"]["text"],
          top_label: top_label,
          bottom_label: bottom_label
        }

      });
  }

}
