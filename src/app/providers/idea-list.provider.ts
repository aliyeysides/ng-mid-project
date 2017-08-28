import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from "rxjs/Subject";
import { environment } from 'environments/environment';

@Injectable()
export class IdeaListProvider {

  private apiHostName = environment.envProtocol + '://' + environment.envHostName;
  private symbolLookupParams: URLSearchParams;
  private apiPrependText: string = '/CPTRestSecure/app';

  private wholeIdeasList: Subject<Array<object>> = new Subject<Array<object>>();
  wholeIdeasList$ = this.wholeIdeasList.asObservable();

  constructor(private http: Http) {
    this.symbolLookupParams = new URLSearchParams;
  }

  public getIdeasList(query): Observable<Array<object>> {
    const symbolLookupUrl = `${this.apiHostName}${this.apiPrependText}/portfolio/getMidTierUserLists?`;
    this.symbolLookupParams.set('uid', query.uid);
    return this.getJson(symbolLookupUrl, this.symbolLookupParams);
  }

  public manageActiveInactive(query): Observable<Array<object>> {
    const symbolLookupUrl = `${this.apiHostName}${this.apiPrependText}/midTier/manageIdeaListActiveInactiveState?`;
    this.setKeysForAPICall(query);
    return this.getJson(symbolLookupUrl, this.symbolLookupParams);
  }

  public setIdeaListData(list: Array<object>) {
    this.wholeIdeasList.next(list);
  }

  private getJson(url, params): Observable<Array<object>> {
    return this.http.get(url, {
      search: params,
      withCredentials: true
    }).map(res => {
      return res.json();
    })
      .catch(this.handleError)
  }

  private handleError(err: any): Observable<Error> {
    const errMsg = (err.message) ? err.message :
      err.status ? `${err.status} - ${err.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

  private setKeysForAPICall(query): void {
    Object.keys(query).forEach((key) => {
      this.symbolLookupParams.set(key, query[key]);
    });
  }

}
