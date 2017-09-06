import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {DiscoveryService} from './discovery.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'mid-tier-component',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent implements OnInit, OnDestroy {

  private discoveryResultsSubscription: Subscription;
  public discoveryResults: any;

  constructor(private location: Location,
              private discoveryService: DiscoveryService) {

  }

  ngOnInit() {
    this.discoveryResultsSubscription = this.discoveryService.getDiscoveryResultLists('AAPL')
      .subscribe(res => {
        this.discoveryResults = res;
        console.log('res', this.discoveryResults);
      })
  }

  ngOnDestroy() {
    this.discoveryResultsSubscription.unsubscribe();
  }

  public navigateBack() {
    this.location.back();
  }

}
