import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
/*import due to debounce input change*/
/*import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';*/

@Component({
  selector: 'mid-tier-header',
  templateUrl: './mid-tier-header.component.html',
  styleUrls: ['./mid-tier-header.component.css']
})
export class MidTierHeaderComponent implements OnInit {

  public settingsVisible: boolean;

  constructor() { /*console.clear();*/ }

  
  ngOnInit() {
    this.settingsVisible = false;
  }

  onFormSubmit(userForm: NgForm) {
   /* console.log(userForm.value);
    console.log('symbol:' + userForm.controls['search-symbol'].value);
    console.log('Form Valid:' + userForm.valid);
    console.log('Form Submitted:' + userForm.submitted);*/
    userForm.reset();
  }


  doSomething(symbol,e) {

    console.log(e.viewModel);
 
  }

  /*public toggle() {
    this.settingsVisible = !this.settingsVisible;
  }*/
}