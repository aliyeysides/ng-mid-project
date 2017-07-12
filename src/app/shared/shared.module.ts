import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app-routing.module';
import { MidTierHeaderModule } from './Mid-Tier-Header/mid-tier-header.module';
import { SymbolSearchModule } from './symbol-search/symbol-search.module';
import { SidePanelModule } from './side-panel/side-panel.module';
import { SharedService } from './shared.service';
import { SignalService } from './signal.service';
import { EvenOddPipe } from './shared.filters'
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
		SymbolSearchModule
	],
	providers: [SharedService, SignalService, EvenOddPipe]
})
export class SharedModule {

}
