import { Component, OnInit, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { PlayersList } from '../../assets/players_list';
import { TeamInfo } from '../../assets/team_info';

@Component({
  selector: 'app-team-leaders',
  templateUrl: './team-leaders.component.html',
  styleUrls: ['./team-leaders.component.css']
})
export class TeamLeadersComponent implements OnInit {

  @Input() teamId: String;
  @Input() year: String;

  team_leaders;
  team_name;

  constructor(
    private http: HttpClient,
    private players: PlayersList,
    private teamInfo: TeamInfo
  ) { }

  ngOnInit() {
    this.getTeamLeaders(this.teamId, this.year);
  }

  getTeamLeaders(teamId: String, year: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + year + "/teams/" + teamId + "/leaders.json")
      .subscribe(response => {
        var data = response["league"]["standard"];

        var teamAttributes = this.getTeamAttributes(this.teamId);

        document.documentElement.style.setProperty('--team_primary', teamAttributes["teamPrimaryColor"]);
        document.documentElement.style.setProperty('--team_secondary', teamAttributes["teamSecondaryColor"]);
        this.team_name = teamAttributes["teamName"];

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
  }

  getTeamAttributes(teamId: String)
  {
    var team_list = this.teamInfo.teams;

    var teamId_int = Number(teamId);

    var teamName;
    var teamPrimaryColor;
    var teamSecondaryColor;
    var teamSecondaryLogoLocation;

    for(let i in team_list)
    {
      var team = team_list[i];
      if(team["teamId"] == teamId_int)
      {
        teamName = team["teamName"];
        teamPrimaryColor = team["primaryColor"];
        teamSecondaryColor = team["secondaryColor"];
        teamSecondaryLogoLocation = team["secondaryLogoLocation"];
        break;
      }
    }

    const team_attributes = {
      teamName: teamName,
      teamPrimaryColor: teamPrimaryColor,
      teamSecondaryColor: teamSecondaryColor,
      teamSecondaryLogoLocation: teamSecondaryLogoLocation
    }

    return team_attributes;
  }
}
