import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyDetilePage } from './company-detile';

@NgModule({
  declarations: [
    CompanyDetilePage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyDetilePage),
  ],
})
export class CompanyDetilePageModule {}
