import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';


@Component({
	selector: 'mid-tier-insights',
	templateUrl: './insights.component.html',
	styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {

	constructor() {}

	ngOnInit() {}

}
