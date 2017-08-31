import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../shared.service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'symbol-search',
  templateUrl: './symbol-search.component.html',
  styleUrls: ['./symbol-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SymbolSearchComponent implements OnInit, OnDestroy {
  private symbolSearchSubscription: Subscription;
  private addStockIntoWatchingSubscription: Subscription;
  private addStockIntoHoldingSubscription: Subscription;
  public symbolSearchForm: FormControl;
  public searchResults: Array<any>;
  public focus: boolean = false;

  constructor(private sharedService: SharedService,
              private router: Router) {
    this.symbolSearchForm = new FormControl();
  }

  ngOnInit() {
    this.searchResults = [];
    this.symbolSearchSubscription = this.symbolSearchForm.valueChanges
      .debounceTime(500)
      .switchMap(val => this.sharedService.symbolLookup(val))
      .subscribe(val => {
        this.searchResults = val;
      });
  }

  ngOnDestroy() {
    this.symbolSearchSubscription.unsubscribe();
    if (this.addStockIntoWatchingSubscription) this.addStockIntoWatchingSubscription.unsubscribe();
    if (this.addStockIntoHoldingSubscription) this.addStockIntoHoldingSubscription.unsubscribe();
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
    this.addStockIntoWatchingSubscription = this.sharedService.addStockIntoWatchingList(stock)
      .subscribe(res => {
        console.log('res from addToList', res);
      });
  }

  addToHoldingList(stock: any, e) {
    e.stopPropagation();
    this.addStockIntoHoldingSubscription = this.sharedService.addStockIntoHoldingList(stock)
      .subscribe(res => {
        console.log('res from addToList', res);
      })
  }
}
