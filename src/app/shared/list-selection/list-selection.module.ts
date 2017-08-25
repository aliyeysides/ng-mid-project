import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListSelectionComponent} from './list-selection.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {PipesModule} from '../pipes/pipes.module';
import {ChaikinSvgModule} from '../svg/chaikin-svg.module';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    PipesModule,
    ChaikinSvgModule
  ],
  exports: [
    ListSelectionComponent
  ],
  declarations: [ListSelectionComponent]
})
export class ListSelectionModule {
}
