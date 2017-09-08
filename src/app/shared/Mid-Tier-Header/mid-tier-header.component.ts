import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SharedService } from '../shared.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {noop} from 'rxjs/util/noop';

declare var $: any;

@Component({
  selector: 'mid-tier-header',
  templateUrl: './mid-tier-header.component.html',
  styleUrls: ['./mid-tier-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MidTierHeaderComponent implements OnInit {
  @ViewChild('supportModal') public supportModal: ModalDirective;
  public content: string = "You can get back to the Quick Start walkthrough anytime in your settings!";
  public showPopupTooltip: boolean;
  public items: object[] = [
    { title: 'Quickstart', href: '#', target: '', fn: this.relaunchOnboarding.bind(this) },
    { title: 'Upgrade', href: 'https://mh214.infusionsoft.com/app/orderForms/Chaikin-Analytics---Annual-Subscription', target: '_blank', fn: noop },
    { title: 'User guide', href: 'https://www.chaikinanalytics.com/analytics-resource-guide/', target: '_blank', fn: noop },
    { title: 'Support/Contact', href: '#', target: '', fn: this.openSupportModal.bind(this) },
    { title: 'Log out', href: '#', target: '', fn: this.logOutSession }
  ];

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.onboardingPopup$
      .subscribe(res => {
        this.showPopupTooltip = res;
      });
  }

  public toggleNav() {
    document.getElementById("mySidenav").style.width = "500px";
    document.getElementById("search-darken").style.visibility = 'visible';
  }

  public closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("search-darken").style.visibility = 'hidden';
  }

  popoverClicked(e: Event) {
    e.preventDefault();
    this.showPopupTooltip = false;
  }

  relaunchOnboarding() {
    this.sharedService.setOnboardingModal(true);
  }

  openSupportModal() {
    this.supportModal['supportModal'].show();
  }

  logOutSession() {
    // TODO: log out session.
    this.sharedService.killSession()
      .subscribe(res => {
        console.log(res);
      });
      
  }

}
