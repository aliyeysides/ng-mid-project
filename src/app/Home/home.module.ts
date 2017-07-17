import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';

import {HomeComponent} from './home.component';
import {HomeService} from './service/home.service';
import {IdeasModule} from '../ideas/ideas.module';
import {ListViewComponent} from './list-view/list-view.component';
import {EvenOddPipe} from '../shared/shared.filters';
import {SymbolSearchModule} from '../shared/symbol-search/symbol-search.module';
import {OnboardingComponent} from './onboarding/onboarding.component';

import {ModalModule} from 'ngx-bootstrap/modal';

import {AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    SharedModule,
    IdeasModule,
    SharedModule,
    SymbolSearchModule,
    ModalModule,
    AlertModule
  ],
  exports: [
    HomeComponent
  ],
  declarations: [HomeComponent, ListViewComponent, EvenOddPipe, OnboardingComponent],
  providers: [HomeService]
})
export class HomeModule {
}
