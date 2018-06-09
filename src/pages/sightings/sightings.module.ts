import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SightingsPage } from './sightings';

@NgModule({
  declarations: [
    SightingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SightingsPage),
  ],
})
export class SightingsPageModule {}
