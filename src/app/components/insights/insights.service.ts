import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {InsightsModalComponent} from './insights-modal/insights-modal.component';
import {BsModalService} from 'ngx-bootstrap';
import {DatePipe} from '@angular/common';
import {SharedService} from '../../shared/shared.service';
import {UtilService} from '../../services/util.service';

@Injectable()
export class InsightsService {
  private getInsightsParams: URLSearchParams;
  private apiHostName = this.sharedService.getApiHostName();

  constructor(private modalService: BsModalService,
              private sharedService: SharedService,
              private datePipe: DatePipe,
              private utilService: UtilService) {
    this.getInsightsParams = new URLSearchParams();
  }

  public getInsightPostDom(post: object): Document {
    const parser = new DOMParser();
    return parser.parseFromString(post['post_content'], 'text/html');
  }

  public getInsightPostBody(post: object): string {
    const dom = this.getInsightPostDom(post);
    return dom.body.innerHTML;
  }

  public assignAuthorProp(postArr: object[]): void {
    postArr.map(post => {
      const dom = this.getInsightPostDom(post);
      const author = dom.getElementById('author').innerText;
      return Object.assign(post, {author: author})
    });
  }

  // TODO: Add assignAuthorProp once we get market insights 'author' id
  public assignWordPressDateProperties(postArr: object[]): void {
    this.assignWordPressParsedDate(postArr);
    this.assignWordPressFormattedDate(postArr);
  }

  public assignWordPressParsedDate(postArr: object[]): void {
    postArr.map(post => {
      const date = post['post_date'];
      const parsedDate = Date.parse(date);
      return Object.assign(post, {post_date_parsed: parsedDate});
    });
  }

  public assignWordPressFormattedDate(postArr: object[]): void {
    postArr.map(post => {
      const parsedDate = post['post_date_parsed'];
      const formattedDate = this.datePipe.transform(parsedDate, 'longDate');
      return Object.assign(post, {post_date_formatted: formattedDate});
    })
  }

  public createPagesArray(arr: Array<any>, pageSize: number): Array<Array<object>> {
    return arr.reduce((acc, currentValue, currentIndex, arr) => {
      acc.push(arr.splice(0, pageSize));
      return !(currentIndex % pageSize) ? acc.concat([arr.slice(currentIndex, currentIndex + pageSize)]) : acc
    }, []);
  }

  public openModal(title: string, post: object): void {
    let bsModalRef = this.modalService.show(InsightsModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.body = this.getInsightPostBody(post);
  }

  public getWordPressJson(id: string, count: number) {
    const insightsUrl = `${this.apiHostName}/insights/?json=secursive.get_product_updates&dev=1`;
    this.getInsightsParams.set('id', id);
    this.getInsightsParams.set('count', count.toString());
    return this.utilService.getJson(insightsUrl, this.getInsightsParams);
  }

}
