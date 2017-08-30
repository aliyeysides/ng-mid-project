import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {InsightsDashboardModule} from './insights-dashboard/insights-dashboard.module';
import {InsightsComponent} from './insights.component';
import {InsightsModalComponent} from './insights-modal/insights-modal.component';

import {ModalModule} from 'ngx-bootstrap/modal';
import {DatePipe} from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InsightsDashboardModule,
    ModalModule
  ],
  exports: [
    InsightsComponent
  ],
  declarations: [InsightsComponent, InsightsModalComponent],
  bootstrap: [InsightsComponent],
  providers: [DatePipe],
  entryComponents: [InsightsModalComponent]
})
export class InsightsModule {
}
