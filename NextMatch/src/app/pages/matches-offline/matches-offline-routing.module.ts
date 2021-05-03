import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchesOfflinePage } from './matches-offline.page';

const routes: Routes = [
  {
    path: '',
    component: MatchesOfflinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesOfflinePageRoutingModule {}
