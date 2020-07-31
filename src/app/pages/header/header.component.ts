import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';

import { TeamInfo } from 'src/app/assets/team_info';
import { MyDate } from 'src/app/assets/date_calculator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date;
  games: Object[] = [];
  statusNums: number[] = [];
  previousDate;
  nextDate;
  longDate;

  disable_buttons: boolean = false;

  private routeSub: any;

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo,
    private router: Router
  ) { }

  ngOnInit() {
    this.date = this.getDate();
    this.getData(this.date);
    this.setPreviousAndNextDate(this.date);
    this.setLongDate(this.date);

    this.run();

    this.routeSub = this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.ngOnDestroy();
      }
    });
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  async run()
  {
    var is_today_current_date;
    do {
        console.log("refreshing header");
        this.getData(this.date);
        this.disable_buttons = false;
        await new Promise(r => setTimeout(r, 5000));
        is_today_current_date = this.compareDates(this.date);
    } while((this.statusNums.indexOf(1) != -1 || this.statusNums.indexOf(2) != -1) && is_today_current_date);

    this.routeSub = this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        this.ngOnDestroy();
      }
    });
  }

  getDate()
  {
    var currentDate = new Date();
    var currentYear = String(currentDate.getFullYear());
    var currentMonth = currentDate.getMonth() + 1;
    var currentMonthFormatted = currentMonth <= 9? "0" + String(currentMonth) : String(currentMonth);
    var currentDay = currentDate.getDate()
    var currentDayFormatted = currentDay <= 9? "0" + String(currentDay) : String(currentDay);
    var formattedDate = currentYear + currentMonthFormatted + currentDayFormatted;

    return formattedDate;
  }

  getData(date: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + date + "/scoreboard.json")
      .subscribe(response => {

        var list_of_games = response["games"];
        var team_list = this.teamInfo.teams;

        var temp: Object[] = [];
        var temp_statusNums: number[] = [];

        for(let i = 0; i < list_of_games.length; i++)
        {
          var game = list_of_games[i];

          var gameId = game["gameId"];
          temp_statusNums.push(game["statusNum"]);

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
              visiting_team = team["tricode"];
              visiting_team_logo = team["secondaryLogoLocation"];
            }
            if(team["teamId"] == homeId)
            {
              home_team = team["tricode"];
              home_team_logo = team["secondaryLogoLocation"];
            }
            if(visiting_team && home_team)
              break;
          }

          var statusNum = game["statusNum"];
          var start_time = game["startTimeEastern"];

          var label = "";
          var visiting_label = "";
          var home_label = "";

          if(statusNum == 1)
          {
            var isStartTimeTBD = game["isStartTimeTBD"];
            if(isStartTimeTBD)
            {
              label = "TBD";
            }
            else
            {
              label = start_time;
            }
            visiting_label = "(" + game["vTeam"]["win"] + "-" + game["vTeam"]["loss"] + ")";
            home_label = "(" + game["hTeam"]["win"] + "-" + game["hTeam"]["loss"] + ")";

          }
          else if(statusNum == 2)
          {
            var quarters_elapsed = game["period"]["current"];
            var clock = game["clock"];
            var is_halftime = game["period"]["isHalftime"];
            var is_end_of_period = game["period"]["isEndOfPeriod"];
            visiting_label = game["vTeam"]["score"];
            home_label = game["hTeam"]["score"];
            if(is_halftime)
            {
              label = "Halftime";
            }
            else if(is_end_of_period)
            {
              if(quarters_elapsed > 4)
                label = "End of " + (quarters_elapsed > 5 ? String(quarters_elapsed - 4) : "") + "OT";
              else
                label = "End of Q" + quarters_elapsed;
            }
            else
            {
              if(quarters_elapsed > 4)
                label = (quarters_elapsed > 5 ? String(quarters_elapsed - 4) : "") + "OT " + clock;
              else
                label = "Q" + quarters_elapsed + " " + clock;
            }
          }
          else if(statusNum == 3)
          {
            label = "Final";
            visiting_label = game["vTeam"]["score"];
            home_label = game["hTeam"]["score"];
            var quarters_elapsed = game["period"]["current"];
            if(quarters_elapsed > 4)
              label += " (" + (quarters_elapsed > 5 ? String(quarters_elapsed - 4) : "") + "OT)";
          }

          /*
          else if(statusNum == 4) could be postponed game, not sure
          */

          var broadcast_info = game["watch"]["broadcast"]["broadcasters"];
          var broadcastersNational = "", vTeamBroadcasters = "", hTeamBroadcasters = "";
          if(statusNum <= 2)
          {
            if(broadcast_info["national"][0])
            broadcastersNational = broadcast_info["national"][0]["shortName"];
            /*if(broadcast_info["vTeam"][0])
              vTeamBroadcasters = broadcast_info["vTeam"][0]["shortName"];
            if(broadcast_info["hTeam"][0])
              hTeamBroadcasters = broadcast_info["hTeam"][0]["shortName"];*/
          }

          var broadcastersLabel = "";

          if(broadcastersNational)
            broadcastersLabel = broadcastersNational;
          /*else
          {
            if(vTeamBroadcasters && hTeamBroadcasters)
              broadcastersLabel += vTeamBroadcasters + ", " + hTeamBroadcasters;
            else
              broadcastersLabel += vTeamBroadcasters + hTeamBroadcasters;
          }*/

          const game_info = {
            gameId: gameId,
            statusNum: statusNum,
            visitingTeam: visiting_team,
            visitingTeamId: visitingId,
            visitingTeamLogoLocation: visiting_team_logo,
            visitingLabel: visiting_label,
            homeTeam: home_team,
            homeTeamId: homeId,
            homeTeamLogoLocation: home_team_logo,
            homeLabel: home_label,
            label: label,
            broadcastersLabel: broadcastersLabel
          }

          temp.push(game_info);
        }

        this.games = temp;
        this.statusNums = temp_statusNums;
      })
  }

  gotoPreviousDate()
  {
    this.disable_buttons = true;
    this.games = [];
    this.date = this.previousDate;
    this.setPreviousAndNextDate(this.date);
    this.setLongDate(this.date);
    this.getData(this.date);
    this.run();
  }

  gotoNextDate()
  {
    this.disable_buttons = true;
    this.games = [];
    this.date = this.nextDate;
    this.setPreviousAndNextDate(this.date);
    this.setLongDate(this.date);
    this.getData(this.date);
    this.run();
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

  setLongDate(date: String)
  {
    var year = Number(date.slice(0, 4));
    var month = Number(date.slice(4, 6));
    var day = Number(date.slice(6, ));

    var newDate = new MyDate(month, day, year);

    this.longDate = newDate.getDayOfWeekName() + ", " + newDate.getMonthName() + " " + newDate.getDay() + " " + newDate.getYear();
  }

  compareDates(date: String)
  {
    return date == this.getDate();
  }
}
