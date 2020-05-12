import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {

  constructor(
    private http: HttpClient,
  ) { }

  getPlayerData(personId: String): any
  {
    this.http.get("http://data.nba.net/10s/prod/v1/2019/players.json")
      .subscribe(response => {

        var player_list = response["league"]["standard"];

        for(var i = 0; i < player_list.length; i++)
        {
          var player = player_list[i];

          if(player["personId"] == personId)
          {
            var teams = player["teams"];

            const player_info = {
              firstName: player["firstName"],
              lastName: player["lastName"],
              personId: player["personId"],
              teamId: player["teamId"],
              jersey: player["jersey"],
              isActive: player["isActive"],
              pos: player["pos"],
              posFull: player["teamSitesOnly"]["posFull"],
              heightFeet: player["heightFeet"],
              heightInches: player["heightInches"],
              weightPounds: player["weightPounds"],
              nbaDebutYear: player["nbaDebutYear"],
              yearsPro: player["yearsPro"],
              collegeName: player["collegeName"],
              country: player["country"],
              draftYear: player["draft"]["seasonYear"],
              draftPick: player["draft"]["pickNum"],
              draftRound: player["draft"]["roundNum"],
              draftTeam: player["draft"]["teamId"],
              teams: teams
            }
            return player_info;
          }
        }
      });
  }
}
