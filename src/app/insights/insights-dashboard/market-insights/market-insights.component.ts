import {Component, OnInit} from '@angular/core';
import {InsightsService} from '../../shared/insights.service';

@Component({
  selector: 'market-insights',
  templateUrl: './market-insights.component.html',
  styleUrls: ['../insights-dashboard.component.scss'],
})
export class MarketInsightsComponent implements OnInit {
  public marketInsights: object[];
  public totalItems: number = 10;
  public currentPage: number = 1;
  public smallnumPages: number = 0;
  public itemsPerPage: number = 1;

  constructor(private insightsService: InsightsService) { }

  ngOnInit() {
    const marketInsightsCategoryId = '2';
    this.insightsService.getWordPressJson(marketInsightsCategoryId).subscribe(res => {
      this.marketInsights = res.find(obj => true)[marketInsightsCategoryId];
      this.insightsService.assignAuthorProp(this.marketInsights);
    });
  }

  public openMarketInsight(post: object): void {
    this.insightsService.openModal(post['post_title'], post);
  }

}
