import {Component, OnDestroy, OnInit} from '@angular/core';
import {InsightsService} from 'app/core/insights/insights.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'earnings-ideas',
  templateUrl: './earnings-ideas.component.html',
  styleUrls: ['../../insights-dashboard.component.scss']
})
export class EarningsIdeasComponent implements OnInit, OnDestroy {
  private wordPressSubscription: Subscription;
  public earningsIdea: object;

  constructor(private insightsService: InsightsService) {
  }

  ngOnInit() {
    const earningsIdeaCategoryId = '16';
    this.wordPressSubscription = this.insightsService.getWordPressJson(earningsIdeaCategoryId, 1)
      .subscribe(res => this.earningsIdea = res['0'][earningsIdeaCategoryId].find(obj => !!obj));
  }

  ngOnDestroy() {
    this.wordPressSubscription.unsubscribe();
  }

  public openEarningsIdeas(): void {
    this.insightsService.openModal(this.earningsIdea['post_title'], this.earningsIdea);
  }

}
