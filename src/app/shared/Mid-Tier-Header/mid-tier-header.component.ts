import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'mid-tier-header',
  templateUrl: './mid-tier-header.component.html',
  styleUrls: ['./mid-tier-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MidTierHeaderComponent implements OnInit {

  public settingsVisible: boolean;
  public showPopup: boolean;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.onboardingPopup$
      .subscribe(res => {
        this.showPopup = res;
      })
  }

}
