'use strict';
import {Component, OnInit, ViewEncapsulation, ElementRef, OnDestroy} from '@angular/core';
import {SharedService} from '../shared.service';
import {SidePanelProvider} from 'app/providers/side-panel.provider';
import {PagerProvider} from 'app/providers/paging.provider';
import {IdeaListProvider} from 'app/providers/idea-list.provider';
import {ChartService} from '../charts/chart.service';

import * as moment from 'moment-timezone'

import * as d3 from 'd3';
import {Subscription} from 'rxjs/Subscription';

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
  private wholeIdeasListSubscription: Subscription;
  private alertsDataSubscription: Subscription;
  private initialMarketSectorDataSubscription: Subscription;
  private updateInitialSectorDataSubscription: Subscription;
  private recentIntraDayPriceSubscription: Subscription;
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

    this.wholeIdeasListSubscription = this.ideaListProvider.wholeIdeasList$
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
    this.wholeIdeasListSubscription.unsubscribe();
    if (this.loading) this.loading.unsubscribe();
    if (this.alertsDataSubscription) this.alertsDataSubscription.unsubscribe();
    if (this.initialMarketSectorDataSubscription) this.initialMarketSectorDataSubscription.unsubscribe();
    if (this.recentIntraDayPriceSubscription) this.recentIntraDayPriceSubscription.unsubscribe();
  }

  public getIntraDayChartData(symbol: string, index, chartClass) {

    this.loading = this.sidePanelProvider.getIntraDayChartData({symbol: symbol})
      .subscribe(res => {
          this.intraDayChartData = res;
          //let data = {"date":"2017-06-26","holidayStatus":"0","last":243.53,"timeIntervals":["09:30:49","09:32:02","09:33:14","09:34:27","09:35:39","09:36:52","09:38:05","09:39:17","09:40:29","09:41:42","09:42:54","09:44:07","09:45:19","09:46:32","09:47:44","09:48:57","09:50:09","09:51:22","09:52:34","09:53:47","09:54:59","09:56:12","09:57:24","09:58:37","09:59:50","10:01:02","10:02:15","10:03:27","10:04:40","10:05:52","10:07:05","10:08:17","10:09:30","10:10:42","10:11:55","10:13:07","10:14:20","10:15:32","10:16:44","10:17:57","10:19:09","10:20:22","10:21:34","10:22:47","10:23:59","10:25:12","10:26:25","10:27:37","10:28:50","10:30:02","10:31:15","10:32:27","10:33:40","10:34:53","10:36:06","10:37:18","10:38:31","10:39:44","10:40:56","10:42:08","10:43:21","10:44:33","10:45:46","10:46:58","10:48:10","10:49:23","10:50:35","10:51:47","10:53:00","10:54:12","10:55:25","10:56:37","10:57:50","10:59:02","11:00:15","11:01:27","11:02:39","11:03:52","11:05:05","11:06:17","11:07:29","11:08:42","11:09:55","11:11:07","11:12:19","11:13:32","11:14:44","11:15:57","11:17:09","11:18:22","11:19:34","11:20:46","11:21:59","11:23:11","11:24:24","11:25:36","11:26:48","11:28:01","11:29:13","11:30:26","11:31:38","11:32:51","11:34:03","11:35:15","11:36:28","11:37:41","11:38:53","11:40:05","11:41:18","11:42:30","11:43:43","11:44:55","11:46:09","11:47:21","11:48:34","11:49:46","11:50:59","11:52:11","11:53:24","11:54:36","11:55:48","11:57:01","11:58:13","11:59:26","12:00:38","12:01:50","12:03:03","12:04:15","12:05:28","12:06:40","12:07:53","12:09:05","12:10:18","12:11:30","12:12:43","12:13:55","12:15:08","12:16:20","12:17:33","12:18:46","12:19:58","12:21:10","12:22:23","12:23:35","12:24:48","12:26:00","12:27:12","12:28:25","12:29:37","12:30:49","12:32:02","12:33:15","12:34:28","12:35:40","12:36:52","12:38:05","12:39:17","12:40:30","12:41:42","12:42:55","12:44:07","12:45:20","12:46:32","12:47:45","12:48:57","12:50:09","12:51:22","12:52:34","12:53:46","12:54:59","12:56:11","12:57:24","12:58:36","12:59:49","13:01:01","13:02:14","13:03:26","13:04:39","13:05:51","13:07:04","13:08:16","13:09:28","13:10:41","13:11:54","13:13:06","13:14:19","13:15:31","13:16:44","13:17:57","13:19:09","13:20:22","13:21:34","13:22:46","13:23:59","13:25:11","13:26:24","13:27:37","13:28:49","13:30:02","13:31:14","13:32:27","13:33:39","13:34:52","13:36:04","13:37:17","13:38:29","13:39:42","13:40:54","13:42:06","13:43:19","13:44:31","13:45:44","13:46:56","13:48:09","13:49:21","13:50:34","13:51:46","13:52:58","13:54:11","13:55:23","13:56:36","13:57:48","13:59:00","14:00:13","14:01:25","14:02:38","14:03:51","14:05:03","14:06:16","14:07:28","14:08:41","14:09:53","14:11:05","14:12:18","14:13:30","14:14:42","14:15:55","14:17:07","14:18:19","14:19:32","14:20:44","14:21:57","14:23:09","14:24:21","14:25:34","14:26:46","14:27:58","14:29:11","14:30:23","14:31:36","14:32:48","14:34:00"],"isGapUp":"1","isHeavyVolume":"0","percentageChange":0.16,"is52WeekHighToday":"0","change":0.4,"isGapDown":"0","is52WeekLowToday":"0","isPreMarketTime":"0","volume":"33.92m","previousClose":"243.13","high":"244.38","intraDayPrices":[243.89,243.97,243.94,243.99,244.01,243.97,243.94,244.07,244.09,244.11,244.16,244.2,244.21,244.26,244.25,244.2,244.17,244.24,244.26,244.23,244.27,244.29,244.3,244.32,244.36,244.2,244.16,244.21,244.21,244.26,244.22,244.22,244.16,244.14,244.1,244.15,244.18,244.16,244.07,244.03,244.02,244.04,244.01,244.07,244.11,244.13,244.17,244.11,244.09,244.17,244.14,244.12,244.03,244.04,243.96,243.76,243.76,243.67,243.5,243.47,243.5,243.51,243.37,243.48,243.49,243.49,243.47,243.44,243.48,243.47,243.41,243.3,243.34,243.43,243.43,243.37,243.37,243.22,243.21,243.12,243.17,243.2,243.21,243.25,243.22,243.31,243.36,243.35,243.33,243.29,243.31,243.32,243.28,243.3,243.37,243.46,243.43,243.41,243.37,243.35,243.31,243.36,243.3,243.21,243.25,243.25,243.38,243.34,243.38,243.49,243.59,243.6,243.59,243.58,243.56,243.57,243.59,243.56,243.61,243.57,243.55,243.55,243.59,243.66,243.67,243.67,243.66,243.7,243.69,243.61,243.56,243.58,243.61,243.61,243.59,243.56,243.57,243.54,243.5,243.53,243.52,243.55,243.54,243.56,243.5,243.47,243.51,243.48,243.49,243.48,243.48,243.55,243.56,243.61,243.62,243.64,243.66,243.71,243.71,243.74,243.71,243.75,243.7,243.68,243.66,243.66,243.71,243.73,243.78,243.77,243.7,243.69,243.71,243.71,243.71,243.72,243.65,243.65,243.67,243.67,243.66,243.71,243.63,243.62,243.62,243.58,243.51,243.54,243.54,243.54,243.55,243.54,243.57,243.58,243.56,243.56,243.56,243.56,243.6,243.6,243.59,243.59,243.65,243.6,243.6,243.62,243.63,243.62,243.61,243.6,243.56,243.59,243.56,243.57,243.52,243.51,243.51,243.55,243.54,243.56,243.6,243.61,243.59,243.57,243.56,243.54,243.58,243.59,243.57,243.6,243.56,243.52,243.45,243.47,243.53,243.5,243.47,243.48,243.47,243.49,243.49,243.47,243.47,243.43,243.42,243.5,243.5,243.5,243.5,243.47,243.47,243.53],"low":"243.04","summaryText":"Gap up at open.","time":"","open":"243.90"};
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
    this.alertsDataSubscription = this.sidePanelProvider.getAlertsData(query)
      .subscribe(res => {

          this.alertCount.upCount = 0;
          this.alertCount.downCount = 0
          this.alertList = res['alerts'];
          //	let dummy = { "pgr_change_alerts": { "2017-06-17": { "SymbolsTurnedBearish": { "WAFD": -6.52, "MDP": -6.18 }, "SymbolsTurnedBullish": { "XRX": 30.73 } }, "2017-06-10": { "SymbolsTurnedBearish": {}, "SymbolsTurnedBullish": { "CMA": 39.69 } }, "DataAvailable": true, "2017-07-01": { "SymbolsTurnedBearish": { "USPH": -20.82, "SHAK": -45.15 }, "SymbolsTurnedBullish": {} } }, "earnings_surprise_alerts": { "NegativeEarningSurprises": {}, "PositiveEarningSurprises": { "COO": { "data": [2.5, 2.25, 11.11, 78.47], "quarter": "2" } } }, "estimate_revision_alerts": { "NegativeAnalystRevisions": { "JMBA": { "data": [-0.09, -0.04, -125, 33.73], "quarter": "1" }, "BAC": { "data": [0.46, 0.48, -4.166667, 68.93], "quarter": "4" }, "AGN": { "data": [3.98, 4, -0.5, 34.92], "quarter": "1" } }, "PositiveAnalystRevisions": { "COO": { "data": [2.56, 2.53, 1.185771, 78.47], "quarter": "1" }, "CMA": { "data": [1.09, 1.07, 1.869159, 88.89], "quarter": "2" }, "XRX": { "data": [0.84, 0.82, 2.439024, 93.71], "quarter": "2" } } } }

          // set items to json response
          this.allItems = []

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
    this.initialMarketSectorDataSubscription = this.sidePanelProvider.initialMarketSectorData({components: 'majorMarketIndices,sectors'})
      .subscribe(res => {
          this.initialData = res;
          this.marketsData = this.initialData['market_indices'];
          this.sectorsData = this.initialData['sectors_data']['symbolsList']
            .sort((a,b) => {
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
    this.updateInitialSectorDataSubscription = this.sidePanelProvider.updateInitialSectorData({'listId': listId})
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
    this.recentIntraDayPriceSubscription = this.sidePanelProvider.getRecentIntraDayPriceForSymbol({symbol: symbol})
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
