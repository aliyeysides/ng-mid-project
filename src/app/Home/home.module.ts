import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { HomeService } from './service/home.service';

@NgModule({
	imports: [
		SharedModule
	],
	exports: [
		HomeComponent
	],
	declarations: [HomeComponent],
	providers: [HomeService]
})
export class HomeModule {
}
