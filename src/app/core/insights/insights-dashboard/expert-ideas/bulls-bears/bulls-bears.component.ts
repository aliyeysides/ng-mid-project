import {Component, OnDestroy, OnInit} from '@angular/core';
import {InsightsService} from '../../../insights.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'bulls-bears',
  templateUrl: './bulls-bears.component.html',
  styleUrls: ['../../insights-dashboard.component.scss']
})
export class BullsBearsComponent implements OnInit, OnDestroy {
  private wordPressSubscription: Subscription;
  public bullsandBears: object;

  constructor(private insightsService: InsightsService) {
  }

  ngOnInit() {
    const bullsAndBearsCategoryId = '13';
     this.wordPressSubscription = this.insightsService.getWordPressJson(bullsAndBearsCategoryId, 1)
      .subscribe(res => this.bullsandBears = res['0'][bullsAndBearsCategoryId].find(obj => !!obj));
  }

  ngOnDestroy() {
    this.wordPressSubscription.unsubscribe();
  }

  public openBullsandBearsIdeas(): void {
    this.insightsService.openModal(this.bullsandBears['post_title'], this.bullsandBears);
  }

}
