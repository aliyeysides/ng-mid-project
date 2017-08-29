import {Component, OnInit} from '@angular/core';
import {InsightsService} from '../../../shared/insights.service';

@Component({
  selector: 'stock-of-the-week',
  templateUrl: './stock-of-the-week.component.html',
  styleUrls: ['../../insights-dashboard.component.scss']
})
export class StockOfTheWeekComponent implements OnInit {
  public stockoftheWeek: object;

  constructor(private insightsService: InsightsService) {
  }

  ngOnInit() {
    const stockoftheWeekCategoryId = '22';
    this.insightsService.getWordPressJson(stockoftheWeekCategoryId)
      .subscribe(res => this.stockoftheWeek = res.find(obj => true)[stockoftheWeekCategoryId].find(obj => true));
  }

  public openStockoftheWeek(): void {
    this.insightsService.openModal(this.stockoftheWeek['post_title'], this.stockoftheWeek);
  }

}
