'use strict';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {SidePanelProvider} from 'app/providers/side-panel.provider';
import {PagerProvider} from 'app/providers/paging.provider';
import {IdeaListProvider} from 'app/providers/idea-list.provider';
import {ChartService} from '../charts/chart.service';

import * as moment from 'moment-timezone'

import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'side-panel',
  templateUrl: './side-panel.component.html',
  styles: [`a {
    cursor: pointer;
  }

  .contol-bullet {
    width: 9px;
    height: 9px;
    background: #d8d8d8;
    border-radius: 50%;
    margin: 2px;
  }

  .contol-bullet.active {
    background: #9b9b9b;
  }
  `],
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();

  public intraDayChartData: Array<object>;
  public initialData: Array<object>;
  public sectorsData: Array<object>;
  public marketsData: Array<object>;
  public marketDropdown: any = {'0': true};
  public timer: any = [];
  public alertList: Array<object>;
  public presentDate: any;
  public date: string;
  public time: string;
  public sectorClass: boolean = false;
  public alertClass: boolean = true;
  public insightsClass: boolean = true;
  public sectorCount: any = {
    downCount: null,
    upCount: null
  };
  public alertCount: any = {
    downCount: null,
    upCount: null
  };
  public description = {
    0: 'None',
    1: 'Very Bearish',
    2: 'Bearish',
    3: 'Neutral',
    4: 'Bullish',
    5: 'Very Bullish'
  };
  public loading: Subscription;
  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  public symbol: string = 'SPY';

  constructor(private sidePanelProvider: SidePanelProvider, private ideaListProvider: IdeaListProvider, private pagerProvider: PagerProvider, private chartService: ChartService) {
    setInterval(() => {
      this.presentDate = moment.tz(new Date, 'America/New_York');
      this.date = this.presentDate.format('ddd MMM DD');
      this.time = this.presentDate.format('h:mma');
    }, 1000);
  }

  ngOnInit() {
    this.initialMarketSectorData();

    /*Call intraDay chart and set symbol*/
    this.symbol = 'SPY';
    this.getIntraDayChartData(this.symbol, '0', `${this.symbol}-chart-container`);

    this.ideaListProvider.wholeIdeasList$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        let ideasListForApiCall;
        ideasListForApiCall = res.filter((key, index, array) => {
          return key['name'] == 'Holding' || key['name'] == 'Watching';
        });
        this.getAlertSidePanelData({
          components: 'alerts',
          date: '2017-06-30',
          startDate: '2017-06-01',
          endDate: '2017-07-03',
          listId1: 1017347,//ideasListForApiCall[0]['list_id'],
          listId2: 1219662//ideasListForApiCall[1]['list_id']
        });
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getIntraDayChartData(symbol: string, index, chartClass) {

    this.sidePanelProvider.getIntraDayChartData({symbol: symbol})
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
          this.intraDayChartData = res;
          this.timer[index] = setInterval(() => {
            this.getRecentIntraDayPriceForSymbol(symbol);
          }, 72000);

          this.intraDayChart(res, chartClass);
        },
        err => console.log('err', err));
  }

  public intraDayChart(data, chartClass) {
    if (data['isPreMarketTime'] == '0') {
      let chartData = {
        xAxisData: data.timeIntervals,
        yAxisData: data.intraDayPrices,
        midValue: parseFloat(data.previousClose)
      };
      this.chartService.realTimeAreaChartControler.init({data: chartData, id: chartClass});
    }
  }

  public getAlertSidePanelData(query) {
    this.sidePanelProvider.getAlertsData(query)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {

          this.alertCount.upCount = 0;
          this.alertCount.downCount = 0;
          this.alertList = res['alerts'];

          // set items to json response
          this.allItems = [];

          for (var key in this.alertList['earnings_surprise_alerts']) {
            for (var obj in this.alertList['earnings_surprise_alerts'][key]) {
              let jsonObj = {};
              jsonObj['symbol'] = obj;
              jsonObj['alert_type'] = 'earnings_surprise_alerts';
              jsonObj['quarter'] = this.alertList['earnings_surprise_alerts'][key][obj]['quarter'];
              jsonObj['pgr'] = this.calculatePGR(this.alertList['earnings_surprise_alerts'][key][obj]['data'][3]);
              jsonObj['new_value'] = this.alertList['earnings_surprise_alerts'][key][obj]['data'][0];
              jsonObj['old_value'] = this.alertList['earnings_surprise_alerts'][key][obj]['data'][1];
              jsonObj['per_change'] = this.alertList['earnings_surprise_alerts'][key][obj]['data'][2];
              this.allItems.push(jsonObj);
              if (jsonObj['per_change'] > 0) {
                this.alertCount.upCount++;
              } else if (jsonObj['per_change'] < 0) {
                this.alertCount.downCount++;
              } else {
              }
            }
          }
          for (var key in this.alertList['estimate_revision_alerts']) {
            for (var obj in this.alertList['estimate_revision_alerts'][key]) {
              let jsonObj = {};
              jsonObj['symbol'] = obj;
              jsonObj['alert_type'] = 'estimate_revision_alerts';
              jsonObj['quarter'] = this.alertList['estimate_revision_alerts'][key][obj]['quarter'];
              jsonObj['pgr'] = this.calculatePGR(this.alertList['estimate_revision_alerts'][key][obj]['data'][3]);
              jsonObj['new_value'] = this.alertList['estimate_revision_alerts'][key][obj]['data'][0];
              jsonObj['old_value'] = this.alertList['estimate_revision_alerts'][key][obj]['data'][1];
              jsonObj['per_change'] = this.alertList['estimate_revision_alerts'][key][obj]['data'][2];
              this.allItems.push(jsonObj);
              if (jsonObj['per_change'] > 0) {
                this.alertCount.upCount++;
              } else {
                this.alertCount.downCount++;
              }
            }
          }

          /*Check if pgr-alerts are present.*/
          if (this.alertList['pgr_change_alerts']['DataAvailable'] == true) {
            for (var key in this.alertList['pgr_change_alerts']) {
              if (key != 'DataAvailable') {
                for (var obj in this.alertList['pgr_change_alerts'][key]) {
                  let jsonObj = {};
                  jsonObj['symbol'] = obj;
                  jsonObj['alert_type'] = 'pgr_change_alerts';
                  jsonObj['pgr'] = this.calculatePGR(this.alertList['pgr_change_alerts'][key][obj]['corrected_pgr']);
                  jsonObj['per_change'] = this.alertList['pgr_change_alerts'][key][obj]['chg_direction'];
                  this.allItems.push(jsonObj);
                  if (jsonObj['per_change'] > 0) {
                    this.alertCount.upCount++;
                  } else {
                    this.alertCount.downCount++;
                  }
                }
              }
            }
          }

          this.setPage(1);
        },
        err => console.log('err', err));

  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerProvider.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public initialMarketSectorData() {
    this.sidePanelProvider.initialMarketSectorData({components: 'majorMarketIndices,sectors'})
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
          this.initialData = res;
          this.marketsData = this.initialData['market_indices'];
          this.sectorsData = this.initialData['sectors_data']['symbolsList']
            .sort((a, b) => {
              return a.percent_change < b.percent_change;
            });
          this.sectorCount.upCount = this.initialData['sectors_data']['upCount'];
          this.sectorCount.downCount = this.initialData['sectors_data']['downCount'];
          setInterval(() => {
            this.updateInitialSectorData(this.initialData['sectors_data']['list_id']);
          }, 72000);
        },
        err => console.log('err', err));

  }

  public updateInitialSectorData(listId) {
    this.sidePanelProvider.updateInitialSectorData({'listId': listId})
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
          this.mapSectorData(res);
        },
        err => console.log('err', err));
  }

  public mapSectorData(res) {
    let storedMappingResult: any = {};
    let upCount: number = 0, downCount: number = 0;
    res.forEach(function (key, index, array) {
      storedMappingResult[key.Symbol] = key;
    });

    this.sectorsData.forEach(function (key, index, array) {
      let fetchKeyForUpdateData = storedMappingResult[key['symbol']];

      if (typeof fetchKeyForUpdateData !== 'undefined') {
        key['last'] = fetchKeyForUpdateData['Last'];
        key['change'] = fetchKeyForUpdateData['Change'];
        key['percent_change'] = fetchKeyForUpdateData['Percentage '];
        if (key['percent_change'] > 0) {
          upCount++;
        } else if (key['percent_change'] < 0) {
          downCount++;
        } else {
        }
      }
    });
    this.sectorCount.upCount = upCount;
    this.sectorCount.downCount = downCount;
  }

  public appendArrowClass(event, i, symbol) {
    if (this.marketDropdown[i]) {
      this.marketDropdown = {};
      return;
    }
    this.marketDropdown = {};
    this.marketDropdown[i] = true;
    for (let j = 0; j < this.timer.length; j++) {
      clearInterval(this.timer[j]);
    }
    /*Call intraDay chart and set symbol*/
    this.symbol = symbol;
    this.getIntraDayChartData(this.symbol, i, `${this.symbol}-chart-container`);
  }

  public toggleClass(panel: string) {
    if (panel === 'sector') {
      this.sectorClass = !this.sectorClass;
    } else if (panel === 'alert') {
      this.alertClass = !this.alertClass;
    } else if (panel === 'insights') {
      this.insightsClass = !this.insightsClass;
    }
  }

  public getRecentIntraDayPriceForSymbol(symbol) {
    this.sidePanelProvider.getRecentIntraDayPriceForSymbol({symbol: symbol})
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
          if (res['isPreMarketTime'] == '0') {
            this.chartService.realTimeAreaChartControler.appendNewData(res)
          }
        },
        err => console.log('err', err));
  }

  public calculatePGR(pgr) {
    if (pgr >= 0 && pgr < 15) {
      pgr = 1;
    } else if (pgr >= 15 && pgr < 29) {
      pgr = 2;
    } else if (pgr >= 29 && pgr < 59) {
      pgr = 3;
    } else if (pgr >= 59 && pgr < 85) {
      pgr = 4;
    } else if (pgr >= 85) {
      pgr = 5;
    } else {
      pgr = 0;
    }
    return pgr;
  }

  public appendPGRImage(pgr) {
    let imageUrl = 'assets/imgs/';
    if (pgr == 1) {
      return imageUrl + 'arc_VeryBearish.svg'
    }
    else if (pgr == 2) {
      return imageUrl + 'arc_Bearish.svg'
    } else if (pgr == 3) {
      return imageUrl + 'arc_Neutral.svg'
    } else if (pgr == 4) {
      return imageUrl + 'arc_Bullish.svg'
    } else if (pgr == 5) {
      return imageUrl + 'arc_VeryBullish.svg'
    } else {
      return imageUrl + 'arc_None.svg'
    }
  }

}
