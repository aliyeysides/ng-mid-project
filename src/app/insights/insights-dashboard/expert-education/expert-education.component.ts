import {Component, OnInit} from '@angular/core';
import {InsightsService} from '../../shared/insights.service';

@Component({
  selector: 'expert-education',
  templateUrl: './expert-education.component.html',
  styleUrls: ['../insights-dashboard.component.scss'],
})
export class ExpertEducationComponent implements OnInit {
  public itemsPerPage: number = 2;
  public totalItems: number = 8;
  public currentPage: number = 1;
  public smallnumPages: number = 0;
  public expertEducationPosts: object[];

  constructor(private insightsService: InsightsService) {
  }

  ngOnInit() {
    const educationCategoryId = '46';
    this.insightsService.getWordPressJson(educationCategoryId).subscribe(res => {
      this.expertEducationPosts = res.find(obj => true)[educationCategoryId];
      this.insightsService.assignAuthorProp(this.expertEducationPosts);
    });
  }

  public openEducationPost(post: object): void {
    this.insightsService.openModal(post['post_title'], post);
  }

}
