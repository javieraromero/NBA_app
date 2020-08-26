import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';

import { TeamInfo } from '../../assets/team_info';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  @Input() useSecondaryLogos: boolean = false;
  @Input() date: String;
  @Input() gameId: String;
  @Input() statusNum: number;

  game_data = {
    seasonYear: "",
    isPreseason: undefined,
    isPlayoffs: undefined,
    playoff_info: "",
    vTeamId: "",
    vTeamName: "",
    vTeamTricode: "",
    vTeamLogoLocation: "",
    vTeamRecord: "",
    hTeamId: "",
    hTeamName: "",
    hTeamTricode: "",
    hTeamLogoLocation: "",
    hTeamRecord: "",
    nugget: "",
    top_label: "",
    bottom_label: "",
    broadcastersLabel: ""
  };
  private routeSub  = this.router.events.subscribe((event) => {
    if(event instanceof NavigationStart) {
      this.ngOnDestroy();
    }
  });

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo,
    private router: Router
  ) { }

  async ngOnInit() {
    var is_today_current_date = this.compareDates(this.date);
    if(this.statusNum == 1)
    {
      this.getGameData(this.date, this.gameId);
      while(this.statusNum == 1 && is_today_current_date)
      {
        console.log("scoreboard is checking statusNum");
        await new Promise(r => setTimeout(r, 15000));
        this.getGameData(this.date, this.gameId);
      }
      console.log("scoreboard has detected a statusNum change. statusNum is now " + this.statusNum);
    }
    
    if(this.statusNum == 3)
    {
      this.getGameData(this.date, this.gameId);
    }
    else if(this.statusNum == 2)
    {
      while(this.statusNum == 2)
      {
        console.log("refreshing scoreboard for gameId: " + this.gameId);
        this.getGameData(this.date, this.gameId);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getGameData(date: String, gameId: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + date + "/" + gameId + "_boxscore.json")
      .subscribe(response => {

        var team_list = this.teamInfo.teams;

        var basicGameData = response["basicGameData"];

        var statusNum = basicGameData["statusNum"];
        this.statusNum = statusNum;

        var visiting_team = undefined;
        var home_team = undefined;
        var visiting_team_tricode, home_team_tricode;

        var visiting_team_id = basicGameData["vTeam"]["teamId"];
        var home_team_id = basicGameData["hTeam"]["teamId"];

        var visiting_logo_location;
        var home_logo_location;

        var isPreseason = basicGameData["seasonStageId"] == 1;
        var playoff_info;
        var isPlayoffs = basicGameData["seasonStageId"] == 4;

        if(isPlayoffs)
        {
          var playoff_stats = basicGameData["playoffs"];
          playoff_info = {
            roundNum: playoff_stats["roundNum"],
            confName: playoff_stats["confName"],
            seriesId: playoff_stats["seriesId"],
            seriesSummaryText: playoff_stats["seriesSummaryText"],
            isSeriesCompleted: playoff_stats["isSeriesCompleted"],
            gameNumInSeries: playoff_stats["gameNumInSeries"],
            vTeamSeed: playoff_stats["vTeam"]["seedNum"],
            vTeamSeriesWins: playoff_stats["vTeam"]["seriesWin"],
            vTeamIsSeriesWinner: playoff_stats["vTeam"]["isSeriesWinner"],
            hTeamSeed: playoff_stats["hTeam"]["seedNum"],
            hTeamSeriesWins: playoff_stats["hTeam"]["seriesWin"],
            hTeamIsSeriesWinner: playoff_stats["hTeam"]["isSeriesWinner"],
          }
        }

        for(let i in team_list)
        {
          var team = team_list[i];
          if(team["teamId"] == visiting_team_id)
          {
            visiting_team = team["teamName"];
            visiting_team_tricode = team["tricode"];
            if(this.useSecondaryLogos)
              visiting_logo_location = team["secondaryLogoLocation"];
            else
              visiting_logo_location = team["primaryLogoLocation"];
          }
          if(team["teamId"] == home_team_id)
          {
            home_team = team["teamName"];
            home_team_tricode = team["tricode"];
            if(this.useSecondaryLogos)
              home_logo_location = team["secondaryLogoLocation"];
            else
              home_logo_location = team["primaryLogoLocation"];
          }
          if(visiting_team && home_team)
            break;
        }

        var nugget = "";
        if(basicGameData["nugget"])
        {
          nugget = basicGameData["nugget"]["text"];
        }

        var top_label, bottom_label;

        if(statusNum == 1)
        {
          var isStartTimeTBD = basicGameData["isStartTimeTBD"];
          if(isStartTimeTBD)
          {
            top_label = "TBD";
          }
          else
          {
            top_label = basicGameData["startTimeEastern"];
          }
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

        var broadcast_info = basicGameData["watch"]["broadcast"]["broadcasters"];
          var broadcastersNational = "", vTeamBroadcasters = "", hTeamBroadcasters = "";
          
          if(broadcast_info["national"][0])
            broadcastersNational = broadcast_info["national"][0]["shortName"];
          if(broadcast_info["vTeam"][0])
            vTeamBroadcasters = broadcast_info["vTeam"][0]["shortName"];
          if(broadcast_info["hTeam"][0])
            hTeamBroadcasters = broadcast_info["hTeam"][0]["shortName"];
          

          var broadcastersLabel = "";

          if(broadcastersNational)
            broadcastersLabel = broadcastersNational;
          else
          {
            if(vTeamBroadcasters && hTeamBroadcasters)
              broadcastersLabel += vTeamBroadcasters + ", " + hTeamBroadcasters;
            else
              broadcastersLabel += vTeamBroadcasters + hTeamBroadcasters;
          }

        this.game_data = {
          seasonYear: basicGameData["seasonYear"],
          isPreseason: isPreseason,
          isPlayoffs: isPlayoffs,
          playoff_info: playoff_info,
          vTeamId: visiting_team_id,
          vTeamName: visiting_team,
          vTeamTricode: visiting_team_tricode,
          vTeamLogoLocation: visiting_logo_location,
          vTeamRecord: "(" + basicGameData["vTeam"]["win"] + " - " + basicGameData["vTeam"]["loss"] + ")",
          hTeamId: home_team_id,
          hTeamName: home_team,
          hTeamTricode: home_team_tricode,
          hTeamLogoLocation: home_logo_location,
          hTeamRecord: "(" + basicGameData["hTeam"]["win"] + " - " + basicGameData["hTeam"]["loss"] + ")",
          nugget: nugget,
          top_label: top_label,
          bottom_label: bottom_label,
          broadcastersLabel: broadcastersLabel
        }

      });
  }

  compareDates(date: String)
  {
    var currentDate = new Date();
    var currentYear = String(currentDate.getFullYear());
    var currentMonth = currentDate.getMonth() + 1;
    var currentMonthFormatted = currentMonth <= 9? "0" + String(currentMonth) : String(currentMonth);
    var currentDay = currentDate.getDate()
    var currentDayFormatted = currentDay <= 9? "0" + String(currentDay) : String(currentDay);
    var formattedDate = currentYear + currentMonthFormatted + currentDayFormatted;

    return date == formattedDate;
  }
}
