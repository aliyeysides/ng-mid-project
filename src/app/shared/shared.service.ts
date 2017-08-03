import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Subject} from "rxjs/Subject";
import {Observable} from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class SharedService {

  private symbolListValues: Subject<Array<object>> = new Subject<Array<object>>();
  symbolListValues$ = this.symbolListValues.asObservable();

  private additionalLists: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  additionalLists$ = this.additionalLists.asObservable();

  private powerBarHeader: BehaviorSubject<any> = new BehaviorSubject({name:'Ideas for You'});
  powerBarHeader$ = this.powerBarHeader.asObservable();

  private onboardingPopup: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onboardingPopup$ = this.onboardingPopup.asObservable();

  private symbolLookupParams: URLSearchParams;
  private addStockIntoListParams: URLSearchParams;
  private deleteSymbolFromListParams: URLSearchParams;
  private getStockCardDataParams: URLSearchParams;
  private getHeadlinesParams: URLSearchParams;

  environmentName = environment.envName;
  apiHostName = environment.envProtocol + '://' + environment.envHostName;

  constructor(private http: Http) {
    this.symbolLookupParams = new URLSearchParams;
    this.addStockIntoListParams = new URLSearchParams;
    this.deleteSymbolFromListParams = new URLSearchParams;
    this.getStockCardDataParams = new URLSearchParams;
    this.getHeadlinesParams = new URLSearchParams;
  }

  public setSymbolListValues(data) {
    this.symbolListValues.next(data);
  }

  public triggerOnboardingPopup(data) {
    this.onboardingPopup.next(data);
  }

  public updateActiveIdeaList(list: Array<object>) {
    this.symbolListValues.next(list);
  }

  public setPowerBarHeader(data) {
    this.powerBarHeader.next(data);
  }

  public symbolLookup(query: string): Observable<Array<object>> {
    const symbolLookupUrl = `${this.apiHostName}/CPTRestSecure/app/stocks/symbol-lookupV1?`;
    this.symbolLookupParams.set('q', query);
    this.symbolLookupParams.set('searchColumn', 'symbol');
    return this.getJson(symbolLookupUrl, this.symbolLookupParams);
  }

  public userList(query: string): Observable<Array<object>> {
    const symbolLookupUrl = `${this.apiHostName}/CPTRestSecure/app/portfolio/getMidTierUserLists?`;
    this.symbolLookupParams.set('uid', query);
    return this.getJson(symbolLookupUrl, this.symbolLookupParams);
  }

  public symbolList(query: any): Observable<Array<object>>{
    const symbolLookupUrl = `${this.apiHostName}/CPTRestSecure/app/midTier/getListSymbols?${Math.random()}`;
    this.symbolLookupParams.set('listId', query.listId);
    this.symbolLookupParams.set('uid', query.userId);
    return this.getJson(symbolLookupUrl, this.symbolLookupParams);
  }

  public addStockIntoHoldingList(symbol: string) {
    const addStockToListUrl = `${this.apiHostName}/CPTRestSecure/app/portfolio/addStockIntoList?`;
    const holdingListId = "1220535";
    this.addStockIntoListParams.set('symbol', symbol);
    this.addStockIntoListParams.set('listId', holdingListId);
    return this.getJson(addStockToListUrl, this.addStockIntoListParams);
  }

  public addStockIntoWatchingList(symbol: string) {
    const addStockToListUrl = `${this.apiHostName}/CPTRestSecure/app/portfolio/addStockIntoList?`;
    const watchingListId = "1220536";
    this.addStockIntoListParams.set('symbol', symbol);
    this.addStockIntoListParams.set('listId', watchingListId);
    return this.getJson(addStockToListUrl, this.addStockIntoListParams);
  }

  public deleteSymbolFromList(symbol: string, listId: string) {
    const deleteSymbolFromListUrl = `${this.apiHostName}/CPTRestSecure/app/portfolio/deleteSymbolFromList?`;
    this.deleteSymbolFromListParams.set('symbol', symbol);
    this.deleteSymbolFromListParams.set('listId', listId);
    return this.getJson(deleteSymbolFromListUrl, this.deleteSymbolFromListParams);
  }

  public getStockCardData(symbol: string) {
    const getStockCardDataUrl = `${this.apiHostName}/CPTRestSecure/app/midTier/getStockCardData?`;
    this.getStockCardDataParams.set('symbol', symbol);
    return this.getJson(getStockCardDataUrl, this.getStockCardDataParams);
  }

  public getHeadlines(symbol: string) {
    const getHeadlinesUrl = `${this.apiHostName}/CPTRestSecure/app/xigniteNews/getHeadlines?`;
    this.getHeadlinesParams.set('symbol', symbol);
    return this.getJson(getHeadlinesUrl, this.getHeadlinesParams);
  }

  public getJson(url, params): Observable<Array<object>>{
    return this.http.get(url, {
      search: params,
      withCredentials: true
    }).map(res => {
      return res.json();
    })
    .catch(this.handleError);
  }

  public handleError(err: any) {
    let errMsg = (err.message) ? err.message :
      err.status ? `${err.status} - ${err.statusText}` : 'Server error';
      return Observable.throw(errMsg);
  }

  public getAdditionalListsMenu() {
    return this.additionalLists;
  }

  public setAdditionalListsMenu(value: boolean) {
    this.additionalLists.next(value);
  }


}
