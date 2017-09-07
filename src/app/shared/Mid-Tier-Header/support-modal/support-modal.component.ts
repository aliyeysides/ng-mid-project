import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-support-modal',
  templateUrl: './support-modal.component.html',
  styleUrls: ['./support-modal.component.scss']
})
export class SupportModalComponent implements AfterViewInit {

  @ViewChild('supportModal') public supportModal: ModalDirective;

  constructor() {
  }

  ngAfterViewInit() {
  }

}
