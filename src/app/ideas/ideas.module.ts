import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared/shared.service';
import { IdeasComponent } from './ideas.component';

@NgModule({
	imports: [
		SharedModule
	],
	exports: [
		IdeasComponent
	],
	declarations: [IdeasComponent],
	bootstrap: [IdeasComponent],
	providers: [SharedService]
})
export class IdeasModule {
}
