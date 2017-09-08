import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';

import {DiscoveryComponent} from './discovery.component';
import {DiscoveryService} from './discovery.service';
import {DiscoveryStockModule} from './discovery-stock/discovery-stock.module';

@NgModule({
  imports: [
    SharedModule,
    DiscoveryStockModule
  ],
  exports: [
    DiscoveryComponent,
    DiscoveryStockModule
  ],
  declarations: [DiscoveryComponent],
  providers: [DiscoveryService]
})
export class DiscoveryModule {
}
