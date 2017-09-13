import {Component, OnDestroy, OnInit} from '@angular/core';
import {InsightsService} from '../../insights.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'market-insights',
  templateUrl: './market-insights.component.html',
  styleUrls: ['../insights-dashboard.component.scss'],
})
export class MarketInsightsComponent implements OnInit, OnDestroy {
  private wordPressSubscription: Subscription;
  public marketInsights: object[];
  public totalItems: number;
  public currentPage: number = 1;
  public smallnumPages: number = 0;
  public itemsPerPage: number = 1;

  constructor(private insightsService: InsightsService) {
  }

  ngOnInit() {
    const marketInsightsCategoryId = '2';
    this.wordPressSubscription = this.insightsService.getWordPressJson(marketInsightsCategoryId, 3).subscribe(res => {
      this.marketInsights = res['0'][marketInsightsCategoryId];
      this.totalItems = this.marketInsights.length;
      this.insightsService.assignWordPressDateProperties(this.marketInsights);
      // TODO: Get 'author' id into market insight posts
      // this.insightsService.assignAuthorProp(this.marketInsights);
    });
  }

  ngOnDestroy() {
    this.wordPressSubscription.unsubscribe();
  }

  public openMarketInsight(post: object): void {
    this.insightsService.openModal(post['post_title'], post);
  }

}
