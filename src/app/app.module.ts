import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/* Bootstrap component */
import {AppComponent} from './app.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

/* Modules */
import {SharedModule} from './shared/shared.module';
import {IdeasModule} from './components/ideas/ideas.module';
import {DiscoveryModule} from './components/discovery/discovery.module';
import {InsightsModule} from './components/insights/insights.module';
import {StockReportModule} from './components/stock-report/stock.module';

import {
  ModalModule,
  AlertModule,
  PopoverModule,
  TooltipModule,
  BsDropdownModule,
  PaginationModule,
} from 'ngx-bootstrap';

import {BusyConfig, BusyModule} from 'angular2-busy';
import {MidTierHeaderModule} from './components/mid-tier-header/mid-tier-header.module';
import {SidePanelModule} from './components/side-panel/side-panel.module';

const loadingMaskConfig: BusyConfig = ({
  message: '',
  backdrop: true,
  delay: 0,
  minDuration: 0,
  template: `<div class="spinner">
  <div class="rect1"></div>
  <div class="rect2"></div>
  <div class="rect3"></div>
  <div class="rect4"></div>
  <div class="rect5"></div>
</div>`,
  wrapperClass: 'ng-busy'
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    IdeasModule,
    DiscoveryModule,
    InsightsModule,
    StockReportModule,
    BrowserAnimationsModule,
    MidTierHeaderModule,
    SidePanelModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    BusyModule.forRoot(loadingMaskConfig)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
