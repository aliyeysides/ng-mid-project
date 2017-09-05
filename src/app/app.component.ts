import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor() {
		//this.displayEnvironment();
	}

	private displayEnvironment(){
		let url = `${window.location.protocol}://${window.location.hostname}:${window.location.port }`;
		console.log(url);
	}
}
