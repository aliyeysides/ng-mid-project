import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SharedService} from '../shared/shared.service';
import {SignalService} from '../shared/signal.service';
@Component({
  selector: 'mid-tier-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class IdeasComponent implements OnInit {
  private userId = '1024494';
  public userList: Array<object> = [];
  public symbolList: Array<object>;
  public activeUserList = {name: ''};

  public activeClassStyle = ['strong', 'hold', 'weak'];
  public ratingMap = ['WEAK', 'NEUTRAL', 'STRONG'];

  constructor(private sharedService: SharedService, private signalService: SignalService) {
  }

  ngOnInit() {
    this.updateUserList();
  }

  public updateUserList() {
    this.sharedService.userList(this.userId)
      .subscribe(res => {
          this.userList = res;
          this.updateActiveUser(this.userList[0]);
        },
        err => console.log('err', err));
  }

  public updateActiveUser(val) {
    if (this.activeUserList !== val) {
      this.activeUserList = val;
      this.sharedService.symbolList({userId: this.userId, listId: this.activeUserList['list_id']})
        .subscribe(res => {
            // let demo = { "list_id": "1093572", "PowerBar": "0,6,4", "listRating": "NULL", "symbols": [{ "symbol": "FB", "raw_PGR": 3, "industry_name": "Computer Software-Services", "Change": 0.13, "filter": 1, "Last": 152.09, "signals": "100000000000", "market_cap": 440899.53125, "div_yield": 1.8620788E7, "name": "Facebook Inc-A", "list_rating": 65, "PGR": 3, "TechnicalRating ": 3, "Percentage ": 0.09, "industry_ListID ": 44343, "SummaryRating ": 1 }, { "symbol": "MSFT", "raw_PGR": 4, "industry_name": "Computer Software-Services", "Change": 0.41, "filter": 1, "Last": 70.025, "signals": "000000000000", "market_cap": 540618, "div_yield": 2.3489114E7, "name": "Microsoft Corp", "list_rating": 65, "PGR": 4, "TechnicalRating ": 3, "Percentage ": 0.59, "industry_ListID ": 44343, "SummaryRating ": 1 }, { "symbol": "ARES", "raw_PGR": 4, "industry_name": "Invest BKRS-MGRS", "Change": -0.07, "filter": 1, "Last": 18.23, "signals": "000000000000", "market_cap": 1500.30895, "div_yield": 94014.39843, "name": "Ares Management", "list_rating": 58, "PGR": 3, "TechnicalRating ": 1, "Percentage ": -0.38, "industry_ListID ": 44344, "SummaryRating ": 1 }, { "symbol": "IFON", "raw_PGR": 5, "industry_name": "Telecommunications Equipment", "Change": -0.01, "filter": 0, "Last": 0.41, "signals": "000000000000", "market_cap": 6.0433, "div_yield": 322358.34375, "name": "Infosonics Corp", "list_rating": 58, "PGR": 5, "TechnicalRating ": 3, "Percentage ": -2.38, "industry_ListID ": 44351, "SummaryRating ": 1 }, { "symbol": "V", "raw_PGR": 2, "industry_name": "Business Service", "Change": -0.33, "filter": 1, "Last": 94.71, "signals": "000000000000", "market_cap": 199322.67187, "div_yield": 7103294.5, "name": "Visa Inc-A", "list_rating": 57, "PGR": 3, "TechnicalRating ": 3, "Percentage ": -0.35, "industry_ListID ": 44353, "SummaryRating ": 1 }, { "symbol": "SPY", "raw_PGR": 0, "Change": 0.01, "filter": 1, "Last": 241.77, "signals": "000000000000", "market_cap": 231565.95312, "div_yield": 6.8390136E7, "name": "SPDR S&P 500 ETF", "list_rating": 75, "PGR": 0, "TechnicalRating ": 3, "Percentage ": 0, "industry_ListID ": 0, "SummaryRating ": 1 }, { "symbol": "ATLO", "raw_PGR": 3, "industry_name": "Banks & Thrifts", "Change": 0, "filter": 0, "Last": 0, "signals": "000000000000", "market_cap": 279.32699, "div_yield": 6026.85009, "name": "Ames Natl Cp", "list_rating": 52, "PGR": 3, "TechnicalRating ": 1, "Percentage ": 0, "industry_ListID ": 44356, "SummaryRating ": 1 }, { "symbol": "H", "raw_PGR": 4, "industry_name": "Leisure Service", "Change": 0.29, "filter": 1, "Last": 57.84, "signals": "000000000000", "market_cap": 7217.89697, "div_yield": 867055.875, "name": "Hyatt Hotels Cp", "list_rating": 65, "PGR": 4, "TechnicalRating ": 3, "Percentage ": 0.5, "industry_ListID ": 44358, "SummaryRating ": 1 }, { "symbol": "AAPL", "raw_PGR": 4, "industry_name": "Computer-Office Equipment", "Change": -0.06, "filter": 1, "Last": 153.81, "signals": "000000000000", "market_cap": 800897.9375, "div_yield": 3.0472246E7, "name": "Apple Inc", "list_rating": 56, "PGR": 4, "TechnicalRating ": 3, "Percentage ": -0.04, "industry_ListID ": 44366, "SummaryRating ": 1 }, { "symbol": "FENX", "raw_PGR": 3, "industry_name": "Autos-Tires-Trucks", "Change": -0.08, "filter": 0, "Last": 1.12, "signals": "000000000000", "market_cap": 22.156, "div_yield": 94700.25, "name": "Fenix Parts Inc", "list_rating": 65, "PGR": 3, "TechnicalRating ": 3, "Percentage ": -6.67, "industry_ListID ": 44378, "SummaryRating ": 1 }, { "symbol": "JPM", "raw_PGR": 5, "industry_name": "Banks-Major", "Change": 0.19, "filter": 1, "Last": 85.54, "signals": "000000000000", "market_cap": 303267.375, "div_yield": 1.2139892E7, "name": "Jpmorgan Chase", "list_rating": 65, "PGR": 3, "TechnicalRating ": 1, "Percentage ": 0.22, "industry_ListID ": 44390, "SummaryRating ": 1 }] }
            this.symbolList = res['symbols'];
            for (let i = 0, len = res['symbols'].length; i < len; i++) {
              this.symbolList[i]['parsedSignals'] = this.signalService.parseSignal(this.symbolList[i]['signals']);
            }
          },
          err => console.log('err', err));
    }

  }

  public getSignal(res) {
    return this.signalService.getSignal(res);
  }

  public getClassStyle(val) {
    let returnVal: string;
    if (val > 0) {
      returnVal = this.activeClassStyle[0];
    } else if (val < 0) {
      returnVal = this.activeClassStyle[2];
    } else {
      returnVal = this.activeClassStyle[1];
    }
    return returnVal;
  }

  public calculateMarketCap(val) {
    return val < 1000 ? ((val).toFixed(2) + 'm') : (val / 1000).toFixed(2) + 'b';
  }

  public roundOff(num) {
    return Math.round(num * 100) / 100;
  }

  public trendRating(rating) {
    /*if rating is less than or equal to zero then return NONE for technical Rating*/
    if (rating <= 0) {
      return 'NONE';
    } else {
      return this.ratingMap[rating - 1];
    }
  }

  public industryRating(rating, list_rating) {
    return rating === 0 ? this.listRating('NONE') : this.listRating(list_rating);
  }

  public listRating(rating) {
    if (!isNaN(rating)) {
      return (rating > 50) ? 'STRONG' : 'WEAK';
    } else {
      return rating;
    }
  }

  public appendPGRImage(pgr) {
    const imageUrl = 'assets/images/';
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

  /*public sub(res){
   this.symbolList = res.map(function(item, index) {
   //item['parsedSignals'] = this.signalService.parseSignal(item.signals);
   item['parsedSignals'] = {};
   item['parsedSignals'] = this.signalService.parseSignal(item.signals);
   console.log(item)
   return item;
   });
   }*/
}

