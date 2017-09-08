import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'mid-tier-component',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoveryComponent implements OnInit {

  public symbol: string;

  constructor(private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
          params.symbol;
          // console.log('activated route', params);
          // if (params.symbol) {
          //   this.symbol = params.symbol;
          // } else {
          //   this.symbol = 'AAPL';
          // }
        }
      )
  }

  public navigateBack() {
    this.location.back();
  }

}
