import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {addListConfig, Idea} from '../../../models/idea';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SignalService} from '../../../shared/services/signal.service';

@Component({
  selector: 'app-discovery-stock',
  templateUrl: './discovery-stock.component.html',
  styleUrls: ['../discovery.component.scss']
})
export class DiscoveryStockComponent implements AfterViewInit, OnDestroy {

  private _metaInfo: BehaviorSubject<Idea> = new BehaviorSubject<Idea>({} as Idea);
  @Output('addToListClicked') public addToListClicked = new EventEmitter<object>();
  @Input('metaInfo')
  set metaInfo(val: Idea) {
    this._metaInfo.next(val);
  }

  get metaInfo() {
    return this._metaInfo.getValue();
  }

  private ngUnsubscribe: Subject<void> = new Subject();
  public stock: Idea;

  constructor(private signalService: SignalService) {
  }

  ngAfterViewInit() {
    this._metaInfo
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.stock = <Idea>res;
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

  public addToList(val: addListConfig) {
    this.addToListClicked.emit(val);
  }

}
