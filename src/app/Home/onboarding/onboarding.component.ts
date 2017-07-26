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
    this.sharedService.symbolList({listId: '1220535', userId: this.userId})
      .subscribe(res => {
        this.holdings = res['symbols'];
      })
  }

  public removeFromHolding(ticker: string) {
    this.sharedService.deleteSymbolFromList(ticker, '1220535');
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
