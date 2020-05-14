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

import { TeamInfo } from 'src/app/assets/team_info';
import { PlayersList } from 'src/app/assets/players_list';
import { DateCalculator } from 'src/app/assets/date_calculator';

import { TeamsSearchPipe } from './pipes/teams-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DateComponent,
    GameComponent,
    PlayerComponent,
    TeamComponent,
    HeaderComponent,
    TeamsSearchPipe,
    PbpComponent,
    ConferenceStandingsComponent,
    DivisionStandingsComponent
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
