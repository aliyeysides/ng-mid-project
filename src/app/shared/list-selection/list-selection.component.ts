import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {SharedService} from '../shared.service';
import {IdeaListProvider} from '../../providers/idea-list.provider';
import {Router} from '@angular/router';

import {mappingClassArray} from '../../ideas/pinned-ideas/ideasMappingClassArray';
import {InsightsService} from '../../insights/shared/insights.service';

@Component({
  selector: 'app-list-selection',
  templateUrl: './list-selection.component.html',
  styleUrls: ['./list-selection.component.scss']
})
export class ListSelectionComponent implements OnInit {
  @Output() public previewList: EventEmitter<object> = new EventEmitter<object>();
  @Input() public additionalLists: boolean;
  private userId = '1024494';
  public inActiveIdeasList: Array<object>;
  public activeIdeasList: Array<object>;
  public inActiveThemeList: Array<object>;
  public activeThemeList: Array<object>;
  public ideaList: Array<object>;
  public themeList: Array<object>;
  public userList: Array<object>;
  public mappingClassArray = mappingClassArray;
  public wordPressPosts: Array<object>;
  public whichAdditionalLists: string = 'User';
  public selectedList: object;
  public selectedListName: string = 'Holding';
  public selectedListId: any;
  public selectedListTagline: string;
  public selectedListMoreInfo: string;
  public selectedListHowInfo: string;

  constructor(private sharedService: SharedService,
              private insightsService: InsightsService,
              private ideaListProvider: IdeaListProvider,
              private router: Router) {
  }

  ngOnInit() {
    this.getIdeasList();
    this.ideaListProvider.wholeIdeasList$
      .subscribe(res => {
        this.parseListObject(res);
        this.updateInActiveIdeaList();
        this.updateActiveIdeaList();
        this.updateInActiveThemeList();
        this.updateActiveThemeList();
      });

    this.sharedService.additionalLists$.subscribe(val => this.additionalLists = val);
    this.insightsService.getWordPressJson('45', 50).subscribe(val => this.wordPressPosts = val['0']['45']);
  }

  public setAdditionalLists(val: boolean) {
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

  public viewList(list) {
    if (!this.isIdeasPage()) {
      this.router.navigate(['/ideas']);
      // this.sharedService.setSymbolListValues(list);
    }
    this.previewList.emit(list);
  }

  public selectList(list) {
    this.selectedList = list;
    this.selectedListName = list.name;
    this.selectedListId = list.list_id;
    const matchingPost = this.wordPressPosts.filter(post => post['post_title'] === this.selectedListName);
    const htmlStr = matchingPost[0]['post_content'];
    this.parseDomString(htmlStr);
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
  }

}
