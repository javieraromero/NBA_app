import { Component, OnInit, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { TeamInfo } from '../../assets/team_info';
import { PlayersList } from '../../assets/players_list';
import { MyDate } from 'src/app/assets/date_calculator';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  @Input() seriesId: String;
  @Input() year: String;
  @Input() current_gameId: String = "";
  @Input() visiting_teamId: String = "";
  @Input() home_teamId: String = "";
  team1_data = {
    teamId: "",
    teamName: "",
    teamPrimaryLogoLocation: "",
    ppgPlayerName: "",
    ppgPlayerId: "",
    ppgValue: "",
    trpgPlayerName: "",
    trpgPlayerId: "",
    trpgValue: "",
    apgPlayerName: "",
    apgPlayerId: "",
    apgValue: "",
    fgpPlayerName: "",
    fgpPlayerId: "",
    fgpValue: "",
    tppPlayerName: "",
    tppPlayerId: "",
    tppValue: "",
    ftpPlayerName: "",
    ftpPlayerId: "",
    ftpValue: "",
    bpgPlayerName: "",
    bpgPlayerId: "",
    bpgValue: "",
    spgPlayerName: "",
    spgPlayerId: "",
    spgValue: "",
    tpgPlayerName: "",
    tpgPlayerId: "",
    tpgValue: "",
    pfpgPlayerName: "",
    pfpgPlayerId: "",
    pfpgValue: ""
  };
  team2_data = {
    teamId: "",
    teamName: "",
    teamPrimaryLogoLocation: "",
    ppgPlayerName: "",
    ppgPlayerId: "",
    ppgValue: "",
    trpgPlayerName: "",
    trpgPlayerId: "",
    trpgValue: "",
    apgPlayerName: "",
    apgPlayerId: "",
    apgValue: "",
    fgpPlayerName: "",
    fgpPlayerId: "",
    fgpValue: "",
    tppPlayerName: "",
    tppPlayerId: "",
    tppValue: "",
    ftpPlayerName: "",
    ftpPlayerId: "",
    ftpValue: "",
    bpgPlayerName: "",
    bpgPlayerId: "",
    bpgValue: "",
    spgPlayerName: "",
    spgPlayerId: "",
    spgValue: "",
    tpgPlayerName: "",
    tpgPlayerId: "",
    tpgValue: "",
    pfpgPlayerName: "",
    pfpgPlayerId: "",
    pfpgValue: ""
  };
  team1_name;
  team2_name;

  list_of_games: Object[] = [];
  no_series_data: boolean = false;

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo,
    private players: PlayersList
  ) { }

  ngOnInit() {
    if(this.seriesId != '0')
      this.getSeriesInfo(this.year, this.seriesId);
  }

  getSchedule(team1_teamId: String, team2_teamId: String, year: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + year + "/teams/" + team1_teamId + "/schedule.json")
      .subscribe(response => {
        var leagueData = response["league"];
        var list_of_games = leagueData["standard"];

        for(var i = 0; i < list_of_games.length; i++)
        {
          var game = list_of_games[i];

          if(game["seasonStageId"] == 4)
          {
            if(game["vTeam"]["teamId"] == team2_teamId || game["hTeam"]["teamId"] == team2_teamId)
            {
              for(var j = i; j < list_of_games.length; j++)
              {
                game = list_of_games[j];

                if(game["vTeam"]["teamId"] != team2_teamId && game["hTeam"]["teamId"] != team2_teamId)
                  break;

                this.list_of_games.push(
                  {
                    gameId: game["gameId"],
                    date: game["startDateEastern"],
                    longDate: this.setLongDate(game["startDateEastern"]),
                    statusNum: game["statusNum"],
                    gameNumInSeries: Number(game["playoffs"]["gameNumInSeries"])
                  }
                );
              }
              break;
            }
          }
        }
      });
  }

  getSeriesInfo(year: String, seriesId: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + year + "/playoffs_" + seriesId + "_leaders.json")
      .subscribe(response => {
        var teams = response["teams"];
        if(teams.length == 0)
        {
          this.no_series_data = true;
          this.getSchedule(this.visiting_teamId, this.home_teamId, this.year);
        }
        else
        {
          var team1 = teams[0];
          var team2 = teams[1];

          this.getSchedule(this.visiting_teamId, this.home_teamId, this.year);

          var players_list = this.players.players;

          var team1_ppgPlayerId = team1["ppg"]["personId"], 
              team1_trpgPlayerId = team1["trpg"]["personId"],
              team1_apgPlayerId = team1["apg"]["personId"],
              team1_fgpPlayerId = team1["fgp"]["personId"],
              team1_tppPlayerId = team1["tpp"]["personId"], 
              team1_ftpPlayerId = team1["ftp"]["personId"],
              team1_bpgPlayerId = team1["bpg"]["personId"], 
              team1_spgPlayerId = team1["spg"]["personId"], 
              team1_tpgPlayerId = team1["tpg"]["personId"], 
              team1_pfpgPlayerId = team1["pfpg"]["personId"];

          var team2_ppgPlayerId = team2["ppg"]["personId"], 
              team2_trpgPlayerId = team2["trpg"]["personId"],
              team2_apgPlayerId = team2["apg"]["personId"],
              team2_fgpPlayerId = team2["fgp"]["personId"],
              team2_tppPlayerId = team2["tpp"]["personId"], 
              team2_ftpPlayerId = team2["ftp"]["personId"],
              team2_bpgPlayerId = team2["bpg"]["personId"], 
              team2_spgPlayerId = team2["spg"]["personId"], 
              team2_tpgPlayerId = team2["tpg"]["personId"], 
              team2_pfpgPlayerId = team2["pfpg"]["personId"];

          var team1_ppgPlayerName,
              team1_trpgPlayerName,
              team1_apgPlayerName,
              team1_fgpPlayerName,
              team1_tppPlayerName,
              team1_ftpPlayerName,
              team1_bpgPlayerName,
              team1_spgPlayerName,
              team1_tpgPlayerName,
              team1_pfpgPlayerName;

          var team2_ppgPlayerName,
              team2_trpgPlayerName,
              team2_apgPlayerName,
              team2_fgpPlayerName,
              team2_tppPlayerName,
              team2_ftpPlayerName,
              team2_bpgPlayerName,
              team2_spgPlayerName,
              team2_tpgPlayerName,
              team2_pfpgPlayerName;

          for(let i in players_list)
          {
            var player = players_list[i];
            if(String(player["playerId"]) == team1_ppgPlayerId)
              team1_ppgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team1_trpgPlayerId)
              team1_trpgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team1_apgPlayerId)
              team1_apgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team1_fgpPlayerId)
              team1_fgpPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team1_tppPlayerId)
              team1_tppPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team1_ftpPlayerId)
              team1_ftpPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team1_bpgPlayerId)
              team1_bpgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team1_spgPlayerId)
              team1_spgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team1_tpgPlayerId)
              team1_tpgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team1_pfpgPlayerId)
              team1_pfpgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team2_ppgPlayerId)
              team2_ppgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team2_trpgPlayerId)
              team2_trpgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team2_apgPlayerId)
              team2_apgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team2_fgpPlayerId)
              team2_fgpPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team2_tppPlayerId)
              team2_tppPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team2_ftpPlayerId)
              team2_ftpPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team2_bpgPlayerId)
              team2_bpgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team2_spgPlayerId)
              team2_spgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team2_tpgPlayerId)
              team2_tpgPlayerName = player["firstName"] + " " + player["lastName"];

            if(String(player["playerId"]) == team2_pfpgPlayerId)
              team2_pfpgPlayerName = player["firstName"] + " " + player["lastName"];
          }

          var team1_teamId = team1["teamId"];
          var team1_attributes = this.getTeamAttributes(team1_teamId);
          this.team1_name = team1_attributes["teamName"];

          document.documentElement.style.setProperty('--team1_primary', team1_attributes["teamPrimaryColor"]);
          document.documentElement.style.setProperty('--team1_secondary', team1_attributes["teamSecondaryColor"]);

          const team1_data = {
            teamId: team1["teamId"],
            teamName: this.team1_name,
            teamPrimaryLogoLocation: team1_attributes["teamPrimaryLogoLocation"],
            ppgPlayerName: team1_ppgPlayerName,
            ppgPlayerId: team1_ppgPlayerId,
            ppgValue: team1["ppg"]["value"],
            trpgPlayerName: team1_trpgPlayerName,
            trpgPlayerId: team1_trpgPlayerId,
            trpgValue: team1["trpg"]["value"],
            apgPlayerName: team1_apgPlayerName,
            apgPlayerId: team1_apgPlayerId,
            apgValue: team1["apg"]["value"],
            fgpPlayerName: team1_fgpPlayerName,
            fgpPlayerId: team1_fgpPlayerId,
            fgpValue: team1["fgp"]["value"],
            tppPlayerName: team1_tppPlayerName,
            tppPlayerId: team1_tppPlayerId,
            tppValue: team1["tpp"]["value"],
            ftpPlayerName: team1_ftpPlayerName,
            ftpPlayerId: team1_ftpPlayerId,
            ftpValue: team1["ftp"]["value"],
            bpgPlayerName: team1_bpgPlayerName,
            bpgPlayerId: team1_bpgPlayerId,
            bpgValue: team1["bpg"]["value"],
            spgPlayerName: team1_spgPlayerName,
            spgPlayerId: team1_spgPlayerId,
            spgValue: team1["spg"]["value"],
            tpgPlayerName: team1_tpgPlayerName,
            tpgPlayerId: team1_tpgPlayerId,
            tpgValue: team1["tpg"]["value"],
            pfpgPlayerName: team1_pfpgPlayerName,
            pfpgPlayerId: team1_pfpgPlayerId,
            pfpgValue: team1["pfpg"]["value"]
          }

          this.team1_data = team1_data;

          var team2_teamId = team2["teamId"];
          var team2_attributes = this.getTeamAttributes(team2_teamId);
          this.team2_name = team2_attributes["teamName"];

          document.documentElement.style.setProperty('--team2_primary', team2_attributes["teamPrimaryColor"]);
          document.documentElement.style.setProperty('--team2_secondary', team2_attributes["teamSecondaryColor"]);

          const team2_data = {
            teamId: team2["teamId"],
            teamName: this.team2_name,
            teamPrimaryLogoLocation: team2_attributes["teamPrimaryLogoLocation"],
            ppgPlayerName: team2_ppgPlayerName,
            ppgPlayerId: team2_ppgPlayerId,
            ppgValue: team2["ppg"]["value"],
            trpgPlayerName: team2_trpgPlayerName,
            trpgPlayerId: team2_trpgPlayerId,
            trpgValue: team2["trpg"]["value"],
            apgPlayerName: team2_apgPlayerName,
            apgPlayerId: team2_apgPlayerId,
            apgValue: team2["apg"]["value"],
            fgpPlayerName: team2_fgpPlayerName,
            fgpPlayerId: team2_fgpPlayerId,
            fgpValue: team2["fgp"]["value"],
            tppPlayerName: team2_tppPlayerName,
            tppPlayerId: team2_tppPlayerId,
            tppValue: team2["tpp"]["value"],
            ftpPlayerName: team2_ftpPlayerName,
            ftpPlayerId: team2_ftpPlayerId,
            ftpValue: team2["ftp"]["value"],
            bpgPlayerName: team2_bpgPlayerName,
            bpgPlayerId: team2_bpgPlayerId,
            bpgValue: team2["bpg"]["value"],
            spgPlayerName: team2_spgPlayerName,
            spgPlayerId: team2_spgPlayerId,
            spgValue: team2["spg"]["value"],
            tpgPlayerName: team2_tpgPlayerName,
            tpgPlayerId: team2_tpgPlayerId,
            tpgValue: team2["tpg"]["value"],
            pfpgPlayerName: team2_pfpgPlayerName,
            pfpgPlayerId: team2_pfpgPlayerId,
            pfpgValue: team2["pfpg"]["value"]
          }

          this.team2_data = team2_data;
        }
        console.log(this.no_series_data);
      },
      error => {});
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
}
