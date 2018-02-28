import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HttpService } from '../../providers/Http.service';
import { WAITMANAGE } from '../../config/config';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  timeAll:any=new Date;
  eventSource;
    viewTitle;
    flag:number = 0;
    isToday:boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: (date:Date) => {
                return this.filterWeek(date);
            },
            formatMonthViewTitle: (date:Date) => {
                return this.filterMonth(date);
            },
            formatWeekViewDayHeader: (date:Date)=> {
                return this.filterWeek(date);
            },
            formatWeekViewTitle: function(date:Date) {
                return '周';
            },
            formatWeekViewHourColumn: (date:Date) => {
                return this.flag++ + ': 00';
            },
            formatDayViewHourColumn: (date:Date) => {
                return this.flag++ + ': 00';
            },
            formatDayViewTitle: function(date:Date) {
                return date.getDate() + '日';
            }
        }
    };
    constructor(private navController:NavController,public http: HttpService,public navCtrl: NavController,) {
      this.http.get(WAITMANAGE + 'event/v1/findByPlanType?planTypes=ALL&year=2018&month=01')
        .then(res => {
          if (res.code==0) {
            var events = [];
            for(var i = 0; i < res.data.length; i++){
              for(var j=0;j<res.data[i].eventBOs.length;j++){
                events.push({
                  title: res.data[i].eventBOs[j].content,
                  startTime: new Date(res.data[i].eventBOs[j].startTime),
                  endTime:new Date(res.data[i].eventBOs[j].startTime),
                  allDay: false
                });
              }
            }
            this.eventSource=events;
          } else {
            this.http.presentToast(res.msg);
          }
        }).catch(() => {
        this.http.presentToast('服务器错误,请联系管理员');
      })
    }
  onTimeSelected(ev) {
    this.timeAll=ev.selectedTime
    console.log(this.timeAll)
  }

  getDetailAdd () {
     this.navCtrl.push('DetailAddPage')
   }
  detailSee () {
    this.navCtrl.push('DetailSeePage',{times:this.timeAll})
  }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    changeMode(mode) {
        this.flag = 0;
        this.calendar.mode = mode;
    }
    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    filterWeek(data:Date):string {
        let str:string;
        let week:number = data.getDay();
        switch (week) {
            case 0 :
                    str = "日";
                    break;
            case 1 :
                    str = "一";
                    break;
            case 2 :
                    str = "二";
                    break;
            case 3 :
                    str = "三";
                    break;
            case 4 :
                    str = "四";
                    break;
            case 5 :
                    str = "五";
                    break;
            case 6 :
                    str = "六";
                    break;
        }
        return '周' + str;
    }

    filterMonth(data:Date):string {
        let str:string;
        let Month:number = data.getMonth();
        switch (Month) {
            case 0 :
                    str = "一月";
                    break;
            case 1 :
                    str = "二月";
                    break;
            case 2 :
                    str = "三月";
                    break;
            case 3 :
                    str = "四月";
                    break;
            case 4 :
                    str = "五月";
                    break;
            case 5 :
                    str = "六月";
                    break;
            case 6 :
                    str = "七月";
                    break;
            case 7 :
                    str = "八月";
                    break;
            case 8 :
                    str = "九月";
                    break;
            case 9 :
                    str = "十月";
                    break;
            case 10 :
                    str = "十一月";
                    break;
            case 11 :
                    str = "十二月";
                    break;
        }
        return str;
    }
}
