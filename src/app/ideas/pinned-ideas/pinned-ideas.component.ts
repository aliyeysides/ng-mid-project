import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {IdeaListProvider} from 'app/providers/idea-list.provider';
import {Subscription} from 'rxjs/Subscription';

import {mappingClassArray} from './ideasMappingClassArray';
import {ListSelectionService} from '../../shared/list-selection/list-selection.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'mid-tier-ideas',
  templateUrl: './pinned-ideas.component.html',
  styleUrls: ['./pinned-ideas.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PinnedIdeasComponent implements OnInit, OnDestroy {
  private userId = '1024494';
  private ngUnsubscribe: Subject<void> = new Subject();

  public ideasList: Array<object>;
  public userList: Array<object> = [];
  public themeList: Array<object>;
  public activeIdeasList: Array<object>;
  public selectedList: object;
  public loading: Subscription;
  public ideaListLoading: Subscription;
  public mappingClassArray = mappingClassArray;

  constructor(private sharedService: SharedService,
              private listSelectionService: ListSelectionService,
              private ideaListProvider: IdeaListProvider) {
  }

  ngOnInit() {
    this.getPinnedIdeaLists();
    this.ideaListProvider.selectedList$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.selectedList = res;
      });

    this.ideaListProvider.wholeIdeasList$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        const list = this.parseListObject(res);
        this.updateActiveIdeaList(list);
        Object.keys(this.selectedList).length != 0 ? this.selectIdeaList(this.selectedList) : this.selectIdeaList(this.userList[0]);
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getPinnedIdeaLists() {
    this.ideaListProvider.getIdeasList({uid: this.userId})
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
          this.ideaListProvider.setIdeaListData(res);
        },
        err => this.sharedService.handleError);
  }

  public updateActiveIdeaList(list) {
    this.activeIdeasList = list.filter(val => val.is_active);
  }

  public getActiveClasses(listName) {
    const selectedClass = (this.selectedList && this.selectedList['name'] == listName) ? ' selected' : '';
    return this.mappingClassArray[listName]['style'] + `${selectedClass}`;
  }

  public selectIdeaList(list) {
    this.ideaListProvider.setSelectedList(list);
    this.listSelectionService.setIsShown(false);
  }

  public manageActiveInactive(status, list_id) {
    this.ideaListProvider.manageActiveInactive({uid: this.userId, listId: list_id, mode: status})
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
          this.getPinnedIdeaLists();
        },
        err => this.sharedService.handleError);
  }

  private parseListObject(obj): Array<object> {
    this.ideasList = obj[0]['idea_lists'];
    this.themeList = obj[1]['theme_lists'];
    this.userList = obj[2]['user_lists'];
    return this.userList.concat(this.ideasList, this.themeList);
  }

}

