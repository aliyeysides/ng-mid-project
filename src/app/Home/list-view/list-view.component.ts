import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {IdeaListProvider} from 'app/providers/idea-list.provider';
import {Router} from '@angular/router';
import {Idea} from '../../shared/models/idea';
import {Subscription} from 'rxjs/Subscription';
import {ChartService} from '../../shared/charts/chart.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})

export class ListViewComponent implements OnInit {
  @Output() toggleAdditionalIdeasLists: EventEmitter<any> = new EventEmitter();
  private userId = '1024494';
  public ideaList: Array<object>;
  public additionalLists: boolean = false;
  public mouseHoverOptionsMap: object = {};
  public popupOptionsMap: object = {};
  public currentView: string = 'list-view';
  public showHeadlines: boolean = false;
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
  public _chartPanelData: any = {
    xAxisData: [
      'Jan\'16', 'Feb\'16', 'Mar\'16', 'May\'16', 'Jun\'16', 'Jul\'16', 'Aug\'16', 'Sep\'16', 'Oct\'16', 'Nov\'16', 'Dec\'16',
      'Jan\'16', 'Feb\'16', 'Mar\'16', 'May\'16', 'Jun\'16', 'Jul\'16', 'Aug\'16', 'Sep\'16', 'Oct\'16', 'Nov\'16', 'Dec\'16',
      'Jan\'16', 'Feb\'16', 'Mar\'16', 'May\'16', 'Jun\'16', 'Jul\'16', 'Aug\'16', 'Sep\'16', 'Oct\'16', 'Nov\'16', 'Dec\'16',
      'Jan\'16', 'Feb\'16', 'Mar\'16', 'May\'16', 'Jun\'16', 'Jul\'16', 'Aug\'16', 'Sep\'16', 'Oct\'16', 'Nov\'16', 'Dec\'16',
      'Jan\'16', 'Feb\'16', 'Mar\'16', 'May\'16', 'Jun\'16', 'Jul\'16', 'Aug\'16', 'Sep\'16', 'Oct\'16', 'Nov\'16', 'Dec\'16',
    ],
    yAxisData: [48.63, 48.55, 48.47, 48.39, 48.32, 48.35, 48.32, 48.27, 48.23, 48.20, 48.16, 48.12, 48.09, 48.06, 48.02, 47.98, 47.95, 47.92, 47.88, 47.85, 47.82, 47.79, 47.76, 47.74, 47.62, 47.60, 47.60, 47.60, 47.60, 47.60, 47.60, 47.56, 47.51, 47.47, 47.43, 47.39, 47.35, 47.32, 47.29, 47.29, 47.31, 47.34, 47.34, 47.33, 47.33, 47.33, 47.33, 47.32, 47.31, 47.30, 47.29, 47.28, 47.27, 47.27, 47.24]
  };

  constructor(private sharedService: SharedService,
              private router: Router,
              private ideaListProvider: IdeaListProvider,
              private chartService: ChartService) {
  }

