import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DiscoveryComponent } from './discovery.component';
import {DiscoveryService} from './discovery.service';

@NgModule({
	imports: [
		SharedModule
	],
	exports: [
		DiscoveryComponent
	],
	declarations: [DiscoveryComponent],
	providers: [DiscoveryService]
})
export class DiscoveryModule {
}
