import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'mid-tier-header',
  templateUrl: './mid-tier-header.component.html',
  styleUrls: ['./mid-tier-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MidTierHeaderComponent implements OnInit {

  public settingsVisible: boolean;

  constructor() {}

  ngOnInit() {}
}
