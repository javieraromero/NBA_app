import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TeamInfo } from '../../assets/team_info';
import { PlayersList } from '../../assets/players_list';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  careerSummary;
  seasons: Object[] = [];
  first_name;
  last_name;
  current_team;
  primaryColor: string;
  secondaryColor: string;
  teamLogoLocation: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private teamInfo: TeamInfo,
    private players: PlayersList
  ) { }

  ngOnInit() {
    const personId = this.route.snapshot.paramMap.get('personId');
    this.getPlayerData(personId);
  }

  getPlayerData(personId: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/2019/players/" + personId + "_profile.json")
    .subscribe(response => {

        var team_list = this.teamInfo.teams;
        var players_list = this.players.players;

        var current_teamId;

        for(let i in players_list)
        {
          var player = players_list[i];
          if(String(player["playerId"]) == personId)
          {
            this.first_name = player["firstName"];
            this.last_name = player["lastName"];
            current_teamId = player["teamId"];
            break;
          }
        }

        for(let i in team_list)
        {
          var team = team_list[i];
          if(team["teamId"] == current_teamId)
          {
            this.current_team = team["teamName"];
            this.primaryColor = team["primaryColor"];
            this.secondaryColor = team["secondaryColor"];
            document.documentElement.style.setProperty('--team_primary', this.primaryColor);
            document.documentElement.style.setProperty('--team_secondary', this.secondaryColor);
            this.teamLogoLocation = team["secondaryLogoLocation"];
            break;
          }
        }

        var stats = response["league"]["standard"]["stats"];

        var careerSummary = stats["careerSummary"];

        this.careerSummary = {
          tpp: careerSummary["tpp"],
          ftp: careerSummary["ftp"],
          fgp: careerSummary["fgp"],
          ppg: careerSummary["ppg"],
          rpg: careerSummary["rpg"],
          apg: careerSummary["apg"],
          bpg: careerSummary["bpg"],
          mpg: careerSummary["mpg"],
          topg: careerSummary["topg"],
          spg: careerSummary["spg"],
          assists: careerSummary["assists"],
          blocks: careerSummary["blocks"],
          steals: careerSummary["steals"],
          turnovers: careerSummary["turnovers"],
          offReb: careerSummary["offReb"],
          defReb: careerSummary["defReb"],
          totReb: careerSummary["totReb"],
          fgm: careerSummary["fgm"],
          fga: careerSummary["fga"],
          tpm: careerSummary["tpm"],
          tpa: careerSummary["tpa"],
          ftm: careerSummary["ftm"],
          fta: careerSummary["fta"],
          pFouls: careerSummary["pFouls"],
          points: careerSummary["points"],
          gamesPlayed: careerSummary["gamesPlayed"],
          gamesStarted: careerSummary["gamesStarted"],
          plusMinus: careerSummary["plusMinus"],
          min: careerSummary["min"]
        }

        var regularSeason = stats["regularSeason"]["season"];

        for(var i = 0; i < regularSeason.length; i++)
        {
          var season = regularSeason[i];
          var year = season["seasonYear"];
          var teams = season["teams"];

          var seasonTeamId = teams[0]["teamId"];
          var seasonTeamShort = "";

          for(let j in team_list)
          {
            var team = team_list[j];
            if(team["teamId"] == seasonTeamId)
            {
              seasonTeamShort = team["abbreviation"];
              break;
            }
          }

          var totals = season["total"]

          const seasonStats = {
            seasonYear: year,
            seasonTeam: seasonTeamShort,
            ppg: totals["ppg"],
            rpg: totals["rpg"],
            apg: totals["apg"],
            mpg: totals["mpg"],
            topg: totals["topg"],
            spg: totals["spg"],
            bpg: totals["bpg"],
            tpp: totals["tpp"],
            ftp: totals["ftp"],
            fgp: totals["fgp"],
            assists: totals["assists"],
            blocks: totals["blocks"],
            steals: totals["steals"],
            turnovers: totals["turnovers"],
            offReb: totals["offReb"],
            defReb: totals["defReb"],
            totReb: totals["totReb"],
            fgm: totals["fgm"],
            fga: totals["fga"],
            tpm: totals["tpm"],
            tpa: totals["tpa"],
            ftm: totals["ftm"],
            fta: totals["fta"],
            pFouls: totals["pFouls"],
            points: totals["points"],
            gamesPlayed: totals["gamesPlayed"],
            gamesStarted: totals["gamesStarted"],
            plusMinus: totals["plusMinus"],
            min: totals["min"]
          }

          this.seasons.push(seasonStats);
        }
    });
  }
}
