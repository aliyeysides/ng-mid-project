import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { HomeService } from './service/home.service';
import { IdeasModule } from '../ideas/ideas.module';

@NgModule({
	imports: [
		SharedModule,
		IdeasModule
	],
	exports: [
		HomeComponent
	],
	declarations: [HomeComponent],
	providers: [HomeService]
})
export class HomeModule {
}
