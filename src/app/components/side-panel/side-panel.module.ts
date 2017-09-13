import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SidePanelComponent} from './side-panel.component';
import {SidePanelProvider} from 'app/services/side-panel.service'
import {IdeaListProvider} from 'app/components/ideas/idea-list.service';
import {PagerProvider} from 'app/services/paging.service';
import {BusyModule} from 'angular2-busy';
import {SharedService} from '../../shared/shared.service';
import {ChartService} from '../../services/chart.service';

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
