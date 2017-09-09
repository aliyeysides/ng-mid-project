import {NgModule} from '@angular/core';
import {InsightsDashboardComponent} from './insights-dashboard.component';
import {InsightsService} from '../insights.service';
import {SharedModule} from '../../../shared/shared.module';
import {MarketInsightsComponent} from './market-insights/market-insights.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ExpertIdeasModule} from './expert-ideas/expert-ideas.module';
import {ExpertEducationComponent} from './expert-education/expert-education.component';

@NgModule({
  imports: [
    SharedModule,
    ExpertIdeasModule,
    PaginationModule
  ],
  exports: [
    ExpertIdeasModule,
    InsightsDashboardComponent,
    ExpertEducationComponent
  ],
  declarations: [InsightsDashboardComponent, MarketInsightsComponent, ExpertEducationComponent],
  providers: [InsightsService]
})
export class InsightsDashboardModule {
}
