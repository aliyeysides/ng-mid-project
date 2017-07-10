import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Rx';

import { environment } from 'environments/environment';

@Injectable()
export class SidePanelProvider {

	private symbolLookupParams: URLSearchParams;
	environmentName = environment.envName;
	apiHostName = environment.envProtocol + '://' + environment.envHostName;
	private apiPrependText:string = '/CPTRestSecure/app'
	constructor(private http: Http) {
		this.symbolLookupParams = new URLSearchParams;
	}
	public getIntraDayChartData(query) : Observable<Array<object>> {
		let symbolLookupUrl = `${this.apiHostName}${this.apiPrependText}/chart/getIntraDayChartData?`;
		this.symbolLookupParams.set('symbol', query.symbol);
		return this.getJson(symbolLookupUrl, this.symbolLookupParams);
	}

	public getRecentIntraDayPriceForSymbol(query) : Observable<Array<object>> {
		let symbolLookupUrl = `${this.apiHostName}${this.apiPrependText}/chart/getRecentIntraDayPriceForSymbol?`;
		this.symbolLookupParams.set('symbol', query.symbol);
		return this.getJson(symbolLookupUrl, this.symbolLookupParams);
	}

	public initialMarketSectorData(query): Observable<Array<object>> {
		let symbolLookupUrl = `${this.apiHostName}${this.apiPrependText}/midTier/getInitialData?`;
		this.symbolLookupParams.set('components', query.components);
		return this.getJson(symbolLookupUrl, this.symbolLookupParams);
	}

	public updateInitialSectorData(query): Observable<Array<object>> {
		let symbolLookupUrl = `${this.apiHostName}${this.apiPrependText}/price/getListSymbolsPriceChgWRTOpen?`;
		this.symbolLookupParams.set('listId', query.listId);
		return this.getJson(symbolLookupUrl, this.symbolLookupParams);
	}

	public getAlertsData(query): Observable<Array<object>> {
		let symbolLookupUrl = `${this.apiHostName}${this.apiPrependText}/midTier/getInitialData?`;
		this.setKeysForAPICall(query);
		return this.getJson(symbolLookupUrl, this.symbolLookupParams);
	}

	public setKeysForAPICall(query) {
		Object.keys(query).forEach((key) => {
			this.symbolLookupParams.set(key, query[key]);
		})
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