import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { InsightsComponent } from './insights.component';

@NgModule({
	imports: [
		SharedModule
	],
	exports: [
		InsightsComponent
	],
	declarations: [InsightsComponent],
	providers: []
})
export class InsightsModule {
}
