import {Component, OnInit} from '@angular/core';
import {HomeService} from './service/home.service';

@Component({
  selector: 'mid-tier-home',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {

  constructor(private homeService: HomeService) {

  }

  ngOnInit() {
  }
}
