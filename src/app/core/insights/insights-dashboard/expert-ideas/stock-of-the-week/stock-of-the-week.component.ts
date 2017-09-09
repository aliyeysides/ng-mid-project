import {Component, OnDestroy, OnInit} from '@angular/core';
import {InsightsService} from '../../../insights.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'stock-of-the-week',
  templateUrl: './stock-of-the-week.component.html',
  styleUrls: ['../../insights-dashboard.component.scss']
})
export class StockOfTheWeekComponent implements OnInit, OnDestroy {
  private wordPressSubscription: Subscription;
  public stockoftheWeek: object;

  constructor(private insightsService: InsightsService) {
  }

  ngOnInit() {
    const stockoftheWeekCategoryId = '22';
    this.wordPressSubscription = this.insightsService.getWordPressJson(stockoftheWeekCategoryId, 1)
      .subscribe(res => this.stockoftheWeek = res['0'][stockoftheWeekCategoryId].find(obj => !!obj));
  }

  ngOnDestroy() {
    this.wordPressSubscription.unsubscribe();
  }

  public openStockoftheWeek(): void {
    this.insightsService.openModal(this.stockoftheWeek['post_title'], this.stockoftheWeek);
  }

}
