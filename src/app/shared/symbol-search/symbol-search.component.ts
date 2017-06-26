import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../shared.service';
import {SearchPanelComponent} from '../search-panel/search-panel.component';
import {NgForm} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'symbol-search',
  templateUrl: './symbol-search.component.html',
  styleUrls: ['./symbol-search.component.scss'],
  providers: [SearchPanelComponent],
  encapsulation: ViewEncapsulation.None
})
export class SymbolSearchComponent implements OnInit {
  public symbolSearchForm: FormControl;
  public searchResults: Array<object>;

  constructor(private sharedService: SharedService, private searchPanelComponent: SearchPanelComponent) {
    this.symbolSearchForm = new FormControl();
    /* console.log(searchPanelComponent.test)*/
  }

  ngOnInit() {
    this.searchResults = [];
    /* $window.open(`https://dev.chaikinanalytics.com/CPTRestSecure/
     ResearchReport/index.jsp?lang=English&uid=9582&environment
     =desktop&subEnvironment=chaikinAnalytics&version=1.3.2&symbol=ILMN&userType=CAUser`);*/

    this.symbolSearchForm.valueChanges
      .debounceTime(500)
      .switchMap(val => this.sharedService.symbolLookup(val))
      // .switchMap(val => this.doSomething(val))
      .subscribe(val => this.searchResults = val);
  }

  gotoReport() {
    // doSomething();
  }

  doSomething(val) {
    return [];
    //  (val != null || val != undefined || val != '') ? this.sharedService.symbolLookup(val) : ''
  }

  onSubmit(event: Event) {
    console.log(this.searchResults);
    // this.symbolSearchForm.reset();
  }
}
