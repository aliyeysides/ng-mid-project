import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ListSelectionService {

  private isShown: Subject<boolean> = new Subject<boolean>();
  isShown$ = this.isShown.asObservable();

  constructor() {
  }

  public setIsShown(value: boolean) {
    this.isShown.next(value);
    console.log('isShown', value);
  }

}
