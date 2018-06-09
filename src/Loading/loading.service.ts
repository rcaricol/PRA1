import { LoadingController } from 'ionic-angular';

export class LoadingService{
  private loader: any;

  constructor(
              public loadingCtrl: LoadingController,
              public message: string
              ){
  }

  create(){
    this.loader = this.loadingCtrl.create({
      content: this.message,
      dismissOnPageChange: true
    });
  }

  dismiss(){
    if (this.loader != undefined)
      this.loader.dismiss();
  }

  present() {
    this.create();
    this.loader.present();
  }
}
