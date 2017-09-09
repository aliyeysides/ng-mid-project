import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {IdeaListProvider} from '../../services/idea-list.service';
import {Router} from '@angular/router';

import {mappingClassArray} from '../../../models/ideasMappingClassArray';
import {InsightsService} from '../../../core/insights/insights.service';
import {ListSelectionService} from './list-selection.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'list-selection',
  templateUrl: './list-selection.component.html',
  styleUrls: ['./list-selection.component.scss']
})
export class ListSelectionComponent implements OnInit, OnDestroy {
  @Input() public isShown: boolean;
  private userId = '1024494';
  private totalListAmount: number;
  private ngUnsubscribe: Subject<void> = new Subject();

  public inActiveIdeasList: Array<object>;
  public activeIdeasList: Array<object>;
  public inActiveThemeList: Array<object>;
  public activeThemeList: Array<object>;
  public ideaList: Array<object>;
  public themeList: Array<object>;
  public userList: Array<object>;
  public mappingClassArray = mappingClassArray;
  public wordPressPosts: Array<object>;
  public whichAdditionalLists: string = 'Ideas';
  public selectedList: object;
  public selectedListName: string = 'Holding';
  public selectedListId: any;
  public selectedListTagline: string;
  public selectedListMoreInfo: string;
  public selectedListHowInfo: string;

  constructor(private sharedService: SharedService,
              private listSelectionService: ListSelectionService,
              private insightsService: InsightsService,
              private ideaListProvider: IdeaListProvider,
              private router: Router) {
  }

  ngOnInit() {
    this.getIdeasList();
    this.ideaListProvider.wholeIdeasList$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.parseListObject(res);
        this.updateInActiveIdeaList();
        this.updateActiveIdeaList();
        this.updateInActiveThemeList();
        this.updateActiveThemeList();
        this.getWordPressPostListDescriptions();
        this.selectList(this.ideaList[0]);
      });

    this.listSelectionService.isShown$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(val => {
      this.isShown = val;
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public toggleShown(val: boolean) {
    this.listSelectionService.setIsShown(val);
  }

  public getIdeasList() {
    this.ideaListProvider.getIdeasList({uid: this.userId})
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
          this.ideaListProvider.setIdeaListData(res);
        },
        err => console.log('err', err));
  }

  public manageActiveInactive(status, list_id) {
    if (this.activeIdeasList.length < 10) {
      this.ideaListProvider.manageActiveInactive({uid: this.userId, listId: list_id, mode: status})
        .takeUntil(this.ngUnsubscribe)
        .subscribe(() => {
            this.getIdeasList();
          },
          err => console.log('err', err));
    } else {
      // TODO: Replace with internal Alert system.
      alert('First you have to delete another Idea list, then try again.');
    }
  }

  public viewList(list) {
    if (!this.isIdeasPage()) {
      this.router.navigate(['/ideas']);
      this.ideaListProvider.setSelectedList(list);
      return;
    }
    this.ideaListProvider.setSelectedList(list);
    this.listSelectionService.setIsShown(false);
  }

  public selectList(list) {
    this.selectedList = list;
    this.selectedListName = list.name;
    this.selectedListId = list.list_id;
    const matchingPost = this.wordPressPosts.filter(post => post['post_title'] === this.selectedListName);
    const htmlStr = matchingPost[0]['post_content'];
    this.parseDomString(htmlStr);
  }

  public selectWhichAdditionalList(list: string) {
    this.whichAdditionalLists = list;
    if (list == 'Ideas') {
      this.selectList(this.ideaList[0]);
    } else if (list == 'Themes') {
      this.selectList(this.themeList[0]);
    } else if (list == 'User') {
      this.selectList(this.userList[0]);
    }
  }

  public updateInActiveIdeaList() {
    this.inActiveIdeasList = this.ideaList.filter(val => !val['is_active']);
  }

  public updateActiveIdeaList() {
    this.activeIdeasList = this.ideaList.filter(val => val['is_active']);
  }

  public updateInActiveThemeList() {
    this.inActiveThemeList = this.themeList.filter(val => !val['is_active']);
  }

  public updateActiveThemeList() {
    this.activeThemeList = this.themeList.filter(val => val['is_active']);
  }

  public checkIfBullList(listName) {
    return this.sharedService.checkIfBullList(listName);
  }

  public checkIfBearList(listName) {
    return this.sharedService.checkIfBearList(listName);
  }

  public isIdeasPage(): boolean {
    return this.router.url === '/ideas';
  }

  private parseDomString(str: string) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(str, 'text/html');
    this.selectedListTagline = dom.getElementById('tagline').innerText;
    this.selectedListMoreInfo = dom.getElementById('more').innerText;
    this.selectedListHowInfo = dom.getElementById('how').innerText;
  }

  private parseListObject(list) {
    this.ideaList = list[0]['idea_lists'];
    this.themeList = list[1]['theme_lists'];
    this.userList = list[2]['user_lists'];
    this.totalListAmount = this.ideaList.length + this.themeList.length + this.userList.length;
  }

  private getWordPressPostListDescriptions() {
    this.insightsService.getWordPressJson('45', this.totalListAmount)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(val => this.wordPressPosts = val['0']['45']);
  }

}
