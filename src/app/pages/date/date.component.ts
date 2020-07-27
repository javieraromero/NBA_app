import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
//import { getLocaleDateFormat } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TeamInfo } from 'src/app/assets/team_info';
import { MyDate } from 'src/app/assets/date_calculator';

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
  statusNums: Number[] = [];
  longDate: String;

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit()
  {
    this.date = this.route.snapshot.paramMap.get('date');
    this.getData(this.date);
    this.setLongDate(this.date);
    this.setPreviousAndNextDate(this.date);
    
    //console.log(this.statusNums);
    while(this.statusNums.indexOf(1) != -1 || this.statusNums.indexOf(2) != -1)
    {
      console.log("date is updating statusNums");
      this.updateStatusNums(this.date);
      await new Promise(r => setTimeout(r, 15000));
    }
  }

  getData(date: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + date + "/scoreboard.json")
      .subscribe(response => {

        var list_of_games = response["games"];
        var team_list = this.teamInfo.teams;

        var temp_games: Object[] = [];

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
            {
              visiting_team = team["teamName"];
            }
            if(team["teamId"] == homeId)
            {
              home_team = team["teamName"];
            }
            if(visiting_team && home_team)
              break;
          }

          var statusNum = game["statusNum"];

          const game_info = {
            statusNum: statusNum,
            seasonStageId: game["seasonStageId"],
            gameId: gameId,
          }

          temp_games.push(game_info);
        }

        this.games = temp_games;
      })
  }

  updateStatusNums(date: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + date + "/scoreboard.json")
      .subscribe(response => {
        var list_of_games = response["games"];

        for(let i = 0; i < list_of_games.length; i++)
        {
          var game = list_of_games[i];
          var statusNum = game["statusNum"];
          this.games[i]["statusNum"] = statusNum;
          this.statusNums[i] = statusNum;
        }
      });
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
