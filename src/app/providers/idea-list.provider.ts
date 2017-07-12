import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Subject} from "rxjs/Subject";
import {environment} from 'environments/environment';

@Injectable()
export class IdeaListProvider {

  private ideasList: Subject<Array<object>> = new Subject<Array<object>>();
  ideasList$ = this.ideasList.asObservable();

  private mappingClassArray: Subject<Array<object>> = new Subject<Array<object>>();
  mappingClassArray$ = this.mappingClassArray.asObservable();

  private symbolLookupParams: URLSearchParams;
  apiHostName = environment.envProtocol + '://' + environment.envHostName;
  private apiPrependText: string = '/CPTRestSecure/app';

  private wholeIdeasList: Subject<Array<object>> = new Subject<Array<object>>();
  wholeIdeasList$ = this.wholeIdeasList.asObservable();
  constructor(private http: Http) {
    this.symbolLookupParams = new URLSearchParams;
  }

  public getIdeasList(query): Observable<Array<object>> {
    let symbolLookupUrl = `${this.apiHostName}${this.apiPrependText}/portfolio/getMidTierUserLists?`;
    this.symbolLookupParams.set('uid', query.uid);
    return this.getJson(symbolLookupUrl, this.symbolLookupParams);
  }

  public manageActiveInactive(query): Observable<Array<object>> {
    let symbolLookupUrl = `${this.apiHostName}${this.apiPrependText}/midTier/manageIdeaListActiveInactiveState?`;
    this.setKeysForAPICall(query);
    return this.getJson(symbolLookupUrl, this.symbolLookupParams);
  }

  public setIdeaListData(list: Array<object>) {
     this.wholeIdeasList.next(list);
  }

  public setMappingClassArray(list: Array<object>) {
    this.mappingClassArray.next(list);
  }

  public getJson(url, params): Observable<Array<object>> {
    return this.http.get(url, {
      search: params,
      withCredentials: true
    }).map(res => {
      return res.json();
    })
      .catch(this.handleError)
  }

  public getJsonWithoutCredential(url, params): Observable<Array<object>> {
    return this.http.get(url, {
      search: params,
      withCredentials: false
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

  public setKeysForAPICall(query) {
      Object.keys(query).forEach((key) => {
      this.symbolLookupParams.set(key, query[key]);
    })
  }

}
