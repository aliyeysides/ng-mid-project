import {Component, OnDestroy, OnInit} from '@angular/core';
import {DiscoveryService} from '../discovery.service';
import {SignalService} from '../../shared/signal.service';
import {Router} from '@angular/router';
import {SharedService} from '../../shared/shared.service';
import {Idea} from '../../shared/models/idea';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-discovery-stock',
  templateUrl: './discovery-stock.component.html',
  styleUrls: ['../discovery.component.scss']
})
export class DiscoveryStockComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();

  public discoveryResults: any;
  public metaInfo: Idea;

  constructor(private discoveryService: DiscoveryService,
              private signalService: SignalService,
              private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.discoveryService.getDiscoveryResultLists('OKE')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.discoveryResults = res;
        console.log('res', this.discoveryResults);
        this.parseDiscoveryResults(this.discoveryResults);
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public appendPGRImage(pgr: number) {
    return this.signalService.appendPGRImage(pgr);
  }

  public appendPGRText(pgr: number) {
    return this.signalService.appendPGRText(pgr);
  }

  public viewStockReport(ticker: string) {
    this.router.navigate(['/report', ticker]);
  }

  public addToHoldingList(stock: string) {
    this.sharedService.addStockIntoHoldingList(stock)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        console.log('res from addToList', res);
      });
  }

  public addToWatchingList(stock: string) {
    this.sharedService.addStockIntoWatchingList(stock)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        console.log('res from addToList', res);
      });
  }

  private parseDiscoveryResults(results: object) {
    this.metaInfo = results['metainfo'] as Idea;
    console.log('metainfo', this.metaInfo);
  }

}
