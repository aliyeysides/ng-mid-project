import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {DiscoveryComponent} from './discovery.component';
import {DiscoveryService} from './discovery.service';
import {DiscoveryResultsComponent} from './discovery-results/discovery-results.component';
import {DiscoveryStockComponent} from './discovery-stock/discovery-stock.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    DiscoveryComponent,
    DiscoveryResultsComponent,
    DiscoveryStockComponent
  ],
  declarations: [DiscoveryComponent, DiscoveryStockComponent, DiscoveryResultsComponent],
  providers: [DiscoveryService]
})
export class DiscoveryModule {
}
