import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ExpertEducationComponent} from './expert-education.component';

import {PaginationModule} from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    SharedModule,
    PaginationModule
  ],
  exports: [
    ExpertEducationComponent
  ],
  declarations: [ExpertEducationComponent]
})
export class ExpertEducationModule {
}
