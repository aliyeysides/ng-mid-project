import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {SignalService} from '../../shared/signal.service';
import {IdeaListProvider} from 'app/providers/idea-list.provider';
import {Idea} from '../../shared/models/idea';
import {Subscription} from 'rxjs/Subscription';

import {mappingClassArray} from './ideasMappingClassArray';

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
  public loading: Subscription;
  public ideaListLoading: Subscription;
  public mappingClassArray = mappingClassArray;

  constructor(private sharedService: SharedService,
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
    this.ideaListLoading = this.ideaListProvider.getIdeasList({uid: this.userId})
      .subscribe(res => {
          this.ideaListProvider.setIdeaListData(res);
        },
        err => console.log('err', err));
  }

  public updateActiveIdeaList(list) {
    this.activeIdeasList = list.filter(val => val.is_active);
  }

  public getActiveClasses(listName) {
    let selectedClass = (this.selected == listName) ? ' selected' : '';
    return this.mappingClassArray[listName]['style'] + `${selectedClass}`;
  }

  public selectedIdeasList(list) {
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
          this.updateActiveList(this.userList[0]);
        },
        err => console.log('err', err));
  }

  public updateActiveList(val) {
    if (this.activeUserList !== val) {
      this.activeUserList = val;
      this.loading = this.sharedService.symbolList({userId: this.userId, listId: this.activeUserList['list_id']})
        .subscribe(res => {
            this.symbolList = res['symbols'];
            let ideas = this.castIdeaObjects(this.symbolList);
            this.sharedService.setSymbolListValues(ideas);
            ideas.map(res => res['parsedSignals'] = this.signalService.parseSignal(res['signals']))
          },
          err => console.log('err', err));
    }
  }

  public manageActiveInactive(status, list_id) {
    this.ideaListProvider.manageActiveInactive({uid: this.userId, listId: list_id, mode: status})
      .subscribe(() => {
          this.getIdeasList();
        },
        err => console.log('err', err));
  }

  public castIdeaObjects(symbols: Array<object>): Array<Idea> {
    return symbols.map(res => res as Idea );
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

