import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DiscoveryService} from './discovery.service';
import {Subject} from 'rxjs/Subject';
import {Idea} from '../../shared/models/idea';

@Component({
  selector: 'mid-tier-component',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoveryComponent implements OnInit {

  private ngUnsubscribe: Subject<void> = new Subject();
  public metaInfo: Idea;
  public results: object[];

  constructor(private router: Router,
              private discoveryService: DiscoveryService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params.symbol)
      .switchMap(val => this.discoveryService.getDiscoveryResultLists(val))
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.parseDiscoveryResponse(res);
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public viewStockReport(ticker: string) {
    this.router.navigate(['/report', ticker]);
  }

  public addToList(params: {symbol, listName}) {
    this.discoveryService.addToList(params);
  }

  private parseDiscoveryResponse(res: object) {
    this.metaInfo = res['metainfo'] as Idea;
    this.results = res['results'];
  }

}
