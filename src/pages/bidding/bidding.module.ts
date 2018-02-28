import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { biddingPage } from './bidding';

@NgModule({
  declarations: [
    biddingPage,
  ],
  imports: [
    IonicPageModule.forChild(biddingPage),
  ],
})
export class biddingPageModule {}
