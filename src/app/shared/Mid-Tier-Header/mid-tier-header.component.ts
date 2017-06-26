import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import { SharedService } from '../shared.service';
import { SearchPanelComponent } from '../search-panel/search-panel.component';
@Component({
  selector: 'symbol-search',
  template: `
  <form class="form-inline" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <span class="search-submit" id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></span>
        <input type="text" class="form-control search-box" placeholder="Search a stock" aria-describedby="basic-addon1" [formControl]="symbolSearchForm">
    </div>
    </form>
 `,
  providers: [SearchPanelComponent],
  styleUrls: ['./mid-tier-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SymbolLookupComponent implements OnInit {
  public symbolSearchForm: FormControl;
  public searchResults: Array<object>;
  constructor(private sharedService: SharedService, private searchPanelComponent : SearchPanelComponent) {
    this.symbolSearchForm = new FormControl();
  }

  ngOnInit() {
    this.searchResults = [];
   
    this.symbolSearchForm.valueChanges
      .debounceTime(500)
      .switchMap(val => this.sharedService.symbolLookup(val))  
   // .switchMap(val => this.doSomething(val))   
      .subscribe(val => this.searchResults = val);
  }
 doSomething(val){
   return [];
 //  (val != null || val != undefined || val != '') ? this.sharedService.symbolLookup(val) : ''
 }
  onSubmit() {
    console.log(this.searchResults);
   // this.symbolSearchForm.reset();
  }
}

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