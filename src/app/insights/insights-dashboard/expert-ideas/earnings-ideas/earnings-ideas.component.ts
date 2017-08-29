import {Component, OnInit} from '@angular/core';
import {InsightsService} from 'app/insights/shared/insights.service';

@Component({
  selector: 'earnings-ideas',
  templateUrl: './earnings-ideas.component.html',
  styleUrls: ['../../insights-dashboard.component.scss']
})
export class EarningsIdeasComponent implements OnInit {
  public earningsIdea: object;

  constructor(private insightsService: InsightsService) {
  }

  ngOnInit() {
    const earningsIdeaCategoryId = '16';
    this.insightsService.getWordPressJson(earningsIdeaCategoryId)
      .subscribe(res => this.earningsIdea = res.find(obj => true)[earningsIdeaCategoryId].find(obj => true));
  }

  public openEarningsIdeas(): void {
    this.insightsService.openModal(this.earningsIdea['post_title'], this.earningsIdea);
  }

}
