import {Component, OnInit} from '@angular/core';
import {InsightsService} from '../../shared/insights.service';

@Component({
  selector: 'expert-education',
  templateUrl: './expert-education.component.html',
  styleUrls: ['../insights-dashboard.component.scss'],
})
export class ExpertEducationComponent implements OnInit {
  public itemsPerPage: number = 2;
  public totalItems: number;
  public currentPage: number = 1;
  public smallnumPages: number = 0;
  public expertEducationPosts: object[];
  public educationPages: Array<Array<object>> = [];

  constructor(private insightsService: InsightsService) {
  }

  ngOnInit() {
    const educationCategoryId = '46';
    this.insightsService.getWordPressJson(educationCategoryId, 8).subscribe(res => {
      this.expertEducationPosts = res['0'][educationCategoryId];
      this.totalItems = this.expertEducationPosts.length;
      this.educationPages = this.createPagesArray(this.expertEducationPosts, this.itemsPerPage);
      this.insightsService.assignAuthorProp(this.expertEducationPosts);
    });
  }

  public openEducationPost(post: object): void {
    this.insightsService.openModal(post['post_title'], post);
  }

  private createPagesArray(arr: Array<any>, pageSize: number): Array<Array<object>> {
    return this.insightsService.createPagesArray(arr, pageSize)
  }

}
