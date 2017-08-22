import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {IdeaListProvider} from '../../providers/idea-list.provider';

@Component({
  selector: 'app-list-selection',
  templateUrl: './list-selection.component.html',
  styleUrls: ['./list-selection.component.scss']
})
export class ListSelectionComponent implements OnInit {
  private userId = '1024494';
  public additionalLists: boolean = false;
  public inActiveIdeasList: Array<object>;
  public activeIdeasList: Array<object>;
  public userList: Array<object>;
  public mappingClassArray: Array<object>;
  public whichAdditionalLists: string = 'Ideas';

  constructor(private sharedService: SharedService,
              private ideaListProvider: IdeaListProvider) {
  }

  ngOnInit() {
    this.ideaListProvider.wholeIdeasList$
      .subscribe(res => {
        this.updateInActiveIdeaList(res);
        this.updateActiveIdeaList(res);
        this.updateUserIdeaList(res);
      });

    this.ideaListProvider.mappingClassArray$
      .subscribe(res => {
        this.mappingClassArray = res;
      });

    this.sharedService.additionalLists$.subscribe(val => this.additionalLists = val);
  }

  setAdditionalLists(val: boolean) {
    this.sharedService.setAdditionalListsMenu(val);
  }

  public getIdeasList() {
    this.ideaListProvider.getIdeasList({uid: this.userId})
      .subscribe(res => {
          this.ideaListProvider.setIdeaListData(res);
        },
        err => console.log('err', err));
  }

  public manageActiveInactive(status, list_id) {
    if (this.activeIdeasList.length < 10) {
      this.ideaListProvider.manageActiveInactive({uid: this.userId, listId: list_id, mode: status})
        .subscribe(() => {
            this.getIdeasList();
          },
          err => console.log('err', err));
    } else {
      // TODO: Replace with internal Alert system.
      alert('First you have to delete another Idea list, then try again.');
    }
  }

  public updateInActiveIdeaList(list) {
    this.inActiveIdeasList = list.filter(val => !val.is_active);
  }

  public updateActiveIdeaList(list) {
    this.activeIdeasList = list.filter(val => val.is_active)
  }

  public updateUserIdeaList(list) {
    this.userList = list.filter((idea, index) => index <= 2);
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
}
