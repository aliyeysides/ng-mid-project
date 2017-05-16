import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { IdeasComponent } from './ideas.component';

@NgModule({
	imports: [
		SharedModule
	],
	exports: [
		IdeasComponent
	],
	declarations: [IdeasComponent]
})
export class IdeasModule {
}
