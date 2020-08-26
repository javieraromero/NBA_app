import { Component, OnInit, Input } from '@angular/core';

import { TeamInfo } from '../../assets/team_info';

import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit {

  @Input() date: string;
  @Input() gameId: string;
  @Input() statusNum: number;
  visiting_team;
  visiting_team_stats = {
    fastBreakPoints: "",
    pointsInPaint: "",
    secondChancePoints: "",
    pointsOffTurnovers: "",
    points: "",
    fgm: "",
    fga: "",
    fgp: "",
    ftm: "",
    fta: "",
    ftp: "",
    tpm: "",
    tpa: "",
    tpp: "",
    offReb: "",
    defReb: "",
    totReb: "",
    assists: "",
    pFouls: "",
    steals: "",
    turnovers: "",
    blocks: "",
    short_timeout_remaining: "",
    full_timeout_remaining: "",
    team_fouls: "",
  };
  home_team;
  home_team_stats = {
    fastBreakPoints: "",
    pointsInPaint: "",
    secondChancePoints: "",
    pointsOffTurnovers: "",
    points: "",
    fgm: "",
    fga: "",
    fgp: "",
    ftm: "",
    fta: "",
    ftp: "",
    tpm: "",
    tpa: "",
    tpp: "",
    offReb: "",
    defReb: "",
    totReb: "",
    assists: "",
    pFouls: "",
    steals: "",
    turnovers: "",
    blocks: "",
    short_timeout_remaining: "",
    full_timeout_remaining: "",
    team_fouls: "",
  };

  private routeSub = this.router.events.subscribe((event) => {
    if(event instanceof NavigationStart) {
      this.ngOnDestroy();
    }
  });

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo,
    private router: Router
  ) { }

  async ngOnInit() {
    var is_today_current_date = this.compareDates(this.date);
    if(this.statusNum == 1)
    {
      //this.getGameData(this.date, this.gameId);
      while(this.statusNum == 1 && is_today_current_date)
      {
        console.log("totals is checking statusNum");
        await new Promise(r => setTimeout(r, 15000));
      }
      console.log("totals has detected a statusNum change. statusNum is now " + this.statusNum);
    }
    
    if(this.statusNum == 3)
    {
      this.getGameData(this.date, this.gameId);
    }
    else if(this.statusNum == 2)
    {
      while(this.statusNum == 2)
      {
        console.log("refreshing totals for gameId: " + this.gameId);
        this.getGameData(this.date, this.gameId);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getGameData(date: String, gameId: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + date + "/" + gameId + "_boxscore.json")
      .subscribe(response => {

        var visiting_stats = response["stats"]["vTeam"];
        var home_stats = response["stats"]["hTeam"];

        var visiting_team_id = response["basicGameData"]["vTeam"]["teamId"];
        var home_team_id = response["basicGameData"]["hTeam"]["teamId"];

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
      });
  }

  compare(a: String, b: String)
  {
    var a_num = Number(a);
    var b_num = Number(b);
    if(a_num > b_num)
      return 1;
    else if(b_num > a_num)
      return -1;
    else
      return 0;
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
