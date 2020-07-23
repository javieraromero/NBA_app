import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
//import { getLocaleDateFormat } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TeamInfo } from 'src/app/assets/team_info';
import { DateCalculator, MyDate } from 'src/app/assets/date_calculator';

@Component({
  selector: 'app-home',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})

export class DateComponent implements OnInit
{
  date;
  previousDate;
  nextDate;
  games: Object[] = [];
  longDate: String;

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo,
    private route: ActivatedRoute,
    private dateCalcuator: DateCalculator
  ) { }

  ngOnInit()
  {
    this.date = this.route.snapshot.paramMap.get('date');
    this.getData(this.date);
    this.setLongDate(this.date);
    this.setPreviousAndNextDate(this.date);
  }

  getData(date: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + date + "/scoreboard.json")
      .subscribe(response => {

        var list_of_games = response["games"];
        var team_list = this.teamInfo.teams;

        for(let i = 0; i < list_of_games.length; i++)
        {
          var game = list_of_games[i];

          var seasonYear = game["seasonYear"];
          var gameId = game["gameId"];

          var isPlayoffs = game["seasonStageId"] == 4;
          var playoff_info;

          if(isPlayoffs)
          {
            var playoff_stats = game["playoffs"];
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

          var visitingId = Number(game["vTeam"]["teamId"]);
          var homeId = Number(game["hTeam"]["teamId"]);

          var visiting_team = undefined;
          var visiting_team_logo = undefined;
          var home_team = undefined;
          var home_team_logo = undefined;

          for(let i in team_list)
          {
            var team = team_list[i];
            if(team["teamId"] == visitingId)
            {
              visiting_team = team["teamName"];
              visiting_team_logo = team["secondaryLogoLocation"];
            }
            if(team["teamId"] == homeId)
            {
              home_team = team["teamName"];
              home_team_logo = team["secondaryLogoLocation"];
            }
            if(visiting_team && home_team)
              break;
          }

          var visiting_record = "(" + game["vTeam"]["win"] + "-" + game["vTeam"]["loss"] + ")";
          var home_record = home_record = "(" + game["hTeam"]["win"] + "-" + game["hTeam"]["loss"] + ")";

          var statusNum = game["statusNum"];
          var start_time = game["startTimeEastern"];
          
          var top_label = "";
          var bottom_label = "";

          var visiting_score = Number(game["vTeam"]["score"]);
          var home_score = Number(game["hTeam"]["score"]);

          if(statusNum == 1)
          {
            top_label = "Starting time";
            bottom_label = start_time;
          }
          else if(statusNum == 2)
          {
            var quarters_elapsed = game["period"]["current"];
            var clock = game["clock"];
            var is_halftime = game["period"]["isHalftime"];
            var is_end_of_period = game["period"]["isEndOfPeriod"];
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
                top_label = (quarters_elapsed > 5 ? String(quarters_elapsed - 4) : "") + "OT";
              else
                top_label = "Q" + quarters_elapsed + " " + clock;
            }
            bottom_label = visiting_score + " - " + home_score;
          }
          else if(statusNum == 3)
          {
            top_label = "Final";
            var quarters_elapsed = game["period"]["current"];
            if(quarters_elapsed > 4)
              top_label += " (" + (quarters_elapsed > 5 ? String(quarters_elapsed - 4) : "") + "OT)";
            bottom_label = visiting_score + " - " + home_score;
          }
          /*
          else if(statuNum == 4) could be postponed game, not sure
          */

          const game_info = {
            seasonYear: seasonYear,
            seasonStageId: game["seasonStageId"],
            game_Id: gameId,
            visitingTeam: visiting_team,
            visitingTeamId: visitingId,
            visitingTeamLogoLocation: visiting_team_logo,
            visitingRecord: visiting_record,
            visitingScore: visiting_score,
            homeTeam: home_team,
            homeTeamId: homeId,
            homeTeamLogoLocation: home_team_logo,
            homeRecord: home_record,
            homeScore: home_score,
            top_label: top_label,
            bottom_label: bottom_label,
            playoff_info: playoff_info
          }

          this.games.push(game_info);
        }
      })
  }

  setLongDate(date: String)
  {
    var year = Number(date.slice(0, 4));
    var month = Number(date.slice(4, 6));
    var day = Number(date.slice(6, ));

    var newDate = new MyDate(month, day, year);

    this.longDate = newDate.getDayOfWeekName() + ", " + newDate.getMonthName() + " " + newDate.getDay() + " " + newDate.getYear();
  }

  setPreviousAndNextDate(date: String)
  {
    var current_year = this.date.substring(0, 4);
    var current_month = this.date.substring(4, 6);
    var current_day = this.date.substring(6, );

    var temp = new MyDate(Number(current_month), Number(current_day), Number(current_year));
    temp.previousDay();
    var temp_month = temp.getMonth();
    var temp_month_formatted = temp_month < 10 ? "0" + String(temp_month) : String(temp_month);
    var temp_day = temp.getDay();
    var temp_day_formatted = temp_day < 10 ? "0" + String(temp_day) : String(temp_day);
    var temp_year = String(temp.getYear());

    this.previousDate = temp_year + temp_month_formatted + temp_day_formatted;

    temp = new MyDate(Number(current_month), Number(current_day), Number(current_year));
    temp.nextDay();
    temp_month = temp.getMonth();
    temp_month_formatted = temp_month < 10 ? "0" + String(temp_month) : String(temp_month);
    temp_day = temp.getDay();
    temp_day_formatted = temp_day < 10 ? "0" + String(temp_day) : String(temp_day);
    temp_year = String(temp.getYear());

    this.nextDate = temp_year + temp_month_formatted + temp_day_formatted;
  }
}
