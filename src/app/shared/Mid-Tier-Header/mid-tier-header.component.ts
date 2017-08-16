import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SharedService } from '../shared.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'mid-tier-header',
  templateUrl: './mid-tier-header.component.html',
  styleUrls: ['./mid-tier-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MidTierHeaderComponent implements OnInit {
  public content: string = "You can get back to the Quick Start walkthrough anytime in your settings!";
  public showPopup: boolean;
  public items: object[] = [
    { title: 'Quickstart', href: '#', target: '', fn: this.sharedService.relaunchOnboardingModal },
    { title: 'Upgrade', href: 'https://mh214.infusionsoft.com/app/orderForms/Chaikin-Analytics---Annual-Subscription', target: '_blank', fn: '' },
    { title: 'User guide', href: 'https://www.chaikinanalytics.com/analytics-resource-guide/', target: '_blank', fn: '' },
    { title: 'Support/Contact', href: '#', target: '', fn: this.openSupportModal },
    { title: 'Log out', href: '#', target: '', fn: this.logOutSession }
  ];

  // Quickstart – relaunch onboarding walk through on click
  // Upgrade – on click, open a new tab with this link: https://mh214.infusionsoft.com/app/orderForms/Chaikin-Analytics---Annual-Subscription
  // User guide – on click, open a new tab with this link: https://www.chaikinanalytics.com/analytics-resource-guide/
  // Support/contact – on click, open a popout with support info as follows: "Please contact customer support at support@chaikinanalytics.com or call 1-877-978-6257"
  // Log out – on click, log out and return to sign-in page

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.onboardingPopup$
      .subscribe(res => {
        this.showPopup = res;
      });
  }

  popoverClicked(e: Event) {
    e.preventDefault();
    this.showPopup = false;
  }

  toggleSettingsDropdown() {
    console.log('toggleSettingsDropdown');
  }

  // relaunchOnboarding() {
  //   console.log('this.sharedService', this.sharedService);
  //   this.sharedService.relaunchOnboardingModal();
  // }

  openSupportModal() {
    console.log('openSupportModal');
  }

  logOutSession() {
    // TODO: log out session.
  }

}
