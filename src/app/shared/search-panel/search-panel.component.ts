import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'search-panel',
	templateUrl: './search-panel.component.html',
	styleUrls: ['./search-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SearchPanelComponent implements OnInit {

	public settingsVisible: boolean;
	public test: string;
	public searchResult: Array<object>;
	//private symbolLookupComponent : SymbolLookupComponent
	constructor() {
		this.searchResult = [];
		this.test = "sdasdsa"
		/*console.log("value", this.test);*/
	}

	ngOnInit() { }
}
