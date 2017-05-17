import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { StockComponent } from './stock.component';

@NgModule({
	imports: [
		SharedModule
	],
	exports: [
		StockComponent
	],
	declarations: [StockComponent],
	providers: []
})
export class StockReportModule {
}
