import {Component, OnInit} from '@angular/core';
import {InsightsService} from '../../../shared/insights.service';

@Component({
  selector: 'bulls-bears',
  templateUrl: './bulls-bears.component.html',
  styleUrls: ['../../insights-dashboard.component.scss']
})
export class BullsBearsComponent implements OnInit {
  public bullsandBears: object;

  constructor(private insightsService: InsightsService) {
  }

  ngOnInit() {
    const bullsAndBearsCategoryId = '13';
    this.insightsService.getWordPressJson(bullsAndBearsCategoryId, 1)
      .subscribe(res => this.bullsandBears = res['0'][bullsAndBearsCategoryId].find(obj => !!obj));
  }

  public openBullsandBearsIdeas(): void {
    this.insightsService.openModal(this.bullsandBears['post_title'], this.bullsandBears);
  }

}
