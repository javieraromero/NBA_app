export class PlayerModel {
    firstName: String;
    lastName: String;
    personId: String;
    teamId: String;
    jersey: String;
    isActive: Boolean;
    pos: String;
    posFull: String;
    heightFeet: String;
    heightInches: String;
    weightPounds: String;
    nbaDebutYear: String;
    yearsPro: String;
    collegeName: String;
    country: String;
    draftYear: String;
    draftPick: String;
    draftRound: String;
    draftTeam: String;
    teams: Object[];
  
  
    constructor(
        firstName: String,
        lastName: String,
        personId: String,
        teamId: String,
        jersey: String,
        isActive: Boolean,
        pos: String,
        posFull: String,
        heightFeet: String,
        heightInches: String,
        weightPounds: String,
        nbaDebutYear: String,
        yearsPro: String,
        collegeName: String,
        country: String,
        draftYear: String,
        draftPick: String,
        draftRound: String,
        draftTeam: String,
        teams: Object[]
    )
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.personId = personId;
        this.teamId = teamId;
        this.jersey = jersey;
        this.isActive = isActive;
        this.pos = pos;
        this.posFull = posFull;
        this.heightFeet = heightFeet;
        this.heightInches = heightInches;
        this.weightPounds = weightPounds;
        this.nbaDebutYear = nbaDebutYear;
        this.yearsPro = yearsPro;
        this.collegeName = collegeName;
        this.country = country;
        this.draftYear = draftYear;
        this.draftPick = draftPick;
        this.draftRound = draftRound;
        this.draftTeam = draftTeam;
        this.teams = teams;
    }
  }
  