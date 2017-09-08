import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

/*import { AppComponent } from './app.component';*/
import { IdeasComponent } from './ideas/ideas.component';
/*import { IdeasComponent } from './ideas/ideas.component';*/
import { DiscoveryComponent } from './discovery/discovery.component';
import { InsightsComponent } from './insights/insights.component';
import { StockComponent } from './stock-report/stock.component';
/*import { ProfileComponent } from './profile/profile.component';*/


const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: InsightsComponent },
  { path: 'ideas', component: IdeasComponent },
  // { path: 'discovery', component: DiscoveryComponent },
  { path: 'discovery/:symbol', component: DiscoveryComponent },
	// { path: 'report', component: StockComponent },
  { path: 'report/:symbol', component: StockComponent }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
	],
	exports: [
		RouterModule
	],
	declarations: []
})
export class AppRoutingModule {
}
