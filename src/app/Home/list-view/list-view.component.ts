import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {Router} from '@angular/router';
import {Idea} from '../../shared/models/idea';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  // animations: [
  //   trigger('slideInOut', [
  //     state('in', style({
  //       transform: 'translate3d(0, 0, 0)'
  //     })),
  //     state('out', style({
  //       transform: 'translate3d(100%, 0, 0)'
  //     })),
  //     transition('in => out', animate('400ms ease-in-out')),
  //     transition('out => in', animate('400ms ease-in-out'))
  //   ])
  // ]
})
export class ListViewComponent implements OnInit {

  public ideaList: Array<object>;
  public additionalLists: boolean = false;
  public mouseHoverOptionsMap: object = {};
  public popupOptionsMap: object = {};
  public currentView: string = 'list-view';
  public selectedStock: Idea;

  constructor(private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.sharedService.symbolListValues$
      .switchMap(val => this.sharedService.symbolList({listId: val['list_id']}))
      .subscribe(res => {
        this.ideaList = res['symbols'];
        if (this.ideaList) {
          this.selectedStock = this.ideaList[0] as Idea;
        }
      });

    this.sharedService.additionalLists$.subscribe(val => {
      this.additionalLists = val;
    });
  }

  selectStock(stock: Idea) {
    this.selectedStock = stock;
  }

  toggleHoverOptions(idea) {
    if (!this.mouseHoverOptionsMap[idea.symbol] || this.mouseHoverOptionsMap[idea.symbol] == false) {
      this.mouseHoverOptionsMap[idea.symbol] = true;
      return;
    }
    this.mouseHoverOptionsMap[idea.symbol] = !this.mouseHoverOptionsMap[idea.symbol];
  }

  toggleOptions(idea, e) {
    e.stopPropagation();
    if (!this.popupOptionsMap[idea.symbol] || this.popupOptionsMap[idea.symbol] == false) {
      this.popupOptionsMap = {};
      this.popupOptionsMap[idea.symbol] = true;
      return;
    }
    this.popupOptionsMap[idea.symbol] = !this.popupOptionsMap[idea.symbol];
    this.mouseHoverOptionsMap = {};
  }


  goToStockView(stock: Idea, e) {
    e.stopPropagation();
    this.router.navigate(['/report', stock.symbol]);
  }

  addToList(stock: any, listId: string, e) {
    e.stopPropagation();
    this.sharedService.addStockIntoList(stock.symbol, listId)
      .subscribe(res => {
        console.log('res from addToList', res);
      })
  }

  removeFromList(stock: any, listId: string, e) {
    e.stopPropagation();
    this.sharedService.deleteSymbolFromList(stock.symbol, listId)
      .subscribe(res => {
        console.log('res from removeFromList', res);
      });
  }

  gotoPanelView() {
    this.currentView = 'panel-view';
  }

  gotoListView() {
    this.currentView = 'list-view';
  }

  setAdditionalLists(val: boolean) {
    this.sharedService.setAdditionalListsMenu(val);
  }

  public appendPGRImage(pgr) {
    const imageUrl = 'assets/imgs/';
    if (pgr === 1) {
      return imageUrl + 'arc_VeryBearish.svg';
    } else if (pgr === 2) {
      return imageUrl + 'arc_Bearish.svg';
    } else if (pgr === 3) {
      return imageUrl + 'arc_Neutral.svg';
    } else if (pgr === 4) {
      return imageUrl + 'arc_Bullish.svg';
    } else if (pgr === 5) {
      return imageUrl + 'arc_VeryBullish.svg';
    } else {
      return imageUrl + 'arc_None.svg';
    }
  }

  public appendPGRText(pgr) {
    if (pgr === 1) {
      return 'Very Bearish';
    } else if (pgr === 2) {
      return 'Bearish';
    } else if (pgr === 3) {
      return 'Neutral';
    } else if (pgr === 4) {
      return 'Bullish';
    } else if (pgr === 5) {
      return 'Very Bullish';
    } else {
      return 'N/A';
    }
  }

  public appendPGRClass(pgr) {
    if (pgr === 1) {
      return 'VeryBearish';
    } else if (pgr === 2) {
      return 'Bearish';
    } else if (pgr === 3) {
      return 'Neutral';
    } else if (pgr === 4) {
      return 'Bullish';
    } else if (pgr === 5) {
      return 'VeryBullish';
    } else {
      return '';
    }
  }

}
