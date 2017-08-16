import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-support-modal',
  templateUrl: './support-modal.component.html',
  styleUrls: ['./support-modal.component.scss']
})
export class SupportModalComponent implements OnInit {

  @ViewChild('supportModal') public supportModal: ModalDirective;
  public isModalShown: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  public showModal(): void {
    this.isModalShown = true;
  }

  // public hideModal(): void {
  //   // this.autoShownModal.hide();
  // }

  // public onHidden(): void {
  //   this.isModalShown = false;
  // };

}
