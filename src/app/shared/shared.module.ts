import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from '../app-routing.module';
import {MidTierHeaderModule} from './Mid-Tier-Header/mid-tier-header.module';
import {SymbolSearchModule} from './symbol-search/symbol-search.module';
import {SidePanelModule} from './side-panel/side-panel.module';
import {ListSelectionModule} from './list-selection/list-selection.module';
import {PipesModule} from './pipes/pipes.module';

import {SharedService} from './shared.service';
import {SignalService} from './signal.service';
import {ChaikinSvgModule} from './svg/chaikin-svg.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MidTierHeaderModule,
    SidePanelModule,
    SymbolSearchModule,
    ListSelectionModule,
    PipesModule,
    ChaikinSvgModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MidTierHeaderModule,
    SidePanelModule,
    SymbolSearchModule,
    ListSelectionModule,
    PipesModule,
    ChaikinSvgModule
  ],
  providers: [SharedService, SignalService],
  declarations: []

})
export class SharedModule {

}
