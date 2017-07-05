import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  public list: Array<object>;
  selectedActiveList: Array<object>;
  subscription: Subscription;
  constructor(private sharedService: SharedService) { 
    this.subscription = this.sharedService.getUpdateActiveIdeaList()
                          .subscribe(res => { 
                              this.selectedActiveList = res;
                              console.log(res);
                          });
  }

  ngOnInit() {
    this.list = [
      {rating: 'bullish', ticker: 'CSMA', name: 'Comcast', price: '$42.50', change: '5%'},
      {rating: 'very bullish', ticker: 'AMGN', name: 'Amgen', price: '$112.50', change: '5%'},
      {rating: 'bearish', ticker: 'AMD', name: 'Advanced Micro Something', price: '$12.50', change: '5%'},
      {rating: 'very bearish', ticker: 'RRC', name: 'Robin Jobin Oil', price: '$9.50', change: '5%'},
      {rating: 'neutral', ticker: 'ULTA', name: 'Ulta', price: '$312.50', change: '5%'}
    ]
  }
  onNotify(message: string): void {
    alert(message);
  }

}