import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-onboarding-modal',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  public selected: string = 'slide__1';

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

  public switchSlide(slide: string) {
    this.selected = slide;
  }

}
