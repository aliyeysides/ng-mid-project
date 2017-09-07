import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {Idea} from '../../models/idea';
import {SharedService} from '../../shared.service';
import {MidTierHeaderService} from '../mid-tier-header.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-onboarding-modal',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit, OnDestroy {
  @ViewChild('onboardingModal') public onboardingModal: ModalDirective;
  private userId = '1024494';
  private ngUnsubscribe: Subject<void> = new Subject();

  public selected: number = 1;
  public holdings: Array<Idea>;
  public isModalShown: boolean;

  constructor(private sharedService: SharedService,
              private midTierHeaderService: MidTierHeaderService) {
  }

  ngOnInit() {
    const holdingListId = '1220535';
    this.sharedService.symbolList({listId: holdingListId, userId: this.userId})
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.holdings = res['symbols'];
      });

    this.midTierHeaderService.onboardingModal$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.isModalShown = res;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
