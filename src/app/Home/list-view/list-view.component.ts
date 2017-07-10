import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import {SharedService} from '../../shared/shared.service';
import {Router} from '@angular/router';
import {Idea} from '../../shared/models/idea';

declare var $: any;

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class ListViewComponent implements OnInit {

  public ideaList: Array<object>;
  public additionalLists: boolean = false;
  public mouseHoverOptionsMap: object = {};
  public popupOptionsMap: object = {};

  constructor(private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.sharedService.symbolListValues$
      .switchMap(val => this.sharedService.symbolList({listId: val['list_id']}))
      .subscribe(res => {
        this.ideaList = res['symbols'];
      });

    this.sharedService.additionalLists$.subscribe(val => {
      this.additionalLists = val;
    });
  }

  toggleHoverOptions(idea) {
    if (!this.mouseHoverOptionsMap[idea.symbol] || this.mouseHoverOptionsMap[idea.symbol] == false) {
      this.mouseHoverOptionsMap[idea.symbol] = true;
      return;
    }
    this.mouseHoverOptionsMap[idea.symbol] = !this.mouseHoverOptionsMap[idea.symbol];
  }

  toggleOptions(idea, e) {
    e.stopPropagation();
    if (!this.popupOptionsMap[idea.symbol] || this.popupOptionsMap[idea.symbol] == false) {
      this.popupOptionsMap = {};
      this.popupOptionsMap[idea.symbol] = true;
      return;
    }
    this.popupOptionsMap[idea.symbol] = !this.popupOptionsMap[idea.symbol];
    this.mouseHoverOptionsMap = {};
  }

  onNotify(message: string): void {
    alert(message);
  }

  goToStockView(stock: Idea, e) {
    e.stopPropagation();
    this.router.navigate(['/report', stock.symbol]);
  }

  addToList(stock: any, listId: string, e) {
    e.stopPropagation();
    this.sharedService.addStockIntoList(stock.symbol, listId)
      .subscribe(res => {
        console.log('res from addToList', res);
      })
  }

  removeFromList(stock: any, listId: string, e) {
    e.stopPropagation();
    this.sharedService.deleteSymbolFromList(stock.symbol, listId)
      .subscribe(res => {
        console.log('res from removeFromList', res);
      });
  }

}
