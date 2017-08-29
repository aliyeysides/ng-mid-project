import {Injectable} from '@angular/core';
import {InsightsModalComponent} from '../insights-modal/insights-modal.component';
import {BsModalService} from 'ngx-bootstrap';
import {SharedService} from '../../shared/shared.service';

@Injectable()
export class InsightsService {
  private getInsightsParams: URLSearchParams;
  private apiHostName = this.sharedService.getApiHostName();

  constructor(private modalService: BsModalService,
              private sharedService: SharedService) {
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

  public openModal(title: string, post: object): void {
    let bsModalRef = this.modalService.show(InsightsModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.body = this.getInsightPostBody(post);
  }

  public getWordPressJson(id: string) {
    console.log('id: ', id);
    const insightsUrl = `${this.apiHostName}/insights/?json=secursive.get_product_updates&dev=1&count=100`;
    this.getInsightsParams.set('id', id);
    return this.sharedService.getJson(insightsUrl, this.getInsightsParams);
  }

}
