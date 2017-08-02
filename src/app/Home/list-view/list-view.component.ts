import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {IdeaListProvider} from 'app/providers/idea-list.provider'
import {Router} from '@angular/router';
import {Idea} from '../../shared/models/idea';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})

export class ListViewComponent implements OnInit {

  public ideaList: Array<object>;
  public wholeIdeasList: Array<object>;
  public additionalLists: boolean = false;
  public mouseHoverOptionsMap: object = {};
  public popupOptionsMap: object = {};
  public currentView: string = 'list-view';
  public showHeadlines: boolean = false;
  public mappingClassArray: Array<object>;
  public inActiveIdeasList: Array<object>;
  public activeIdeasList: Array<object>;
  private userId = '1024494';
  public selectedStock: Idea;
  public selectedListId: string;
  public selectedListName: string;
  public orderByObject: object = {};
  public selectedStockPGR: object;
  public selectedStockChartPoints: object;
  public selectedStockSimilars: object;
  public headlines: any;
  public loadedStockIdeas: number = 0;
  public panelViewIdeasList: Array<object>;
  public loading: Subscription;
  public headlinesLoading: Subscription;
  public symbolListLoading: Subscription;

  public isUserList: boolean;

  constructor(private sharedService: SharedService,
              private router: Router,
              private ideaListProvider: IdeaListProvider) {
  }

  ngOnInit() {

    this.ideaListProvider.wholeIdeasList$
      .subscribe(res => {
        this.wholeIdeasList = res;
        this.updateInActiveIdeaList(this.wholeIdeasList);
        this.updateActiveIdeaList(this.wholeIdeasList);
      });

    this.ideaListProvider.mappingClassArray$
      .subscribe(res => {
        this.mappingClassArray = res;
      });

    this.sharedService.symbolListValues$
      .switchMap(val => this.sharedService.symbolList({listId: val['list_id']}))
      .subscribe(res => {
          this.selectedListId = res['list_id'];
          this.loadedStockIdeas = 0;
          this.panelViewIdeasList = [];
          this.ideaList = [];
          this.ideaList = res['symbols'];
          setTimeout(this.assignStockData(4), 0);
          if (this.ideaList) {
            this.selectStock(this.ideaList[0] as Idea);
          }
        },
        err => {
          this.sharedService.handleError(err)
        }
      );

    this.sharedService.powerBarHeader$
      .subscribe(res => {
        this.selectedListName = res['name'];
      });

    this.sharedService.additionalLists$.subscribe(val => {
      this.additionalLists = val;
    });

  }

  onScroll() {
    this.assignStockData(2);
  }

  selectStock(stock: Idea) {
    this.selectedStock = stock;
    if (stock) {
      this.getSelectedStockData(stock, this.assignSelectedStock.bind(this));
      this.getSelectedStockHeadlines(stock);
    }
  }

  getSelectedStockData(stock: Idea, callback?) {
    if (stock) {
      this.loading = this.sharedService.getStockCardData(stock.symbol)
        .subscribe(res => {
          return callback(res);
        });
    }
  }

  getSelectedStockHeadlines(stock: Idea) {
    if (stock) {
      this.headlinesLoading = this.sharedService.getHeadlines(stock.symbol)
        .subscribe(res => {
          this.headlines = res['headlines'];
        })
    }
  }

  assignSelectedStock(res) {
    this.selectedStockPGR = res['pgr'];
    this.selectedStockChartPoints = res['chart-points'];
    this.selectedStockSimilars = res['discovery-similars'].stocks;
  }

