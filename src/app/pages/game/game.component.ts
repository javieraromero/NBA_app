import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { TeamInfo } from '../../assets/team_info';
import { MyDate } from 'src/app/assets/date_calculator';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game_data;
  statusNum;
  visiting_team: String;
  home_team: String;
  visiting_team_stats;
  home_team_stats;
  visiting_players: Object[] = [];
  home_players: Object[] = [];
  longDate: String;
  preview_data;
  preview: String[] = [];
  recap_data;
  recap: String[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private teamInfo: TeamInfo
  ) { }

  ngOnInit() {
    const date = this.route.snapshot.paramMap.get('date');
    const gameId = this.route.snapshot.paramMap.get('gameId');
    this.getGameData(date, gameId);
    this.getPreview(date, gameId);
    this.getRecap(date, gameId);
    this.setLongDate(date);
  }

  getGameData(date: String, gameId: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + date + "/" + gameId + "_boxscore.json")
      .subscribe(response => {

          var team_list = this.teamInfo.teams;

          var basicGameData = response["basicGameData"];

          this.statusNum = basicGameData["statusNum"];

          if(this.statusNum != 1)
          {
            var visiting_stats = response["stats"]["vTeam"];
            var home_stats = response["stats"]["hTeam"];
            var active_players = response["stats"]["activePlayers"];
          }

          this.visiting_team = undefined;
          this.home_team = undefined;

          var visiting_team_id = basicGameData["vTeam"]["teamId"];
          var home_team_id = basicGameData["hTeam"]["teamId"];

          var visiting_logo_location;
          var home_logo_location;

          for(let i in team_list)
          {
            var team = team_list[i];
            if(team["teamId"] == visiting_team_id)
            {
              this.visiting_team = team["teamName"];
              visiting_logo_location = team["primaryLogoLocation"];
              document.documentElement.style.setProperty('--visiting_team_primary', team["primaryColor"]);
              document.documentElement.style.setProperty('--visiting_team_secondary', team["secondaryColor"]);
            }
            if(team["teamId"] == home_team_id)
            {
              this.home_team = team["teamName"];
              home_logo_location = team["primaryLogoLocation"];
              document.documentElement.style.setProperty('--home_team_primary', team["primaryColor"]);
              document.documentElement.style.setProperty('--home_team_secondary', team["secondaryColor"]);
            }
            if(this.visiting_team && this.home_team)
              break;
          }

          var top_label, bottom_label;

          if(this.statusNum == 1)
          {
            top_label = basicGameData["startTimeEastern"];
            bottom_label = "";
          }
          else if(this.statusNum == 2)
          {
            var quarters_elapsed = basicGameData["period"]["current"];
            var clock = basicGameData["clock"];
            var is_halftime = basicGameData["period"]["isHalftime"];
            var is_end_of_period = basicGameData["period"]["isEndOfPeriod"];
            if(is_halftime)
            {
              top_label = "Halftime";
            }
            else if(is_end_of_period)
            {
              if(quarters_elapsed > 4)
                top_label = "End of " + (quarters_elapsed > 5 ? String(quarters_elapsed - 4) : "") + "OT";
              else
                top_label = "End of Q" + quarters_elapsed;
            }
            else
            {
              if(quarters_elapsed > 4)
                top_label = (quarters_elapsed > 5 ? String(quarters_elapsed - 4) : "") + "OT";
              else
                top_label = "Q" + quarters_elapsed + " " + clock;
            }
            bottom_label = basicGameData["vTeam"]["score"] + "-" + basicGameData["hTeam"]["score"];
          }
          else if(this.statusNum == 3)
          {
            top_label = "Final";
            var quarters_elapsed = basicGameData["period"]["current"];
            if(quarters_elapsed > 4)
              top_label += " (" + (quarters_elapsed > 5 ? String(quarters_elapsed - 4) : "") + "OT)";
            bottom_label = basicGameData["vTeam"]["score"] + " - " + basicGameData["hTeam"]["score"];
          }

          var broadcast_info = basicGameData["watch"]["broadcast"]["broadcasters"];
          var broadcastersNational, vTeamBroadcasters, hTeamBroadcasters;
          if(broadcast_info["national"][0])
            broadcastersNational = broadcast_info["national"][0]["longName"];
          if(broadcast_info["vTeam"][0])
            vTeamBroadcasters = broadcast_info["vTeam"][0]["longName"];
          if(broadcast_info["hTeam"][0])
            hTeamBroadcasters = broadcast_info["hTeam"][0]["longName"];

          var officials_list = basicGameData["officials"]["formatted"];

          var officials_list_formatted = "";

          if(officials_list[0])
          {
            for(var i = 0; i < officials_list.length; i++)
            {
              if(i == officials_list.length - 1)
                officials_list_formatted += officials_list[i]["firstNameLastName"];
              else
                officials_list_formatted += officials_list[i]["firstNameLastName"] + ", ";
            }
          }

          this.game_data = {
            top_label: top_label,
            bottom_label: bottom_label,
            nugget: basicGameData["nugget"]["text"],
            attendance: basicGameData["attendance"],
            broadcastersNational: broadcastersNational,
            vTeamBroadcasters: vTeamBroadcasters,
            hTeamBroadcasters: hTeamBroadcasters,
            officials: officials_list_formatted,
            previousMatchup_gameDate: response["previousMatchup"]["gameDate"],
            previousMatchup_gameId: response["previousMatchup"]["gameId"],
            isPreviewArticleAvail: basicGameData["isPreviewArticleAvail"],
            isRecapArticleAvail: basicGameData["isRecapArticleAvail"],
            seasonYear: basicGameData["seasonYear"],
            arena_name: basicGameData["arena"]["name"],
            arena_location: basicGameData["arena"]["city"] + ", " + basicGameData["arena"]["stateAbbr"],
            isGameActivated: basicGameData["isGameActivated"],
            statusNum: this.statusNum,
            startTimeEastern: basicGameData["startTimeEastern"],
            clock: basicGameData["clock"],
            period_current: basicGameData["period"]["current"],
            isHalftime: basicGameData["period"]["isHalftime"],
            isEndOfPeriod: basicGameData["period"]["isEndOfPeriod"],
            vTeamId: basicGameData["vTeam"]["teamId"],
            vTeamName: this.visiting_team,
            vTeamLogoLocation: visiting_logo_location,
            vTeamRecord: "(" + basicGameData["vTeam"]["win"] + " - " + basicGameData["vTeam"]["loss"] + ")",
            vTeamSeriesRecord: basicGameData["vTeam"]["seriesWin"] + " - " + basicGameData["vTeam"]["seriesLoss"],
            vTeamScore: basicGameData["vTeam"]["score"],
            hTeamId: basicGameData["hTeam"]["teamId"],
            hTeamName: this.home_team,
            hTeamLogoLocation: home_logo_location,
            hTeamRecord: "(" + basicGameData["hTeam"]["win"] + " - " + basicGameData["hTeam"]["loss"] + ")",
            hTeamSeriesRecord: basicGameData["hTeam"]["seriesWin"] + " - " + basicGameData["hTeam"]["seriesLoss"],
            hTeamScore: basicGameData["hTeam"]["score"]
          };

          if(this.statusNum != 1)
          {
            this.visiting_team_stats = {
              fastBreakPoints: visiting_stats["fastBreakPoints"],
              pointsInPaint: visiting_stats["pointsInPaint"],
              secondChancePoints: visiting_stats["secondChancePoints"],
              pointsOffTurnovers: visiting_stats["pointsOffTurnovers"],
              points: visiting_stats["totals"]["points"],
              fgm: visiting_stats["totals"]["fgm"],
              fga: visiting_stats["totals"]["fga"],
              fgp: visiting_stats["totals"]["fgp"],
              ftm: visiting_stats["totals"]["ftm"],
              fta: visiting_stats["totals"]["fta"],
              ftp: visiting_stats["totals"]["ftp"],
              tpm: visiting_stats["totals"]["tpm"],
              tpa: visiting_stats["totals"]["tpa"],
              tpp: visiting_stats["totals"]["tpp"],
              offReb: visiting_stats["totals"]["offReb"],
              defReb: visiting_stats["totals"]["defReb"],
              totReb: visiting_stats["totals"]["totReb"],
              assists: visiting_stats["totals"]["assists"],
              pFouls: visiting_stats["totals"]["pFouls"],
              steals: visiting_stats["totals"]["steals"],
              turnovers: visiting_stats["totals"]["turnovers"],
              blocks: visiting_stats["totals"]["blocks"],
              short_timeout_remaining: visiting_stats["totals"]["short_timeout_remaining"],
              full_timeout_remaining: visiting_stats["totals"]["full_timeout_remaining"],
              team_fouls: visiting_stats["totals"]["team_fouls"],
            }
  
            this.home_team_stats = {
              fastBreakPoints: home_stats["fastBreakPoints"],
              pointsInPaint: home_stats["pointsInPaint"],
              secondChancePoints: home_stats["secondChancePoints"],
              pointsOffTurnovers: home_stats["pointsOffTurnovers"],
              points: home_stats["totals"]["points"],
              fgm: home_stats["totals"]["fgm"],
              fga: home_stats["totals"]["fga"],
              fgp: home_stats["totals"]["fgp"],
              ftm: home_stats["totals"]["ftm"],
              fta: home_stats["totals"]["fta"],
              ftp: home_stats["totals"]["ftp"],
              tpm: home_stats["totals"]["tpm"],
              tpa: home_stats["totals"]["tpa"],
              tpp: home_stats["totals"]["tpp"],
              offReb: home_stats["totals"]["offReb"],
              defReb: home_stats["totals"]["defReb"],
              totReb: home_stats["totals"]["totReb"],
              assists: home_stats["totals"]["assists"],
              pFouls: home_stats["totals"]["pFouls"],
              steals: home_stats["totals"]["steals"],
              turnovers: home_stats["totals"]["turnovers"],
              blocks: home_stats["totals"]["blocks"],
              short_timeout_remaining: home_stats["totals"]["short_timeout_remaining"],
              full_timeout_remaining: home_stats["totals"]["full_timeout_remaining"],
              team_fouls: home_stats["totals"]["team_fouls"],
            }
  
            for(var i = 0; i < active_players.length; i++)
            {
              var current = active_players[i];
              var teamId = current["teamId"];
  
              const player = {
                personId: current["personId"],
                firstName: current["firstName"],
                lastName: current["lastName"],
                team_Id: teamId,
                isOnCourt: current["isOnCourt"],
                points: current["points"],
                pos: current["pos"],
                min: current["min"],
                fgm: current["fgm"],
                fga: current["fga"],
                fgp: current["fgp"],
                ftm: current["ftm"],
                fta: current["fta"],
                ftp: current["ftp"],
                tpm: current["tpm"],
                tpa: current["tpa"],
                tpp: current["tpp"],
                offReb: current["offReb"],
                defReb: current["defReb"],
                totReb: current["totReb"],
                assists: current["assists"],
                pFouls: current["pFouls"],
                steals: current["steals"],
                turnovers: current["turnovers"],
                blocks: current["blocks"],
                plusMinus: current["plusMinus"],
                dnp: current["dnp"],
              }
  
              if(teamId == visiting_team_id)
              {
                this.visiting_players.push(player);
              }
              else
              {
                this.home_players.push(player);
              }
            }
          }
      });
  }

  getPreview(date: String, gameId: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + date + "/" + gameId + "_preview_article.json")
      .subscribe(
        response => {
          this.preview_data = {
            title: response["title"],
            author: response["author"],
            authorTitle: response["authorTitle"]
          }

          var article = response["paragraphs"];

          for(var i = 0; i < article.length; i++)
          {
            var paragraph = article[i]["paragraph"];
            this.preview.push(paragraph);
          }
        },
        error => {
          this.preview_data = {
            title: "",
            author: "",
            authorTitle: ""
          };
        }
      );
  }

  getRecap(date: String, gameId: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + date + "/" + gameId + "_recap_article.json")
      .subscribe(
        response => {
          this.recap_data = {
            title: response["title"],
            author: response["author"],
            authorTitle: response["authorTitle"]
          }

          var article = response["paragraphs"];

          for(var i = 0; i < article.length; i++)
          {
            var paragraph = article[i]["paragraph"];
            this.recap.push(paragraph);
          }
        },
        error => {
          this.recap_data = {
            title: "",
            author: "",
            authorTitle: ""
          };
        }
      );
  }

  setLongDate(date: String)
  {
    var year = Number(date.slice(0, 4));
    var month = Number(date.slice(4, 6));
    var day = Number(date.slice(6, ));

    var newDate = new MyDate(month, day, year);

    this.longDate = newDate.getDayOfWeekName() + ", " + newDate.getMonthName() + " " + newDate.getDay() + " " + newDate.getYear();
  }
}
