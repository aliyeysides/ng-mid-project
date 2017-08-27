import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {IdeaListProvider} from 'app/providers/idea-list.provider';
import {Subscription} from 'rxjs/Subscription';

import {mappingClassArray} from './ideasMappingClassArray';

@Component({
  selector: 'mid-tier-ideas',
  templateUrl: './pinned-ideas.component.html',
  styleUrls: ['./pinned-ideas.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PinnedIdeasComponent implements OnInit {
  private userId = '1024494';
  public ideasList: Array<object>;
  public userList: Array<object> = [];
  public themeList: Array<object>;
  public activeIdeasList: Array<object>;
  public selectedActiveList: Array<object>;
  public selected: string = 'Holding';
  public additionalLists: boolean = false;
  public loading: Subscription;
  public ideaListLoading: Subscription;
  public mappingClassArray = mappingClassArray;

  constructor(private sharedService: SharedService,
              private ideaListProvider: IdeaListProvider) {
  }

  ngOnInit() {
    this.getPinnedIdeaLists();
    this.ideaListProvider.wholeIdeasList$
      .subscribe(res => {
        const list = this.parseListObject(res);
        this.updateActiveIdeaList(list);
      });
  }

  public getPinnedIdeaLists() {
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
    this.sharedService.setSymbolListValues(this.selectedActiveList);
    /* Login for hiding Inactive ideas List panel */
    this.additionalLists = this.sharedService.getAdditionalListsMenu().value;
    if (this.additionalLists) {
      this.sharedService.setAdditionalListsMenu(!this.additionalLists);
    }
  }

  public manageActiveInactive(status, list_id) {
    this.ideaListProvider.manageActiveInactive({uid: this.userId, listId: list_id, mode: status})
      .subscribe(() => {
          this.getPinnedIdeaLists();
        },
        err => console.log('err', err));
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

  private parseListObject(obj): Array<object> {
    this.ideasList = obj[0]['idea_lists'];
    this.themeList = obj[1]['theme_lists'];
    this.userList = obj[2]['user_lists'];
    return this.userList.concat(this.ideasList, this.themeList);
  }

}

