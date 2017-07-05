import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';
import { SidePanelComponent } from './side-panel.component';
import { SidePanelProvider } from 'app/providers/side-panel.provider'
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
	providers: [SharedService,SidePanelProvider]
})
export class SidePanelModule {
}