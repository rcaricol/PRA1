import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { IUser} from './IUser';
import { LocalStorageService } from '../storage/local.service';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

interface IValidate{
  status: string;
  id: string;
}

@Injectable()
export class UserService{
  private url:string = "/login";
  public user: IUser = {Id:"", UserName: "", Password: "", IsActive: false, RememberPassword: false};
  private httpClient: HttpClient;
  private PERSISTENT_STORAGE_NAME: string = "user";

  constructor(
              private localStorageService: LocalStorageService,
              private httpclient: HttpClient,
              private storage: Storage
  ){
      console.log("UserService->constructor()");
      this.httpClient = httpclient;
  }

  validate(userName: string, password: string): Observable<IValidate>{
    let postData = new FormData();
    postData.append('user' , userName);
    postData.append('password' , password);
    this.user = {Id: "", UserName: userName, Password: password,  IsActive: false, RememberPassword: false};
    return this.httpClient.post<IValidate>(this.url, postData);
  }

  map(validate: IValidate, rememberPassword: boolean){
    let userMap:IUser =
     {
        Id: validate.id,
        UserName: this.user.UserName,
        Password: this.user.Password,
        IsActive: true,
        RememberPassword: rememberPassword
    };
    return userMap;
  }

  fault(){
    this.user =  {Id:"", UserName: "", Password: "", IsActive: false, RememberPassword: false};
    console.log(this.user);
    this.set();
  }

  set(){
    this.localStorageService.set(this.PERSISTENT_STORAGE_NAME,this.user);
  }

  get(){
    return this.localStorageService.get(this.PERSISTENT_STORAGE_NAME);
  }

  IsSessionAlive() {
    console.log("IsSessionAlive().get()", this.get());
    console.log("IsActive",this.user.IsActive);
    if (this.user != null){
        if (this.user.IsActive)
          return true;
    }

    return false;
  }

  getSessionId(){
      //this.user = this.get();
      console.log('getSessionId()-->', this.user.Id);
      return this.user.Id;
  }

  logout(){
    this.user = {Id: this.user.Id, UserName: this.user.UserName, Password: this.user.Password,  IsActive: false, RememberPassword: false};
    console.log("logout()-->", this.user);
    this.localStorageService.set(this.PERSISTENT_STORAGE_NAME,this.user);
  }
}
