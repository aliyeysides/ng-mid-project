import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Subject} from "rxjs/Subject";
import {environment} from 'environments/environment';

@Injectable()
export class IdeaListProvider {

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

  public setIdeaListData(data) {
    this.wholeIdeasList.next(data);
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

}
