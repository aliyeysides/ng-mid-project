import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {MidTierHeaderModule} from './Mid-Tier-Header/mid-tier-header.module';
import {SymbolSearchModule} from './symbol-search/symbol-search.module';
import {SidePanelModule} from './side-panel/side-panel.module';
import {ListSelectionModule} from './list-selection/list-selection.module';
import {PipesModule} from './pipes/pipes.module';

import {SharedService} from './shared.service';
import {SignalService} from './signal.service';
import {ListSelectionService} from './list-selection/list-selection.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MidTierHeaderModule,
    SidePanelModule,
    SymbolSearchModule,
    ListSelectionModule,
    PipesModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MidTierHeaderModule,
    SidePanelModule,
    SymbolSearchModule,
    ListSelectionModule,
    PipesModule
  ],
  providers: [ListSelectionService, SharedService, SignalService],
  declarations: []

})
export class SharedModule {

}
