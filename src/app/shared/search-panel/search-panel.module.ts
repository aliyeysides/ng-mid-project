import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';
import { SearchPanelComponent } from './search-panel.component';
//import { MidTierHeaderModule } from '../mid-tier-header/mid-tier-header.module';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [
		SearchPanelComponent
	],
	declarations: [
		SearchPanelComponent
	],
	bootstrap: [SearchPanelComponent],
	providers: [SharedService]
})
export class SearchPanelModule {
}