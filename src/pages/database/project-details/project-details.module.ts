import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectDetailsPage } from './project-details';
import { SharedModule } from '../../../app/shared.module';
@NgModule({
  declarations: [
    ProjectDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectDetailsPage),
    SharedModule
  ],
})
export class ProjectDetailsPageModule { }
