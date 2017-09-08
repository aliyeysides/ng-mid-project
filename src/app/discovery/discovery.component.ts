import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'mid-tier-component',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoveryComponent implements OnInit {

  constructor(private location: Location) {
  }

  ngOnInit() {
  }

  public navigateBack() {
    this.location.back();
  }

}
