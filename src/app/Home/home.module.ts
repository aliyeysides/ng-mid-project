import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { HomeService } from './service/home.service';
import { IdeasModule } from '../ideas/ideas.module';
import { ListViewComponent } from './list-view/list-view.component';

@NgModule({
	imports: [
		SharedModule,
		IdeasModule
	],
	exports: [
		HomeComponent
	],
	declarations: [HomeComponent, ListViewComponent],
	providers: [HomeService]
})
export class HomeModule {
}
