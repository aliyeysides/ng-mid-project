
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import * as _ from 'underscore';
import { environment } from 'environments/environment';

@Injectable()
export class PagerProvider {
    private symbolLookupParams: URLSearchParams;
    environmentName = environment.envName;
    apiHostName = environment.envProtocol + '://' + environment.envHostName;
    private apiPrependText: string = '/CPTRestSecure/app'
    constructor(private http: Http) {
        this.symbolLookupParams = new URLSearchParams;
    }
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        if (totalPages <= 8) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 5) {
                startPage = 1;
                endPage = 8;
            } else if (currentPage + 3 >= totalPages) {
                startPage = totalPages - 7;
                endPage = totalPages;
            } else {
                startPage = currentPage - 4;
                endPage = currentPage + 3;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}