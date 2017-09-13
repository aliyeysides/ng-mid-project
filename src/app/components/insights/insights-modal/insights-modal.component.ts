import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-insights-modal',
  templateUrl: './insights-modal.component.html',
  styleUrls: ['./insights-modal.component.scss']
})
export class InsightsModalComponent implements OnInit {
  public title: string;
  public body: string;
  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }

}