  ngOnInit() {
    this.sharedService.symbolListValues$
      .switchMap(val => this.sharedService.symbolList({listId: val['list_id']}))
      .subscribe(res => {
          this.clearOrderByObject();
          this.clearIdeasLists();
          this.selectedListId = res['list_id'];
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

    this.sharedService.powerBarHeader$.subscribe(res => this.selectedListName = res['name']);
    this.sharedService.additionalLists$.subscribe(val => this.additionalLists = val);
  }

  updateChart() {
    //Not using in code only for future use for ali
    // this.userProfile.sendData();
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
          this.headlines = res['headlines'].filter((item, index) => index < 7);
        })
    }
  }

  clearOrderByObject() {
    this.orderByObject = {};
  }

  setOrderByObject(val: string, order: boolean) {
    this.orderByObject['field'] = val;
    this.orderByObject['ascending'] = order;
  }

  clearIdeasLists() {
    this.loadedStockIdeas = 0;
    this.panelViewIdeasList = [];
    this.ideaList = [];
  }

  assignSelectedStock(res) {
    this.selectedStockPGR = res['pgr'];
    this.selectedStockChartPoints = res['chart-points'];
    this.selectedStockSimilars = res['discovery-similars'].stocks;
    this.intraDayChart(this.selectedStockChartPoints, `${this.selectedStock.symbol}-chart-container`);
  }

  intraDayChart(data, chartClass) {
    /*
     For ALi understanding( chart for card view )
     Some points need to notice  before draw chart.
     1. Make sure that xAxisData has string values and yAxisData has Int/Float values.
     2. length of  xAxisData and yAxisData data array has same length.
     3. Before draw chart make sure that div have width and height prperty(For the time i'm apply inline style).
     4. update hardCoded chart data with your api data.
     */

    let chartData = {
      xAxisData: [
        'Jan\'16', 'Feb\'16', 'Mar\'16', 'May\'16', 'Jun\'16', 'Jul\'16', 'Aug\'16', 'Sep\'16', 'Oct\'16', 'Nov\'16', 'Dec\'16',
        'Jan\'16', 'Feb\'16', 'Mar\'16', 'May\'16', 'Jun\'16', 'Jul\'16', 'Aug\'16', 'Sep\'16', 'Oct\'16', 'Nov\'16', 'Dec\'16',
        'Jan\'16', 'Feb\'16', 'Mar\'16', 'May\'16', 'Jun\'16', 'Jul\'16', 'Aug\'16', 'Sep\'16', 'Oct\'16', 'Nov\'16', 'Dec\'16',
        'Jan\'16', 'Feb\'16', 'Mar\'16', 'May\'16', 'Jun\'16', 'Jul\'16', 'Aug\'16', 'Sep\'16', 'Oct\'16', 'Nov\'16', 'Dec\'16',
        'Jan\'16', 'Feb\'16', 'Mar\'16', 'May\'16', 'Jun\'16', 'Jul\'16', 'Aug\'16', 'Sep\'16', 'Oct\'16', 'Nov\'16', 'Dec\'16',
      ],
      yAxisData: [48.63, 48.55, 48.47, 48.39, 48.32, 48.35, 48.32, 48.27, 48.23, 48.20, 48.16, 48.12, 48.09, 48.06, 48.02, 47.98, 47.95, 47.92, 47.88, 47.85, 47.82, 47.79, 47.76, 47.74, 47.62, 47.60, 47.60, 47.60, 47.60, 47.60, 47.60, 47.56, 47.51, 47.47, 47.43, 47.39, 47.35, 47.32, 47.29, 47.29, 47.31, 47.34, 47.34, 47.33, 47.33, 47.33, 47.33, 47.32, 47.31, 47.30, 47.29, 47.28, 47.27, 47.27, 47.24]
    };
    //yAxisData: data['dema']
    this.drawPanelChart(chartData, chartClass);

  }

  drawPanelChart(chartData, chartClass) {
    if (document.getElementById(chartClass)) {
      let ele = document.getElementById(chartClass);
      ele.removeChild(ele.childNodes[0]);
    }
    this.chartService.interactiveAreaChartControler.init({data: chartData, id: chartClass});
  }

  assignStockData(amount: number) {
    let loadNum = this.loadedStockIdeas + amount; // 0 + 4
    if (this.ideaList && this.loadedStockIdeas < this.ideaList.length) {
      this.ideaList.map((stock, index) => {
        if (index >= this.loadedStockIdeas && index < loadNum) {
          this.getSelectedStockData(stock as Idea, res => {
            this.clearOrderByObject();
            this.panelViewIdeasList.push(res);
            this.loadedStockIdeas++;
          })
        }
      })
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

  toggleAdditionalLists() {
    this.toggleAdditionalIdeasLists.emit(null);
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

  checkIfUserList(listName) {
    switch (listName) {
      case 'Ideas for You':
      case 'Holding':
      case 'Watching':
        return true;
      default:
        return false;
    }
  }

  checkIfBullList(listName) {
    switch (listName) {
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

  checkIfBearList(listName) {
    switch (listName) {
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
