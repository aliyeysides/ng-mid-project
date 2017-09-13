import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IdeasComponent } from './components/ideas/ideas.component';
import { DiscoveryComponent } from './components/discovery/discovery.component';
import { InsightsComponent } from './components/insights/insights.component';
import { StockComponent } from './components/stock-report/stock.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: InsightsComponent },
  { path: 'ideas', component: IdeasComponent },
  { path: 'discovery/:symbol', component: DiscoveryComponent },
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
