import { Component, OnInit, Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { TeamInfo } from '../../assets/team_info';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  @Input() personId: String;
  @Input() year: String;
  //@Input() isCoach: boolean = false;

  person_attributes = {
    firstName: "",
    lastName: "",
    dob: "",
    teamId: "",
    jersey: "",
    isActive: "",
    pos: "",
    posFull: "",
    heightFeet: "",
    heightInches: "",
    weightPounds: "",
    collegeName: "",
    country: "",
    draft_info: {
      pickNum: "",
      roundNum: "",
      seasonYear: "",
      tricode: "",
    }
  }
  teamId;
  headshot_location = "";
  logo_location = "";

  /*coach_role_names: String[] = ["", "Head Coach", "Assistant Coach", "Trainer", "Assistant Trainer",
                                "Strength-and-Conditioning Coach", "", "", "Advance Scout / Assistant Coach",
                                "Associate Head Coach", "", "", "Assistant Coach for Player Development",
                                "Lead Assistant Coach"];*/

  constructor(
    private http: HttpClient,
    private teamInfo: TeamInfo
  ) { }

  ngOnInit() {
    //if(this.isCoach)
    //{
    //  this.getCoachInfo(this.personId, this.year);
    //}
    //else
    //{
      this.getPlayerInfo(this.personId, this.year);
    //}
  }

  getPlayerInfo(personId: String, year: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + year + "/players.json")
      .subscribe(response => {

        var league_roster = response["league"]["standard"];

        for(var i = 0; i < league_roster.length; i++)
        {
          var player = league_roster[i];

          if(player["personId"] == personId)
          {
            var teamId = player["teamId"];
            this.teamId = teamId;

            var teamAttributes = this.getTeamAttributes(this.teamId);

            var imageExists = this.imageExists("https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + personId + ".png");
            if(imageExists)
            {
              this.headshot_location = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + personId + ".png";
              this.logo_location = teamAttributes["teamSecondaryLogoLocation"];
            }

            var draft_teamId = player["draft"]["teamId"];
            var draft_team_tricode = this.getTeamAttributes(draft_teamId)["tricode"];
            var draft_info = {
              pickNum: player["draft"]["pickNum"],
              roundNum: player["draft"]["roundNum"],
              seasonYear: player["draft"]["seasonYear"],
              tricode: draft_team_tricode
            }

            this.person_attributes = {
              firstName: player["firstName"],
              lastName: player["lastName"],
              dob: player["dateOfBirthUTC"],
              teamId: teamId,
              jersey: player["jersey"],
              isActive: player["isActive"],
              pos: player["pos"],
              posFull: player["teamSitesOnly"] ? player["teamSitesOnly"]["posFull"] : "",
              heightFeet: player["heightFeet"],
              heightInches: player["heightInches"],
              weightPounds: player["weightPounds"],
              collegeName: player["collegeName"],
              country: player["country"],
              draft_info: draft_info
            };
            
            break;
          }
        }
      });
  }

  /*getCoachInfo(personId: String, year: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/" + year + "/coaches.json")
      .subscribe(response => {
        
        var all_coaches = response["league"]["standard"];

        for(var i = 0; i < all_coaches.length; i++)
        {
          var coach = all_coaches[i];

          if(coach["personId"] == personId)
          {
            var teamId = coach["teamId"];
            this.teamId = teamId;

            var teamAttributes = this.getTeamAttributes(this.teamId);

            var imageExists = this.imageExists("https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + personId + ".png");
            if(imageExists)
            {
              this.headshot_location = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + personId + ".png";
              this.logo_location = teamAttributes["teamSecondaryLogoLocation"];
            }

            this.person_attributes = {
              firstName: coach["firstName"],
              lastName: coach["lastName"],
              isAssistant: coach["isAssistant"],
              personId: coach["personId"],
              college: coach["college"],
              coachRole: this.coach_role_names[coach["teamSitesOnly"]["coachRole"]]
            }

            break;
          }
        }
      });
  }*/

  getTeamAttributes(teamId: String)
  {
    var team_list = this.teamInfo.teams;

    var teamId_int = Number(teamId);

    var teamName;
    var tricode;
    var teamPrimaryColor;
    var teamSecondaryColor;
    var teamSecondaryLogoLocation;

    for(let i in team_list)
    {
      var team = team_list[i];
      if(team["teamId"] == teamId_int)
      {
        teamName = team["teamName"];
        tricode = team["tricode"];
        teamPrimaryColor = team["primaryColor"];
        teamSecondaryColor = team["secondaryColor"];
        teamSecondaryLogoLocation = team["secondaryLogoLocation"];
        break;
      }
    }

    const team_attributes = {
      teamName: teamName,
      tricode: tricode,
      teamPrimaryColor: teamPrimaryColor,
      teamSecondaryColor: teamSecondaryColor,
      teamSecondaryLogoLocation: teamSecondaryLogoLocation
    }

    return team_attributes;
  }

  imageExists(image_url)
  {
    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404 && http.status != 403;
  }
}
