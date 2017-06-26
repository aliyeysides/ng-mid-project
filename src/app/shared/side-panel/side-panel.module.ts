import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';
import { SidePanelComponent } from './side-panel.component';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [
		SidePanelComponent
	],
	declarations: [
		SidePanelComponent
	],
	bootstrap: [SidePanelComponent],
	providers: [SharedService]
})
export class SidePanelModule {
}