import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DateComponent } from './pages/date/date.component';
import { GameComponent } from './pages/game/game.component';
import { PlayerComponent } from './pages/player/player.component';
import { TeamComponent } from './pages/team/team.component';
import { SeriesComponent } from './pages/series/series.component';
import { PlayoffBracketComponent } from './pages/playoff-bracket/playoff-bracket.component';
import { AllStarComponent } from './pages/all-star/all-star.component';
import { AllStandingsComponent } from './pages/all-standings/all-standings.component';

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
    path: 'player/:personId/:year', component: PlayerComponent
  },
  {
    path: 'team/:teamId/:year', component: TeamComponent
  },
  {
    path: 'standings', component: AllStandingsComponent
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
