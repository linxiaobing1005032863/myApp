import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { bidFiltratePage } from './bid-filtrate';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    bidFiltratePage,
  ],
  imports: [
    IonicPageModule.forChild(bidFiltratePage),
    SharedModule
  ],
})
export class bidFiltratePageModule {}
