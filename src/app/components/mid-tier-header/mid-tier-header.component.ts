import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import {noop} from 'rxjs/util/noop';
import {MidTierHeaderService} from './mid-tier-header.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'mid-tier-header',
  templateUrl: './mid-tier-header.component.html',
  styleUrls: ['./mid-tier-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MidTierHeaderComponent implements OnInit, OnDestroy {
  @ViewChild('supportModal') public supportModal: ModalDirective;
  @ViewChild('onboardingModal') public onboardingModal: ModalDirective;
  @HostListener('document:click', ['$event']) public offClick(e: Event) {
    if (!this.el.nativeElement.contains(e.target)) this.dismissPopover();
  }

  private ngUnsubscribe: Subject<void> = new Subject();

  public content: string = "You can get back to the Quick Start walkthrough anytime in your settings!";
  public showPopupTooltip: boolean;
  public items: object[] = [
    { title: 'Quickstart', href: '#', target: '', fn: this.relaunchOnboarding.bind(this) },
    { title: 'Upgrade', href: 'https://mh214.infusionsoft.com/app/orderForms/Chaikin-Analytics---Annual-Subscription', target: '_blank', fn: noop },
    { title: 'User guide', href: 'https://www.chaikinanalytics.com/analytics-resource-guide/', target: '_blank', fn: noop },
    { title: 'Support/Contact', href: '#', target: '', fn: this.openSupportModal.bind(this) },
    { title: 'Log out', href: '#', target: '', fn: this.logOutSession.bind(this) }
  ];

  constructor(private midTierHeaderService: MidTierHeaderService,
              private el: ElementRef) {
  }

  ngOnInit() {
    this.midTierHeaderService.onboardingPopup$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.showPopupTooltip = res;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public toggleNav(id: string): void {
    document.getElementById(id).style.width = "500px";
    document.getElementById("search-darken").style.visibility = 'visible';
    this.dismissPopover();
  }

  public closeNav(id: string): void {
    document.getElementById(id).style.width = "0";
    document.getElementById("search-darken").style.visibility = 'hidden';
  }

  public dismissPopover(): void {
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
