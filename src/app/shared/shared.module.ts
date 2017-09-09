import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {SymbolSearchModule} from './components/symbol-search/symbol-search.module';
import {ListSelectionModule} from './components/list-selection/list-selection.module';
import {PipesModule} from './pipes/pipes.module';

import {SharedService} from './services/shared.service';
import {SignalService} from './services/signal.service';
import {ListSelectionService} from './components/list-selection/list-selection.service';
import {IdeaListProvider} from './services/idea-list.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
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
    SymbolSearchModule,
    ListSelectionModule,
    PipesModule
  ],
  providers: [ListSelectionService, SharedService, SignalService, IdeaListProvider],
  declarations: []

})
export class SharedModule {

}
