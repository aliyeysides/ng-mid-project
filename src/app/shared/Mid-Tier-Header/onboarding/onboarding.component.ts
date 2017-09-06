import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Idea} from '../../models/idea';
import {SharedService} from '../../shared.service';
import {Subscription} from 'rxjs/Subscription';
import {MidTierHeaderService} from '../mid-tier-header.service';

@Component({
  selector: 'app-onboarding-modal',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit, OnDestroy {
  @ViewChild('onboardingModal') public onboardingModal: ModalDirective;
  private userId = '1024494';
  private symbolListSubscription: Subscription;
  private onboardingModalSubscription: Subscription;
  public selected: number = 1;
  public holdings: Array<Idea>;
  public isModalShown: boolean;

  constructor(private sharedService: SharedService,
              private midTierHeaderService: MidTierHeaderService) {
  }

  ngOnInit() {
    const holdingListId = '1220535';
    this.symbolListSubscription = this.sharedService.symbolList({listId: holdingListId, userId: this.userId})
      .subscribe(res => {
        this.holdings = res['symbols'];
      });

    this.onboardingModalSubscription = this.midTierHeaderService.onboardingModal$
      .subscribe(res => {
        this.isModalShown = res;
      });
  }

  ngOnDestroy() {
    this.symbolListSubscription.unsubscribe();
    this.onboardingModalSubscription.unsubscribe();
  }

  public removeFromHolding(ticker: string) {
    const holdingListId = '1220535';
    this.sharedService.deleteSymbolFromList(ticker, holdingListId);
  }

  public showModal():void {
    this.onboardingModal.show();
  }

  public hideModal():void {
    this.onboardingModal.hide();
  }

  public onHidden():void {
    this.isModalShown = false;
    this.midTierHeaderService.triggerOnboardingPopup(true);
    this.selected = 1;
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
