import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { TeamInfo } from '../../assets/team_info';

@Component({
  selector: 'app-playoff-bracket',
  templateUrl: './playoff-bracket.component.html',
  styleUrls: ['./playoff-bracket.component.css']
})
export class PlayoffBracketComponent implements OnInit {

  year;
  playoff_year;
  series_10; series_11; series_12; series_13; series_14; series_15; series_16; series_17;
  series_20; series_21; series_22; series_23;
  series_30; series_31;
  series_40;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private teamInfo: TeamInfo
  ) { }

  ngOnInit() {
    this.year = this.route.snapshot.paramMap.get('year');
    this.playoff_year = Number(this.year) + 1;
    this.getBracket(this.year);
  }

  getBracket(year: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + year + "/playoffsBracket.json")
      .subscribe(response => {
        
        var list_of_series = response["series"];

        for(var i = 0; i < list_of_series.length; i++)
        {
          var series = list_of_series[i];

          var topTeam = series["topRow"];
          var topTeamId = topTeam["teamId"];
          var topTeamAttributes = this.getTeamAttributes(topTeamId);

          var bottomTeam = series["bottomRow"];
          var bottomTeamId = bottomTeam["teamId"];
          var bottomTeamAttributes = this.getTeamAttributes(bottomTeamId);


          var series_data = {
            seriesId: series["seriesId"],
            isSeriesCompleted: series["isSeriesCompleted"],
            summaryStatusText: series["summaryStatusText"],
            gameNumber: series["gameNumber"],
            topTeamId: topTeamId,
            topTeamName: topTeamAttributes["teamName"],
            topTeamPrimaryLogoLocation: topTeamAttributes["teamPrimaryLogoLocation"],
            topTeamSeed: topTeam["seedNum"],
            topTeamWins: topTeam["wins"],
            topTeam_isSeriesWinner: topTeam["isSeriesWinner"],
            bottomTeamId: bottomTeamId,
            bottomTeamName: bottomTeamAttributes["teamName"],
            bottomTeamPrimaryLogoLocation: bottomTeamAttributes["teamPrimaryLogoLocation"],
            bottomTeamSeed: bottomTeam["seedNum"],
            bottomTeamWins: bottomTeam["wins"],
            bottomTeam_isSeriesWinner: bottomTeam["isSeriesWinner"],
          }

          if(series["roundNum"] == 1)
          {
            if(series["seriesId"] == "10")
            {
              this.series_10 = series_data;
              document.documentElement.style.setProperty('--series_10_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_10_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_10_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_10_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
            else if(series["seriesId"] == "11")
            {
              this.series_11 = series_data;
              document.documentElement.style.setProperty('--series_11_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_11_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_11_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_11_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
            else if(series["seriesId"] == "12")
            {
              this.series_12 = series_data;
              document.documentElement.style.setProperty('--series_12_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_12_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_12_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_12_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
            else if(series["seriesId"] == "13")
            {
              this.series_13 = series_data;
              document.documentElement.style.setProperty('--series_13_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_13_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_13_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_13_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
            else if(series["seriesId"] == "14")
            {
              this.series_14 = series_data;
              document.documentElement.style.setProperty('--series_14_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_14_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_14_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_14_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
            else if(series["seriesId"] == "15")
            {
              this.series_15 = series_data;
              document.documentElement.style.setProperty('--series_15_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_15_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_15_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_15_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
            else if(series["seriesId"] == "16")
            {
              this.series_16 = series_data;
              document.documentElement.style.setProperty('--series_16_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_16_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_16_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_16_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
            else
            {
              this.series_17 = series_data;
              document.documentElement.style.setProperty('--series_17_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_17_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_17_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_17_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
          }

          else if(series["roundNum"] == 2)
          {
            if(series["seriesId"] == "20")
            {
              this.series_20 = series_data;
              document.documentElement.style.setProperty('--series_20_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_20_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_20_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_20_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
            else if(series["seriesId"] == "21")
            {
              this.series_21 = series_data;
              document.documentElement.style.setProperty('--series_21_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_21_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_21_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_21_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
            else if(series["seriesId"] == "22")
            {
              this.series_22 = series_data;
              document.documentElement.style.setProperty('--series_22_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_22_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_22_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_22_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
            else
            {
              this.series_23 = series_data;
              document.documentElement.style.setProperty('--series_23_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_23_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_23_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_23_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
          }

          else if(series["roundNum"] == 3)
          {
            if(series["seriesId"] == "30")
            {
              this.series_30 = series_data;
              document.documentElement.style.setProperty('--series_30_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_30_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_30_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_30_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
            else
            {
              this.series_31 = series_data;
              document.documentElement.style.setProperty('--series_31_top_primary', topTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_31_top_secondary', topTeamAttributes["teamSecondaryColor"]);
              document.documentElement.style.setProperty('--series_31_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
              document.documentElement.style.setProperty('--series_31_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
            }
          }

          else
          {
            this.series_40 = series_data;
            document.documentElement.style.setProperty('--series_40_top_primary', topTeamAttributes["teamPrimaryColor"]);
            document.documentElement.style.setProperty('--series_40_top_secondary', topTeamAttributes["teamSecondaryColor"]);
            document.documentElement.style.setProperty('--series_40_bottom_primary', bottomTeamAttributes["teamPrimaryColor"]);
            document.documentElement.style.setProperty('--series_40_bottom_secondary', bottomTeamAttributes["teamSecondaryColor"]);
          }
        }
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
        teamtricode = team["tricode"];
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
      teamtricode: teamtricode,
      teamLocation: teamLocation,
      teamSimpleName: teamSimpleName,
      teamPrimaryColor: teamPrimaryColor,
      teamSecondaryColor: teamSecondaryColor,
      teamPrimaryLogoLocation: teamPrimaryLogoLocation,
      teamSecondaryLogoLocation: teamSecondaryLogoLocation
    }

    return team_attributes;
  }
}
