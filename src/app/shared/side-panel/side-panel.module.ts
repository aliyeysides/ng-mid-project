import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedService} from '../shared.service';
import {SidePanelComponent} from './side-panel.component';
import {SidePanelProvider} from 'app/providers/side-panel.provider'
import {IdeaListProvider} from 'app/providers/idea-list.provider';
import {PagerProvider} from 'app/providers/paging.provider';
import {ChartService} from '../charts/chart.service';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BusyModule
  ],
  exports: [
    SidePanelComponent
  ],
  declarations: [
    SidePanelComponent
  ],
  bootstrap: [SidePanelComponent],
  providers: [SharedService, SidePanelProvider, IdeaListProvider, PagerProvider, ChartService]
})
export class SidePanelModule {
}
