import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BullsBearsComponent} from './bulls-bears/bulls-bears.component';
import {EarningsIdeasComponent} from './earnings-ideas/earnings-ideas.component';
import {StockOfTheWeekComponent} from './stock-of-the-week/stock-of-the-week.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BullsBearsComponent,
    EarningsIdeasComponent,
    StockOfTheWeekComponent
  ],
  declarations: [BullsBearsComponent, EarningsIdeasComponent, StockOfTheWeekComponent]
})
export class ExpertIdeasModule { }
