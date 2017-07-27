import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {SharedService} from '../shared/shared.service';
import {SignalService} from '../shared/signal.service';
import {IdeasComponent} from './ideas.component';
import {IdeaListProvider} from 'app/providers/idea-list.provider';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    SharedModule,
    BusyModule
  ],
  exports: [
    IdeasComponent
  ],
  declarations: [IdeasComponent],
  bootstrap: [IdeasComponent],
  providers: [SharedService, SignalService, IdeaListProvider]
})
export class IdeasModule {
}
