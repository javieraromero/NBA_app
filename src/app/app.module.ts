import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { DateComponent } from './pages/date/date.component';
import { GameComponent } from './pages/game/game.component';
import { PlayerComponent } from './pages/player/player.component';
import { TeamComponent } from './pages/team/team.component';
import { HeaderComponent } from './pages/header/header.component';
import { PbpComponent } from './pages/pbp/pbp.component';
import { ConferenceStandingsComponent } from './pages/conference-standings/conference-standings.component';
import { DivisionStandingsComponent } from './pages/division-standings/division-standings.component';
import { OverallStandingsComponent } from './pages/overall-standings/overall-standings.component';
import { SeriesComponent } from './pages/series/series.component';
import { PlayoffBracketComponent } from './pages/playoff-bracket/playoff-bracket.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ScoreboardComponent } from './pages/scoreboard/scoreboard.component';
import { BoxscoreComponent } from './pages/boxscore/boxscore.component';
import { TotalsComponent } from './pages/totals/totals.component';
import { AllStandingsComponent } from './pages/all-standings/all-standings.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

import { TeamInfo } from 'src/app/assets/team_info';
import { PlayersList } from 'src/app/assets/players_list';
import { DateCalculator } from 'src/app/assets/date_calculator';

import { ScheduleSearchPipe } from './pipes/schedule-search.pipe';
import { TeamInfoComponent } from './pages/team-info/team-info.component';
import { PersonComponent } from './pages/person/person.component';
import { RosterComponent } from './pages/roster/roster.component';
import { TeamLeadersComponent } from './pages/team-leaders/team-leaders.component';
import { SearchComponent } from './pages/search/search.component';
import { TeamsSearchPipe } from './pipes/teams-search.pipe';
import { GamesSearchPipe } from './pipes/games-search.pipe';
import { PlayersSearchPipe } from './pipes/players-search.pipe';
import { CoachesSearchPipe } from './pipes/coaches-search.pipe';
import { LeadTrackerComponent } from './pages/lead-tracker/lead-tracker.component';
import { PlayoffBracketRedirectComponent } from './pages/playoff-bracket-redirect/playoff-bracket-redirect.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DateComponent,
    GameComponent,
    PlayerComponent,
    TeamComponent,
    HeaderComponent,
    ScheduleSearchPipe,
    PbpComponent,
    ConferenceStandingsComponent,
    DivisionStandingsComponent,
    OverallStandingsComponent,
    SeriesComponent,
    PlayoffBracketComponent,
    CalendarComponent,
    ScoreboardComponent,
    BoxscoreComponent,
    TotalsComponent,
    AllStandingsComponent,
    ScheduleComponent,
    TeamInfoComponent,
    PersonComponent,
    RosterComponent,
    TeamLeadersComponent,
    SearchComponent,
    TeamsSearchPipe,
    GamesSearchPipe,
    PlayersSearchPipe,
    CoachesSearchPipe,
    LeadTrackerComponent,
    PlayoffBracketRedirectComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TeamInfo,
    PlayersList,
    DateCalculator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
