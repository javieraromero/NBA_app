import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DateComponent } from './pages/date/date.component';
import { GameComponent } from './pages/game/game.component';
import { PlayerComponent } from './pages/player/player.component';
import { TeamComponent } from './pages/team/team.component';
import { PbpComponent } from './pages/pbp/pbp.component';
import { ConferenceStandingsComponent } from './pages/conference-standings/conference-standings.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
