import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DateComponent } from './pages/date/date.component';
import { GameComponent } from './pages/game/game.component';
import { PlayerComponent } from './pages/player/player.component';
import { TeamComponent } from './pages/team/team.component';
import { PbpComponent } from './pages/pbp/pbp.component';
import { ConferenceStandingsComponent } from './pages/conference-standings/conference-standings.component';
import { DivisionStandingsComponent } from './pages/division-standings/division-standings.component';
import { OverallStandingsComponent } from './pages/overall-standings/overall-standings.component';
import { SeriesComponent } from './pages/series/series.component';
import { PlayoffBracketComponent } from './pages/playoff-bracket/playoff-bracket.component';
import { AllStarComponent } from './pages/all-star/all-star.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'date/:date', component: DateComponent
  },
  {
    path: 'date/:date/:gameId', component: GameComponent
  },
  {
    path: 'date/:date/:gameId/pbp', component: PbpComponent
  },
  {
    path: 'player/:personId/:year', component: PlayerComponent
  },
  {
    path: 'team/:teamId/:year', component: TeamComponent
  },
  {
    path: 'standings/conference', component: ConferenceStandingsComponent
  },
  {
    path: 'standings/division', component: DivisionStandingsComponent
  },
  {
    path: 'standings/overall', component: OverallStandingsComponent
  },
  {
    path: 'series/:seriesId/:year', component: SeriesComponent
  },
  {
    path: 'playoff-bracket/:year', component: PlayoffBracketComponent
  },
  {
    path: 'all-star/:year', component: AllStarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
