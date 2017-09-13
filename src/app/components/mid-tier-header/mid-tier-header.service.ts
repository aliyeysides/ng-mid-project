import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MidTierHeaderService {

  constructor() {
  }

  private onboardingPopup: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onboardingPopup$ = this.onboardingPopup.asObservable();

  private onboardingModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  onboardingModal$ = this.onboardingModal.asObservable();

  public triggerOnboardingPopup(data) {
    this.onboardingPopup.next(data);
  }
}
