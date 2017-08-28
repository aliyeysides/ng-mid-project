import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {BsModalService} from 'ngx-bootstrap';
import {InsightsModalComponent} from '../insights-modal/insights-modal.component';
import {SharedService} from '../../shared/shared.service';
import {PagerProvider} from '../../providers/paging.provider';

@Component({
  selector: 'app-insights-dashboard',
  templateUrl: './insights-dashboard.component.html',
  styleUrls: ['./insights-dashboard.component.scss']
})
export class InsightsDashboardComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public pager: any = {};
  public pagedItems: any[];
  public earningsIdea: object;
  public bullsandBears: object;
  public stockoftheWeek: object;
  public marketInsights: object[];
  public expertEducationPosts: object[];

  constructor(private modalService: BsModalService,
              private sharedService: SharedService,
              private pagerProvider: PagerProvider) {
  }

  ngOnInit() {
    this.sharedService.getWordPressJson('16').subscribe(res => this.earningsIdea = res['0']['16'][0]);
    this.sharedService.getWordPressJson('13').subscribe(res => this.bullsandBears = res['0']['13'][0]);
    this.sharedService.getWordPressJson('22').subscribe(res => this.stockoftheWeek = res['0']['22'][0]);
    this.sharedService.getWordPressJson('47').subscribe(res => this.marketInsights = res['0']['47']);
    this.sharedService.getWordPressJson('46').subscribe(res => {
      this.expertEducationPosts = res['0']['46'];
      this.assignAuthorProp(this.expertEducationPosts);
      this.setPage(1);
    });
  }

  public setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerProvider.getPager(this.expertEducationPosts.length, page, 8);
    // get current page of items
    this.pagedItems = this.expertEducationPosts.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public openEarningsIdeas() {
    this.openModal(this.earningsIdea['post_title'], this.earningsIdea);
  }

  public openBullsandBearsIdeas() {
    this.openModal(this.bullsandBears['post_title'], this.bullsandBears);
  }

  public openStockoftheWeek() {
    this.openModal(this.stockoftheWeek['post_title'], this.stockoftheWeek);
  }

  public openMarketInsight(post: object) {
    this.openModal(post['post_title'], post);
  }

  public openEducationPost(post: object) {
    this.openModal(post['post_title'], post);
  }

  private openModal(title: string, post: object) {
    this.bsModalRef = this.modalService.show(InsightsModalComponent);
    this.bsModalRef.content.title = title;
    this.bsModalRef.content.body = this.getInsightPostBody(post);
  }

  private getInsightPostDom(obj) {
    const parser = new DOMParser();
    return parser.parseFromString(obj['post_content'], 'text/html');
  }

  private getInsightPostBody(obj) {
    const dom = this.getInsightPostDom(obj);
    return dom.body.innerHTML;
  }

  private assignAuthorProp(arr: object[]) {
    arr.map(obj => {
      const dom = this.getInsightPostDom(obj);
      const author = dom.getElementById('author').innerText;
      return Object.assign(obj, {author: author})
    });
  }

}
