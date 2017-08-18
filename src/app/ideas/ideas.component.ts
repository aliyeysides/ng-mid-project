import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { SignalService } from '../shared/signal.service';
import {HomeService} from '../Home/service/home.service';
import { IdeaListProvider } from 'app/providers/idea-list.provider';
import { Idea } from '../shared/models/idea';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {mappingClassArray} from './ideas';

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
  public activeUserList = { name: '' };
  public selectedActiveList: Array<object>;
  public selected: string = 'Ideas for You';
  public additionalLists: boolean = false;
  public activeClassStyle = ['strong', 'hold', 'weak'];
  public ratingMap = ['WEAK', 'NEUTRAL', 'STRONG'];
  public loading: Subscription;
  public ideaListLoading: Subscription;
  public mappingClassArray = mappingClassArray;

  constructor(private sharedService: SharedService,
    private homeService: HomeService,
    private signalService: SignalService,
    private ideaListProvider: IdeaListProvider) {
  }

  ngOnInit() {
    this.getIdeasList();
    this.updateUserList();
    this.ideaListProvider.wholeIdeasList$
      .subscribe(res => {
        this.ideasList = res;
        this.updateActiveIdeaList(this.ideasList);
      });
  }

  public getIdeasList() {
    this.ideaListLoading = this.ideaListProvider.getIdeasList({ uid: this.userId })
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
      this.loading = this.sharedService.symbolList({ userId: this.userId, listId: this.activeUserList['list_id'] })
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
    this.ideaListProvider.manageActiveInactive({ uid: this.userId, listId: list_id, mode: status })
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

