import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListSelectionComponent} from './list-selection.component';

import {PipesModule} from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    ListSelectionComponent
  ],
  declarations: [ListSelectionComponent]
})
export class ListSelectionModule {
}
