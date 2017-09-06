import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { SharedService } from '../shared.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {noop} from 'rxjs/util/noop';
import {Subscription} from 'rxjs/Subscription';
import {MidTierHeaderService} from './mid-tier-header.service';

@Component({
  selector: 'mid-tier-header',
  templateUrl: './mid-tier-header.component.html',
  styleUrls: ['./mid-tier-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MidTierHeaderComponent implements OnInit, OnDestroy {
  @ViewChild('supportModal') public supportModal: ModalDirective;
  @ViewChild('onboardingModal') public onboardingModal: ModalDirective;
  private onboardingPopupSubscription: Subscription;
  public content: string = "You can get back to the Quick Start walkthrough anytime in your settings!";
  public showPopupTooltip: boolean;
  public items: object[] = [
    { title: 'Quickstart', href: '#', target: '', fn: this.relaunchOnboarding.bind(this) },
    { title: 'Upgrade', href: 'https://mh214.infusionsoft.com/app/orderForms/Chaikin-Analytics---Annual-Subscription', target: '_blank', fn: noop },
    { title: 'User guide', href: 'https://www.chaikinanalytics.com/analytics-resource-guide/', target: '_blank', fn: noop },
    { title: 'Support/Contact', href: '#', target: '', fn: this.openSupportModal.bind(this) },
    { title: 'Log out', href: '#', target: '', fn: this.logOutSession.bind(this) }
  ];

  constructor(private midTierHeaderService: MidTierHeaderService) {
  }

  ngOnInit() {
    this.onboardingPopupSubscription = this.midTierHeaderService.onboardingPopup$
      .subscribe(res => {
        this.showPopupTooltip = res;
      });
  }

  ngOnDestroy() {
    this.onboardingPopupSubscription.unsubscribe();
  }

  public toggleNav(id: string): void {
    document.getElementById(id).style.width = "500px";
    document.getElementById("search-darken").style.visibility = 'visible';
    this.popoverClicked();
  }

  public closeNav(id: string): void {
    document.getElementById(id).style.width = "0";
    document.getElementById("search-darken").style.visibility = 'hidden';
  }

  public popoverClicked(): void {
    this.showPopupTooltip = false;
  }

  public relaunchOnboarding(): void {
    this.onboardingModal['onboardingModal'].show();
  }

  public openSupportModal(): void {
    this.supportModal['supportModal'].show();
  }

  public logOutSession(): void {
    // TODO: log out session.
  }

}
