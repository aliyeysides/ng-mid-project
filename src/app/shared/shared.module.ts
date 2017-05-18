import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app-routing.module';
import { MidTierHeaderModule } from './Mid-Tier-Header/mid-tier-header.module';
import { SharedService } from './shared.service';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		MidTierHeaderModule
	],
	exports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		MidTierHeaderModule
	],
	declarations: [],
	providers: [SharedService]
})
export class SharedModule {

}