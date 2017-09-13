import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {UtilService} from '../services/util.service';

@Injectable()
export class SharedService {

  private symbolLookupParams: URLSearchParams;
  private addStockIntoListParams: URLSearchParams;
  private deleteSymbolFromListParams: URLSearchParams;
  private getStockCardDataParams: URLSearchParams;
  private getHeadlinesParams: URLSearchParams;
  private getInsightsParams: URLSearchParams;
  private getLogoutParams: URLSearchParams;
  private getLoginParams: URLSearchParams;

  protected apiHostName = environment.envProtocol + '://' + environment.envHostName;

  constructor(private utilService: UtilService) {
    this.symbolLookupParams = new URLSearchParams;
    this.addStockIntoListParams = new URLSearchParams;
    this.deleteSymbolFromListParams = new URLSearchParams;
    this.getStockCardDataParams = new URLSearchParams;
    this.getHeadlinesParams = new URLSearchParams;
    this.getLogoutParams = new URLSearchParams;
    this.getLoginParams = new URLSearchParams;
    this.getInsightsParams = new URLSearchParams;
  }

  public getApiHostName() {
    return this.apiHostName;
  }

  public symbolLookup(query: string): Observable<Array<object>> {
    const symbolLookupUrl = `${this.apiHostName}/CPTRestSecure/app/stocks/symbol-lookupV1?`;
    this.symbolLookupParams.set('q', query);
    this.symbolLookupParams.set('searchColumn', 'symbol');
    return this.utilService.getJson(symbolLookupUrl, this.symbolLookupParams);
  }

  public symbolList(query: any): Observable<Array<object>> {
    const symbolLookupUrl = `${this.apiHostName}/CPTRestSecure/app/midTier/getListSymbols?${Math.random()}`;
    this.symbolLookupParams.set('listId', query.listId);
    this.symbolLookupParams.set('uid', query.userId);
    return this.utilService.getJson(symbolLookupUrl, this.symbolLookupParams);
  }

  public addStockIntoHoldingList(symbol: string) {
    const addStockToListUrl = `${this.apiHostName}/CPTRestSecure/app/portfolio/addStockIntoList?`;
    const holdingListId = '1220535';
    this.addStockIntoListParams.set('symbol', symbol);
    this.addStockIntoListParams.set('listId', holdingListId);
    return this.utilService.getJson(addStockToListUrl, this.addStockIntoListParams);
  }

  public addStockIntoWatchingList(symbol: string) {
    const addStockToListUrl = `${this.apiHostName}/CPTRestSecure/app/portfolio/addStockIntoList?`;
    const watchingListId = '1220536';
    this.addStockIntoListParams.set('symbol', symbol);
    this.addStockIntoListParams.set('listId', watchingListId);
    return this.utilService.getJson(addStockToListUrl, this.addStockIntoListParams);
  }

  public deleteSymbolFromList(symbol: string, listId: string) {
    const deleteSymbolFromListUrl = `${this.apiHostName}/CPTRestSecure/app/portfolio/deleteSymbolFromList?`;
    this.deleteSymbolFromListParams.set('symbol', symbol);
    this.deleteSymbolFromListParams.set('listId', listId);
    return this.utilService.getJson(deleteSymbolFromListUrl, this.deleteSymbolFromListParams);
  }

  public getStockCardData(symbol: string) {
    const getStockCardDataUrl = `${this.apiHostName}/CPTRestSecure/app/midTier/getStockCardData?`;
    this.getStockCardDataParams.set('symbol', symbol);
    return this.utilService.getJson(getStockCardDataUrl, this.getStockCardDataParams);
  }

  public getHeadlines(symbol: string) {
    const getHeadlinesUrl = `${this.apiHostName}/CPTRestSecure/app/xigniteNews/getHeadlines?`;
    this.getHeadlinesParams.set('symbol', symbol);
    return this.utilService.getJson(getHeadlinesUrl, this.getHeadlinesParams);
  }

}
