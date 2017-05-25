import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../shared/shared.service';
@Component({
	selector: 'mid-tier-ideas',
	templateUrl: './ideas.component.html',
	styleUrls: ['./ideas.component.css'],
	encapsulation: ViewEncapsulation.None

})
export class IdeasComponent implements OnInit {
	private userId: string = '1024494';
	public userList: Array<object> = [];
	public symbolList1: Array<object>;
	public activeUserList = {};
	constructor(private sharedService: SharedService) {
	}

	ngOnInit() {
		this.updateUserList();
	}

	public updateUserList(){
		this.sharedService.userList(this.userId)
			.subscribe(res => {
				this.userList = res;
				this.updateActiveUser(this.userList[0]);
			},
			err => console.log('err', err));
	}

	public updateActiveUser(val){
		if (this.activeUserList!=val){
			this.activeUserList = val;
			this.sharedService.symbolList({ userId: this.userId, listId: this.activeUserList['list_id'] })
				.subscribe(res => {
					console.log(res)
				},
				err => console.log('err', err));
		}
		
	}
}
