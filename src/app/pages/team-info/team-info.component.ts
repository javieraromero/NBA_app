import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TeamInfo } from '../../assets/team_info';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {

  @Input() teamId: String;
  @Input() year: String;

  team_attributes;
  team_data;
  coaches_list: Object[] = [];

  constructor(
    private teamInfo: TeamInfo,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.team_attributes = this.getTeamAttributes(this.teamId);
    document.documentElement.style.setProperty('--team_primary', this.team_attributes["teamPrimaryColor"]);
    document.documentElement.style.setProperty('--team_secondary', this.team_attributes["teamSecondaryColor"]);
    this.getRecordAndStandings(this.teamId);
    this.getCoaches(this.teamId, this.year);
  }

  getTeamAttributes(teamId: String)
  {
    var team_list = this.teamInfo.teams;

    var teamId_int = Number(teamId);

    var teamName, teamtricode, teamLocation, teamSimpleName, teamPrimaryColor,
      teamSecondaryColor, teamPrimaryLogoLocation, teamSecondaryLogoLocation, confName,
      divName;

    for(let i in team_list)
    {
      var team = team_list[i];
      if(team["teamId"] == teamId_int)
      {
        teamName = team["teamName"];
        teamtricode = team["tricode"];
        teamLocation = team["location"];
        teamSimpleName = team["simpleName"];
        teamPrimaryColor = team["primaryColor"];
        teamSecondaryColor = team["secondaryColor"];
        teamPrimaryLogoLocation = team["primaryLogoLocation"];
        teamSecondaryLogoLocation = team["secondaryLogoLocation"];
        confName = team["confName"];
        divName = team["divName"];

        break;
      }
    }

    const team_attributes = {
      teamName: teamName,
      teamtricode: teamtricode,
      teamLocation: teamLocation,
      teamSimpleName: teamSimpleName,
      teamPrimaryColor: teamPrimaryColor,
      teamSecondaryColor: teamSecondaryColor,
      teamPrimaryLogoLocation: teamPrimaryLogoLocation,
      teamSecondaryLogoLocation: teamSecondaryLogoLocation,
      confName: confName,
      divName: divName
    }

    return team_attributes;
  }

  getRecordAndStandings(teamId: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/current/standings_all.json")
      .subscribe(response => {

        var teams = response["league"]["standard"]["teams"];

        for(var i = 0; i < teams.length; i++)
        {
          var team = teams[i];

          if(team["teamId"] != teamId)
            continue;

          console.log(team["teamSitesOnly"]["teamName"]);

          var team_attributes = team["teamSitesOnly"];

          const team_data = {
            win: team["win"],
            loss: team["loss"],
            //winPct: team["winPct"],
            //gamesBehind: team["gamesBehind"],
            //clinchedPlayoffsCode: team["teamSitesOnly"]["clinchedPlayoffsCodeV2"],
            confRank: team["confRank"],
            divRank: team["divRank"],
            //confWin: team["confWin"],
            //confLoss: team["confLoss"],
            //divWin: team["divWin"],
            //divLoss: team["divLoss"],
            //homeWin: team["homeWin"],
            //homeLoss: team["homeLoss"],
            //awayWin: team["awayWin"],
            //awayLoss: team["awayLoss"],
            //lastTenWin: team["lastTenWin"],
            //lastTenLoss: team["lastTenLoss"],
            //streakText: team_attributes["streakText"],
          }

          this.team_data = team_data;
        }
      });
  }

  getCoaches(teamId: String, year: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + year + "/coaches.json")
      .subscribe(response => {
        
        var all_coaches = response["league"]["standard"];

        for(var i = 0; i < all_coaches.length; i++)
        {
          console.log("i: " + i);
          var coach = all_coaches[i];

          if(coach["teamId"] == teamId)
          {
            for(var j = i; j < all_coaches.length; j++)
            {
              console.log("j: " + j);
              coach = all_coaches[j];

              if(coach["teamId"] != teamId)
                break;
              this.coaches_list.push({personId: coach["personId"]});
            }
            break;
          }
        }
      });
  }
}
