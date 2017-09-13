import {Injectable} from '@angular/core';
import {SharedService} from './shared.service';
import {Subject} from 'rxjs/Subject';
import {User} from '../../models/user';
import {UtilService} from './util.service';

@Injectable()
export class UserService {

  private apiHostName: string = this.sharedService.getApiHostName();
  private currentUser: Subject<User> = new Subject<User>();
  private loginParams: URLSearchParams;
  private logoutParams: URLSearchParams;
  private email: string;
  public loggedIn: boolean;


  constructor(private sharedService: SharedService,
              private utilService: UtilService) {
    this.loginParams = new URLSearchParams;
    this.logoutParams = new URLSearchParams;
  }

  // public setUID(UID : string){
  //   this.uid = UID;
  // }
  //
  // public getUID(){
  //   return this.uid;
  // }

  public login(emailID): any {
    this.email = emailID;
    const getLoginUrl = `${this.apiHostName}/CPTRestSecure/app/user/login?`;
    this.loginParams.set('deviceId', emailID);
    return this.utilService.getJson(getLoginUrl, this.loginParams);
  }

  public logOutSession(): any {
    const getLogoutUrl = `${this.apiHostName}/CPTRestSecure/app/session/killsessions?`;
    this.logoutParams.set('uuid', this.email);
    return this.utilService.getJson(getLogoutUrl, this.logoutParams);
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  // public logOutSession() {
  //   this.sharedService.killSession()
  //     .toPromise()
  //     .then(() => {
  //       let localhostAddress = window.location.protocol + '//' + window.location.host;
  //       location.replace(`${localhostAddress}/`);
  //     });
  // }

}
