import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {IdeaListProvider} from './idea-list.service';

@Component({
  selector: 'mid-tier-home',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject();
  public wholeIdeasList: object[];

  constructor(private ideaListProvider: IdeaListProvider) {
  }

  ngOnInit() {
    this.ideaListProvider.wholeIdeasList$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.wholeIdeasList = res;
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
