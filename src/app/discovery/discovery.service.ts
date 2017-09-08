import { Injectable } from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {SharedService} from '../shared/shared.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DiscoveryService {

  private apiHost = this.sharedService.getApiHostName();
  private discoveryResultListsParams: URLSearchParams;

  constructor(private sharedService: SharedService) {
    this.discoveryResultListsParams = new URLSearchParams;
  }

  public getDiscoveryResultLists(ticker: string): Observable<object> {
    const url = `${this.apiHost}/CPTRestSecure/app/midTier/getDiscoveryResultLists?`;
    this.discoveryResultListsParams.set('stock', ticker);
    return this.sharedService.getJson(url, this.discoveryResultListsParams);
  }
}