  assignStockData(amount: number) {
    let loadNum = this.loadedStockIdeas + amount; // 0 + 4
    if (this.ideaList && this.loadedStockIdeas < this.ideaList.length) {
      for (let i = this.loadedStockIdeas; i < loadNum; i++) {
        let stock = this.ideaList[i];
        this.loadedStockIdeas++;
        this.getSelectedStockData(stock as Idea, function (res) {
          this.panelViewIdeasList.push(res);
        }.bind(this))
      }
    }
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

  toggleHeadlines() {
    this.showHeadlines = !this.showHeadlines;
  }

  goToStockView(stock: (Idea | string), e) {
    e.stopPropagation();
    if (typeof stock === 'object') {
      this.router.navigate(['/report', stock.symbol]);
    }
    if (typeof stock === 'string') {
      this.router.navigate(['/report', stock]);
    }
  }

  goToHeadline(headline) {
    window.open(headline.url, '_blank');
  }

  addToHoldingList(stock: any, e) {
    e.stopPropagation();
    this.sharedService.addStockIntoHoldingList(stock)
      .subscribe(res => {
        console.log('res from addToList', res);
      });
  }

  addToWatchingList(stock: any, e) {
    e.stopPropagation();
    this.sharedService.addStockIntoWatchingList(stock)
      .subscribe(res => {
        console.log('res from addToList', res);
      });
  }

  removeFromList(stock: any, listId: string, e) {
    e.stopPropagation();
    this.sharedService.deleteSymbolFromList(stock.symbol, listId)
      .subscribe(res => {
        console.log('res from removeFromList', res);
      });
  }

  checkIfUserList() {
    switch (this.selectedListName) {
      case 'Ideas for You':
      case 'Holding':
      case 'Watching':
        return true;
      default:
        return false;
    }
  }

  checkIfBullList() {
    switch (this.selectedListName) {
      case 'Bulls of the Week':
      case 'Best Growth Stocks':
      case 'Best of the Large Caps':
      case 'Best of the NASDAQ':
      case 'Best of the Small Caps':
      case 'Buy the Dips':
      case 'Best Under $10':
      case 'Best Value Stocks':
      case 'Insider Confidence':
      case 'Money Makers':
      case 'Relative Strength Champs':
      case 'Money Flow Champs':
      case 'Analyst Darlings':
      case 'Power Gauge Rating Upgrades':
      case 'Best of the Dow':
      case 'Earnings Champs':
      case 'Upcoming Earnings Bulls':
        return true;
      default:
        return false;
    }
  }

  checkIfBearList() {
    switch (this.selectedListName) {
      case 'Sell the Rallies':
      case 'Bears of the Week':
      case 'Power Gauge Rating Downgrades':
      case 'Don\'t Fight the Shorts':
      case 'Dogs of the Dow':
      case 'Upcoming Earnings Bears':
        return true;
      default:
        return false;
    }
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


  /* hardeep: logic for idea inactive list */

  public updateInActiveIdeaList(list) {
    this.inActiveIdeasList = list.filter(function (key, val, array) {
      return !key.is_active;
    });
  }

  public updateActiveIdeaList(list) {
    this.activeIdeasList = list.filter(function (key, val, array) {
      return key.is_active;
    });
  }

  public manageActiveInactive(status, list_id) {
    if (this.activeIdeasList.length < 10) {
      this.ideaListProvider.manageActiveInactive({uid: this.userId, listId: list_id, mode: status})
        .subscribe(res => {
            this.getIdeasList();
          },
          err => console.log('err', err));
    } else {
      alert('First you have to delete another Idea list, then try again.')
    }
  }


  public getIdeasList() {
    this.ideaListProvider.getIdeasList({uid: this.userId})
      .subscribe(res => {
          this.ideaListProvider.setIdeaListData(res);
        },
        err => console.log('err', err));

  }

  /* hardeep: end logic for idea inactive list */

  setOrderByObject(val: string, order: boolean) {
    this.orderByObject['field'] = val;
    this.orderByObject['ascending'] = order;
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

  public appendPGRText(pgr): string {
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

  public appendPGRClass(pgr): string {
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

  public appendSliderClass(pgr: number): string {
    switch (pgr) {
      case 5:
        return 'slider-veryBullish';
      case 4:
        return 'slider-bullish';
      case 3:
        return 'slider-neutral';
      case 2:
        return 'slider-bearish';
      case 1:
        return 'slider-veryBearish';
    }
  }

  public appendSliderBarClass(pgr: number): string {
    switch (pgr) {
      case 5:
        return 'sliderbar-veryBullish';
      case 4:
        return 'sliderbar-bullish';
      case 3:
        return 'sliderbar-neutral';
      case 2:
        return 'sliderbar-bearish';
      case 1:
        return 'sliderbar-veryBearish';
    }
  }


}
