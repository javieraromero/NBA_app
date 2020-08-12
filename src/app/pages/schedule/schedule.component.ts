import { Component, OnInit, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { TeamInfo } from '../../assets/team_info';
import { MyDate } from 'src/app/assets/date_calculator';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @Input() teamId: String;
  @Input() year: String;

  teamName: String;
  //teamSecondaryLogoLocation: String;
  lastGamePlayedIndex;
  temp_index;
  all_games;
  sizeof_list;
  list_of_games: Object[] = [];

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo,
  ) { }

  ngOnInit() {
    this.getSchedule(this.teamId, this.year);
    var teamAttributes = this.getTeamAttributes(this.teamId);
    this.teamName = teamAttributes["teamName"];
  }

  getSchedule(teamId: String, year: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + year + "/teams/" + teamId + "/schedule.json")
      .subscribe(response => {
        var leagueData = response["league"];
        this.lastGamePlayedIndex = leagueData["lastStandardGamePlayedIndex"];
        var games = leagueData["standard"];
        this.sizeof_list = games.length;

        var temp: Object[] = [];
        for(var i = 0; i < games.length; i++)
        {
          var game = games[i];

          var vTeamId = game["vTeam"]["teamId"];
          var hTeamId = game["hTeam"]["teamId"];

          var vTeamAttributes = this.getTeamAttributes(vTeamId);
          var hTeamAttributes = this.getTeamAttributes(hTeamId);

          const game_info = {
            //seasonStageId: game["seasonStageId"],
            isLastGamePlayed: i == this.lastGamePlayedIndex,
            gameId: game["gameId"],
            //startTimeEastern: game["startTimeEastern"],
            date: game["startDateEastern"],
            longDate: this.setLongDate(game["startDateEastern"]),
            statusNum: game["statusNum"],
            //vTeamId: vTeamId,
            vTeamName: vTeamId == this.teamId ? this.teamName : vTeamAttributes["teamName"],
            vTeamTricode: vTeamAttributes["teamTricode"],
            vTeamLocation: vTeamAttributes["teamLocation"],
            vTeamSimpleName: vTeamAttributes["teamSimpleName"],
            //vTeamLogoLocation: vTeamId == this.teamId ? this.teamSecondaryLogoLocation : vTeamAttributes["teamSecondaryLogoLocation"],
            //vTeamScore: game["vTeam"]["score"],
            //hTeamId: hTeamId,
            hTeamName: hTeamId == this.teamId ? this.teamName : hTeamAttributes["teamName"],
            hTeamTricode: hTeamAttributes["teamTricode"],
            hTeamLocation: hTeamAttributes["teamLocation"],
            hTeamSimpleName: hTeamAttributes["teamSimpleName"],
            //hTeamLogoLocation: hTeamId == this.teamId ? this.teamSecondaryLogoLocation : hTeamAttributes["teamSecondaryLogoLocation"],
            //hTeamScore: game["hTeam"]["score"],
            //playoff_info: playoff_info
          }

          temp.push(game_info);
        }

        this.all_games = temp;

        this.temp_index = this.lastGamePlayedIndex;
        var [beginning_index, end_index] = this.calculateRange(this.temp_index);
        this.getRangeOfGames(beginning_index, end_index);
      });
  }

  calculateRange(pivot_index: number)
  {
    var sizeof_list = this.sizeof_list;
    var beginning_index = 0, end_index = 0;
    if(pivot_index < 0)
      pivot_index = 0;
    if(pivot_index > sizeof_list - 1)
      pivot_index = sizeof_list - 1;
    if(pivot_index >= 0 && pivot_index <= 2)
    {
      beginning_index = 0;
      end_index = pivot_index + 2;
    }
    else if(pivot_index >= sizeof_list - 3 && pivot_index <= sizeof_list - 1)
    {
      beginning_index = pivot_index - 2;
      end_index = sizeof_list - 1;
    }
    else
    {
      beginning_index = pivot_index - 2;
      end_index = pivot_index + 2;
    }
    return [beginning_index, end_index];
  }

  getRangeOfGames(beginning_index: number, end_index: number)
  {
    var temp: Object[] = [];
    for(var i = beginning_index; i <= end_index; i++)
    {
      temp.push(this.all_games[i]);
    }

    this.list_of_games = temp;
  }

  getPreviousFiveGames()
  {
    this.list_of_games = [];
    this.temp_index = this.temp_index - 5;
    var [beginning_index, end_index] = this.calculateRange(this.temp_index);
    console.log(beginning_index + " " + end_index);
    this.getRangeOfGames(beginning_index, end_index);
  }

  getNextFiveGames()
  {
    this.list_of_games = [];
    this.temp_index = this.temp_index + 5;
    var [beginning_index, end_index] = this.calculateRange(this.temp_index);
    console.log(beginning_index + " " + end_index);
    this.getRangeOfGames(beginning_index, end_index);
  }

  getTeamAttributes(teamId: String)
  {
    var team_list = this.teamInfo.teams;

    var teamId_int = Number(teamId);

    var teamName;
    var teamTricode;
    var teamLocation;
    var teamSimpleName;
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
        teamTricode = team["tricode"];
        teamLocation = team["location"];
        teamSimpleName = team["simpleName"];
        teamPrimaryColor = team["primaryColor"];
        teamSecondaryColor = team["secondaryColor"];
        teamPrimaryLogoLocation = team["primaryLogoLocation"];
        teamSecondaryLogoLocation = team["secondaryLogoLocation"];
        break;
      }
    }

    const team_attributes = {
      teamName: teamName,
      teamTricode: teamTricode,
      teamLocation: teamLocation,
      teamSimpleName: teamSimpleName,
      teamPrimaryColor: teamPrimaryColor,
      teamSecondaryColor: teamSecondaryColor,
      teamPrimaryLogoLocation: teamPrimaryLogoLocation,
      teamSecondaryLogoLocation: teamSecondaryLogoLocation
    }

    return team_attributes;
  }

  setLongDate(date: String)
  {
    var year = Number(date.slice(0, 4));
    var month = Number(date.slice(4, 6));
    var day = Number(date.slice(6, ));

    var newDate = new MyDate(month, day, year);

    return newDate.getDayOfWeekName() + ", " + newDate.getMonthName() + " " + newDate.getDay() + " " + newDate.getYear();
  }

  /*compareDates(date: String)
  {
    var currentDate = new Date();
    var currentYear = String(currentDate.getFullYear());
    var currentMonth = currentDate.getMonth() + 1;
    var currentMonthFormatted = currentMonth <= 9? "0" + String(currentMonth) : String(currentMonth);
    var currentDay = currentDate.getDate()
    var currentDayFormatted = currentDay <= 9? "0" + String(currentDay) : String(currentDay);
    var formattedDate = currentYear + currentMonthFormatted + currentDayFormatted;

    return date == formattedDate;
  }*/
}
