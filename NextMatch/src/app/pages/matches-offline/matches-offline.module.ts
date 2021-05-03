import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchesOfflinePageRoutingModule } from './matches-offline-routing.module';

import { MatchesOfflinePage } from './matches-offline.page';

import { MatchCardComponent } from "../../components/match-card/match-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchesOfflinePageRoutingModule
  ],
  declarations: [MatchesOfflinePage, MatchCardComponent]
})
export class MatchesOfflinePageModule {}
