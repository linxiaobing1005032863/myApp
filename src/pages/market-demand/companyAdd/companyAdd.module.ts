import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyAddPage } from './companyAdd';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    CompanyAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyAddPage),
    SharedModule
  ],
})
export class CompanyAddPageModule {}
