import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { TeamInfo } from 'src/app/assets/team_info';
import { DateCalculator } from 'src/app/assets/date_calculator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date;
  games: Object[] = [];
  previousDate;
  nextDate;
  longDate;

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo,
    private route: ActivatedRoute,
    private dateCalcuator: DateCalculator
  ) { }

  ngOnInit() {
    this.date = this.route.snapshot.paramMap.get('date');
    this.getData(this.date);
    this.setPreviousAndNextDate(this.date);
    this.setLongDate(this.date);
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
          var visiting_team_logo = undefined;
          var home_team = undefined;
          var home_team_logo = undefined;

          for(let i in team_list)
          {
            var team = team_list[i];
            if(team["teamId"] == visitingId)
            {
              visiting_team = team["abbreviation"];
              visiting_team_logo = team["secondaryLogoLocation"];
            }
            if(team["teamId"] == homeId)
            {
              home_team = team["abbreviation"];
              home_team_logo = team["secondaryLogoLocation"];
            }
            if(visiting_team && home_team)
              break;
          }
          
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
            visitingTeamLogoLocation: visiting_team_logo,
            visitingScore: visiting_score,
            homeTeam: home_team,
            homeTeamId: homeId,
            homeTeamLogoLocation: home_team_logo,
            homeScore: home_score,
            label: printable_label,
          }

          this.games.push(game_info);
        }
      })
  }

  gotoPreviousDate()
  {
    this.games = [];
    this.date = this.previousDate;
    this.setPreviousAndNextDate(this.date);
    this.setLongDate(this.date);
    this.getData(this.date);
  }

  gotoNextDate()
  {
    this.games = [];
    this.date = this.nextDate;
    this.setPreviousAndNextDate(this.date);
    this.setLongDate(this.date);
    this.getData(this.date);
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

  setLongDate(date: String)
  {
    var year = Number(date.slice(0, 4));
    var month = Number(date.slice(4, 6)) - 1;
    var day = Number(date.slice(6, ));

    var newDate = new Date(year, month, day);

    this.longDate = newDate.toDateString();
  }
}
