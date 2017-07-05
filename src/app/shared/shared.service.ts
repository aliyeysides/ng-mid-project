import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Subject} from "rxjs/Subject";
import {Observable} from 'rxjs/Rx';
import { environment } from '../../environments/environment';
@Injectable()
export class SharedService {

  private symbolListValues: Subject<Array<object>> = new Subject<Array<object>>();
  symbolListValues$ = this.symbolListValues.asObservable();

  private symbolLookupParams: URLSearchParams;
  private addStockIntoListParams: URLSearchParams;
  private deleteSymbolFromListParams: URLSearchParams;
  environmentName = environment.envName;
  apiHostName = environment.envProtocol + '://' + environment.envHostName;

  constructor(private http: Http) {
    this.symbolLookupParams = new URLSearchParams;
    this.addStockIntoListParams = new URLSearchParams;
    this.deleteSymbolFromListParams = new URLSearchParams;
  }

  setSymbolListValues(data) {
    this.symbolListValues.next(data);
  }

  public symbolLookup(query: string): Observable<Array<object>> {
    let symbolLookupUrl = `${this.apiHostName}/CPTRestSecure/app/stocks/symbol-lookupV1?`;
  //  let symbolLookupUrl = `http://localhost:8080/CPTRestSecure/app/stocks/symbol-lookupV1?`;
    this.symbolLookupParams.set('q', query);
    this.symbolLookupParams.set('searchColumn', "symbol");
    return this.getJson(symbolLookupUrl,this.symbolLookupParams);
  }

  public userList(query: string): Observable<Array<object>> {
    let symbolLookupUrl = `${this.apiHostName}/CPTRestSecure/app/portfolio/getMidTierUserLists?`;
    this.symbolLookupParams.set('uid', query);
    return this.getJson(symbolLookupUrl, this.symbolLookupParams);
  }

  public symbolList(query: any): Observable<Array<object>>{
    let symbolLookupUrl = `${this.apiHostName}/CPTRestSecure/app/portfolio/getListSymbols?${Math.random()}`;
    this.symbolLookupParams.set('listId', query.listId);
    this.symbolLookupParams.set('uid', query.userId);
    return this.getJson(symbolLookupUrl, this.symbolLookupParams);
  }

  public addStockIntoList(symbol: string, listId: string) {
    const addStockToListUrl = '/CPTRestSecure/app/portfolio/addStockIntoList?';
    this.addStockIntoListParams.set('symbol', symbol);
    this.addStockIntoListParams.set('listId', listId);
    return this.getJson(addStockToListUrl, this.addStockIntoListParams);
  }

  public deleteSymbolFromList(symbol: string, listId: string) {
    const deleteSymbolFromListUrl = '/CPTRestSecure/app/portfolio/deleteSymbolFromList?';
    this.deleteSymbolFromListParams.set('symbol', symbol);
    this.deleteSymbolFromListParams.set('listId', listId);
    return this.getJson(deleteSymbolFromListUrl, this.deleteSymbolFromListParams);
  }

  public getJson(url,params): Observable<Array<object>>{
    return this.http.get(url, {
      search: params,
      withCredentials: true
    }).map(res => {
      return res.json();
    })
    .catch(this.handleError)
  }

  public handleError(err: any) {
    let errMsg = (err.message) ? err.message :
      err.status ? `${err.status} - ${err.statusText}` : 'Server error';
      return Observable.throw(errMsg);
  }

}
