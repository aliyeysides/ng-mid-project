import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Subject} from "rxjs/Subject";
import {Observable} from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {

  private onboardingPopup: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onboardingPopup$ = this.onboardingPopup.asObservable();

  private onboardingModal: Subject<boolean> = new Subject<boolean>();
  onboardingModal$ = this.onboardingModal.asObservable();

  private symbolLookupParams: URLSearchParams;
  private addStockIntoListParams: URLSearchParams;
  private deleteSymbolFromListParams: URLSearchParams;
  private getStockCardDataParams: URLSearchParams;
  private getHeadlinesParams: URLSearchParams;

  protected apiHostName = environment.envProtocol + '://' + environment.envHostName;

  constructor(private http: Http) {
    this.symbolLookupParams = new URLSearchParams;
    this.addStockIntoListParams = new URLSearchParams;
    this.deleteSymbolFromListParams = new URLSearchParams;
    this.getStockCardDataParams = new URLSearchParams;
    this.getHeadlinesParams = new URLSearchParams;
  }

  public getApiHostName() {
    return this.apiHostName;
  }

  public triggerOnboardingPopup(data) {
    this.onboardingPopup.next(data);
  }

  public setOnboardingModal(data: boolean) {
    this.onboardingModal.next(data);
  }

  public symbolLookup(query: string): Observable<Array<object>> {
    const symbolLookupUrl = `${this.apiHostName}/CPTRestSecure/app/stocks/symbol-lookupV1?`;
    this.symbolLookupParams.set('q', query);
    this.symbolLookupParams.set('searchColumn', 'symbol');
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

  checkIfBullList(listName) {
    switch (listName) {
      case 'Bulls of the Week':
      case 'Best Growth Stocks':
      case 'Best of the Large Caps':
      case 'Best of the NASDAQ':
      case 'Best of the Small Caps':
      case 'Buy the Dips':
      case 'Best Under $10':
      case 'Best Value Stocks':
      case 'Insider Confidence':
      case 'Money Makers':
      case 'Relative Strength Champs':
      case 'Money Flow Champs':
      case 'Analyst Darlings':
      case 'Power Gauge Rating Upgrades':
      case 'Best of the Dow':
      case 'Earnings Champs':
      case 'Upcoming Earnings Bulls':
        return true;
      default:
        return false;
    }
  }

  checkIfBearList(listName) {
    switch (listName) {
      case 'Sell the Rallies':
      case 'Bears of the Week':
      case 'Power Gauge Rating Downgrades':
      case 'Don\'t Fight the Shorts':
      case 'Dogs of the Dow':
      case 'Upcoming Earnings Bears':
        return true;
      default:
        return false;
    }
  }

  checkIfUserList(listName) {
    switch (listName) {
      case 'Ideas for You':
      case 'Holding':
      case 'Watching':
        return true;
      default:
        return false;
    }
  }

  checkIfThemeList(listName) {
    switch (listName) {
      case 'Big Data':
      case 'China Shops':
      case 'Cybersecurity':
      case 'Disruptors':
      case 'E-Payments':
      case 'Gold Standards':
      case 'Internet Innovators':
      case 'Social Butterflies':
      case 'Video Games':
      case 'Fashion & Luxury':
      case 'Defense Titans':
      case 'Earth-Friendly':
      case 'Sin City':
      case 'Health & Fitness':
      case 'Cloud Computing':
      case 'Upwardly Mobile':
        return true;
      default:
        return false;
    }
  }

}
