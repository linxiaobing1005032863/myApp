import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
// import { CalendarComponent } from 'ionic2-calendar/calendar';
// import { MonthViewComponent } from 'ionic2-calendar/monthview';
// import { WeekViewComponent } from 'ionic2-calendar/weekview';
// import { DayViewComponent } from 'ionic2-calendar/dayview';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(DetailPage)
  ],
  providers:[
    
  ]
})
export class DetailPageModule {}
