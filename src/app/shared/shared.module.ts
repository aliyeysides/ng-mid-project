import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app-routing.module';
import { MidTierHeaderModule } from './Mid-Tier-Header/mid-tier-header.module';
import { SearchPanelModule } from './search-panel/search-panel.module';
import { SharedService } from './shared.service';
import { SignalService } from './signal.service';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		MidTierHeaderModule,
		SearchPanelModule
	],
	exports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		MidTierHeaderModule,
		SearchPanelModule
	],
	declarations: [],
	providers: [SharedService, SignalService]
})
export class SharedModule {

}