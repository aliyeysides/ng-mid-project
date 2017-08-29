import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BullsBearsComponent} from './bulls-bears.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BullsBearsComponent
  ],
  declarations: [BullsBearsComponent]
})
export class BullsBearsModule {
}
