import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalStorageService{

  private val: any;

  constructor(private storage: Storage){

  }

  set(key: string, value: any){
    this.storage.set(key, value);
  }

  get(key: string){
    return this.storage.get(key);
  }
}
