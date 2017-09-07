import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {environment} from 'environments/environment';
import {SharedService} from '../shared/shared.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class IdeaListProvider {

  private apiHostName = environment.envProtocol + '://' + environment.envHostName;
  private symbolLookupParams: URLSearchParams;
  private apiPrependText: string = '/CPTRestSecure/app';

  private selectedList: BehaviorSubject<object> = new BehaviorSubject<object>({});
  selectedList$ = this.selectedList.asObservable();

  private wholeIdeasList: Subject<Array<object>> = new Subject<Array<object>>();
  wholeIdeasList$ = this.wholeIdeasList.asObservable();

  constructor(private sharedService: SharedService) {
    this.symbolLookupParams = new URLSearchParams;
  }

  public setSelectedList(list: object) {
    this.selectedList.next(list);
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
    return this.sharedService.getJson(url, params);
  }

  private setKeysForAPICall(query): void {
    Object.keys(query).forEach((key) => {
      this.symbolLookupParams.set(key, query[key]);
    });
  }

}
