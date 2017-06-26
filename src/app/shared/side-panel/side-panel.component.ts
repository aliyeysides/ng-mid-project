import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
	selector: 'side-panel',
	templateUrl: './side-panel.component.html',
	styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {

	public settingsVisible: boolean;
	public test: string;
	public searchResult: Array<object>;
	constructor() {

	}

	ngOnInit() { }
}
