import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchesPageRoutingModule } from './matches-routing.module';

import { MatchesPage } from './matches.page';

import { MatchCardComponent } from '../../components/match-card/match-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchesPageRoutingModule
  ],
  declarations: [MatchesPage, MatchCardComponent]
})
export class MatchesPageModule {}
