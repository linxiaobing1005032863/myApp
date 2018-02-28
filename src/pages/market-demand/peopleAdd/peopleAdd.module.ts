import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { peopleAddPage } from './peopleAdd';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    peopleAddPage,
  ],
  imports: [
    IonicPageModule.forChild(peopleAddPage),
    SharedModule
  ],
})
export class peopleAddPageModule {}
