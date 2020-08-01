import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { TeamInfo } from '../../assets/team_info';
//import { PlayersList } from '../../assets/players_list';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamId: String;
  year: String;
  teamName: String;
  list_of_games: Object[] = [];
  team_leaders: Object;
  roster: Object[] = [];
  lastGamePlayedIndex;
  teamPrimaryLogoLocation;
  teamSecondaryLogoLocation;
  search: String;

  constructor(
    //private http: HttpClient,
    private route: ActivatedRoute,
    private teamInfo: TeamInfo,
    //private players: PlayersList
  ) { }

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('teamId');
    this.year = this.route.snapshot.paramMap.get('year');
    //this.getSchedule(this.teamId, this.year);
    //this.getRoster(this.teamId, this.year);
    //this.getTeamLeaders(this.teamId, this.year);
    var teamAttributes = this.getTeamAttributes(this.teamId);
    this.teamName = teamAttributes["teamName"];
    /*this.teamPrimaryLogoLocation = teamAttributes["teamPrimaryLogoLocation"];
    this.teamSecondaryLogoLocation = teamAttributes["teamSecondaryLogoLocation"];
    var primaryColor = teamAttributes["teamPrimaryColor"];
    var secondaryColor = teamAttributes["teamSecondaryColor"];
    document.documentElement.style.setProperty('--team_primary', primaryColor);
    document.documentElement.style.setProperty('--team_secondary', secondaryColor);*/

    document.getElementById("team_tab").click();
  }

  /*getRoster(teamId: String, year: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + year + "/teams/" + teamId + "/roster.json")
      .subscribe(response => {
        var roster = response["league"]["standard"]["players"];

        for(var i = 0; i < roster.length; i++)
        {
          var playerId = roster[i]["personId"];
          
          var players_list = this.players.players;

          var first_name = "";
          var last_name = "";

          for(let i in players_list)
          {
            var player = players_list[i];
            if(String(player["playerId"]) == playerId)
            {
              first_name = player["firstName"];
              last_name = player["lastName"];
              break;
            }
          }

          const player_info = {
            playerId: playerId,
            firstName: first_name,
            lastName: last_name
          }

          this.roster.push(player_info);
        }
      });
  }*/

  /*getTeamLeaders(teamId: String, year: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + year + "/teams/" + teamId + "/leaders.json")
      .subscribe(response => {
        var data = response["league"]["standard"];

        var players_list = this.players.players;

        var ppgPlayerId = data["ppg"][0]["personId"], 
            trpgPlayerId = data["trpg"][0]["personId"],
            apgPlayerId = data["apg"][0]["personId"],
            fgpPlayerId = data["fgp"][0]["personId"],
            tppPlayerId = data["tpp"][0]["personId"], 
            ftpPlayerId = data["ftp"][0]["personId"],
            bpgPlayerId = data["bpg"][0]["personId"], 
            spgPlayerId = data["spg"][0]["personId"], 
            tpgPlayerId = data["tpg"][0]["personId"], 
            pfpgPlayerId = data["pfpg"][0]["personId"];

        var ppgPlayerName,
            trpgPlayerName,
            apgPlayerName,
            fgpPlayerName,
            tppPlayerName,
            ftpPlayerName,
            bpgPlayerName,
            spgPlayerName,
            tpgPlayerName,
            pfpgPlayerName;

        for(let i in players_list)
        {
          var player = players_list[i];
          if(String(player["playerId"]) == ppgPlayerId)
            ppgPlayerName = player["firstName"] + " " + player["lastName"];

          if(String(player["playerId"]) == trpgPlayerId)
            trpgPlayerName = player["firstName"] + " " + player["lastName"];

          if(String(player["playerId"]) == apgPlayerId)
            apgPlayerName = player["firstName"] + " " + player["lastName"];

          if(String(player["playerId"]) == fgpPlayerId)
            fgpPlayerName = player["firstName"] + " " + player["lastName"];

          if(String(player["playerId"]) == tppPlayerId)
            tppPlayerName = player["firstName"] + " " + player["lastName"];

          if(String(player["playerId"]) == ftpPlayerId)
            ftpPlayerName = player["firstName"] + " " + player["lastName"];

          if(String(player["playerId"]) == bpgPlayerId)
            bpgPlayerName = player["firstName"] + " " + player["lastName"];

          if(String(player["playerId"]) == spgPlayerId)
            spgPlayerName = player["firstName"] + " " + player["lastName"];

          if(String(player["playerId"]) == tpgPlayerId)
            tpgPlayerName = player["firstName"] + " " + player["lastName"];

          if(String(player["playerId"]) == pfpgPlayerId)
            pfpgPlayerName = player["firstName"] + " " + player["lastName"];
        }

        const stat_leaders = {
          seasonStageId: data["seasonStageId"],
          ppgPlayerName: ppgPlayerName,
          ppgPlayerId: ppgPlayerId,
          ppgValue: data["ppg"][0]["value"],
          trpgPlayerName: trpgPlayerName,
          trpgPlayerId: trpgPlayerId,
          trpgValue: data["trpg"][0]["value"],
          apgPlayerName: apgPlayerName,
          apgPlayerId: apgPlayerId,
          apgValue: data["apg"][0]["value"],
          fgpPlayerName: fgpPlayerName,
          fgpPlayerId: fgpPlayerId,
          fgpValue: data["fgp"][0]["value"],
          tppPlayerName: tppPlayerName,
          tppPlayerId: tppPlayerId,
          tppValue: data["tpp"][0]["value"],
          ftpPlayerName: ftpPlayerName,
          ftpPlayerId: ftpPlayerId,
          ftpValue: data["ftp"][0]["value"],
          bpgPlayerName: bpgPlayerName,
          bpgPlayerId: bpgPlayerId,
          bpgValue: data["bpg"][0]["value"],
          spgPlayerName: spgPlayerName,
          spgPlayerId: spgPlayerId,
          spgValue: data["spg"][0]["value"],
          tpgPlayerName: tpgPlayerName,
          tpgPlayerId: tpgPlayerId,
          tpgValue: data["tpg"][0]["value"],
          pfpgPlayerName: pfpgPlayerName,
          pfpgPlayerId: pfpgPlayerId,
          pfpgValue: data["pfpg"][0]["value"]
        }

        this.team_leaders = stat_leaders;
      });
  }*/

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
