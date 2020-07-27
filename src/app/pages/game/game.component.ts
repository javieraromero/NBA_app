import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TeamInfo } from '../../assets/team_info';
import { MyDate } from 'src/app/assets/date_calculator';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  date;
  gameId;
  
  game_data;
  statusNum: Number = 2;
  visiting_team: String;
  home_team: String;
  longDate: String;
  isPreviewArticleAvail;
  preview_data = {
    title: "",
    author: "",
    authorTitle: ""};
  preview: String[] = [];
  isRecapArticleAvail;
  recap_data = {
    title: "",
    author: "",
    authorTitle: ""};
  recap: String[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private teamInfo: TeamInfo
  ) { }

  async ngOnInit() {
    const date = this.route.snapshot.paramMap.get('date');
    const gameId = this.route.snapshot.paramMap.get('gameId');
    this.date = date;
    this.gameId = gameId;
    this.getGameData(date, gameId);
    //this.getPreview(date, gameId);
    //this.getRecap(date, gameId);
    this.setLongDate(date);

    while(this.statusNum <= 2)
    {
      console.log("game is updating statusNum");
      this.updateStatusNum(this.date, this.gameId);
      await new Promise(r => setTimeout(r, 15000));
    }
  }

  getGameData(date: String, gameId: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + date + "/" + gameId + "_boxscore.json")
      .subscribe(response => {

          var team_list = this.teamInfo.teams;

          var basicGameData = response["basicGameData"];

          var statusNum = basicGameData["statusNum"];
          this.statusNum = statusNum;

          var isPreviewArticleAvail = basicGameData["isPreviewArticleAvail"];
          this.isPreviewArticleAvail = isPreviewArticleAvail;
          if(isPreviewArticleAvail && statusNum == 1)
            this.getPreview(date, gameId);

          var isRecapArticleAvail = basicGameData["isRecapArticleAvail"];
          this.isRecapArticleAvail = isRecapArticleAvail;
          if(isRecapArticleAvail  && statusNum == 3)
            this.getRecap(date, gameId);
          
          this.setDefaultTab(isPreviewArticleAvail, isRecapArticleAvail, statusNum);

          this.visiting_team = undefined;
          this.home_team = undefined;

          var visiting_team_id = basicGameData["vTeam"]["teamId"];
          var home_team_id = basicGameData["hTeam"]["teamId"];

          for(let i in team_list)
          {
            var team = team_list[i];
            if(team["teamId"] == visiting_team_id)
            {
              this.visiting_team = team["teamName"];
              document.documentElement.style.setProperty('--visiting_team_primary', team["primaryColor"]);
              document.documentElement.style.setProperty('--visiting_team_secondary', team["secondaryColor"]);
            }
            if(team["teamId"] == home_team_id)
            {
              this.home_team = team["teamName"];
              document.documentElement.style.setProperty('--home_team_primary', team["primaryColor"]);
              document.documentElement.style.setProperty('--home_team_secondary', team["secondaryColor"]);
            }
            if(this.visiting_team && this.home_team)
              break;
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
            attendance: basicGameData["attendance"],
            broadcastersNational: broadcastersNational,
            vTeamBroadcasters: vTeamBroadcasters,
            hTeamBroadcasters: hTeamBroadcasters,
            officials: officials_list_formatted,
            previousMatchup_gameDate: response["previousMatchup"]["gameDate"],
            previousMatchup_gameId: response["previousMatchup"]["gameId"],
            arena_name: basicGameData["arena"]["name"],
            arena_location: basicGameData["arena"]["city"] + ", " + basicGameData["arena"]["stateAbbr"],
            seriesRecord: basicGameData["vTeam"]["seriesWin"] + " - " + basicGameData["vTeam"]["seriesLoss"],
          };
      });
  }

  updateStatusNum(date: String, gameId: String)
  {
    return this.http.get("http://data.nba.net/prod/v1/" + date + "/" + gameId + "_boxscore.json")
      .subscribe(response => {
        this.statusNum = response["basicGameData"]["statusNum"];
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
          console.log("Error fetching preview");
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
          console.log("Error fetching recap");
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

  setDefaultTab(isPreviewArticleAvail: boolean, isRecapArticleAvail: boolean, statusNum: number)
  {
    if(isPreviewArticleAvail && statusNum == 1)
    {
      document.getElementById("preview_tab").click();
    }
    else if(isRecapArticleAvail && statusNum == 3)
    {
      document.getElementById("recap_tab").click();
    }
    else
    {
      document.getElementById("game_info_tab").click();
    }
  }
}
