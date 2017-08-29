import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {MarketInsightsModule} from './market-insights/market-insights.module';
import {InsightsDashboardComponent} from './insights-dashboard.component';
import {ExpertEducationModule} from './expert-education/expert-education.module';
import {InsightsService} from '../shared/insights.service';
import {EarningsIdeasModule} from './expert-ideas/earnings-ideas/earnings-ideas.module';
import {BullsBearsModule} from './expert-ideas/bulls-bears/bulls-bears.module';
import {StockOfTheWeekModule} from './expert-ideas/stock-of-the-week/stock-of-the-week.module';

@NgModule({
  imports: [
    SharedModule,
    MarketInsightsModule,
    ExpertEducationModule,
    EarningsIdeasModule,
    BullsBearsModule,
    StockOfTheWeekModule
  ],
  exports: [
    MarketInsightsModule,
    ExpertEducationModule,
    EarningsIdeasModule,
    InsightsDashboardComponent,
    BullsBearsModule,
    StockOfTheWeekModule
  ],
  declarations: [InsightsDashboardComponent],
  providers: [InsightsService]
})
export class InsightsDashboardModule {
}
