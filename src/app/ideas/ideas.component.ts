import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {SignalService} from '../shared/signal.service';
import {IdeaListProvider} from 'app/providers/idea-list.provider'
import {Idea} from '../shared/models/idea';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'mid-tier-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class IdeasComponent implements OnInit {
  private userId = '1024494';
  public ideasList: Array<object>;
  public activeIdeasList: Array<object>;
  public userList: Array<object> = [];
  public symbolList: Array<object>;
  public activeUserList = {name: ''};
  public selectedActiveList: Array<object>;
  public selected: string = 'Holding';
  public additionalLists: boolean = false;

  public activeClassStyle = ['strong', 'hold', 'weak'];
  public ratingMap = ['WEAK', 'NEUTRAL', 'STRONG'];
  public mappingClassArray: any = {
    'Holding': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Watching': {'style': 'list__option--userlist list__option--watching', 'imgName': 'img_list-watching.svg'},
    'Ideas for You': {'style': 'list__option--yourideaslist list__option--ideasforyou', 'imgName': 'img_list-ideasforyou.svg'},
    'Bulls of the Week': {'style': 'list__option--IPlist list__option--classicbulls', 'imgName': 'img_list-classicbulls.svg'},
    'Best Growth Stocks': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Best of the Large Caps': {'style': 'list__option--userlist list__option--largecap', 'imgName': 'img_list-largecap.svg'},
    'Best of the NASDAQ': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Best of the Small Caps': {'style': 'list__option--companylist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Best Under $10': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Best Value Stocks': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Buy the Dips': {'style': 'list__option--chartlist list__option--selldips', 'imgName': 'img_list-selldips.svg'},
    'Insider Confidence': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Money Makers': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Relative Strength Champs': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Money Flow Champs': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Analyst Darlings': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Power Gauge Rating Upgrades': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Best of the Dow': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Earnings Champs': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'sell the Rallies': { 'style': 'list__option--chartlist list__option--sellrallies', 'imgName': 'img_list-buyrallies.svg' },
    'Bears of the Week': { 'style': 'list__option--IPlist list__option--classicbears', 'imgName': 'img_list-classicbears.svg' },
    'Power Gauge Rating Downgrades': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Don\'t Fight the Shorts': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Dogs of the Dow': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Upcoming Earnings Bears': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'},
    'Upcoming Earnings Bulls': {'style': 'list__option--userlist list__option--holding', 'imgName': 'img_list-holding.svg'}

  };

  constructor(private sharedService: SharedService, private signalService: SignalService, private ideaListProvider: IdeaListProvider) {
  }

  ngOnInit() {
    this.getIdeasList();
    this.updateUserList();
  }

  public getIdeasList() {
    this.ideaListProvider.getIdeasList({uid: this.userId})
      .subscribe(res => {
          this.ideaListProvider.setIdeaListData(res)
          this.ideasList = res;
          this.updateActiveIdeaList(this.ideasList);
        },
        err => console.log('err', err));

  }

  public updateActiveIdeaList(list) {
    this.activeIdeasList = list.filter(function (key, val, array) {
      return key.is_active;
    });
  }

  public appendListImg(i) {
    let imgName = `${this.activeIdeasList[i]['name']}`
    imgName = (imgName.replace(/[ ]/g, '')).toLowerCase();
    return `assets/imgs/img_list-${imgName}.svg`;
  }

  public appendListClass(i) {
    let imgName = `${this.activeIdeasList[i]['name']}`
    imgName = (imgName.replace(/[ ]/g, '')).toLowerCase();
    return imgName;
  }

  public getActiveClasses(listName) {
    let slectedClass = (this.selected == listName) ? ' selected' : ''
    return this.mappingClassArray[listName].style + `${slectedClass}`;
  }

  public selectedIdeasList(event, list) {
    this.selectedActiveList = list;
    this.selected = this.selectedActiveList['name'];
    this.sharedService.updateActiveIdeaList(this.selectedActiveList);
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
            this.symbolList = res['symbols'];
            let ideas = this.castIdeaObjects(this.symbolList);
            this.sharedService.setSymbolListValues(ideas);
            for (let i = 0, len = res['symbols'].length; i < len; i++) {
              ideas[i]['parsedSignals'] = this.signalService.parseSignal(ideas[i]['signals']);
            }
          },
          err => console.log('err', err));
    }

  }

  public castIdeaObjects(symbols: Array<object>): Array<Idea> {
    return symbols.map(res => {
      return res as Idea;
    });
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

  public toggleAdditionalLists() {
    this.additionalLists = this.sharedService.getAdditionalListsMenu().value;
    this.additionalLists = !this.additionalLists;
    this.sharedService.setAdditionalListsMenu(this.additionalLists);
  }

}

