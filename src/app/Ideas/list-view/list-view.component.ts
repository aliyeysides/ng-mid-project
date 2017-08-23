import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {Router} from '@angular/router';
import {Idea} from '../../shared/models/idea';
import {Subscription} from 'rxjs/Subscription';
import {ChartService} from '../../shared/charts/chart.service';
import {SignalService} from '../../shared/signal.service';

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
              private chartService: ChartService,
              private signalService: SignalService) {
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

    this.getWordPressListDescriptions();
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
    return this.sharedService.checkIfUserList(listName);
  }

  checkIfBullList(listName) {
    return this.sharedService.checkIfBullList(listName);
  }

  checkIfBearList(listName) {
    return this.sharedService.checkIfBearList(listName);
  }

  gotoPanelView() {
    this.currentView = 'panel-view';
  }

  gotoListView() {
    this.currentView = 'list-view';
  }

  getWordPressListDescriptions() {
    this.sharedService.getWordPressJson('45')
      .subscribe(res => console.log(res));
  }

  public appendPGRImage(pgr) {
    return this.signalService.appendPGRImage(pgr);
  }

  public appendPGRText(pgr) {
    return this.signalService.appendPGRText(pgr);
  }

  public appendPGRClass(pgr) {
    return this.signalService.appendPGRClass(pgr);
  }

  public appendSliderClass(pgr) {
    return this.signalService.appendSliderClass(pgr);
  }

  public appendSliderBarClass(pgr) {
    return this.signalService.appendSliderBarClass(pgr);
  }

}
