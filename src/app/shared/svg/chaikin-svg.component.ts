import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'chaikin-svg',
  templateUrl: './chaikin-svg.component.html',
  styleUrls: ['./chaikin-svg.component.scss']
})
export class ChaikinSvgComponent implements OnInit {

  @Input() path: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // const parser = new DOMParser();
    // this.svg = parser.parseFromString(this.path, 'text/xml');
    this.path = this.sanitizer.bypassSecurityTrustHtml(this.path);
    console.log('path', this.path);
  }

}
