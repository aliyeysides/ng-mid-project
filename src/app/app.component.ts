import { Component } from '@angular/core';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 // title = 'app works
	environmentName = environment.envName;
	apiURL = environment.envProtocol + '://' + environment.envHostName;
	constructor() {
		//this.displayEnvironment();
	}
	private displayEnvironment(){
		let url = `${window.location.protocol}://${window.location.hostname}:${window.location.port }`;
		console.log(url);
	}
}
