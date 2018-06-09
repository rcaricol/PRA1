import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddbirdPage } from './addbird';

@NgModule({
  declarations: [
    AddbirdPage,
  ],
  imports: [
    IonicPageModule.forChild(AddbirdPage),
  ],
})
export class AddbirdPageModule {}
