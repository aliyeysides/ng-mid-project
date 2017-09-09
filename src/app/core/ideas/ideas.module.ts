import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import {IdeasComponent} from './ideas.component';
import {ListViewComponent} from './list-view/list-view.component';
import {ChartPanelComponent} from './chart-panel/chart-panel.component';
import {SymbolSearchModule} from '../../shared/components/symbol-search/symbol-search.module';

import {ModalModule} from 'ngx-bootstrap/modal';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {BusyModule} from 'angular2-busy';
import {ChartService} from '../../shared/services/chart.service';
import {PinnedIdeasComponent} from './pinned-ideas/pinned-ideas.component';

@NgModule({
  imports: [
    SharedModule,
    SymbolSearchModule,
    ModalModule,
    AlertModule,
    TooltipModule,
    InfiniteScrollModule,
    BusyModule
  ],
  exports: [
    PinnedIdeasComponent
  ],
  declarations: [IdeasComponent, PinnedIdeasComponent, ListViewComponent, ChartPanelComponent],
  providers: [ChartService]
})
export class IdeasModule {
}
