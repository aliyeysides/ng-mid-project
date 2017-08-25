import {Component, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {IdeaListProvider} from '../../providers/idea-list.provider';
import {chaikinSVGS} from '../svg/SVGs';

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
  public inActiveThemeList: Array<object>;
  public activeThemeList: Array<object>;
  public ideaList: Array<object>;
  public themeList: Array<object>;
  public userList: Array<object>;
  public mappingClassArray: Array<object>;
  public wordPressPosts: Array<object>;
  public whichAdditionalLists: string = 'Ideas';
  public selectedListName: string;
  public selectedListId: any;
  public selectedListTagline: string;
  public selectedListMoreInfo: string;
  public selectedListHowInfo: string;
  public chaikinSVGS = chaikinSVGS;

  constructor(private sharedService: SharedService,
              private ideaListProvider: IdeaListProvider) {
  }

  ngOnInit() {
    this.ideaListProvider.wholeIdeasList$
      .subscribe(res => {
        this.parseListObject(res);
        this.updateInActiveIdeaList();
        this.updateActiveIdeaList();
        this.updateInActiveThemeList();
        this.updateActiveThemeList();
      });

    this.ideaListProvider.mappingClassArray$
      .subscribe(res => {
        this.mappingClassArray = res;
      });

    this.sharedService.additionalLists$.subscribe(val => this.additionalLists = val);
    this.sharedService.getWordPressJson('45').subscribe(val => this.wordPressPosts = val['0']['45']);

    console.log('chaikinSVGS', this.chaikinSVGS);
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

  public selectList(list) {
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

  private parseDomString(str: string) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(str, 'text/html');
    this.selectedListTagline = dom.getElementById('tagline').innerText;
    this.selectedListMoreInfo = dom.getElementById('more').innerText;
    this.selectedListHowInfo = dom.getElementById('how').innerText;
    const test = {
      dom: dom,
      tagline: this.selectedListTagline,
      more: this.selectedListMoreInfo,
      how: this.selectedListHowInfo
    }
    console.log('test obj', test);
  }

  private parseListObject(list) {
    this.ideaList = list[0]['idea_lists'];
    this.themeList = list[1]['theme_lists'];
    this.userList = list[2]['user_lists'];
  }

}
