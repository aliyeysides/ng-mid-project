import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {MarketInsightsComponent} from './market-insights.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    SharedModule,
    PaginationModule
  ],
  exports: [
    MarketInsightsComponent
  ],
  providers: [],
  declarations: [MarketInsightsComponent]
})
export class MarketInsightsModule {
}
