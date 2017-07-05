import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {Router} from '@angular/router';
import {Idea} from '../../shared/models/idea';

declare var $: any;

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  public ideaList: Array<object>;

  constructor(private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.sharedService.symbolListValues$
      .switchMap(val => this.sharedService.symbolList({listId: val['list_id']}))
      .subscribe(res => {
        this.ideaList = res['symbols'];
      })
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

  goToStockView(stock: Idea) {
    this.router.navigate(['/report', stock.symbol]);
  }

  addToList(stock: any, listId: string) {
    this.sharedService.addStockIntoList(stock.symbol, listId);
  }

  removeFromList(stock: any, listId: string) {
    this.sharedService.deleteSymbolFromList(stock.symbol, listId);
  }

}
