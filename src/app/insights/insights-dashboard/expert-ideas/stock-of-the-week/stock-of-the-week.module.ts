import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StockOfTheWeekComponent} from './stock-of-the-week.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    StockOfTheWeekComponent
  ],
  declarations: [StockOfTheWeekComponent]
})
export class StockOfTheWeekModule {
}
