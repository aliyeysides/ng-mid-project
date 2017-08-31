import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {Router} from '@angular/router';
import {Idea} from '../../shared/models/idea';
import {Subscription} from 'rxjs/Subscription';
import {ChartService} from '../../shared/charts/chart.service';
import {SignalService} from '../../shared/signal.service';
import {ListSelectionService} from '../../shared/list-selection/list-selection.service';
import {IdeaListProvider} from '../../providers/idea-list.provider';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})

export class ListViewComponent implements OnInit, OnDestroy {
  private userId = '1024494';
  private additionalListsSub: Subscription;
  private selectedListSubscription: Subscription;
  private symbolListValuesSubscription: Subscription;
  private addStockIntoHoldingListSubscription: Subscription;
  private addStockIntoWatchingListSubscription: Subscription;
  private removeFromListSubscription: Subscription;
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
              private ideaListProvider: IdeaListProvider,
              private listSelectionService: ListSelectionService,
              private router: Router,
              private chartService: ChartService,
              private signalService: SignalService) {
  }

  ngOnInit() {
    this.symbolListValuesSubscription = this.ideaListProvider.symbolListValues$
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
          this.sharedService.handleError(err);
        }
      );

    this.selectedListSubscription = this.ideaListProvider.selectedList$.subscribe(res => this.selectedListName = res['name']);
    this.additionalListsSub = this.listSelectionService.isShown$.subscribe(val => this.additionalLists = val);
  }

  ngOnDestroy() {
    this.additionalListsSub.unsubscribe();
    this.selectedListSubscription.unsubscribe();
    this.symbolListValuesSubscription.unsubscribe();
    if (this.loading) this.loading.unsubscribe();
    if (this.headlinesLoading) this.headlinesLoading.unsubscribe();
    if (this.symbolListLoading) this.symbolListLoading.unsubscribe();
    if (this.addStockIntoHoldingListSubscription) this.addStockIntoHoldingListSubscription.unsubscribe();
    if (this.addStockIntoWatchingListSubscription) this.addStockIntoWatchingListSubscription.unsubscribe();
  }

  public updateChart() {
    //Not using in code only for future use for ali
    // this.userProfile.sendData();
  }

  public onScroll() {
    this.assignStockData(2);
  }

  public selectStock(stock: Idea) {
    this.selectedStock = stock;
    if (stock) {
      this.getSelectedStockData(stock, this.assignSelectedStock.bind(this));
      this.getSelectedStockHeadlines(stock);
    }
  }

  public getSelectedStockData(stock: Idea, callback?) {
    if (stock) {
      this.loading = this.sharedService.getStockCardData(stock.symbol)
        .subscribe(res => {
          return callback(res);
        });
    }
  }

  public getSelectedStockHeadlines(stock: Idea) {
    if (stock) {
      this.headlinesLoading = this.sharedService.getHeadlines(stock.symbol)
        .subscribe(res => {
          this.headlines = res['headlines'].filter((item, index) => index < 7);
        })
    }
  }

  public setOrderByObject(val: string, order: boolean, e: Event) {
    e.preventDefault();
    this.orderByObject['field'] = val;
    this.orderByObject['ascending'] = order;
  }

  public assignSelectedStock(res) {
    this.selectedStockPGR = res['pgr'];
    this.selectedStockChartPoints = res['chart-points'];
    this.selectedStockSimilars = res['discovery-similars'].stocks;
    this.intraDayChart(this.selectedStockChartPoints, `${this.selectedStock.symbol}-chart-container`);
  }

  public intraDayChart(data, chartClass) {
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

  public drawPanelChart(chartData, chartClass) {
    if (document.getElementById(chartClass)) {
      let ele = document.getElementById(chartClass);
      ele.removeChild(ele.childNodes[0]);
    }
    this.chartService.interactiveAreaChartControler.init({data: chartData, id: chartClass});
  }

  public assignStockData(amount: number) {
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

  public toggleHoverOptions(idea) {
    if (!this.mouseHoverOptionsMap[idea.symbol] || this.mouseHoverOptionsMap[idea.symbol] == false) {
      this.mouseHoverOptionsMap[idea.symbol] = true;
      return;
    }
    this.mouseHoverOptionsMap[idea.symbol] = !this.mouseHoverOptionsMap[idea.symbol];
  }

  public toggleOptions(idea, e) {
    e.stopPropagation();
    if (!this.popupOptionsMap[idea.symbol] || this.popupOptionsMap[idea.symbol] == false) {
      this.popupOptionsMap = {};
      this.popupOptionsMap[idea.symbol] = true;
      return;
    }
    this.popupOptionsMap[idea.symbol] = !this.popupOptionsMap[idea.symbol];
    this.mouseHoverOptionsMap = {};
  }

  public toggleHeadlines() {
    this.showHeadlines = !this.showHeadlines;
  }

  public toggleListSelectionView() {
    this.additionalLists = !this.additionalLists;
    this.listSelectionService.setIsShown(this.additionalLists);
  }

  public goToStockView(stock: (Idea | string), e) {
    e.stopPropagation();
    if (typeof stock === 'object') {
      this.router.navigate(['/report', stock.symbol]);
    }
    if (typeof stock === 'string') {
      this.router.navigate(['/report', stock]);
    }
  }

  public goToHeadline(headline) {
    window.open(headline.url, '_blank');
  }

  public addToHoldingList(stock: any, e) {
    e.stopPropagation();
    this.addStockIntoHoldingListSubscription = this.sharedService.addStockIntoHoldingList(stock)
      .subscribe(res => {
        console.log('res from addToList', res);
      });
  }

  public addToWatchingList(stock: any, e) {
    e.stopPropagation();
    this.addStockIntoWatchingListSubscription = this.sharedService.addStockIntoWatchingList(stock)
      .subscribe(res => {
        console.log('res from addToList', res);
      });
  }

  public removeFromList(stock: any, listId: string, e) {
    e.stopPropagation();
    this.removeFromListSubscription = this.sharedService.deleteSymbolFromList(stock.symbol, listId)
      .subscribe(res => {
        console.log('res from removeFromList', res);
      });
  }

  public checkIfUserList(listName) {
    return this.sharedService.checkIfUserList(listName);
  }

  public checkIfBullList(listName) {
    return this.sharedService.checkIfBullList(listName);
  }

  public checkIfBearList(listName) {
    return this.sharedService.checkIfBearList(listName);
  }

  public checkIfThemeList(listName) {
    return this.sharedService.checkIfThemeList(listName);
  }

  public gotoPanelView() {
    this.currentView = 'panel-view';
  }

  public gotoListView() {
    this.currentView = 'list-view';
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

  private clearOrderByObject() {
    this.orderByObject = {};
  }

  private clearIdeasLists() {
    this.loadedStockIdeas = 0;
    this.panelViewIdeasList = [];
    this.ideaList = [];
  }

}
