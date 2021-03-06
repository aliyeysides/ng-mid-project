import { Injectable } from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {SharedService} from '../../shared/shared.service';
import {Observable} from 'rxjs/Observable';
import {UtilService} from '../../services/util.service';

export interface AddListConfig {
  symbol: string;
  listName: string;
}

@Injectable()
export class DiscoveryService {

  private apiHost = this.sharedService.getApiHostName();
  private discoveryResultListsParams: URLSearchParams;

  constructor(private sharedService: SharedService,
              private utilService: UtilService) {
    this.discoveryResultListsParams = new URLSearchParams;
  }

  public addToList(params: AddListConfig): void {
    if (params.listName === 'Holding') {
      this.sharedService.addStockIntoHoldingList(params.symbol)
        .take(1)
        .subscribe(res => console.log(res));
      return;
    }
    if (params.listName === 'Watching') {
      this.sharedService.addStockIntoWatchingList(params.symbol)
        .take(1)
        .subscribe(res => console.log(res));
    }
  }

  public getDiscoveryResultLists(ticker: string): Observable<object> {
    const url = `${this.apiHost}/CPTRestSecure/app/midTier/getDiscoveryResultLists?`;
    this.discoveryResultListsParams.set('stock', ticker);
    return this.utilService.getJson(url, this.discoveryResultListsParams);
  }
}
