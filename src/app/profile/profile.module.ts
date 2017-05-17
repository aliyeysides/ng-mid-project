import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile.component';

@NgModule({
	imports: [
		SharedModule
	],
	exports: [
		ProfileComponent
	],
	declarations: [ProfileComponent],
	providers: []
})
export class ProfileModule {
}
