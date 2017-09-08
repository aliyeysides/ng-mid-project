import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiscoveryResultsComponent} from './discovery-results.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DiscoveryResultsComponent
  ],
  declarations: [DiscoveryResultsComponent]
})
export class DiscoveryResultsModule {
}
