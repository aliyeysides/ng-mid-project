import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'chaikin-svg',
  templateUrl: './chaikin-svg.component.html',
  styleUrls: ['./chaikin-svg.component.scss']
})
export class ChaikinSvgComponent implements OnInit {

  @Input() path: any;
  @Input() id: string;
  @Input() type: string;
  constructor() { }

  ngOnInit() {
    const parser = new DOMParser();
    this.path = parser.parseFromString(this.path, 'text/xml');
    console.log('path', this.path);
  }

}
