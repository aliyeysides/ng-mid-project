import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-onboarding-modal',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  public selected: number = 1;

  constructor() {
  }

  public isModalShown:boolean = true;

  public showModal():void {
    this.isModalShown = true;
  }

  public hideModal():void {
    this.autoShownModal.hide();
  }

  public onHidden():void {
    this.isModalShown = false;
  }

  public switchSlide(slide: number) {
    this.selected = slide;
  }

  public nextSlide() {
    if (this.selected != 8) {
      this.selected += 1;
    }
  }

}
