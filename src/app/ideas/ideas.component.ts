import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {SignalService} from '../shared/signal.service';
import {IdeaListProvider} from 'app/providers/idea-list.provider'
import {Idea} from '../shared/models/idea';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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
  public selected: string = 'Ideas for You';
  public additionalLists: boolean = false;
  public activeClassStyle = ['strong', 'hold', 'weak'];
  public ratingMap = ['WEAK', 'NEUTRAL', 'STRONG'];
  public loading: Subscription;
  public ideaListLoading: Subscription;
  public mappingClassArray: any = {
    'Holding': {
      'style': 'list__option--userlist list__option--holding',
      'imgName': 'img_list-holding.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Watching': {
      'style': 'list__option--userlist list__option--watching',
      'imgName': 'img_list-watching.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Ideas for You': {
      'style': 'list__option--userlist list__option--ideasforyou',
      'imgName': 'img_list-ideasforyou.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Bulls of the Week': {
      'style': 'list__option--bulllist list__option--classicbulls',
      'imgName': 'img_list-classicbulls.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Best Growth Stocks': {
      'style': 'list__option--bulllist list__option--growthstock',
      'imgName': 'img_list-growthstock.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Best of the Large Caps': {
      'style': 'list__option--bulllist list__option--largecap',
      'imgName': 'img_list-largecap.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Best of the NASDAQ': {
      'style': 'list__option--bulllist list__option--bestofthenasdaq',
      'imgName': 'img_list-bestofthenasdaq.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Best of the Small Caps': {
      'style': 'list__option--bulllist list__option--smallcap',
      'imgName': 'img_list-smallcap.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Best Under $10': {
      'style': 'list__option--bulllist list__option--underten',
      'imgName': 'img_list-underten.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Best Value Stocks': {
      'style': 'list__option--bulllist list__option--bestvalue',
      'imgName': 'img_list-bestvalue.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Buy the Dips': {
      'style': 'list__option--bearlist list__option--buydips',
      'imgName': 'img_list-selldips.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Insider Confidence': {
      'style': 'list__option--bulllist list__option--insiderconfidence',
      'imgName': 'img_list-insiderconfidence.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Money Makers': {
      'style': 'list__option--bulllist list__option--moneymakers',
      'imgName': 'img_list-moneymakers.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Relative Strength Champs': {
      'style': 'list__option--bulllist list__option--relativestrength',
      'imgName': 'img_list-relativestrength.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Money Flow Champs': {
      'style': 'list__option--bulllist list__option--buyingstrength',
      'imgName': 'img_list-buyingstrength.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Analyst Darlings': {
      'style': 'list__option--bulllist list__option--analystdarlings',
      'imgName': 'img_list-analystdarlings.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Power Gauge Rating Upgrades': {
      'style': 'list__option--bulllist list__option--PGRupgrade',
      'imgName': 'img_list-PGRupgrade.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Best of the Dow': {
      'style': 'list__option--bulllist list__option--bestofthedow',
      'imgName': 'img_list-bestofthedow.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Earnings Champs': {
      'style': 'list__option--bulllist list__option--earningschamps',
      'imgName': 'img_list-earningschamps.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Sell the Rallies': {
      'style': 'list__option--bulllist list__option--sellrallies',
      'imgName': 'img_list-buyrallies.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Bears of the Week': {
      'style': 'list__option--bearlist list__option--classicbears',
      'imgName': 'img_list-classicbears.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Power Gauge Rating Downgrades': {
      'style': 'list__option--bearlist list__option--PGRdowngrade',
      'imgName': 'img_list-PGRdowngrade.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Don\'t Fight the Shorts': {
      'style': 'list__option--bearlist list__option--dontfighttheshorts',
      'imgName': 'img_list-dontfighttheshorts.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Dogs of the Dow': {
      'style': 'list__option--bearlist list__option--dogsofthedow',
      'imgName': 'img_list-dogsofthedow.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Upcoming Earnings Bears': {
      'style': 'list__option--bearlist list__option--earningsbears',
      'imgName': 'img_list-earningsbears.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    },
    'Upcoming Earnings Bulls': {
      'style': 'list__option--bulllist list__option--earningsbulls',
      'imgName': 'img_list-earningsbulls.svg',
      'description': 'This list contains companies who have exceeded earnings expectations on a quartly basis'
    }

  };

  constructor(private sharedService: SharedService, private signalService: SignalService, private ideaListProvider: IdeaListProvider) {
  }

  ngOnInit() {
    this.getIdeasList();
    this.updateUserList();
    this.ideaListProvider.wholeIdeasList$
      .subscribe(res => {
        this.ideasList = res;
        this.updateActiveIdeaList(this.ideasList);
      })
  }

  public getIdeasList() {
    this.ideaListLoading = this.ideaListProvider.getIdeasList({uid: this.userId})
      .subscribe(res => {
          this.ideaListProvider.setIdeaListData(res);
        },
        err => console.log('err', err));

  }

  public updateActiveIdeaList(list) {
    this.activeIdeasList = list.filter(function (key, val, array) {
      return key.is_active;
    });
  }

  public appendListImg(i) {
    let imgName = `${this.activeIdeasList[i]['name']}`;
    imgName = (imgName.replace(/[ ]/g, '')).toLowerCase();
    return `assets/imgs/img_list-${imgName}.svg`;
  }

  public appendListClass(i) {
    let imgName = `${this.activeIdeasList[i]['name']}`;
    imgName = (imgName.replace(/[ ]/g, '')).toLowerCase();
    return imgName;
  }

  public getActiveClasses(listName) {
    let slectedClass = (this.selected == listName) ? ' selected' : '';
    return this.mappingClassArray[listName]['style'] + `${slectedClass}`;
  }

  public selectedIdeasList(list) {
    console.log('list', list);
    this.sharedService.setPowerBarHeader(list);
    this.selectedActiveList = list;
    this.hideAddingListPanel();
    this.selected = this.selectedActiveList['name'];
    this.sharedService.updateActiveIdeaList(this.selectedActiveList);
    /* Login for hiding Inactive ideas List panel */
    this.additionalLists = this.sharedService.getAdditionalListsMenu().value;
    if (this.additionalLists) {
      this.sharedService.setAdditionalListsMenu(!this.additionalLists);
    }
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
      this.loading = this.sharedService.symbolList({userId: this.userId, listId: this.activeUserList['list_id']})
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

  public manageActiveInactive(status, list_id) {
    this.ideaListProvider.manageActiveInactive({uid: this.userId, listId: list_id, mode: status})
      .subscribe(res => {
          this.getIdeasList();
          console.log(res);
        },
        err => console.log('err', err));
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
    this.ideaListProvider.setMappingClassArray(this.mappingClassArray);
    this.additionalLists = this.sharedService.getAdditionalListsMenu().value;
    this.additionalLists = !this.additionalLists;
    this.sharedService.setAdditionalListsMenu(this.additionalLists);
  }

  public hideAddingListPanel() {
    this.additionalLists = false;
    this.sharedService.setAdditionalListsMenu(this.additionalLists);
  }

}

