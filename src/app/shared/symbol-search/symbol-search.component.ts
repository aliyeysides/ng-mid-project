import {Component, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../shared.service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'symbol-search',
  templateUrl: './symbol-search.component.html',
  styleUrls: ['./symbol-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SymbolSearchComponent implements OnInit {
  public symbolSearchForm: FormControl;
  public searchResults: Array<any>;
  public focus: boolean = false;

  constructor(private sharedService: SharedService,
              private router: Router) {
    this.symbolSearchForm = new FormControl();
  }

  ngOnInit() {
    this.searchResults = [];
    this.symbolSearchForm.valueChanges
      .debounceTime(500)
      .switchMap(val => this.sharedService.symbolLookup(val))
      .subscribe(val => {
        this.searchResults = val;
      });
  }

  gotoReport(symbol: string) {
    this.router.navigate(['/report', symbol])
  }

  onSubmit() {
    // console.log(this.searchResults);
    // if (isNullOrUndefined(this.symbolSearchForm.value) || this.searchResults.length == 0) {
    //   this.sharedService.addAlert(INVALIDSYMBOLALERT.type, INVALIDSYMBOLALERT.msg);
    //   return;
    // }
    this.gotoReport(this.searchResults[0].Symbol);
    this.symbolSearchForm.reset();
  }

  toggleFocus() {
    this.focus = !this.focus;
  }

  addToWatchingList(stock: any, e ) {
    e.stopPropagation();
    this.sharedService.addStockIntoWatchingList(stock)
      .subscribe(res => {
        console.log('res from addToList', res);
      });
  }

  addToHoldingList(stock: any, e) {
    e.stopPropagation();
    this.sharedService.addStockIntoHoldingList(stock)
      .subscribe(res => {
        console.log('res from addToList', res);
      })
  }
}
