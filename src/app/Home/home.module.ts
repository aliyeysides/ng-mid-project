import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';

import {HomeComponent} from './home.component';
import {HomeService} from './service/home.service';
import {IdeasModule} from '../ideas/ideas.module';
import {ListViewComponent} from './list-view/list-view.component';
import { EvenOddPipe } from '../shared/shared.filters';
import {SymbolSearchModule} from '../shared/symbol-search/symbol-search.module';

@NgModule({
  imports: [
    SharedModule,
    IdeasModule,
    SharedModule,
    SymbolSearchModule
  ],
  exports: [
    HomeComponent
  ],
  declarations: [HomeComponent, ListViewComponent, EvenOddPipe],
  providers: [HomeService]
})
export class HomeModule {
}
