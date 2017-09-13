import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {SignalService} from '../../../services/signal.service';
import {AddListConfig} from '../discovery.service';

@Component({
  selector: 'app-discovery-results',
  templateUrl: './discovery-results.component.html',
  styleUrls: ['../discovery.component.scss']
})
export class DiscoveryResultsComponent implements AfterViewInit {

  private ngUnsubscribe: Subject<void> = new Subject();

  @Output('addToListClicked') public addToListClicked = new EventEmitter();
  @Output('viewStockReportClicked') public viewStockReportClicked = new EventEmitter();

  private _results: BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
  @Input('results')
  set results(val: object[]) {
    this._results.next(val);
  }

  get results() {
    return this._results.getValue();
  }

  public lists: object[];

  constructor(private signalService: SignalService) {
  }

  ngAfterViewInit() {
    this._results
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.lists = res;
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

  public addToList(val: AddListConfig) {
    this.addToListClicked.emit(val);
  }

  public viewStockReport(symbol: string) {
    this.viewStockReportClicked.emit(symbol)
  }

}
