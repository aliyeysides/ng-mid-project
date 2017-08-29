import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {InsightsService} from '../shared/insights.service';

@Component({
  selector: 'app-insights-dashboard',
  templateUrl: './insights-dashboard.component.html',
  styleUrls: ['./insights-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InsightsDashboardComponent implements OnInit {

  constructor(private insightsService: InsightsService) {
  }

  ngOnInit() {

  }

  public openMarketInsight(post: object): void {
    this.insightsService.openModal(post['post_title'], post);
  }

}
