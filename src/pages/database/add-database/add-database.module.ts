import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDatabasePage } from './add-database';
import { SharedModule } from '../../../app/shared.module';
import { MultiPickerModule } from 'ion-multi-picker';


@NgModule({
  declarations: [
    AddDatabasePage,
  ],
  imports: [
    IonicPageModule.forChild(AddDatabasePage),
    SharedModule,
    MultiPickerModule,
  ],
})
export class AddDatabasePageModule { }
