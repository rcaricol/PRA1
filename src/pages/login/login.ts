import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../Model/user.service';
import { AlertService } from '../../alert/alert.service';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MainPage } from '../main/main';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { LoadingService } from '../../Loading/loading.service';
import { UserProvider } from './../../providers/user';
import { GeocoderProvider } from './../../providers/geocoder';
import { IUser} from '../../Model/IUser';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private user: IUser;
  private userName: string;
  private password: string;
  private rememberPassword: boolean = false;
  private group: FormGroup;

  private alertService: AlertService;
  private loadingService: LoadingService;
  constructor(
              public navCtrl: NavController,
              private formBuilder: FormBuilder,
              public httpClient: HttpClient,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private userService: UserService,
              private userProvider: UserProvider,
              private geocoderProvider: GeocoderProvider
            ) {
    this.group = this.formBuilder.group({
                       userName: ['', Validators.required],
                       password: ['', Validators.required]
    });

    this.alertService = new AlertService(alertCtrl);
    this.loadingService = new LoadingService(loadingCtrl,"Validating...");
    this.geocoderProvider.reverse();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.checklocalStorage();
  }

  checklocalStorage(){
    this.userProvider.get().then(user => {
      if (user !=  null){
          console.log("checklocalStorage()", user.RememberPassword);
          this.user = user;
          this.userName = user.UserName;
          this.rememberPassword = user.RememberPassword;
          if (user.RememberPassword)
            this.password = user.Password;

          if (user.IsActive){
            this.navCtrl.push(MainPage);
          }
      }
    });
  }

  loginUser(){
    this.loadingService.present();
    this.userService.validate(this.userName,this.password).subscribe(
      validate=>{
        if (validate.status === "OK"){
          this.user = this.userService.map(validate, this.rememberPassword);
          console.log("user",this.user);
          this.userProvider.set(this.user);
          this.loadingService.dismiss();
          this.navCtrl.push(MainPage);
        }
        else{
          console.log(validate);
          this.userService.fault();
        this.loadingService.dismiss();
          this.alertService.show("Validation error","User or password is incorrect!!");
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
}
