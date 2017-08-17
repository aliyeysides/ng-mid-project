import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app-routing.module';
import { MidTierHeaderModule } from './Mid-Tier-Header/mid-tier-header.module';
import { SymbolSearchModule } from './symbol-search/symbol-search.module';
import { SidePanelModule } from './side-panel/side-panel.module';
import { SharedService } from './shared.service';
import { SignalService } from './signal.service';

import { EvenOddPipe } from './shared.filters';

import { OrderByPipe } from './pipes/order-by.pipe';
import { DecimalPipe } from './pipes/decimal.pipe';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		MidTierHeaderModule,
		SidePanelModule,
		SymbolSearchModule
	],
	exports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		MidTierHeaderModule,
		SidePanelModule,
		SymbolSearchModule,
		OrderByPipe,
		DecimalPipe
	],
	providers: [SharedService, SignalService, EvenOddPipe],
	declarations: [OrderByPipe, DecimalPipe]

})
export class SharedModule {

}
