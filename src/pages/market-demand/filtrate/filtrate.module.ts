import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltratePage } from './filtrate';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    FiltratePage,
  ],
  imports: [
    IonicPageModule.forChild(FiltratePage),
    SharedModule
  ],
})
export class FiltratePageModule {}
