import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { InsightsComponent } from './insights.component';
import { InsightsDashboardComponent } from './insights-dashboard/insights-dashboard.component';
import { InsightsListsComponent } from './insights-lists/insights-lists.component';

@NgModule({
	imports: [
		SharedModule,
		FormsModule,
		BrowserModule,
		ReactiveFormsModule
	],
	exports: [
		InsightsComponent
	],
	declarations: [InsightsComponent, InsightsDashboardComponent, InsightsListsComponent],
	bootstrap: [InsightsComponent],
	providers: []
})
export class InsightsModule {
}
