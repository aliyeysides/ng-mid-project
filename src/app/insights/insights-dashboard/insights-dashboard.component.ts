import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {BsModalService} from 'ngx-bootstrap';
import {InsightsModalComponent} from '../insights-modal/insights-modal.component';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-insights-dashboard',
  templateUrl: './insights-dashboard.component.html',
  styleUrls: ['./insights-dashboard.component.scss']
})
export class InsightsDashboardComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public earningsIdea: object;
  public bullsandBears: object;
  public stockoftheWeek: object;

  constructor(private modalService: BsModalService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.getWordPressJson('16').subscribe(res => this.earningsIdea = res['0']['16'][0]);
    this.sharedService.getWordPressJson('13').subscribe(res => this.bullsandBears = res['0']['13'][0]);
    this.sharedService.getWordPressJson('22').subscribe(res => this.stockoftheWeek = res['0']['22'][0]);
  }

  public openEarningsIdeas() {
    this.bsModalRef = this.modalService.show(InsightsModalComponent);
    this.bsModalRef.content.title = 'Earnings Ideas';
    this.bsModalRef.content.body = this.getInsightPostBody(this.earningsIdea);
  }

  public openBullsandBearsIdeas() {
    this.bsModalRef = this.modalService.show(InsightsModalComponent);
    this.bsModalRef.content.title = 'Bulls & Bears';
    this.bsModalRef.content.body = this.getInsightPostBody(this.bullsandBears);
  }

  public openStockoftheWeek() {
    this.bsModalRef = this.modalService.show(InsightsModalComponent);
    this.bsModalRef.content.title = 'Stock of the Week';
    this.bsModalRef.content.body = this.getInsightPostBody(this.stockoftheWeek);
  }

  private getInsightPostBody(obj) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(obj['post_content'], 'text/html');
    return dom.body.innerHTML;
  }

}
