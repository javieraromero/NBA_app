import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TeamInfo } from 'src/app/assets/team_info';
import { DateCalculator } from 'src/app/assets/date_calculator';

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

          var gameId = game["gameId"];

          var visitingId = Number(game["vTeam"]["teamId"]);
          var homeId = Number(game["hTeam"]["teamId"]);

          var visiting_team = undefined;
          var home_team = undefined;

          for(let i in team_list)
          {
            var team = team_list[i];
            if(team["teamId"] == visitingId)
              visiting_team = team["teamName"];
            if(team["teamId"] == homeId)
              home_team = team["teamName"];
            if(visiting_team && home_team)
              break;
          }

          var visiting_record = "(" + game["vTeam"]["win"] + "-" + game["vTeam"]["loss"] + ")";
          var home_record = home_record = "(" + game["hTeam"]["win"] + "-" + game["hTeam"]["loss"] + ")";


          var activated = game["isGameActivated"];
          var start_time = game["startTimeEastern"].substring(0, 3);
          
          var printable_label = "";

          var visiting_score = Number(game["vTeam"]["score"]);
          var home_score = Number(game["hTeam"]["score"]);

          printable_label = "Final";
          var quarters_elapsed = game["period"]["current"];
          if(quarters_elapsed > 4)
            printable_label += " (" + (quarters_elapsed > 5? String(quarters_elapsed - 4) : "") + "OT)";

          const game_info = {
            game_Id: gameId,
            visitingTeam: visiting_team,
            visitingTeamId: visitingId,
            homeTeam: home_team,
            homeTeamId: homeId,
            visitingRecord: visiting_record,
            homeRecord: home_record,
            label: printable_label,
            visitingScore: visiting_score,
            homeScore: home_score
          }

          this.games.push(game_info);
        }
      })
  }

  setLongDate(date: String)
  {
    var year = Number(date.slice(0, 4));
    var month = Number(date.slice(4, 6)) - 1;
    var day = Number(date.slice(6, ));

    var newDate = new Date(year, month, day);

    this.longDate = newDate.toDateString();
  }

  setPreviousAndNextDate(date: String)
  {
    this.dateCalcuator.setDate(date);
    this.dateCalcuator.previousDay();
    this.previousDate = this.dateCalcuator.getDate();
    this.dateCalcuator.setDate(date);
    this.dateCalcuator.nextDay();
    this.nextDate = this.dateCalcuator.getDate();
  }

  /*convert_24hr(time: String)
  {
    if(time.slice(4, ) == "PM")
    {
      var time_len = time.length;
      if(time_len == 7)
      {
        var hr = Number(time[0]);
        hr += 12;
        var new_time = String(hr) + time.slice(4, );
        return new_time;
      }
      else
      {
        if(time.slice(0, 2) != "12")
        {
          var hr = Number(time[0] + time[1])
          hr += 12
          var new_time = String(hr) + time.slice(4, );
          if(new_time.slice(0, 2) == "24")
          {
            new_time = "00" + new_time.slice(4, );
            return new_time;
          }
          else
            return time.slice(0, 4);
        }
      }
    }
    else
    {
      if(time.slice(0, 2) == "12")
        return "00" + time.slice(4, );
      else
        return time.slice(0, 4);
    }
  }*/
}
