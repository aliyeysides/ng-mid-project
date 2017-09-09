import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SidePanelComponent} from './side-panel.component';
import {SidePanelProvider} from 'app/shared/services/side-panel.service'
import {IdeaListProvider} from 'app/shared/services/idea-list.service';
import {PagerProvider} from 'app/shared/services/paging.service';
import {BusyModule} from 'angular2-busy';
import {SharedService} from '../../shared/services/shared.service';
import {ChartService} from '../../shared/services/chart.service';

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
