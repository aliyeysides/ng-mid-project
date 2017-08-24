import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Idea} from '../../shared/models/idea';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-onboarding-modal',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  public selected: number = 1;
  public holdings: Array<Idea>;
  private userId = '1024494';

  constructor(private sharedService: SharedService) {
    const holdingListId = '1220535';
    this.sharedService.symbolList({listId: holdingListId, userId: this.userId})
      .subscribe(res => {
        this.holdings = res['symbols'];
      });

    this.sharedService.onboardingModal$
      .subscribe(res => {
        this.isModalShown = res;
      });
  }

  public removeFromHolding(ticker: string) {
    const holdingListId = '1220535';
    this.sharedService.deleteSymbolFromList(ticker, holdingListId);
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
    this.sharedService.triggerOnboardingPopup(true);
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