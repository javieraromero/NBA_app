import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DateComponent } from './pages/date/date.component';
import { GameComponent } from './pages/game/game.component';
import { PlayerComponent } from './pages/player/player.component';
import { TeamComponent } from './pages/team/team.component';
import { PlayoffBracketComponent } from './pages/playoff-bracket/playoff-bracket.component';
import { AllStarComponent } from './pages/all-star/all-star.component';
import { AllStandingsComponent } from './pages/all-standings/all-standings.component';
import { SearchComponent } from './pages/search/search.component';
import { PlayoffBracketRedirectComponent } from './pages/playoff-bracket-redirect/playoff-bracket-redirect.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
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
    path: 'playoff-bracket', component: PlayoffBracketRedirectComponent
  },
  {
    path: 'playoff-bracket/:year', component: PlayoffBracketComponent
  },
  {
    path: 'all-star/:year', component: AllStarComponent
  },
  {
    path: 'search/:query', component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
