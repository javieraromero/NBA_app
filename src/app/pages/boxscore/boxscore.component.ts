import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';

import { TeamInfo } from '../../assets/team_info';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-boxscore',
  templateUrl: './boxscore.component.html',
  styleUrls: ['./boxscore.component.css']
})
export class BoxscoreComponent implements OnInit {

  @Input() date: string;
  @Input() gameId: string;
  @Input() statusNum: number;

  visiting_team;
  visiting_team_stats;
  visiting_players: Object[] = [];
  home_team;
  home_team_stats;
  home_players: Object[] = [];
  seasonYear;

  show_visiting_team: boolean = true;
  show_home_team: boolean = false;

  private routeSub = this.router.events.subscribe((event) => {
    if(event instanceof NavigationStart) {
      this.ngOnDestroy();
    }
  });

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    route.params.subscribe(val => this.ngOnInit())
  }

  async ngOnInit() {
    var is_today_current_date = this.compareDates(this.date);
    
    if(this.statusNum == 1)
    {
      while(this.statusNum == 1 && is_today_current_date)
      {
        console.log("boxscore is checking statusNum");
        await new Promise(r => setTimeout(r, 15000));
      }
      console.log("boxscore has detected a statusNum change. statusNum is now " + this.statusNum);
    }

    if(this.statusNum == 3)
    {
      this.getBoxscores(this.date, this.gameId);
    }
    else if(this.statusNum == 2)
    {
      while(this.statusNum == 2)
      {
        console.log("refreshing boxscore for gameId: " + this.gameId);
        this.getBoxscores(this.date, this.gameId);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getBoxscores(date: String, gameId: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + date + "/" + gameId + "_boxscore.json")
      .subscribe(response => {

        var visiting_team_id = response["basicGameData"]["vTeam"]["teamId"];
        var home_team_id = response["basicGameData"]["hTeam"]["teamId"];

        var visiting_stats = response["stats"]["vTeam"];
        var home_stats = response["stats"]["hTeam"];
        var active_players = response["stats"]["activePlayers"];

        this.seasonYear = response["basicGameData"]["seasonYear"];

        var team_list = this.teamInfo.teams;

        for(let i in team_list)
        {
          var team = team_list[i];
          if(team["teamId"] == visiting_team_id)
          {
            this.visiting_team = team["teamName"];

          }
          if(team["teamId"] == home_team_id)
          {
            this.home_team = team["teamName"];
          }
          if(this.visiting_team && this.home_team)
            break;
        }

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

        var temp_visiting_players: Object[] = [];
        var temp_home_players: Object[] = [];


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
            temp_visiting_players.push(player);
          }
          else
          {
            temp_home_players.push(player);
          }
        }

        this.visiting_players = temp_visiting_players;
        this.home_players = temp_home_players;
      });
  }

  showTeam(team: String)
  {
    if(team == this.home_team)
    {
      this.show_home_team = true;
      this.show_visiting_team = false;
    }
    else
    {
      this.show_home_team = false;
      this.show_visiting_team = true;
    }
  }

  compareDates(date: String)
  {
    var currentDate = new Date();
    var currentYear = String(currentDate.getFullYear());
    var currentMonth = currentDate.getMonth() + 1;
    var currentMonthFormatted = currentMonth <= 9? "0" + String(currentMonth) : String(currentMonth);
    var currentDay = currentDate.getDate()
    var currentDayFormatted = currentDay <= 9? "0" + String(currentDay) : String(currentDay);
    var formattedDate = currentYear + currentMonthFormatted + currentDayFormatted;

    return date == formattedDate;
  }
}
