import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {Idea} from '../../../models/idea';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SignalService} from '../../../shared/services/signal.service';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'app-discovery-stock',
  templateUrl: './discovery-stock.component.html',
  styleUrls: ['../discovery.component.scss']
})
export class DiscoveryStockComponent implements AfterViewInit, OnDestroy {

  private _metaInfo: BehaviorSubject<Idea> = new BehaviorSubject<Idea>({} as Idea);
  @Input('metaInfo')
  set metaInfo(val: Idea) {
    this._metaInfo.next(val);
  }

  get metaInfo() {
    return this._metaInfo.getValue();
  }

  private ngUnsubscribe: Subject<void> = new Subject();
  public stock: Idea;

  constructor(private signalService: SignalService,
              private sharedService: SharedService) {
  }

  ngAfterViewInit() {
    this._metaInfo
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.stock = res;
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
}
