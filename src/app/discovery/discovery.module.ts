import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DiscoveryComponent } from './discovery.component';

@NgModule({
	imports: [
		SharedModule
	],
	exports: [
		DiscoveryComponent
	],
	declarations: [DiscoveryComponent],
	providers: []
})
export class DiscoveryModule {
}
