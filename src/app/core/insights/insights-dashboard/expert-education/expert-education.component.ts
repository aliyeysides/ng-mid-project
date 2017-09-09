import {Component, OnDestroy, OnInit} from '@angular/core';
import {InsightsService} from '../../insights.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'expert-education',
  templateUrl: './expert-education.component.html',
  styleUrls: ['../insights-dashboard.component.scss'],
})
export class ExpertEducationComponent implements OnInit, OnDestroy {
  private wordPressSubscription: Subscription;
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
    this.wordPressSubscription = this.insightsService.getWordPressJson(educationCategoryId, 8).subscribe(res => {
      this.expertEducationPosts = res['0'][educationCategoryId];
      this.totalItems = this.expertEducationPosts.length;
      this.educationPages = this.createPagesArray(this.expertEducationPosts, this.itemsPerPage);
      this.insightsService.assignAuthorProp(this.expertEducationPosts);
    });
  }

  ngOnDestroy() {
    this.wordPressSubscription.unsubscribe();
  }

  public openEducationPost(post: object): void {
    this.insightsService.openModal(post['post_title'], post);
  }

  private createPagesArray(arr: Array<any>, pageSize: number): Array<Array<object>> {
    return this.insightsService.createPagesArray(arr, pageSize)
  }

}
