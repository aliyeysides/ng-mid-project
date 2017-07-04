import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Rx';

import { environment } from 'environments/environment';

@Injectable()
export class IdeaListProvider {

	private symbolLookupParams: URLSearchParams;
	environmentName = environment.envName;
	apiHostName = environment.envProtocol + '://' + environment.envHostName;
	private apiPrependText: string = '/CPTRestSecure/app'

	public ideasList: Array<object>;

	constructor(private http: Http) {
		this.symbolLookupParams = new URLSearchParams;
	}

	public getIdeasList(query): Observable<Array<object>> {
		let symbolLookupUrl = `${this.apiHostName}${this.apiPrependText}/portfolio/getMidTierUserLists?`;
		this.symbolLookupParams.set('uid', query.uid);
		return this.getJson(symbolLookupUrl, this.symbolLookupParams);
	}

	public setIdeaListData(data){
		this.ideasList = data;
	}

	public getIdeaListData(){
		return this.ideasList;
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