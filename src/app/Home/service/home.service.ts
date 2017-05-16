import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomeService {
	
	private params: URLSearchParams;
	
	constructor(private http: Http) {
	    this.params = new URLSearchParams;
	    console.log("initialise");
	    this.fetchInsights();
 	}

 	/* TODO: implement http call to fetch insights */
	private fetchInsights(): any {
	    // this.insights = INSIGHTS;
	    // let insightsUrl = 'https://dev.chaikinanalytics.com/insights/';
	    let insightsUrl = 'http://localhost:8080/CPTRestSecure/app/portfolio/getSymbolData?uid=1024494&symbol=A&components=pgr%2CmetaInfo%2CfundamentalData%2CEPSData';

	    // this.params.set('json', 'secursive.get_product_updates');
	    // this.params.set('dev', '1');
	    // this.params.set('id', '2,10');

	    this.http.get(insightsUrl, {
	      withCredentials: false
	    }).toPromise()
	      .then(res => {/*this.insights = res.json() as Insight[]*/})
	      .catch(err => {/*this.handleError*/})
	}
	public getInsights(){
		
	}
	public static handleError(err: any) {
	    let errMsg = (err.message) ? err.message :
	      err.status ? `${err.status} - ${err.statusText}` : 'Server error';
	    console.error(errMsg); // log to console instead
	    // return Observable.throw(errMsg);
  	}

}