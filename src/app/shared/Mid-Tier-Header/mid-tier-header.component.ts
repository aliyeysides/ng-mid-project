import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mid-tier-header',
  templateUrl: './mid-tier-header.component.html',
  styleUrls: ['./mid-tier-header.component.css']
})
export class MidTierHeaderComponent implements OnInit {

  public settingsVisible: boolean;

  constructor() {
  }

  ngOnInit() {
    this.settingsVisible = false;
  }

  /*public toggle() {
    this.settingsVisible = !this.settingsVisible;
  }*/
}