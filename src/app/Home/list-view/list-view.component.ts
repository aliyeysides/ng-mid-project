import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from '../../shared/shared.service';

declare var $: any;

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  public ideaList: Array<object>;

  selectedActiveList: Array<object>;
  subscription: Subscription;
  constructor(private sharedService: SharedService) {
    // this.subscription = this.sharedService.getUpdateActiveIdeaList()
    //                       .subscribe(res => {
    //                           this.selectedActiveList = res;
    //                           console.log(res);
    //                       });
  }

  ngOnInit() {
    this.sharedService.symbolListValues$.subscribe(
      res => {
        console.log('res in list view', res);
        this.ideaList = res;
      },
      err => {
        console.error('error: ', err);
      }
    )
  }

  toggleOptions(e: Event) {

      const targetOpen = $(".list__entry.hover .stock-options__popup").hasClass("slideOpen");

      // if any slide is open and the target is open, then close them all and return;
      if ($(".slideOpen") && targetOpen) {
        $(".slideOpen").toggle("slide", {direction: "right"}, 250);
        $(".slideOpen").removeClass("slideOpen");
        return;
      }
      // if any slide is open and the target is not open, then close them all
      if ($(".slideOpen") && !targetOpen) {
        $(".slideOpen").toggle("slide", {direction: "right"}, 250);
        $(".slideOpen").removeClass("slideOpen");
      }

      // toggle slide
      $(".list__entry.hover .stock-options__popup").toggle("slide", {direction: "right"}, 250);
      $(".list__entry.hover .stock-options__popup").toggleClass("slideOpen");

      e.stopPropagation();

  }
  onNotify(message: string): void {
    alert(message);
  }

}
