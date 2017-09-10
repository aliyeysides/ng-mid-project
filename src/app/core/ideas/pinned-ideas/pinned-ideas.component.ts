import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {IdeaListProvider} from 'app/core/ideas/idea-list.service';
import {Subscription} from 'rxjs/Subscription';

import {ListSelectionService} from '../../../shared/components/list-selection/list-selection.service';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IdeaList} from '../../../models/idea';
import {ClassMap, IDEAS_LIST_CLASSMAP} from '../../../models/ideas-list-class-map';

@Component({
  selector: 'pinned-ideas',
  templateUrl: './pinned-ideas.component.html',
  styleUrls: ['./pinned-ideas.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PinnedIdeasComponent implements AfterViewInit, OnDestroy {
  private userId = '1024494';
  private ngUnsubscribe: Subject<void> = new Subject();

  private _wholeIdeasList: BehaviorSubject<object[]> = new BehaviorSubject<object[]>([{}]);
  @Input('wholeIdeasList')
  set wholeIdeasList(list: object[]) {
    console.log('list',list);
    this._wholeIdeasList.next(list);
  }

  get wholeIdeasList() {
    return this._wholeIdeasList.getValue();
  }

  public ideasList: Array<IdeaList>;
  public userList: Array<IdeaList> = [];
  public themeList: Array<IdeaList>;

  public activeIdeasList: Array<IdeaList>;
  public selectedList: IdeaList;
  public ideaListLoading: Subscription;
  public classMap: ClassMap = IDEAS_LIST_CLASSMAP;

  constructor(private sharedService: SharedService,
              private listSelectionService: ListSelectionService,
              private ideaListProvider: IdeaListProvider) {
  }

  ngAfterViewInit() {
    this.getPinnedIdeaLists();
    this.ideaListProvider.selectedList$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.selectedList = <IdeaList>res;
      });

    this._wholeIdeasList
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        console.log('res',res);
        console.log('this.wholeIdeasList', this.wholeIdeasList);
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
    this.ideaListLoading = this.ideaListProvider.getIdeasList({uid: this.userId})
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
    return this.classMap[listName]['style'] + `${selectedClass}`;
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

