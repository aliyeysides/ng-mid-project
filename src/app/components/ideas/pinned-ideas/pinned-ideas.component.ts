import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../../../shared/shared.service';
import {IdeaListProvider} from 'app/components/ideas/idea-list.service';
import {Subscription} from 'rxjs/Subscription';

import {ListSelectionService} from '../../shared/list-selection/list-selection.service';
import {Subject} from 'rxjs/Subject';
import {IdeaList} from '../../../models/idea';
import {ClassMap, IDEAS_LIST_CLASSMAP} from '../../../models/ideas-list-class-map';
import {UtilService} from '../../../services/util.service';

@Component({
  selector: 'pinned-ideas',
  templateUrl: './pinned-ideas.component.html',
  styleUrls: ['./pinned-ideas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PinnedIdeasComponent implements OnInit, OnDestroy {
  private userId = '1024494';
  private ngUnsubscribe: Subject<void> = new Subject();

  public ideasList: Array<IdeaList>;
  public userList: Array<IdeaList> = [];
  public themeList: Array<IdeaList>;

  public activeIdeasList: Array<IdeaList>;
  public selectedList: IdeaList;
  public ideaListLoading: Subscription;
  public classMap: ClassMap = IDEAS_LIST_CLASSMAP;

  constructor(private sharedService: SharedService,
              private listSelectionService: ListSelectionService,
              private ideaListProvider: IdeaListProvider,
              private utilService: UtilService) {
  }

  ngOnInit() {
    this.getPinnedIdeaLists();
    this.ideaListProvider.selectedList$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.selectedList = res as IdeaList;
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
    this.ideaListLoading = this.ideaListProvider.getIdeasList({uid: this.userId})
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
          this.ideaListProvider.setIdeaListData(res);
        },
        err => this.utilService.handleError);
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
        err => this.utilService.handleError);
  }

  private parseListObject(obj): Array<object> {
    this.ideasList = obj[0]['idea_lists'];
    this.themeList = obj[1]['theme_lists'];
    this.userList = obj[2]['user_lists'];
    return this.userList.concat(this.ideasList, this.themeList);
  }

}

