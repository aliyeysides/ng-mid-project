import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {InsightsComponent} from './insights.component';
import {InsightsDashboardComponent} from './insights-dashboard/insights-dashboard.component';
import {InsightsModalComponent} from './insights-modal/insights-modal.component';

import {ModalModule} from 'ngx-bootstrap/modal';
import {PaginationModule} from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    ModalModule,
    PaginationModule
  ],
  exports: [
    InsightsComponent
  ],
  declarations: [InsightsComponent, InsightsDashboardComponent, InsightsModalComponent],
  bootstrap: [InsightsComponent],
  providers: [],
  entryComponents: [InsightsModalComponent]
})
export class InsightsModule {
}
