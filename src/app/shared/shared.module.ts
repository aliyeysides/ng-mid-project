import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {SymbolSearchModule} from '../components/shared/symbol-search/symbol-search.module';
import {ListSelectionModule} from '../components/shared/list-selection/list-selection.module';
import {PipesModule} from '../pipes/pipes.module';

import {SharedService} from './shared.service';
import {SignalService} from '../services/signal.service';
import {ListSelectionService} from '../components/shared/list-selection/list-selection.service';
import {IdeaListProvider} from '../components/ideas/idea-list.service';
import {UserService} from '../services/user.service';
import {UtilService} from '../services/util.service';

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
  providers: [ListSelectionService, SharedService, SignalService, IdeaListProvider, UserService, UtilService],
  declarations: []

})
export class SharedModule {

}
