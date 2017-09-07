import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DiscoveryService} from '../discovery.service';
import {SignalService} from '../../shared/signal.service';
import {Router} from '@angular/router';
import {SharedService} from '../../shared/shared.service';
import {Idea} from '../../shared/models/idea';

@Component({
  selector: 'app-discovery-stock',
  templateUrl: './discovery-stock.component.html',
  styleUrls: ['../discovery.component.scss']
})
export class DiscoveryStockComponent implements OnInit, OnDestroy {

  private discoveryResultsSubscription: Subscription;
  private addStockIntoHoldingListSubscription: Subscription;
  private addStockIntoWatchingListSubscription: Subscription;
  public discoveryResults: any;
  public metaInfo: Idea;

  constructor(private discoveryService: DiscoveryService,
              private signalService: SignalService,
              private sharedService: SharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.discoveryResultsSubscription = this.discoveryService.getDiscoveryResultLists('OKE')
      .subscribe(res => {
        this.discoveryResults = res;
        console.log('res', this.discoveryResults);
        this.parseDiscoveryResults(this.discoveryResults);
      })
  }

  ngOnDestroy() {
    this.discoveryResultsSubscription.unsubscribe();
    if (this.addStockIntoWatchingListSubscription) this.addStockIntoWatchingListSubscription.unsubscribe();
    if (this.addStockIntoHoldingListSubscription) this.addStockIntoHoldingListSubscription.unsubscribe();
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
    this.addStockIntoHoldingListSubscription = this.sharedService.addStockIntoHoldingList(stock)
      .subscribe(res => {
        console.log('res from addToList', res);
      });
  }

  public addToWatchingList(stock: string) {
    this.addStockIntoWatchingListSubscription = this.sharedService.addStockIntoWatchingList(stock)
      .subscribe(res => {
        console.log('res from addToList', res);
      });
  }

  private parseDiscoveryResults(results: object) {
    this.metaInfo = results['metainfo'] as Idea;
    console.log('metainfo', this.metaInfo);
  }

}
