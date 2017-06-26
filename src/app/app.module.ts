import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

/* Bootstrap component */
import {AppComponent} from './app.component';

/* Modules */
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './Home/home.module';
import {IdeasModule} from './ideas/ideas.module';
import {DiscoveryModule} from './discovery/discovery.module';
import {InsightsModule} from './insights/insights.module';
import {StockReportModule} from './stock-report/stock.module';
import {ProfileModule} from './profile/profile.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
    HomeModule,
    IdeasModule,
    DiscoveryModule,
    InsightsModule,
    StockReportModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
