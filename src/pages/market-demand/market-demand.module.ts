import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketDemandPage } from './market-demand';

@NgModule({
  declarations: [
    MarketDemandPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketDemandPage),
  ],
})
export class MarketDemandPageModule {}
