import { Component, OnInit, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { TeamInfo } from '../../assets/team_info';
import { MyDate } from 'src/app/assets/date_calculator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: String = "";

  list_of_teams: Object[] = [];
  league_roster: Object[] = [];
  list_of_coaches: Object[] = [];
  league_schedule: Object[] = [];

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.query = this.route.snapshot.paramMap.get('query');
    this.getAllTeams();
    this.getLeagueRoster("2019");
    this.getCoaches("2019");
    this.getLeagueSchedule("2019");
  }

  getAllTeams()
  {
    var team_list = this.teamInfo.teams;

    var list_of_team_attributes: Object[] = [];

    for(let i in team_list)
    {
      var team = team_list[i];

      const team_attributes = {
        location: team["location"],
        altCityName: team["altCityName"],
        teamName: team["teamName"],
        tricode: team["tricode"],
        simpleName: team["simpleName"],
        teamShortName: team["teamShortName"],
        teamId: team["teamId"]
      }

      list_of_team_attributes.push(team_attributes);
    }

    this.list_of_teams = list_of_team_attributes;
  }

  getLeagueRoster(year: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + year + "/players.json")
      .subscribe(response => {

        var league_roster = response["league"]["standard"];

        var temp: Object[] = [];

        for(var i = 0; i < league_roster.length; i++)
        {
          var player = league_roster[i];

          var player_attributes = {
            firstName: player["firstName"],
            lastName: player["lastName"],
            temporaryDisplayName: player["temporaryDisplayName"],
            personId: player["personId"]
          }

          temp.push(player_attributes);
        }

        this.league_roster = temp;
      });
  }

  getCoaches(year: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + year + "/coaches.json")
      .subscribe(response => {
        
        var all_coaches = response["league"]["standard"];

        var temp: Object[] = [];

        for(var i = 0; i < all_coaches.length; i++)
        {
          var coach = all_coaches[i];

          var coach_attributes = {
            firstName: coach["firstName"],
            lastName: coach["lastName"],
            personId: coach["personId"],
          }

          temp.push(coach_attributes);
        }

        this.list_of_coaches = temp;
      });
  }

  getLeagueSchedule(year: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + year + "/schedule.json")
      .subscribe(response => {

        var league_schedule = response["league"]["standard"];

        var temp: Object[] = [];

        for(var i = 0; i < league_schedule.length; i++)
        {
          var game = league_schedule[i];

          var vTeamId = game["vTeam"]["teamId"];
          var hTeamId = game["hTeam"]["teamId"];

          var vTeamAttributes = this.getTeamAttributes(vTeamId);
          var hTeamAttributes = this.getTeamAttributes(hTeamId);

          var game_attributes = {
            gameId: game["gameId"],
            longDate: this.setLongDate(game["startDateEastern"]),
            vTeamName: vTeamAttributes["teamName"],
            vTeamTricode: vTeamAttributes["teamtricode"],
            vTeamLocation: vTeamAttributes["teamLocation"],
            vTeamSimpleName: vTeamAttributes["teamSimpleName"],
            hTeamName: hTeamAttributes["teamName"],
            hTeamTricode: hTeamAttributes["teamtricode"],
            hTeamLocation: hTeamAttributes["teamLocation"],
            hTeamSimpleName: hTeamAttributes["teamSimpleName"],
          }

          temp.push(game_attributes);
        }

        this.league_schedule = temp;
      });
  }

  getTeamAttributes(teamId: String)
  {
    var team_list = this.teamInfo.teams;

    var teamId_int = Number(teamId);

    var teamName;
    var teamtricode;
    var teamLocation;
    var teamSimpleName;

    for(let i in team_list)
    {
      var team = team_list[i];
      if(team["teamId"] == teamId_int)
      {
        teamName = team["teamName"];
        teamtricode = team["tricode"];
        teamLocation = team["location"];
        teamSimpleName = team["simpleName"];
        break;
      }
    }

    const team_attributes = {
      teamName: teamName,
      teamtricode: teamtricode,
      teamLocation: teamLocation,
      teamSimpleName: teamSimpleName
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

  emboldenResult(result: String)
  {
    var query = String(this.query);
    const regExp = new RegExp(query, "gi");
    return result.replace(regExp, function(str) {
      return '<b>' + str + '</b>'
    });
  }

  switchTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display= "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
}